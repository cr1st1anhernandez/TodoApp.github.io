import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById('table');
    this.addTodoForm = new AddTodo();
    this.modal = new Modal();
    this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
    this.modal.onClick((id, values) => this.editTodo(id, values));
  }


  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  addTodo(title, description) {
    const todo = this.model.addTodo(title, description);
    this.createRow(todo);
  }

  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  editTodo(id, values) {
    this.model.editTodo(id, values);
    const row = document.getElementById(id);
    row.children[0].innerText = values.title;
    row.children[1].innerText = values.description;
    row.children[2].children[0].checked = values.completed;
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

  createRow(todo) {
    const row = table.insertRow();
    row.setAttribute('id', todo.id);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="checkbox"></td>
      <td class="icons"></td>
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.toggleCompleted(todo.id);
    row.children[2].appendChild(checkbox);

    const editBtn = document.createElement('button');
    editBtn.classList.add('table__edit');
    editBtn.innerHTML = '<img src="assets/images/lapiz.svg" alt="" class="table__edit-image">';
    editBtn.onclick = () => this.modal.setValues({
      id: todo.id,
      title: row.children[0].innerText,
      description: row.children[1].innerText,
      completed: row.children[2].children[0].checked,
    });
    row.children[3].appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('table__delete');
    removeBtn.innerHTML = '<img src="assets/images/papelera.svg" alt="" class="table__delete-image">';
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[3].appendChild(removeBtn);
  }
}
