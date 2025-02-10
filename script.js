document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${taskText} <button class="btn btn-warning btn-sm" onclick="editTask(this)">✏️</button> <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">❌</button>`;
    li.onclick = function () { li.classList.toggle("completed"); saveTasks(); };
    document.getElementById("taskList").appendChild(li);
    
    taskInput.value = "";
    saveTasks();
}

function editTask(button) {
    let li = button.parentElement;
    let currentText = li.firstChild.textContent.trim();
    let newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== "") {
        li.firstChild.textContent = newText.trim() + " ";
        saveTasks();
    }
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.firstChild.textContent.trim(), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${task.text} <button class="btn btn-warning btn-sm" onclick="editTask(this)">✏️</button> <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">❌</button>`;
        if (task.completed) li.classList.add("completed");
        li.onclick = function () { li.classList.toggle("completed"); saveTasks(); };
        document.getElementById("taskList").appendChild(li);
    });
}