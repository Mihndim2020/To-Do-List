import { clearTasks, addTasks, addTasksToStorage } from './backEnd';
 
var dragged;
var dragstart;
var dragover;
var dragleave;
var drop;

// const dragstart = (element) => {
//   element.classList.add('flying');
// };

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragstart = event.target;
  // make it half transparent
  event.target.classList.add('flying');
  event.target.style.opacity = .5;
}, false);

// const dragover = (element, e) => {
//   e.preventDefault();

//   element.classList.add('dragover');
// };

document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  dragover = event.target;
  event.preventDefault();
  event.target.classList.add('dragover');
}, false);

// const dragleave = (element) => {
//   element.classList.remove('dragover');
// };

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  dragleave = event.target;
  event.target.classList.remove('dragover');
  // if (event.target.className == "dropzone") {
  //   event.target.style.background = "";
  // }
}, false);

// const drop = (element) => {
//   const flying = document.querySelector('.flying');

//   element.before(flying);

//   const draggables = document.querySelectorAll('.draggable');

//   let i = 0;
//   draggables.forEach((draggable) => {
//     draggable.setAttribute('task', i);
//     i += 1;
//   });

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  drop = event.target;
  event.preventDefault();
  const flying = document.querySelector('.flying');
  event.target.before(flying);
  const draggables = document.querySelectorAll('.draggable');
  let i = 0;

  draggables.forEach((draggable) => {
       draggable.setAttribute('task', i);
       i += 1;
 });
  // move dragged elem to the selected drop target
  // if (event.target.className == "dropzone") {
  //   event.target.style.background = "";
  //   dragged.parentNode.removeChild( dragged );
  //   event.target.appendChild( dragged );
  // }
  clearTasks();
  draggables.forEach((draggable) => {
    const description = draggable.getElementsByClassName('description')[0].textContent;
    const completed = draggable.getElementsByClassName('completed')[0].checked;
    const index = draggable.getAttribute('task');

    addTasks(description, completed, index);

    addTasksToStorage();
  });

  element.classList.remove('dragover');

}, false);

// const dragend = (element) => {
//   element.classList.remove('flying');
// };

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.classList.remove('flying');
}, false);

export {
  dragstart, dragover, dragleave, drop, dragend,
};