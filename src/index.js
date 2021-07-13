import _ from 'lodash';
import './style.css';

class Task {
  constructor(description, completed, index){
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

class ToDoList {
  constructor(){
    let tasks = [];
    this.tasks = tasks;
  }

  addTasksToList = (description, completed, index) => {
    this.tasks.push(new Task(description, completed, index));

    const tasksObjects = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksObjects);
  }

}



 