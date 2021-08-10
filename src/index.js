import 'jquery';
// import 'bootstrap';

import { todoController, projectController } from './controllers';
import { TodoModel, ProjectModel } from './models';
import todoView from './todoView';
import projectView from './projectView';

const projectButton = document.getElementById('add-project');
const todoButton = document.getElementById('add-todo');

projectButton.addEventListener('click', e => {
  e.preventDefault();
  const form = document.getElementById("project-form");
  const { project } = form;
  if (project.value !== '' && project.value !== ' ') {
    const controller = projectController(ProjectModel, projectView);
    controller.addProject(project.value);
    controller.showProjects();
    form.reset();
    // $('#ProjectModal').modal('hide'); // eslint-disable-line
  }
});

todoButton.addEventListener('click', e => {
  e.preventDefault();
  const form = document.getElementById("todo-form");
  const title = document.getElementById("todo-title");
  const priority = document.getElementById("priority");
  const date = document.getElementById("todoDate");
  const description = document.getElementById("floatingTextarea");
  const id = document.getElementById("id");

  const projectId = document.getElementById('project-title').getAttribute('data-project-index');
  if (title.value !== '' && title.value !== ' ') {
    const controller = todoController(TodoModel, todoView);
    controller.addTodo(
      title.value,
      priority.value,
      date.value,
      description.value,
      parseInt(projectId, 10),
      id.value,
    );
    controller.showTodos(projectId);
    document.getElementById("todo-form").reset();
    // $('#todoModal').modal('hide'); // eslint-disable-line
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const projects = ProjectModel().all();
  projectController(ProjectModel, projectView).showProjects();
  if (projects.length > 0) {
    todoController(TodoModel, todoView).showTodos();
  }
});

document.addEventListener('click', e => {
  if (e.target.classList.contains('project-item')) {
    const controller = todoController(TodoModel, todoView);
    controller.showTodos(parseInt(e.target.getAttribute('data-index'), 10));
  }
  if (e.target.classList.contains('delete-todo')) {
    const todo = e.target.getAttribute('data-todo');
    const project = e.target.getAttribute('data-project');
    TodoModel().remove(project, todo);
    // $(e.target.closest('.modal')).modal('hide'); // eslint-disable-line
    const controller = todoController(TodoModel, todoView);
    controller.showTodos(parseInt(project, 10));
  }

  if (e.target.classList.contains('edit-todo')) {
    const todo = e.target.getAttribute('data-todo');
    const project = e.target.getAttribute('data-project');
    const controller = todoController(TodoModel, todoView);
    controller.editTodo(parseInt(project, 10), parseInt(todo, 10));
    // $(e.target.closest('.modal')).modal('hide'); // eslint-disable-line
  }

  if (e.target.classList.contains('add-todo')) {
    document.querySelector('.add-todo').style.display = 'block';
    document.getElementById("todoMadalLabel").style.display = "block"
    document.querySelector('.update-todo').style.display = 'none';
    document.getElementById("todoModalLabel1").style.display = "none";
    document.getElementById("todo-form").reset();
    todoForm.id.value = '';
  }

  if (e.target.classList.contains('todo-checkmark')) {
    const todo = e.target.getAttribute('data-todo');
    const project = e.target.getAttribute('data-project');
    const controller = todoController(TodoModel, todoView);
    controller.completeTodo(parseInt(project, 10), parseInt(todo, 10));
    controller.showTodos(parseInt(project, 10));
  }
});

document.getElementById("menu-bar").addEventListener("click", () => {
  document.getElementById("navbar").classList.toggle("d-none");
})
