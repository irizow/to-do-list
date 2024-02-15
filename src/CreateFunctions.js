
export let projects = JSON.parse(localStorage.getItem("projects")) || [];
export let tasks = []
export let notes =  JSON.parse(localStorage.getItem("notes")) || [];
export let currentProject = projects[0];

export function CreateProject(title, description, isActive = false) {
    this.title = title;
    this.description = description;
    this.isActive = isActive;
    this.tasks = [];
    return this;
        
}

export function loadDefaultProjects() {
let today = new CreateProject("Today", "Tasks for the day", true);
let week = new CreateProject("Week", "Tasks for the week", false);
projects.push(today);
projects.push(week);
currentProject = projects[0]; }

export function CreateTask(title, description, dueDate, dueTime, priority = "low", checked = false, belongs) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.dueTime = dueTime;
    this.priority = priority;
    this.checked = checked;
    this.belongs = belongs;
        
}

export function CreateNotes (title, description) {
    this.title = title;
    this.description = description;
    this.id = notes.length;
}
