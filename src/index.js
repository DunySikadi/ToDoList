import "./style.css";

const ul = document.querySelector("ul");
const input = document.querySelector("form > input");
const form = document.querySelector("form");
const todos = [];

const createTodos = () => {
  const el = todos.map((todo, index) => {
    if (todo.edit === true) {
      return createElementEdit(todo, index);
    } else {
      return createElementTodo(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...el);
};

const createElementTodo = (todo, index) => {
  const li = document.createElement("li");
  const butDelete = document.createElement("button");
  const butEdit = document.createElement("button");
  butDelete.innerHTML = "supprimer";
  butEdit.innerHTML = "editer";
  butDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  butEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    clickEdit(todo);
  });
  li.addEventListener("click", () => {
    toggleTrue(todo);
  });
  li.innerHTML = `<span class="todo ${todo.done ? "done" : ""}"></span>
  <p>${todo.text}</p>`;
  li.append(butEdit);
  li.append(butDelete);
  return li;
};

const createElementEdit = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.value = todo.text;
  const save = document.createElement("button");
  const cancel = document.createElement("button");
  save.innerHTML = "save";
  cancel.innerHTML = "cancel";
  save.addEventListener("click", () => {
    clickSave(todo, input);
  });
  cancel.addEventListener("click", () => {
    clickEdit(todo);
  });
  li.append(input, save, cancel);
  return li;
};

const addTodo = (text) => {
  todos.push({ text, done: false, edit: false });
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  createTodos();
};

const toggleTrue = (todo) => {
  todo.done = !todo.done;
  createTodos();
};

const clickEdit = (todo) => {
  todo.edit = !todo.edit;
  createTodos();
};

const clickSave = (todo, input) => {
  todo.text = input.value;
  clickEdit(todo);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value == "") {
    alert("entrer la todo");
  } else {
    const value = input.value;
    input.value = "";
    addTodo(value);
    createTodos();
  }
});
