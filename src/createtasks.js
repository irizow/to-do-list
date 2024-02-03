let tasks = [];

function CreateTask(title, description, dueDate, priority = "low", checked = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = checked;
        
}