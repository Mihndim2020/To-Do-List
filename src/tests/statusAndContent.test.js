/**
 * @jest-environment jsdom
 */

import {
  tasks, addTasks, editDescription, taskCompleteUpdate, clearTasks, repopulateList,
} from '../backEnd';
import { taskList } from '../index1';
import { clearCompleted } from '../dragAndDrop';

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

  test('It clears all completed tasks', () => {
    clearTasks();
    localStorage.clear();
    document.body.innerHTML = '';
    const ul = document.createElement('ul');
    document.body.appendChild(ul);
    const clear = document.createElement('li');
    clear.id = 'clear';
    document.body.appendChild(ul);
    ul.appendChild(clear);

    const task1 = {
      description: 'Task 1',
      completed: true,
      index: 0,
    };
    const task2 = {
      description: 'Task 2',
      completed: false,
      index: 1,
    };

    ul.appendChild(taskList(task1));
    ul.appendChild(taskList(task2));

    repopulateList();
    const checkboxes = document.getElementsByClassName('completed');
    checkboxes[0].checked = true;

    clearCompleted(ul);

    [...checkboxes].forEach((checkbox) => expect(checkbox.checked).toBe(false));
    expect([...checkboxes].length).toBe(1);

    const storage = JSON.parse(localStorage.getItem('tasks'));
    storage.forEach((item) => expect(item.completed).toBe(false));
    expect(storage.length).toBe(1);
  });
});