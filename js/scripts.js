let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

let data = JSON.parse(localStorage.getItem("data")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value.trim() === "") {
    msg.innerHTML = "Task cannot be blank";
  } else {
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    setTimeout(() => add.setAttribute("data-bs-dismiss", ""), 300);
  }
};

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
  resetForm();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.forEach((task, index) => {
    tasks.innerHTML += `
        <div id="${index}">
            <span class="fw-bold">${task.text}</span>
            <span class="small text-secondary">${task.date}</span>
            <p>${task.description}</p>
            <span class="options">
                <i onClick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick="deleteTask(${index})" class="fas fa-trash-alt"></i>
            </span>
        </div>`;
  });
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

let deleteTask = (index) => {
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

let editTask = (index) => {
  let task = data[index];

  textInput.value = task.text;
  dateInput.value = task.date;
  textarea.value = task.description;

  deleteTask(index);
};

// Load tasks on page refresh
document.addEventListener("DOMContentLoaded", createTasks);
