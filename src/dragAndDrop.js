import {
  repopulateList,
} from './backEnd';

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
  dragstart, dragover, dragleave, drop, dragend,
};