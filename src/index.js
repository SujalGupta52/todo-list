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

  static appendNote(title, priority, isChecked) {
    const content = document.querySelector(".content");
    const todo = document.createElement("div");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");

    text.textContent = title;

    checkbox.type = "checkbox";

    todo.classList.toggle("item");
    todo.style.borderLeftColor = "yellow";

    todo.appendChild(checkbox);
    todo.appendChild(text);

    content.appendChild(todo);
  }

  static appendProject(name, color, isActive) {
    const project = document.createElement('li');
    const text = document.createElement('span');
    const colorBox = document.createElement('div');
    const projectList = document.querySelector('.project-list');

    if(isActive) project.classList.toggle('active');
    colorBox.classList.toggle('color');
    text.classList.toggle('text');
    text.textContent = name;
    colorBox.style.backgroundColor = color;
    
    project.appendChild(colorBox);
    project.appendChild(text);
    projectList.appendChild(project);
  }
}


