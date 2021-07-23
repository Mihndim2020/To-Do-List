/**
 * @jest-environment jsdom
 */

import {tasks, addTasks, createNewTask, repopulateList } from './backEnd';
import { taskList } from './index.js';

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

  const taskDescription = 'Pain the house';

  const ul = document.createElement('ul');

  test('it creates a list corresponding inputs', () => {

    createNewTask(taskDescription);

    expect(tasks[tasks.length - 1].description).toBe(taskDescription);

    ul.appendChild(taskList(tasks[tasks.length - 1]));

    expect(ul.innerHTML.includes(taskDescription)).toBe(true);
  });

  test('it adds and deletes an item from the To Do List', () => {
    const addedTask1 = addTasks(task1.description, task1.completed, task1.index);
    const addedTask2 = addTasks(task2.description, task2.completed, task2.index);


    ul.innerHTML = '';
    const addTaskToDOM = (task) => {
    
      const listElement = document.createElement('li');

      listElement.classList.add('draggable');
      listElement.setAttribute('task', task.index);

      const input = document.createElement('input');
      input.classList.add('completed');
      input.setAttribute('checked', (task.completed ? 'true' : 'false'));

      const p = document.createElement('p');
      p.classList.add('description');
      p.textContent = task.description;

      listElement.appendChild(input);
      listElement.appendChild(p);
      ul.appendChild(listElement);
    };

    addTaskToDOM(addedTask1);
    addTaskToDOM(addedTask2);

    document.body.appendChild(ul);

    ul.removeChild(ul.childNodes[0]);

    repopulateList();

    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe(addedTask2.description);
  });

});