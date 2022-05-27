const todos = storagedData();

let filters = {
  searchTexet: "",
  hideIncompleted: false,
};

newTodo(todos, filters);

document.querySelector("#note").addEventListener("input", function (e) {
  filters.searchTexet = e.target.value;
  newTodo(todos, filters);
});
//submit form
document.querySelector("#form").addEventListener("submit", function (e) {
  e.preventDefault();
  const text = e.target.elements.first.value.trim();
  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });
  }
  saveTodos(todos);
  newTodo(todos, filters);
  e.target.elements.first.value = "";
});

//Checkbox
document.getElementById("check").addEventListener("change", function (e) {
  filters.hideIncompleted = e.target.checked;
  newTodo(todos, filters);
});

//Changing color
let colorChange = document.querySelector(".m-color");

function change() {
  document.body.style.setProperty(`--${this.name}`, this.value);
  localStorage.setItem("color", colorChange.value);
}

colorChange.addEventListener("change", change);
