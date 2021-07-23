/* eslint-disable import/no-mutable-exports */

let tasks = [];

const loadTaskList = () => {
  let loadTasks = JSON.parse(localStorage.getItem('tasks'));
  if (loadTasks == null) {
    loadTasks = [];
  }
  tasks = loadTasks;
  return tasks;
};

const clearTasks = () => {
  tasks = [];
};

const addTasks = (description, completed, index) => {
  const newObj = { description, completed, index };

  tasks.push(newObj);

  return tasks[tasks.length - 1];
};

const addTasksToStorage = () => {
  const jsonTasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', jsonTasks);
};

const taskCompleteUpdate = (index, check) => {
  const completeTasks = tasks.find((t) => t.index === index);
  completeTasks.completed = check;
  addTasksToStorage();
};

const editDescription = (index, description) => {
  const taskToEdit = tasks.find((t) => t.index === index);
  taskToEdit.description = description;
  addTasksToStorage();
};

const createNewTask = (description) => {
  let index = 0;

  if (tasks.length > 0) {
    index = tasks[tasks.length - 1].index + 1;
  }

  addTasks(description, false, index);
  addTasksToStorage();
};

const repopulateList = () => {
  const draggables = document.querySelectorAll('.draggable');

  let i = 0;
  draggables.forEach((draggable) => {
    draggable.setAttribute('task', i);
    i += 1;
  });

  clearTasks();

  draggables.forEach((draggable) => {
    const description = draggable.getElementsByClassName('description')[0].textContent;
    const completed = draggable.getElementsByClassName('completed')[0].checked;
    const index = draggable.getAttribute('task');

    addTasks(description, completed, index);
    addTasksToStorage();
  });
};

export {
  tasks,
  loadTaskList,
  clearTasks,
  taskCompleteUpdate,
  editDescription,
  addTasks,
  addTasksToStorage,
  createNewTask,
  repopulateList,
};

/* eslint-enable import/no-mutable-exports */
