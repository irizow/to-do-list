import { mainTitle, showProjectModal, showTaskModal, hideTaskModal, hideProjectModal, addNewProject, addNewTask, displayProjectCard, addTaskIcon, displayTaskCard, showNotesModal, addNewNote, hideNotesModal, displayNotes, showNavBar, hideNavBar } from "./pageLoad";
import { projects, currentProject } from "./CreateFunctions";




export function loadEventListeners() {
    
    mainTitle.appendChild(addTaskIcon);
    const content = document.getElementById('content');
    const hamburgerIcon = document.getElementById("hamburgericon")
    const xMarkProj = document.getElementById("xmarkproj");
    const xMarkTask = document.getElementById("xmarktask");
    const xMarkNote = document.getElementById("xmarknote");
    const navButtons = document.querySelectorAll(".navlink");
    const addProject = document.getElementById("addproject");
    const addTask = document.getElementById("addtask");
    const addNote = document.getElementById("addnote");
    const newProject = document.getElementById("newproject");
    const projectsLink = document.getElementById("projectslink")

    content.addEventListener('click', hideNavBar);
    hamburgerIcon.addEventListener("click", showNavBar);
    addProject.addEventListener("click", addNewProject);
    addTask.addEventListener("click", addNewTask);
    addNote.addEventListener("click", addNewNote);
    newProject.addEventListener("click", showProjectModal);
    addTaskIcon.addEventListener("click", () => {
        if(currentProject === "Notes") {
            showNotesModal();
        }
        else {
        document.getElementById("tasktitle").value = ""
        document.getElementById("taskdescription").value =""
        document.getElementById("duedate").value = ""
        document.getElementById("duetime").value = ""
        document.getElementById("priority").value = ""
            showTaskModal();
        }
    });
    navButtons.forEach(function(navButton) {
        navButton.addEventListener("click", (e) => {
            mainTitle.textContent = e.target.textContent;
            document.querySelector(".navbar").classList.remove("active");
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
        
    

    
        
   




    
