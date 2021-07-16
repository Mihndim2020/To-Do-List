import _ from 'lodash';
import './style.css';
import { addTasksToStorage, tasks } from './backEnd';
import {
  dragstart, dragover, dragleave, drop, dragend,
} from './dragAndDrop';
import updateTask from './statusUpdate';

const toDolist = () => {
  const title = () => {
    const li = document.createElement('li');
    li.id = 'list-title';
    const h2 = document.createElement('h2');
    h2.textContent = 'Today\'s To Do';
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-sync-alt');
    i.id = 'refresh-icon';

    li.appendChild(h2);
    li.appendChild(i);

    return li;
  };

  const addTaskInput = () => {
    const li = document.createElement('li');
    li.id = 'new-tasks';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add to your list...';
    input.id = 'list-item';

    li.appendChild(input);

    return li;
  };

  const taskList = (task) => {
    const li = document.createElement('li');
    li.classList.add('draggable');
    li.setAttribute('task', task.index);
    li.draggable = true;

    const div = document.createElement('div');

    const input = document.createElement('input');
    input.classList.add('completed');
    input.type = 'checkbox';
    input.name = 'completed';
    input.addEventListener('click', () => updateTask(task, input.checked));

    const p = document.createElement('p');
    p.classList.add('description');
    p.textContent = task.description;

    div.appendChild(input);
    div.appendChild(p);

    li.appendChild(div);

    const i = document.createElement('i');
    i.classList.add('fas', 'fa-trash-alt');

    li.addEventListener('dragstart', () => dragstart(li));
    li.addEventListener('dragover', (e) => dragover(li, e));
    li.addEventListener('dragleave', () => dragleave(li));
    li.addEventListener('drop', () => {
      drop(li);
    });
    li.addEventListener('dragend', () => {
      dragend(li);
    });

    li.appendChild(i);

    return li;
  };

  const completed = () => {
    const li = document.createElement('li');

    li.textContent = 'Clear all completed';
    li.id = 'clear';

    return li;
  };

  const ul = document.querySelector('ul');

  ul.appendChild(title());
  ul.appendChild(addTaskInput());

  tasks.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  tasks.forEach((task) => ul.appendChild(taskList(task)));

  ul.appendChild(completed());

};

toDolist();
