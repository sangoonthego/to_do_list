const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.done) li.classList.add("done");
    li.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    });
    list.appendChild(li);
  });
}

document.getElementById('add-button').addEventListener('click', addTask);

function addTask() {
  const input = document.getElementById('todo-input');
  const taskText = input.value.trim();
  if (taskText !== "") {
    const li = document.createElement('li');
    li.textContent = taskText;
    li.addEventListener('click', () => {
      li.classList.toggle('done');
    });
    document.getElementById('todo-list').appendChild(li);
    input.value = "";
  }
}

// save at localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    todos.push({ text: input.value, done: false });
    input.value = "";
    saveTodos();
    renderTodos();
  }
});

renderTodos();
