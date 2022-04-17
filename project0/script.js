const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

let listTodo = [];

// Thêm 1 todo, người dùng nhập nội dung công việc, công việc sẽ được xếp ở cuối danh sách
function newTodo() {
  const text = prompt("Nhập nội dung công việc: ");
  const newTodo = {
    id: listTodo.length + 1,
    content: text,
    completed: false,
  };

  listTodo.push(newTodo);

  return render();
}

// Xóa 1 todo trong danh sách
function deleteTodo(id) {
  listTodo = listTodo.filter((todo) => todo.id !== id);
  return render();
}

// render danh sách todo
function render() {
  list.innerHTML = "";
  listTodo.map(renderListTodo).forEach((todo) => list.appendChild(todo));

  itemCountSpan.innerHTML = listTodo.length;
  uncheckedCountSpan.innerHTML = listTodo.filter(
    (todo) => todo.completed === false
  ).length;

  return false;
}

//render 1 dòng todo
function renderTodo(todo) {
  const liElement = document.createElement("li");
  liElement.classList.add(classNames.TODO_ITEM);
  let todocompleted = "";

  if (todo.completed) {
    todocompleted = "checked";
  }

  liElement.innerHTML =
    `
    <input type="checkbox" class="` +
    classNames.TODO_CHECKBOX +
    `" onChange="toggle(` +
    todo.id +
    `)" ` +
    todocompleted +
    `>
    <button class="` +
    classNames.TODO_DELETE +
    `" onClick="deleteTodo(` +
    todo.id +
    `)">delete</button>
    <span class="` +
    classNames.TODO_TEXT +
    `">` +
    todo.content +
    `</span>  
    `;

  return liElement;
}

// Chỉnh sửa trạng thái công việc
function toggle(id) {
  let toggle = listTodo.filter((toto) => toto.id === id)[0];
  toggle.completed = !toggle.completed;

  return render();
}
