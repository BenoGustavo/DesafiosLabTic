import {LocalStorageRepository} from './LocalStorageRepository.js';
import {ToDoFactory} from './ToDoFactory.js';
import {ToDoCounter} from './ToDoCounter.js';

const repository = new LocalStorageRepository('todo-list');
const counter = new ToDoCounter('.todo-counter', '.completed-todo-counter', '.empty-todos-container');
const toDoFactory = new ToDoFactory('.todos-container', repository, counter);

const ErrorMessage = (message) => {
  const errorMessage = document.querySelector(".error-message");

  errorMessage.innerHTML = "<p>" + message + "</p>";
  errorMessage.classList.add("slide-in");
  errorMessage.style.display = "flex";
};

const hideErrorMessage = () => {
  const errorMessage = document.querySelector(".error-message");
  errorMessage.classList.remove("slide-in");
  errorMessage.classList.add("slide-out");

  errorMessage.addEventListener("animationend", () => {
    if (errorMessage.classList.contains("slide-out")){
        errorMessage.style.display = "none";
        errorMessage.classList.remove("slide-out");
      }
      return;
  });
};

const initializeApp = () => {
  const todos = repository.findAll();
  todos.forEach(todo => toDoFactory.createToDo(todo));
  counter.updateCounters(todos);

  const createToDoButton = document.querySelector('#create-todo');

  createToDoButton.addEventListener('click', event => {
    event.preventDefault();

    const input = document.querySelector('#todo-input');

    input.addEventListener('click', hideErrorMessage);

    const text = input.value.trim();
    if (!text) {
      ErrorMessage('Insira um titulo para a sua tarefa!');
      return;
    };

    if (repository.find(text)) {
      ErrorMessage('Tarefa já existe!');
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
