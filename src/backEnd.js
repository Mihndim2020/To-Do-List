/* eslint-disable import/no-mutable-exports */

let tasks = [];

const loadTaskList = () => {
  let loadTasks = JSON.parse(locoalStorage.getItem('tasks'));
  if(loadTaskList == null) {
    loadTaskList = [];
  }
  tasks = loadTaskList;
  return tasks;
}

const clearTasks = () => {
  tasks = [];
};

const addTasks = (description, completed, index) => {
  tasks.push({ description, completed, index: parseInt(index, 10) });
};

const addTasksToStorage = () => {
  const jsonTasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', jsonTasks);
};

const taskCompleteUpdate = (index, check) => {
  const completeTask = tasks.find((t) => t.index === index);
  completeTasks.completed = check;
  addTasksToStorage();
}

const editDescription = (index, description) => {
  const taskToEdit = tasks.find((t) => t.index === index);
  taskToEdit.description = description;
  addTasksToStorage();

}

const createNewTask = (description) => {
  let index = 0;

  if (tasks.length > 0) {
    index = tasks[tasks.length - 1].index + 1;
  }

  addTasks(description, false, index);
  addTasksToStorage();
}

const repupulateList = () => {
  const draggables = document.querySelector('.draggable');

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
  repupulateList        
};

/* eslint-enable import/no-mutable-exports */
