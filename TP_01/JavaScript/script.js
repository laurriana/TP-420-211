const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearAll = document.getElementById("clearAll");
const todos = [];

var i = 0;

addTaskBtn.addEventListener("click", addTask);
window.addEventListener("load", retrieveTasks);

function retrieveTasks() {
    for (let key in localStorage) {
        if (key.startsWith("task_")) {
            const taskText = localStorage.getItem(key);
            createTaskElement(taskText, key);
            todos.push(taskText);
        }
    }
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText, `task_${i}`);
        localStorage.setItem(`task_${i}`, taskText);
        i++;
        todos.push(taskText);
    } else {
        alert("Veuillez entrer une tâche valide.");
    }
    taskInput.value = "";
}

function createTaskElement(taskText, key) {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    listItem.appendChild(checkbox);

    const taskLabel = document.createElement("label");
    taskLabel.textContent = taskText;
    listItem.appendChild(taskLabel);

    const editBtn = createButton("./Images/icons8-edit-file-50.png", '18px', '18px');
    const deleteBtn = createButton("./Images/icons8-delete-60.png", '18px', '18px');

    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    editBtn.addEventListener("click", () => {
        taskInput.value = listItem.textContent;
        listItem.remove();
        localStorage.removeItem(key);
    });

    deleteBtn.addEventListener("click", () => {
        listItem.remove();
        localStorage.removeItem(key);
        const index = todos.indexOf(taskText);
        if (index > -1) {
            todos.splice(index, 1);
        }
    });

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            taskLabel.style.textDecoration = "line-through";
        } else {
            taskLabel.style.textDecoration = "none";
        }
    });

    taskList.appendChild(listItem);
}

function createButton(src, height, width) {
    const button = document.createElement("img");
    button.setAttribute("src", src);
    button.setAttribute('height', height);
    button.setAttribute('width', width);
    return button;
}

clearAll.addEventListener("click", () => {
    taskList.innerHTML = "";
    for (let key in localStorage) {
        if (key.startsWith("task_")) {
            localStorage.removeItem(key);
        }
    }
    todos.length = 0;
});

const sidebarBtn = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebarEls");

function toggleSidebar() {
    if (sidebar.style.display === "none") {
        sidebar.style.display = "block";
    } else {
        sidebar.style.display = "none";
        sidebar.style.backgroundColor = "";
    }
}

sidebarBtn.addEventListener("click", toggleSidebar);