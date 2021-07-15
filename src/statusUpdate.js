import { addTasksToStorage, tasks } from './backEnd';

const updateTask = (task, check) => {
  const taskInTasks = tasks.find((t) => t.description === task.description);

  taskInTasks.completed = check;

  task.completed = check;
  addTasksToStorage();
};

export default updateTask;