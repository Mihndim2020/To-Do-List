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

export {
  tasks, clearTasks, addTasks, addTasksToStorage,
};

/* eslint-enable import/no-mutable-exports */
