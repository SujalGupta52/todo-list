class todo {
    constructor(project, title, description, priority, isChecked) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.isChecked = false;
    }

}

const temp = new todo('test', 'test', 'high', true)

todo.prototype.toggleChecked = () => {
        this.isChecked = this.isChecked == true ? false : true;
}

    
