// import './style.css';
import {
  loadTaskList, tasks, taskCompleteUpdate, editDescription, repopulateList,
} from './backEnd';
import {
  dragstart, dragover, dragleave, drop, dragend,
} from './dragAndDrop';

const taskList = (task) => {
  const li = document.createElement('li');
  li.classList.add('draggable');
  li.setAttribute('task', task.index);
  li.draggable = true;

  const ul = document.getElementsByTagName('ul');

  const div = document.createElement('div');

  const input = document.createElement('input');
  input.classList.add('completed');
  input.type = 'checkbox';
  input.name = 'completed';
  input.addEventListener('click', () => taskCompleteUpdate(parseInt(li.getAttribute('task'), 10), input.checked));

  const p = document.createElement('p');
  p.classList.add('description');
  p.contentEditable = 'true';
  p.textContent = task.description;
  p.addEventListener('input', () => editDescription(parseInt(li.getAttribute('task'), 10), p.textContent));

  div.appendChild(input);
  div.appendChild(p);

  li.appendChild(div);

  const i = document.createElement('i');
  i.classList.add('fas', 'fa-trash-alt');
  i.addEventListener('click', () => {
    ul.removeChild(li);
    localStorage.clear();

    repopulateList();
  });

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

const toDolist = () => {
  const ul = document.querySelector('ul');

  tasks.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  tasks.forEach((task) => ul.appendChild(taskList(task)));
};

toDolist(loadTaskList());

export { toDolist, taskList };
