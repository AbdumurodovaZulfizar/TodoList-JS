const ProjectModel = ()=> {
  const project = (title) => ({ title });

  const all = () => JSON.parse(localStorage.getItem('projects')) || [{ title: 'Today' }];

  const save = (project) => {
    const projects = all();
    if (projects) {
      if (!projects.some(item => item.title === project.title)) {
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
      }
    } else {
      localStorage.setItem('projects', JSON.stringify([project]));
    }
  };

  const get = (id) => {
    const projects = all();
    return projects[id];
  };


  return {
    project, all, save, get,
  };
}


const TodoModel = () => {
  const todo = (title, priority, dueDate, description) => ({
    title, priority, date: dueDate, description, isCompleted: false,
  });


  const getProject = (id) => ProjectModel().get(id);


  const all = (projectId) => {
    const project = getProject(projectId);
    const todos = JSON.parse(localStorage.getItem(project.title)) || [];
    return todos.sort((a, b) => (a.isCompleted - b.isCompleted));
  };

  const save = (todo, projectId) => {
    const project = getProject(projectId);
    const todos = all(projectId);
    if (todos) {
      todos.push(todo);
      localStorage.setItem(project.title, JSON.stringify(todos));
    } else {
      localStorage.setItem(project.title, JSON.stringify([todo]));
    }
  };

  const remove = (projectId, todoId) => {
    const todos = all(projectId);
    const project = getProject(projectId);
    todos.splice(todoId, 1);
    localStorage.setItem(project.title, JSON.stringify(todos));
  };

  const edit = (projectId, todoId, newTodo) => {
    const todos = all(projectId);
    const todo = todos[todoId];
    const project = getProject(projectId);
    todo.title = newTodo.title;
    todo.priority = newTodo.priority;
    todo.date = newTodo.date;
    todo.description = newTodo.description;
    todo.isCompleted = newTodo.isCompleted;
    localStorage.setItem(project.title, JSON.stringify(todos));
  };


  const get = (projectId, todoId) => {
    const todos = all(projectId);
    return todos[todoId];
  };

  return {
    todo, all, save, get, remove, getProject, edit,
  };
};

export { TodoModel, ProjectModel };
