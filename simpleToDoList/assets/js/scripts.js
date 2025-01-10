import {LocalStorageRepository} from './LocalStorageRepository.js';
import {ToDoFactory} from './ToDoFactory.js';
import {ToDoCounter} from './ToDoCounter.js';

const repository = new LocalStorageRepository('todo-list');
const counter = new ToDoCounter('.todo-counter', '.completed-todo-counter', '.empty-todos-container');
const toDoFactory = new ToDoFactory('.todos-container', repository, counter);

const initializeApp = () => {
  const todos = repository.findAll();
  todos.forEach(todo => toDoFactory.createToDo(todo));
  counter.updateCounters(todos);

  const createToDoButton = document.querySelector('#create-todo');
  createToDoButton.addEventListener('click', event => {
    event.preventDefault();

    const input = document.querySelector('#todo-input');
    const text = input.value.trim();
    if (!text) return;

    if (repository.find(text)) {
      alert('To-Do already exists!');
      return;
    }

    const todo = { text, done: false };
    repository.save(text, todo);
    toDoFactory.createToDo(todo);
    counter.updateCounters(repository.findAll());

    input.value = '';
  });
};

initializeApp();
