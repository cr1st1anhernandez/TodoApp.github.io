import Alert from './alert.js';

export default class Modal {
  constructor() {
    this.modalCard = document.getElementById('modal');
    this.overlay = document.getElementById('overlay');
    this.title = document.getElementById('modal-title');
    this.description = document.getElementById('modal-description');
    this.btn = document.getElementById('modal-save');
    this.completed = document.getElementById('modal-completed');
    this.alert = new Alert('modal-alert');
    this.close = document.getElementById('close');
    this.todo = null;
  }

  setValues(todo) {
    this.todo = todo;
    this.title.value = todo.title;
    this.description.value = todo.description;
    this.completed.checked = todo.completed;
    this.modalCard.style.display = "inline-block";
    this.overlay.style.display = "block";
  }

  onClick(callback) {
    this.close.onclick = () => {
      this.modalCard.style.display = "none";
      this.overlay.style.display = "none";
    }
    this.btn.onclick = () => {
      if (!this.title.value || !this.description.value) {
        this.alert.show('Title and description are required');
        return;
      }
      
      this.overlay.style.display = "none";
      this.modalCard.style.display = "none";

      callback(this.todo.id, {
        title: this.title.value,
        description: this.description.value,
        completed: this.completed.checked,
      });
    }
  }


}
