let tasks = [
  { description: 'Laundary', completed: true, index: 1 },
  { description: 'Car wash', completed: false, index: 2 },
  { description: 'Swimming', completed: false, index: 3 },
];

const clearTasks = () => {
  tasks = [];
};

const addTasks = (description, completed, index) => {
  tasks.push({ description, completed, index: parseInt(index, 10) });
};

const addTasksToStorage = () => {
  let jsonTasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', jsonTasks);
};


export {
  tasks, clearTasks, addTasks, addTasksToStorage
};
