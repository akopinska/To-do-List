const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Do you really have nothing to do?");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    saveDataToAPI(inputBox.value);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
  listContainer.innerHTML = localStorage.getItem("data");
}

function fetchDataFromAPI() {
  fetch("https://jsonplaceholder.typicode.com/todos");
  .then((response) => response.json())
    .then((data) => {
      data.forEach((todo) => {
        let li = document.createElement("li");
        li.innerHTML = todo.title;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
      });
    })
    .catch((error) => {
      console.error("Błąd pobierania danych", error);
    });
}

function saveDataToAPI(task) {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      title: task,
      completed: false,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Zapisano zadanie do API:", data);
    })
    .catch((error) => {
      console.error("Błąd zapisywania danych do API:", error);
    });
}

window.onload = function () {
  fetchDataFromAPI();
  showList();
};
