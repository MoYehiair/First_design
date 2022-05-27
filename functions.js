//Read data from localstorage

let storagedData = function () {
  let todoStorage = localStorage.getItem("todo");
  return todoStorage !== null ? JSON.parse(todoStorage) : [];
};

// let saveColor = function () {
//   let todoColor = localStorage.getItem("color");
//   return todoColor !== null ? JSON.parse(todoColor) : "";
// };
//Render Todo
const newTodo = function (todos, filters) {
  let filteredtodos = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchTexet.toLowerCase());
  });
  filteredtodos = filteredtodos.filter(function (todo) {
    if (filters.hideIncompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const incompleted = filteredtodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector(".d").innerHTML = "";

  document.querySelector(".d").appendChild(generateS(incompleted));
  filteredtodos.forEach(function (todo) {
    document.querySelector(".d").appendChild(generateTodo(todo));
  });
};

//remove todos
const removetodo = function (id) {
  const todoIndex = todos.findIndex((todo) => id === todo.id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

//checkbox todo completed

const checkTodo = function (id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

//Save todo
const saveTodos = function (todos) {
  localStorage.setItem("todo", JSON.stringify(todos));
};
//generate todo
let generateTodo = function (todo) {
  let a = document.createElement("label");
  let leftSide = document.createElement("div");
  let input = document.createElement("input");
  let spn = document.createElement("span");
  let btn = document.createElement("button");
  input.setAttribute("type", "checkbox");
  input.checked = todo.completed;
  spn.textContent = todo.text;
  btn.textContent = "Remove";
  a.append(leftSide);
  a.append(btn);
  leftSide.append(input);
  leftSide.append(spn);
  btn.addEventListener("click", function () {
    removetodo(todo.id);
    saveTodos(todos);
    newTodo(todos, filters);
  });

  input.addEventListener("change", function () {
    checkTodo(todo.id);
    saveTodos(todos);
    newTodo(todos, filters);
  });
  return a;
};

//generate summey
let generateS = function (incompleted) {
  let el = document.createElement("p");
  el.textContent = `You have ${incompleted.length} incompleted todos`;
  return el;
};
