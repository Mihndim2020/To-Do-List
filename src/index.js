import './style.css';

const tasks = [
  { description: 'Laundary', completed: true, index: 1 },
  { description: 'Car wash', completed: false, index: 2 },
  { description: 'Swimming', completed: false, index: 3 },
];

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

  const addTask = () => {
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

    const div = document.createElement('div');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'completed';

    const p = document.createElement('p');
    p.textContent = task.description;

    div.appendChild(input);
    div.appendChild(p);

    li.appendChild(div);

    const i = document.createElement('i');
    i.classList.add('fas', 'fa-trash-alt');

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
  ul.appendChild(addTask());

  tasks.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  tasks.forEach((task) => ul.appendChild(taskList(task)));

  ul.appendChild(completed());
};

toDolist();
