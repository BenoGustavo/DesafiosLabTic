export class ToDoFactory {
  constructor(containerSelector, repository, counter) {
    this.container = document.querySelector(containerSelector);
    this.repository = repository;
    this.counter = counter;
  }

  createToDo(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoContentDiv = document.createElement('div');
    todoContentDiv.classList.add('todo-content');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = todo.done;

    const todoText = document.createElement('p');
    todoText.classList.add('todo-text');
    todoText.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-todo');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = './assets/img/trash.svg';
    deleteIcon.alt = 'Delete Icon';
    deleteButton.appendChild(deleteIcon);

    todoContentDiv.appendChild(checkbox);
    todoContentDiv.appendChild(todoText);
    todoDiv.appendChild(todoContentDiv);
    todoDiv.appendChild(deleteButton);

    this.container.appendChild(todoDiv);

    this._bindCheckboxEvent(checkbox, todo);
    this._setDeleteButtonListener(deleteButton, todoDiv, todo);
  }

  _bindCheckboxEvent(checkbox, todo) {
    checkbox.addEventListener('change', () => {
      todo.done = checkbox.checked;
      this.repository.save(todo.text, todo);
      this.counter.updateCounters(this.repository.findAll());
    });
  }

  _setDeleteButtonListener(deleteButton, todoDiv, todo) {
    deleteButton.addEventListener("click", () => {
      document.querySelector("#modal").classList.remove("dp-none");

      document.querySelector(".cancel-deletion").addEventListener("click", (event) => {
          document.querySelector("#modal").classList.add("dp-none");
      });
        
        document.querySelector(".confirm-deletion").addEventListener("click", (event) => {
            document.querySelector("#modal").classList.add("dp-none");
            this.repository.delete(todo.text);
            
            todoDiv.classList.add('remove-animation');
            // Esperando animação de remoção
            setTimeout(() => todoDiv.remove(), 300);

            this.counter.updateCounters(this.repository.findAll());
        });
    });
  }
}