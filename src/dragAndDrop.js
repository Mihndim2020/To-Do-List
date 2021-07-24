import {
  repopulateList,
} from './backEnd';

const clearCompleted = (ul) => {
  const draggables = [...document.querySelectorAll('.draggable')];

  const newList = draggables.filter((draggable) => draggable.getElementsByClassName('completed')[0].checked === false);

  draggables.forEach((draggable) => ul.removeChild(draggable));

  newList.forEach((item) => ul.appendChild(item));

  repopulateList();

  const clear = document.getElementById('clear');
  ul.appendChild(clear);
};

const dragstart = (element) => {
  element.classList.add('flying');
};

const dragover = (element, e) => {
  e.preventDefault();

  element.classList.add('dragover');
};

const dragleave = (element) => {
  element.classList.remove('dragover');
};

const drop = (element) => {
  const flying = document.querySelector('.flying');

  element.before(flying);

  repopulateList();

  element.classList.remove('dragover');
};

const dragend = (element) => {
  element.classList.remove('flying');
};

export {
  dragstart, dragover, dragleave, drop, dragend, clearCompleted,
};