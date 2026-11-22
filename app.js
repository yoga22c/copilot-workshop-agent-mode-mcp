const STORAGE_KEY = "todo-list-items";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed-button");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const themeStorageKey = "todo-list-theme";
const colorSchemePreference = window.matchMedia("(prefers-color-scheme: dark)");

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let currentFilter = "all";

function updateThemeToggle(isDark) {
  themeToggle.innerHTML = isDark
    ? '<span aria-hidden="true">☀️</span><span>淺色模式</span>'
    : '<span aria-hidden="true">🌙</span><span>深色模式</span>';
}

function getCurrentTheme() {
  return document.documentElement.dataset.theme || (colorSchemePreference.matches ? "dark" : "light");
}

const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme === "light" || savedTheme === "dark") {
  document.documentElement.dataset.theme = savedTheme;
}
updateThemeToggle(getCurrentTheme() === "dark");

colorSchemePreference.addEventListener("change", () => {
  if (!localStorage.getItem(themeStorageKey)) {
    updateThemeToggle(colorSchemePreference.matches);
  }
});

themeToggle.addEventListener("click", () => {
  const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(themeStorageKey, nextTheme);
  updateThemeToggle(nextTheme === "dark");
});

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  list.replaceChildren();

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") {
      return !todo.completed;
    }
    if (currentFilter === "completed") {
      return todo.completed;
    }
    return true;
  });

  for (const todo of visibleTodos) {
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.completed) {
      item.classList.add("is-completed");
    }

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為${todo.completed ? "未完成" : "已完成"}`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((itemTodo) => itemTodo.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  }

  const remaining = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${remaining} 項`;
  clearCompletedButton.disabled = !todos.some((todo) => todo.completed);
  list.hidden = visibleTodos.length === 0;
  emptyState.hidden = visibleTodos.length > 0;
  if (visibleTodos.length === 0) {
    emptyState.textContent = currentFilter === "active"
      ? "沒有未完成的待辦事項。"
      : currentFilter === "completed"
        ? "還沒有已完成的待辦事項。"
        : "還沒有任何待辦事項，新增一個吧！";
  }
}

clearCompletedButton.addEventListener("click", () => {
  if (!todos.some((todo) => todo.completed)) {
    return;
  }

  const confirmed = window.confirm("確定要清除所有已完成的待辦事項嗎？此操作無法復原。");
  if (!confirmed) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderTodos();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    return;
  }

  todos.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

renderTodos();
