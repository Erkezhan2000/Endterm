// Get the variables
const inputTask = document.getElementById("input-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.querySelector(".task-list");
const clearAllButton = document.querySelector(".clear-all");

// Request permission for notifications
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                alert("Уведомления отключены. Включите их для напоминаний.");
            }
        });
    }
});

// Add a task
addTaskButton.addEventListener("click", addTaskFunction);

function addTaskFunction(e) {
    e.preventDefault();

    const taskText = inputTask.value.trim();
    if (taskText === "") return;

    // Create a new li
    const newLi = document.createElement("li");
    newLi.className = "task";

    // Task input element
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.disabled = true;
    taskInput.className = "disabled-task";
    taskInput.value = taskText;
    newLi.appendChild(taskInput);

    // Reminder time input
    const reminderInput = document.createElement("input");
    reminderInput.type = "datetime-local";
    reminderInput.className = "reminderInput";
    newLi.appendChild(reminderInput);

    // Set Reminder Button
    const setReminderButton = document.createElement("button");
    setReminderButton.innerText = "Set Reminder";
    setReminderButton.className = "setReminderButton";
    setReminderButton.addEventListener("click", (e) => {
        e.preventDefault();

        const reminderTime = new Date(reminderInput.value);
        if (reminderInput.value === "") {
            alert("Пожалуйста, выберите время напоминания!");
        } else if (reminderTime > new Date()) {
            scheduleNotification(taskText, reminderTime);
            alert("Напоминание успешно установлено!");
        } else {
            alert("Выбрано прошедшее время!");
        }
    });
    newLi.appendChild(setReminderButton);

    // Done button
    const doneButton = document.createElement("button");
    doneButton.innerText = "Done";
    doneButton.className = "doneButton";
    doneButton.addEventListener("click", (e) => {
        e.preventDefault();
        newLi.classList.toggle("completed");
    });
    newLi.appendChild(doneButton);

    // Edit button
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "editButton";
    editButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (taskInput.disabled) {
            taskInput.disabled = false;
            editButton.innerText = "Save";
        } else {
            taskInput.disabled = true;
            editButton.innerText = "Edit";
        }
    });
    newLi.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "deleteButton";
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        taskList.removeChild(newLi);
    });
    newLi.appendChild(deleteButton);

    // Append the task to the list
    taskList.appendChild(newLi);

    // Clear input
    inputTask.value = "";
}

// Schedule notification
function scheduleNotification(task, time) {
    const now = new Date();
    const timeDifference = time - now;

    if (timeDifference > 0) {
        setTimeout(() => {
            showNotification("Напоминание о задаче", `Пора выполнить: ${task}`);
        }, timeDifference);
    }
}

// Show notification
function showNotification(title, message) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: "https://via.placeholder.com/128" // Замените URL иконки на свой
        });
    } else {
        alert(`${title}: ${message}`);
    }
}

// Delete all tasks
clearAllButton.addEventListener("click", (e) => {
    e.preventDefault();
    taskList.innerHTML = "";
});
