/**
 * @jest-environment jsdom
 */

import {
  tasks, addTasks, createNewTask, editDescription, taskCompleteUpdate, clearTasks, repopulateList,
} from '../backEnd';
import { taskList, completed } from '../index1';

describe('It adds and deletes items from the list', () => {
  const task1 = {
    description: 'Car wash',
    complemented: false,
    index: 0,
  };
  const task2 = {
    description: 'Laundary',
    complemented: false,
    index: 1,
  };

  const taskDescription = 'Paint the house';

  const ul = document.createElement('ul');

  // test('it creates a list corresponding inputs', () => {
  //   createNewTask(taskDescription);

  //   expect(tasks[tasks.length - 1].description).toBe(taskDescription);

  //   ul.appendChild(taskList(tasks[tasks.length - 1]));

  //   expect(ul.innerHTML.includes(taskDescription)).toBe(true);
  // });

  // test('it adds and deletes an item from the To Do List in the DOM', () => {
  //   const addedTask1 = addTasks(task1.description, task1.completed, task1.index);
  //   const addedTask2 = addTasks(task2.description, task2.completed, task2.index);

  //   ul.innerHTML = '';
  //   const addTaskToDOM = (task) => {
  //     const listElement = document.createElement('li');

  //     listElement.classList.add('draggable');
  //     listElement.setAttribute('task', task.index);

  //     const input = document.createElement('input');
  //     input.classList.add('completed');
  //     input.setAttribute('checked', (task.completed ? 'true' : 'false'));

  //     const p = document.createElement('p');
  //     p.classList.add('description');
  //     p.textContent = task.description;

  //     listElement.appendChild(input);
  //     listElement.appendChild(p);
  //     ul.appendChild(listElement);
  //   };

  //   addTaskToDOM(addedTask1);
  //   addTaskToDOM(addedTask2);

  //   document.body.appendChild(ul);

  //   ul.removeChild(ul.childNodes[0]);

  //   repopulateList();

  //   expect(tasks.length).toBe(1);
  //   expect(tasks[0].description).toBe(addedTask2.description);
  // });

});

describe('It updates status and content', () => {

  test('It updates the task description', () => {
    localStorage.clear();
    const nextIndex = tasks[tasks.length];
    addTasks('initial description', false, nextIndex);

    editDescription(nextIndex, 'updated description');

    expect(tasks[tasks.length - 1].description).toBe('updated description');

    const storage = JSON.parse(localStorage.getItem('tasks'));
    expect(storage[storage.length - 1].description).toBe('updated description');
  });

  test('Updates the status of the list item', () => {
    localStorage.clear();
    const nextIndex = tasks[tasks.length - 1];
    addTasks('Pending task', false, nextIndex);

    taskCompleteUpdate(nextIndex, true);

    expect(tasks[tasks.length - 1].completed).toBe(true);

    const storage = JSON.parse(localStorage.getItem('tasks'));
    expect(storage[storage.length - 1].completed).toBe(true);
  });

  test('It updates the index according to order after re-position', () => {
    localStorage.clear();
    clearTasks();

    const task1 = {
      description: 'Car wash',
      complemented: false,
      index: 0,
    };
    const task2 = {
      description: 'Laundary',
      complemented: false,
      index: 1,
    };

    const listItems = document.createElement('ul');
    listItems.appendChild(taskList(task1));
    listItems.appendChild(taskList(task2));

    document.body.appendChild(listItems);

    repopulateList();

    expect(tasks[0].index).toBe('0');
    expect(tasks[1].index).toBe('1');

    const listElement1 = listItems.childNodes[0];
    const listElement2 = listItems.childNodes[1];

    const tempIndex = listElement1.getAttribute('task');
    listElement1.setAttribute('task', listElement2.getAttribute('task'));
    listElement2.setAttribute('task', tempIndex);

    repopulateList();

    const firstTask = tasks[0];
    const secondTask = tasks[1];

    expect(firstTask.index).toBe('0');
    expect(firstTask.description).toBe('Car wash');
    expect(secondTask.index).toBe('1');
    expect(secondTask.description).toBe('Laundary');

    const storage = JSON.parse(localStorage.getItem('tasks'));
    expect(storage[0].index).toBe('0');
    expect(storage[0].description).toBe('Car wash');
    expect(storage[1].index).toBe('1');
    expect(storage[1].description).toBe('Laundary');
  });
    
})