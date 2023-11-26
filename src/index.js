let projects = [];

class DOMController {
  static toggleProjectListInput() {
    const projectInput = document.createElement("input");

    projectInput.type = "text";
    projectInput.classList.toggle("new-project");
    projectInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        DOMController.appendProject(
          event.target.value,
          "blue",
          false,
          projects.length
        );
        projects.push(
          LogicController.createProject(
            event.target.value,
            "blue",
            false,
            projects.length
          )
        );
        DOMController.toggleProjectListInput();
        LogicController.updateStorage();
      }
    });
    if (document.querySelector(".new-project") != null) {
      document
        .querySelector(".project-list")
        .removeChild(document.querySelector(".new-project"));
    } else {
      document.querySelector(".project-list").appendChild(projectInput);
    }
  }

  static toggleNewNoteDialog() {
    const dialog = document.querySelector(".new-note");
    console.log(dialog.style.visibility);
    dialog.style.visibility =
      dialog.style.visibility != "visible" ? "visible" : "hidden";
  }

  static appendNote(title, priority, isChecked, id) {
    const content = document.querySelector(".content");
    const todo = document.createElement("div");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");

    text.textContent = title;

    checkbox.type = "checkbox";
    if (isChecked) {
      checkbox.checked = true;
      text.innerHTML = `<s>${text.textContent}<\s>`;
    }
    checkbox.addEventListener("change", (event) => {
      const noteText = event.target.nextSibling;
      const id = event.currentTarget.parentNode.dataset.id;
      if (event.target.checked != true)
        noteText.innerHTML = `${noteText.textContent}`;
      else noteText.innerHTML = `<s>${noteText.textContent}<\s>`;
      console.log(id);
      console.log(
        projects[LogicController.getActiveProjectID()].notes[id].isChecked
      );
      projects[LogicController.getActiveProjectID()].notes[id].isChecked =
        projects[LogicController.getActiveProjectID()].notes[id].isChecked ===
        true
          ? false
          : true;
      LogicController.updateStorage();
    });

    let priorityColor = "";
    switch (priority) {
      case 0:
        priorityColor = "green";
        break;
      case 1:
        priorityColor = "blue";
        break;
      case 2:
        priorityColor = "red";
        break;
    }

    todo.style.borderLeftColor = priorityColor;

    todo.classList.toggle("item");
    todo.dataset.id = id;

    todo.appendChild(checkbox);
    todo.appendChild(text);

    content.appendChild(todo);
  }

  static appendProject(name, color, isActive, id) {
    const project = document.createElement("li");
    const text = document.createElement("span");
    const colorBox = document.createElement("div");
    const projectList = document.querySelector(".project-list");

    if (isActive) project.classList.toggle("active");
    colorBox.classList.toggle("color");
    text.classList.toggle("text");
    text.textContent = name;
    colorBox.style.backgroundColor = color;
    project.dataset.id = id;

    project.appendChild(colorBox);
    project.appendChild(text);

    project.addEventListener("click", (e) => {
      DOMController.toggleActive(e.currentTarget);
    });

    projectList.appendChild(project);
  }

  static toggleActive(target) {
    const currentActive = document.querySelector(".active");
    currentActive.classList.toggle("active");
    projects[currentActive.dataset.id].isActive = false;

    const newActive = document.querySelector(
      `[data-id~="${target.dataset.id}"]`
    );

    projects[target.dataset.id].isActive = true;
    newActive.classList.toggle("active");
    DOMController.loadProject(target.dataset.id);
    LogicController.updateStorage();
  }

  static loadProject(id) {
    const project = projects[id];

    DOMController.clearNotes();
    project.notes.forEach((note) => {
      DOMController.appendNote(
        note.title,
        note.priority,
        note.isChecked,
        note.id
      );
    });
  }

  static clearNotes() {
    const notes = document.querySelectorAll(".item");
    notes.forEach((note) => note.remove());
  }

  static updateEventHandlers() {
    const addProjectButton = document.querySelector(".sidebar .heading button");
    const addNoteButton = document.querySelector(".content .heading button");
    const projectsElement = document.querySelectorAll(".project-list li");
    const checkboxes = document.querySelectorAll(".content .item input");
    const newNoteButton = document.querySelector(".new-note button");

    addProjectButton.addEventListener(
      "click",
      DOMController.toggleProjectListInput
    );

    addNoteButton.addEventListener("click", DOMController.toggleNewNoteDialog);
    projectsElement.forEach((project) =>
      project.addEventListener("click", (e) =>
        DOMController.toggleActive(e.currentTarget)
      )
    );

    checkboxes.forEach((checkbox) =>
      checkbox.addEventListener("change", (event) => {
        const noteText = event.target.nextSibling;
        const id = event.currentTarget.parentNode.dataset.id;
        if (event.target.checked != true)
          noteText.innerHTML = `${noteText.textContent}`;
        else noteText.innerHTML = `<s>${noteText.textContent}<\s>`;
        console.log(id);
        console.log(
          projects[LogicController.getActiveProjectID()].notes[id].isChecked
        );
        projects[LogicController.getActiveProjectID()].notes[id].isChecked =
          projects[LogicController.getActiveProjectID()].notes[id].isChecked ===
          true
            ? false
            : true;
        LogicController.updateStorage();
      })
    );

    newNoteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const title = document.querySelector("#title").value;
      const priority = +document.querySelector("#priority").value;
      const projectID = LogicController.getActiveProjectID();
      const noteID = projects[projectID].notes.length;

      if (title == "") alert("Title is empty!");
      else {
        const note = LogicController.createNote(title, priority, false, noteID);
        DOMController.appendNote(title, priority, false, noteID);
        projects[projectID].notes.push(note);
        LogicController.updateStorage();
        DOMController.toggleNewNoteDialog();
      }
    });
  }
}

class LogicController {
  static createNote(title, priority, isChecked, id) {
    return { title, priority, isChecked, id };
  }

  static createProject(name, color, isActive, id) {
    let notes = [];
    return { name, color, isActive, id, notes };
  }

  static updateStorage() {
    localStorage.todo = JSON.stringify(projects);
  }
  static getActiveProjectID() {
    const active = document.querySelector(".active");
    return active.dataset.id;
  }
}

function initialise() {
  if (localStorage.length == 0) {
    let project = LogicController.createProject("Default", "red", true, 0);
    project.notes.push(
      LogicController.createNote("This is an example note", 0, true, 0)
    );
    projects.push(project);
    localStorage.todo = JSON.stringify(projects);
  }
  DOMController.clearNotes();
  projects = JSON.parse(localStorage.todo);
  projects.forEach((project) => {
    DOMController.appendProject(
      project.name,
      project.color,
      project.isActive,
      project.id
    );
    if (project.isActive === true) {
      project.notes.forEach((note) => {
        DOMController.appendNote(
          note.title,
          note.priority,
          note.isChecked,
          note.id
        );
      });
    }
  });
  DOMController.updateEventHandlers();
}

initialise();
