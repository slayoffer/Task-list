// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);

  // Filter tasks events
  filter.addEventListener('keyup', filterTasks);
}

// Store Task
function storeTaskInLocalStorage(task) {
  tasks.push(task);

  // localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasks() {
  tasks.forEach((task) => {
    // Create li element for task
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to the Li
    li.textContent = task;
    // Create new link element
    const link = document.createElement('a');
    // Add class to link
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.insertAdjacentElement('afterbegin', link);

    // Append li to the ul
    taskList.insertAdjacentElement('afterbegin', li);
  });
}

// Add task function
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please enter a task name');
  }

  // Create li element for task
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to the Li
  li.textContent = taskInput.value;
  // Create new link element
  const link = document.createElement('a');
  // Add class to link
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to the li
  li.insertAdjacentElement('afterbegin', link);

  // Append li to the ul
  taskList.insertAdjacentElement('afterbegin', li);

  // Store in Localstorage
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = '';

  e.preventDefault();
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete this item?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from Localstorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster solution
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.textContent;
    console.log(item);
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
