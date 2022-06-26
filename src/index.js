import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");

const input = document.querySelector("input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value.trim()) {
    ul.innerHTML = "";
    const text = input.value;
    addTodo(text[0].toUpperCase() + text.slice(1));
  }
  input.value = "";
});

const todos = [
  { text: "je suis une todo", done: false, editMode: false },
  { text: "faire du javascript", done: true, editMode: false },
];

function createTodoElement(todo, index) {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  buttonDelete.style.background = "#e74c3c";
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Editer";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.addEventListener("click", () => {
    toggleTodo(index);
  });

  li.addEventListener("dblclick", () => {
    toggleEditMode(index);
  });

  li.innerHTML = `
  <span class="todo${todo.done ? " done" : ""}"></span>
  <p class="${todo.done ? " scratch" : ""}">${todo.text}</p>
  `;
  li.append(buttonEdit);
  li.append(buttonDelete);
  return li;
}

function createTodoEditElement(todo, index) {
  const li = document.createElement("li");
  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Sauvegarder";
  buttonSave.style.background = "#3498db";
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Annuler";
  buttonCancel.style.background = "#e74c3c";
  const EditInput = document.createElement("input");
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  EditInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editTodo(index, EditInput.value);
    }
  });

  EditInput.value = todo.text;
  buttonSave.addEventListener("click", (event) => {
    editTodo(index, EditInput.value);
  });
  li.append(EditInput, buttonSave, buttonCancel);
  setTimeout(() => EditInput.focus(), 0);
  return li;
}

function displayTodo() {
  ul.innerHTML = "";
  todos.forEach((todo, index) => {
    if (todo.editMode) {
      const li = createTodoEditElement(todo, index);
      ul.append(li);
    } else {
      const li = createTodoElement(todo, index);
      ul.append(li);
    }
  });
}

function addTodo(text) {
  todos.push({
    text,
    done: false,
    editMode: false,
  });
  displayTodo();
}

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  displayTodo();
}

function toggleEditMode(index) {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
}
function editTodo(index, text) {
  todos[index].text = text;
  toggleEditMode(index);
}

function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodo();
}

displayTodo();
