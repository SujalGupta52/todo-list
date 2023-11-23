class DOMController {
  static toggleProjectListInput() {
    const projectInput = document.createElement("input");

    projectInput.type = "text";
    projectInput.classList.toggle("new-project");

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

    let priorityColor = "";
    switch (priority) {
      case 0:
        priorityColor = "green";
        break;
      case 1:
        priorityColor = "blue";
      case 2:
        priorityColor = "red";
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
    projectList.appendChild(project);
  }

  static expandNote(id) {}
}

function createNote(title, priority, isChecked, id) {
  return { title, priority, isChecked, id };
}

function createProject(name, color, isActive, id) {
  let notes = [];
  return { name, color, isActive, id, notes };
}

function initialise() {
  let projects = [];
  if (localStorage.length == 0) {
    let project = createProject("Default", "red", true, 0);
    project.notes.push(createNote("This is an example note", 0, true, 0));
    projects.push(project);
    project.isActive = false;
    projects.push(project);
    localStorage.todo = JSON.stringify(projects);
  }
  projects = JSON.parse(localStorage.todo);
  projects.forEach((project) => {
    DOMController.appendProject(
      project.name,
      project.color,
      project.isActive,
      project.id
    );
    project.notes.forEach((note) => {
      DOMController.appendNote(
        note.title,
        note.priority,
        note.isChecked,
        note.id
      );
    });
  });
}

initialise();
