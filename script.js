document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = createTaskElement(taskText);
    document.getElementById("taskList").appendChild(li);
    
    taskInput.value = "";
    saveTasks();
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = taskText;

    const editButton = document.createElement("button");
    editButton.className = "btn btn-warning btn-sm";
    editButton.textContent = "✏️";
    editButton.addEventListener("click", () => editTask(li));

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => deleteTask(li));

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    li.addEventListener("click", () => toggleTaskCompletion(li));

    return li;
}

function editTask(li) {
    const currentText = li.firstChild.textContent.trim();
    const newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== "") {
        li.firstChild.textContent = newText.trim();
        saveTasks();
    }
}

function deleteTask(li) {
    li.remove();
    saveTasks();
}

function toggleTaskCompletion(li) {
    li.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.firstChild.textContent.trim(), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text);
        if (task.completed) li.classList.add("completed");
        document.getElementById("taskList").appendChild(li);
    });
}