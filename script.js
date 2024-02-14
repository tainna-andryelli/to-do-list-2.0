// localStorage.clear();
const inputNewTask = document.getElementById("input-new-task");
const buttonNewTask = document.getElementById("btn-new-task");
const localStorageKey = "to-do-list";

function taskExists(value) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  if (values.length) {
    for (let i = 0; i < values.length; i++) {
      if (values[i].name === value) {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}

function addNewTask() {
  if (!inputNewTask.value) {
    activeModal("Escreva uma tarefa para ser adicionada na lista.");
  } else if (taskExists(inputNewTask.value)) {
    activeModal("Já existe uma tarefa com esse nome.");
  } else {
    // increments to localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    values.push({
      name: inputNewTask.value,
    });

    localStorage.setItem(localStorageKey, JSON.stringify(values));

    showValues();
    inputNewTask.value = "";
  }
}

buttonNewTask.addEventListener("click", addNewTask);

function showValues() {
  const alert = document.querySelector(".alert");
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let todolist = document.getElementById("to-do-list");
  todolist.innerHTML = "";

  if (values.length) {
    alert.classList.add("remove");
  } else {
    alert.classList.remove("remove");
  }

  for (let i = 0; i < values.length; i++) {
    todolist.innerHTML += `<li>${values[i].name} <button class="btn-remove-task"></button></li>`;
  }
  let btnsRemove = document.querySelectorAll(".btn-remove-task");
  remove(btnsRemove);
}
showValues();

function remove(btnRemove) {
  btnRemove.forEach((item, index) => {
    item.addEventListener("click", () => {
      let values = JSON.parse(localStorage.getItem(localStorageKey));
      values.splice(index, 1);

      localStorage.setItem(localStorageKey, JSON.stringify(values));
      showValues();
    });
  });
}

function colorMode() {
  const dark = document.getElementById("dark");
  const html = document.documentElement;
  const light = document.getElementById("light");

  dark.addEventListener("click", () => {
    html.classList.add("dark-mode");
    html.classList.remove("light-mode");
    dark.style.display = "none";
    light.style.display = "inline-block";
  });

  light.addEventListener("click", () => {
    html.classList.remove("dark-mode");
    html.classList.add("light-mode");
    light.style.display = "none";
    dark.style.display = "inline-block";
  });
}
colorMode();

function activeSearch() {
  const buttonSearch = document.querySelector(".button-search");
  const inputSearch = document.getElementById("input-search");
  const search = document.querySelector(".search");

  buttonSearch.addEventListener("click", () => {
    search.classList.toggle("active");
  });

  inputSearch.addEventListener("focus", () => {
    search.style.borderColor = "var(--color-5)";
  });

  inputSearch.addEventListener("blur", () => {
    search.style.borderColor = "var(--color-2)";
  });

  inputSearch.addEventListener("keyup", () => {
    let taskSearch = inputSearch.value.toLowerCase();
    let tasksList = document.querySelectorAll("#to-do-list li");

    tasksList.forEach((task) => {
      if (task.innerText.toLowerCase().includes(taskSearch)) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  });
}
activeSearch();

function activeModal(text) {
  const modalContainer = document.querySelector(".modal-container");
  const description = document.querySelector(".modal p");

  modalContainer.classList.add("active");
  description.innerHTML = text;

  window.addEventListener("click", (e) => {
    if (
      e.target.className == "modal-container active" ||
      e.target.className == "btn-modal"
    ) {
      modalContainer.classList.remove("active");
    }
  });
}
