// variables
const taskInput = document.getElementById("addNewTask");
const addtaskButton = document.getElementById("newTaskBtn");
const taskList = document.getElementById("taskList");
const taskContainer = document.getElementById("taskContainer");

const deleteButton = document.createElement("button");
deleteButton.textContent = "delete task";
taskContainer.appendChild(deleteButton);
deleteButton.style.display = "none"; // hides button

deleteButton.addEventListener("click", () => {
  // remove last task
  if (taskList.childElementCount > 0) {
    taskList.removeChild(taskList.lastChild);

    // update the tasks in localStorage
    localStorage.setItem("savedTasks", taskList.innerHTML);

    // hide delete button
    if (taskList.childElementCount === 0) {
      deleteButton.style.display = "none";
      editButton.style.display = "none";
      saveChanges.style.display = "none";
    }
  }
});

addtaskButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  // if task isn't empty...
  if (taskText !== "") {
    const listItem = document.createElement("li");

    listItem.textContent = taskText;
    taskList.appendChild(listItem);
    taskInput.value = "";

    deleteButton.style.display = "flex";

    // automatically save to session storage
    localStorage.setItem("savedTasks", taskList.innerHTML);

    // edit
    listItem.addEventListener("dblclick", editTask); 

  } else {
    alert("please write something.");
  }
}

window.onload = function () {
  const savedTasks = localStorage.getItem("savedTasks");

  if (savedTasks) {
    taskList.innerHTML = savedTasks;
    if (taskList.childElementCount > 0) {
      deleteButton.style.display = "flex";
    }
  }
};

// edit items
function editTask() {
  const currentText = this.textContent;
  const newText = prompt("Modify the task:", currentText);
  if (newText !== null && newText !== "") {
      this.textContent = newText;
      localStorage.setItem("savedTasks", taskList.innerHTML)
  }
}
