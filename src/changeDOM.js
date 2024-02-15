import { mainTitle, showProjectModal, showTaskModal, hideTaskModal, hideProjectModal, addNewProject, addNewTask, displayProjectCard, addTaskIcon, displayTaskCard, showNotesModal, addNewNote, hideNotesModal, displayNotes } from "./pageLoad";
import { projects, currentProject } from "./CreateFunctions";




export function loadEventListeners() {
    
    mainTitle.appendChild(addTaskIcon);
    let xMarkProj = document.getElementById("xmarkproj");
    let xMarkTask = document.getElementById("xmarktask");
    let xMarkNote = document.getElementById("xmarknote");
    let navButtons = document.querySelectorAll(".navlink");
    let addProject = document.getElementById("addproject");
    let addTask = document.getElementById("addtask");
    let addNote = document.getElementById("addnote");
    let newProject = document.getElementById("newproject");
    let newTask = document.getElementById("newtaskicon");
    let projectsLink = document.getElementById("projectslink")

    addProject.addEventListener("click", addNewProject);
    addTask.addEventListener("click", addNewTask);
    addNote.addEventListener("click", addNewNote);
    newProject.addEventListener("click", showProjectModal);
    addTaskIcon.addEventListener("click", () => {
        if(currentProject === "Notes") {
            showNotesModal();
        }
        else {
            showTaskModal();
        }
    });
    navButtons.forEach(function(navButton) {
        navButton.addEventListener("click", (e) => {
            mainTitle.textContent = e.target.textContent;
            if(e.target.textContent === "Today") {
                currentProject = projects[0];
                mainTitle.appendChild(addTaskIcon);
            }
            else if (e.target.textContent === "Week") {
                currentProject = projects[1];
                mainTitle.appendChild(addTaskIcon);
            }
            else if (e.target.textContent === "Projects") {
                currentProject === undefined;
            }
            else if (e.target.textContent === "Notes") {
                currentProject = "Notes";
                mainTitle.appendChild(addTaskIcon);
                displayNotes();
            }
          
            
            displayTaskCard()
    
        })})

    projectsLink.addEventListener("click",displayProjectCard);
    xMarkProj.addEventListener("click", hideProjectModal);
    xMarkTask.addEventListener("click", hideTaskModal);
    xMarkNote.addEventListener("click", hideNotesModal);

    }
        
    

    
        
   




    
