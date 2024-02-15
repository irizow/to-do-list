import { displayNotes, displayProjectCard } from "./pageLoad";
import { loadEventListeners } from "./changeDOM";
import { displayTaskCard, mainTitle } from "./pageLoad";
import { projects, currentProject } from "./CreateFunctions";


if (projects.length >= 2 && mainTitle === "Projects" ) {
    displayProjectCard()
}
currentProject = projects[0];

loadEventListeners();
displayTaskCard();










