// js/app.js

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Mostrar tareas guardadas al cargar
tasks.forEach(task => renderTask(task));

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    const task = { text: taskText, done: false };
    tasks.push(task);
    saveTasks();
    renderTask(task);
    input.value = '';
  }
});

function renderTask(task) {
  const li = document.createElement('li');
  if (task.done) li.classList.add('done');

  const span = document.createElement('span');
  span.textContent = task.text;
  span.addEventListener('click', () => {
    task.done = !task.done;
    li.classList.toggle('done');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    list.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const themeBtn = document.getElementById('toggle-theme');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Guarda la preferencia en localStorage
  const darkModeOn = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', darkModeOn);
});

// Al cargar la página, aplica la preferencia si está guardada
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}
