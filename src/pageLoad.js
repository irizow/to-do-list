import { currentProject, CreateProject, projects, CreateTask, CreateNotes, notes, loadDefaultProjects } from "./CreateFunctions";

if(projects.length === 0) {
    loadDefaultProjects();}

export const mainTitle = document.getElementById("title");
const newNoteCard = document.getElementById("newnotecard");
const newProjectCard = document.getElementById("newprojectcard");
const newTaskCard = document.getElementById("newtaskcard");
const modal = document.getElementById("modal");
const mainContainer = document.getElementById("maincontainer");
const isEditing = false;

export const addTaskIcon = document.createElement("img");
addTaskIcon.src = 'images/plus-frame-svgrepo-com.svg'
addTaskIcon.id = "newtaskicon"

function saveData() {
    if(currentProject === "Notes") {
        localStorage.setItem("notes", JSON.stringify(notes));
    }
    else {
    localStorage.setItem("projects", JSON.stringify(projects));
    }
}

// show navbar

export function showNavBar() {
    document.querySelector(".navbar").classList.add("active");

}




// Show modals

export function showProjectModal() {
modal.style.display = "flex";
newProjectCard.style.display = "flex";
}

export function showTaskModal() {
    if(currentProject === projects[0]) {
        document.getElementById("dueDcontainer").style.display = "none";
    }
    else {
        document.getElementById("dueDcontainer").style.display = "block";
    }
    modal.style.display = "flex";
    newTaskCard.style.display = "flex";
    if(!isEditing) {
        document.getElementById("tasktitle").value = ""
        document.getElementById("taskdescription").value = ""
        document.getElementById("duedate").value = ""
        document.getElementById("duetime").value = ""
        document.getElementById("priority").value = ""

    }

}

export function showNotesModal() {
    modal.style.display = "flex";
    newNoteCard.style.display = "flex";
}

export function hideTaskModal() {
    modal.style.display = "none";
    newTaskCard.style.display = "none";
    if(isEditing) {
        isEditing = false;
        addNewTask();
    }
}

export function hideProjectModal(event) {
    modal.style.display = "none";
    newProjectCard.style.display = "none";
}

export function hideNotesModal() {
    modal.style.display = "none";
    newNoteCard.style.display = "none";
}


// Get data from forms

export const addNewProject = ()=>{
    const projectTitle = document.getElementById("projecttitle").value;
    const projectDescription = document.getElementById("projectdescription").value;
    const newProject = new CreateProject(projectTitle, projectDescription, false);
    projects.push(newProject);
    saveData();
    console.log("projectsArr1: " + projects);
    mainTitle.textContent = "Projects"
    currentProject = undefined;
    hideProjectModal();
    displayProjectCard();


} 

export const addNewTask = () => {
    if(isEditing) {
        isEditing = false;
    }
    const taskTitle = document.getElementById("tasktitle").value;
    const taskDescription = document.getElementById("taskdescription").value;
    const taskDueDate = document.getElementById("duedate").value;
    const taskDueTime = document.getElementById("duetime").value;
    const taskPriority = document.getElementById("priority").value;
    const belongs = currentProject.title
    const newTask = new CreateTask(taskTitle, taskDescription, taskDueDate, taskDueTime, taskPriority, false, belongs);
    currentProject.tasks.push(newTask);
    saveData();
    
    console.log(currentProject.title);
    hideTaskModal();
    displayTaskCard();
    

}

export const addNewNote = ()=> {
    const noteTitle = document.getElementById("notetitle").value;
    const noteDescription = document.getElementById("notedescription").value;
    const newNote = new CreateNotes(noteTitle, noteDescription);
    if(currentProject === "Notes") {
        notes.push(newNote);
        saveData();
        hideNotesModal();
        displayNotes();
    }
}


export function displayNotes() {
    mainContainer.innerHTML = "";
    mainContainer.style.display = "flex";
    mainContainer.style.flexDirection = "row";
    mainContainer.style.flexWrap = "wrap";
    console.log("displayin notes...")

    for(const i = 0; i < notes.length; i++) {
        console.log("disp notes loop")
        const noteCard = document.createElement("div");
        noteCard.classList.add("notecard");
        const noteTitle = document.createElement("h3");
        noteTitle.textContent = notes[i].title;
        const noteDescription = document.createElement("p");
        noteDescription.textContent = notes[i].description;
        const binIconProj = document.createElement("img");
        binIconProj.src = "images/bin-cancel-delete-remove-trash-garbage-svgrepo-com.svg";
        binIconProj.classList.add("icon");
        binIconProj.style.position = "absolute";
        binIconProj.style.bottom = "10px";
        binIconProj.style.right = "10px";
        mainContainer.appendChild(noteCard);
        noteCard.appendChild(noteTitle);
        noteCard.appendChild(noteDescription);
        noteCard.appendChild(binIconProj);

        binIconProj.addEventListener("click", ()=> {
            notes.splice(i, 1);
            saveData();
            displayNotes();})
    
    }


}

export function displayProjectCard() {
    
    console.log("projectsArr: " + projects)
    mainContainer.style.display = "grid";
    mainContainer.style.gridColumn = "1fr 1fr 1fr 1fr";
    mainContainer.style.gridTemplateRows = "repeat(auto-fit, minmax(200px, 1fr))" 
    mainContainer.innerHTML = "";
    currentProject = undefined;

    for (const i = 2; i < projects.length; i++) {
        projects[i].id = i;
        const projectId = projects[i].id;
        console.log("project id:" + projectId);
        const projectCards = document.createElement("div");
        projectCards.classList.add("projectcard");
        const projectTitle = document.createElement("h3");
        projectTitle.textContent = projects[i].title;
        const projectDescription = document.createElement("p");
        const projectTasksNumber = document.createElement("p");
        const dueTasks = 0;
        for (const j = 0; j < projects[i].tasks.length; j++) {
            if(!projects[i].tasks[j].checked) {
            dueTasks++;}
        }
        projectTasksNumber.textContent = "Due tasks: " + dueTasks;
        projectDescription.textContent = projects[i].description;
        const binIconProj = document.createElement("img");
        binIconProj.style.position = "absolute";
        binIconProj.style.bottom = "55px";
        binIconProj.style.right = "10px"
        binIconProj.src = "images/bin-cancel-delete-remove-trash-garbage-svgrepo-com.svg";
        binIconProj.classList.add("icon");
        projectCards.appendChild(projectTitle);
        projectCards.appendChild(projectDescription);
        projectCards.appendChild(projectTasksNumber);
        projectCards.appendChild(binIconProj);
        mainContainer.appendChild(projectCards);
        

        projectCards.addEventListener("click", (e) => {
            const mainContainer = document.getElementById("maincontainer");
            mainContainer.innerHTML = "";
            const projectTitle = document.getElementById("title");
            projectTitle.textContent = projects[projectId].title;
            projectTitle.appendChild(addTaskIcon);
            currentProject = projects[projectId];
            console.log(currentProject);
            displayTaskCard();

        })

        binIconProj.addEventListener("click", (event)=> {
            event.stopPropagation();
            if(window.confirm("Are you sure you want to delete this project? You will lose all your tasks")){
            projects.splice(i, 1);
            displayProjectCard();
            saveData();}}
        )
    
}}

export function displayTaskCard() {
    if (currentProject !== undefined && currentProject !== "Notes") {
    mainContainer.style.display = "flex";
    mainContainer.innerHTML = "";
    console.log("current proj" + currentProject + currentProject.title)
        for (const i = 0; i < currentProject.tasks.length; i++) {
            const currentTask = currentProject.tasks[i];
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("tasks");
            switch (currentProject.tasks[i].priority) {
                case "low":
                    taskDiv.style.backgroundColor = "rgba(178, 255, 165, 0.831)";
                    break; 
                
                case "medium": 
                    taskDiv.style.backgroundColor = "rgba(255, 207, 103, 0.831)";
                    break;

                case "high":
                    taskDiv.style.backgroundColor = "rgba(255, 165, 165, 0.872)";
                    break;

            }

            const taskTitle = document.createElement("div");
            taskTitle.classList.add("tasktitle");
            const taskSpan = document.createElement("span");
            const checkedIcon = document.createElement("img");
            checkedIcon.src = "images/square-regular.svg";
            checkedIcon.classList.add("icon");
            const viewIcon = document.createElement("img");
            viewIcon.src = "images/eye-regular.svg";
            viewIcon.classList.add("icon");
            taskSpan.textContent = currentProject.tasks[i].title;
            const iconsDiv = document.createElement("div");
            iconsDiv.classList.add("taskicons");
            const dueDatePrint = document.createElement("span");
            dueDatePrint.textContent = "due: " + currentProject.tasks[i].dueDate + " " + currentProject.tasks[i].dueTime;
            const editIcon = document.createElement("img");
            editIcon.src = "images/edit-svgrepo-com.svg";
            editIcon.classList.add("icon");
            const binIcon = document.createElement("img");
            binIcon.src = "images/bin-cancel-delete-remove-trash-garbage-svgrepo-com.svg";
            binIcon.classList.add("icon");
            mainContainer.appendChild(taskDiv);
            taskDiv.appendChild(taskTitle);
            taskTitle.appendChild(checkedIcon);
            taskTitle.appendChild(taskSpan);
            taskDiv.appendChild(iconsDiv);
            if(currentProject.tasks[i].dueDate || currentProject.tasks[i].dueTime) {
            iconsDiv.appendChild(dueDatePrint);}
            iconsDiv.appendChild(viewIcon);
            iconsDiv.appendChild(editIcon);
            iconsDiv.appendChild(binIcon);
            

            if(currentProject.tasks[i].checked === true) {
                taskSpan.style.textDecoration = "line-through";
                checkedIcon.src = "images/square-check-regular.svg";
                checkedIcon.style.filter = "invert(100%) sepia(0%) saturate(1%) hue-rotate(298deg) brightness(108%) contrast(101%)";
                binIcon.style.filter = "invert(100%) sepia(0%) saturate(1%) hue-rotate(298deg) brightness(108%) contrast(101%)";
                editIcon.style.filter = "invert(100%) sepia(0%) saturate(1%) hue-rotate(298deg) brightness(108%) contrast(101%)";
                currentProject.tasks[i].isActive = false;
                taskDiv.style.backgroundColor = "black";
                taskDiv.style.color = "white";
  
            }

            viewIcon.addEventListener("click", ()=> {
                const modal = document.getElementById("modal");
                modal.style.display = "flex";
                const taskDescriptionDiv = document.createElement("div");
                taskDescriptionDiv.classList.add("taskdescriptiondiv");
                if(currentProject.tasks[i].description) {
                taskDescriptionDiv.textContent = currentProject.tasks[i].description;}
                else {
                    taskDescriptionDiv.textContent = "You don't have a description yet"
                }
                modal.appendChild(taskDescriptionDiv);
                modal.addEventListener("click", ()=> {
                    modal.removeChild(taskDescriptionDiv);
                    modal.style.display = "none";
                })
            })
            
            binIcon.addEventListener("click", ()=>{
                currentProject.tasks.splice(i, 1);
                displayTaskCard();
                saveData();
            })

            editIcon.addEventListener("click", () => {
                isEditing = true;
                document.getElementById("tasktitle").value = currentProject.tasks[i].title;
                document.getElementById("taskdescription").value = currentProject.tasks[i].description;
                document.getElementById("duedate").value = currentProject.tasks[i].dueDate;
                document.getElementById("duetime").value = currentProject.tasks[i].dueTime;
                document.getElementById("priority").value = currentProject.tasks[i].priority;
                currentProject.tasks.splice(i, 1);
                showTaskModal();
                //displayTaskCard;
            })

            checkedIcon.addEventListener("click", ()=> {
                if(currentProject.tasks[i].checked === false) {
                currentProject.tasks[i].checked = true;
            }
                else {
                currentProject.tasks[i].checked = false;

                }
                saveData();
                displayTaskCard();
            })
            
        }
    }
}






//Add eventlisteners




