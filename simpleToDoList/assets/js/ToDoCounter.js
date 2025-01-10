export class ToDoCounter {
    constructor(todoContainerSelector, completedCounterSelector, emptyContainerSelector) {
      this.todoContainer = document.querySelector(todoContainerSelector);
      this.completedCounter = document.querySelector(completedCounterSelector);
      this.emptyContainer = document.querySelector(emptyContainerSelector);
    }
  
    updateCounters(todos) {
      const total = todos.length;
      const completed = todos.filter(todo => todo.done).length;
  
      this.todoContainer.textContent = total;
      this.completedCounter.textContent = completed;
  
      if (total === 0) {
        this.emptyContainer.classList.remove('dp-none');
      } else {
        this.emptyContainer.classList.add('dp-none');
      }
    }
  }