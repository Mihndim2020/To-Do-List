// import './style.css';
import {
  loadTaskList, tasks, taskCompleteUpdate, createNewTask, editDescription, repopulateList,
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
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        createNewTask(input.value);
        ul.appendChild(taskList(tasks[tasks.length - 1]));

        const clear = document.getElementById('clear');
        ul.appendChild(clear);

        input.value = '';
      }
    });

    li.appendChild(input);

    return li;
  };

  const completed = () => {
    const li = document.createElement('li');

    li.textContent = 'Clear all completed';
    li.id = 'clear';
    li.addEventListener('click', () => {
      const draggables = [...document.querySelectorAll('.draggable')];

      const incompleteTasks = draggables.filter((draggable) => draggable.getElementsByClassName('completed')[0].checked === false);

      draggables.forEach((draggable) => ul.removeChild(draggable));

      incompleteTasks.forEach((item) => ul.appendChild(item));

      localStorage.clear();

      repopulateList();

      const clear = document.getElementById('clear');
      ul.appendChild(clear);
    });

    return li;
  };

  // ul.appendChild(title());
  // ul.appendChild(addTaskInput());

  tasks.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  tasks.forEach((task) => ul.appendChild(taskList(task)));

  // ul.appendChild(completed());
};

toDolist(loadTaskList());

export { toDolist, taskList };

