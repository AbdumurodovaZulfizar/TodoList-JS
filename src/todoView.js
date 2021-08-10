const todoView = () => {
  const priorityClass = priority => {
    if (priority === 'high') {
      return 'danger';
    } if (priority === 'medium') {
      return 'warning';
    }
    return 'info';
  };

  const detailTemplate = (todo, index, projectId) => `
  <div class="modal fade" id="detailModel${index}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="detailModelLabel${index}" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header pink-back">
          <h5 class="modal-title task-title" id="detailModelLabel${index}">${todo.title}</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
            <p class="task-description">
            ${todo.description}
            </p>
            <div class="d-flex justify-content-between">
              <span>Due date: ${todo.date}</span>
              <span class='task-volume text-${priorityClass(todo.priority)}'>${todo.priority}</span>
            </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-outline-success edit-todo" data-toggle="modal" data-dismiss="modal" data-target="#todoModal" data-todo="${index}" data-project="${projectId}">Edit</button>
          <button type="submit" class="btn btn-outline-danger delete-todo" data-todo="${index}" data-project="${projectId}" data-dismiss="modal">Delete</button>
        </div>
      </div>
    </div>
  </div>
  `;

  const render = (projectId, project, todos) => {
    const element = `

      <div  class="text-center pr-2  py-2">
      <h3 class="text-center pro fw-bold" data-project-index="${projectId}" id="project-title">${project.title}</h3>
      </div>
      <section type="button" class="pink rounded-circle shadow-plus float-end mx-3 my-2" data-bs-toggle="modal" data-bs-target="#todoModal">
      <i class="fas fa-plus fa-2x padding-4"></i>
    </section>
      <ul class="list-group list-group-flush mb-4">
      ${todos.map((todo, index) => `
        <li class="mb-3 todo-item-color rounded mx-2 list-group-item border-${priorityClass(todo.priority)} border-left border-bottom-0 ${todo.isCompleted ? 'task-completed' : ''}">
            <div class="d-flex align-items-center">
              <input type="checkbox" id="todo${index}" data-todo=${index} data-project="${projectId}" class="custom-checkbox todo-checkmark" ${todo.isCompleted ? 'checked' : ''} >
              <label for="todo${index}" class="ml-3 d-flex justify-content-between w-100 align-items-center mb-0">
                <div class="mb-0 px-2">
                  <h6 class="task-title">${todo.title}</h6>
                  <p class="mb-0"><small><span>Due Date:</span> <span>${todo.date}</span></small></p>
                </div>
                <a href="#" class="new-todo-button nav-link rounded py-1 px-2 text-dark" data-toggle="modal" data-target="#detailModel${index}">Details</a>
              </label>
            </div>
          </li>

          ${detailTemplate(todo, index, projectId)}

        `).join('')}
      </ul>
      `;
    document.getElementById('todo-list').innerHTML = element;
  };

  const updateTodoModel = (todo, todoId) => {
  const title = document.getElementById('todo-title');
  const priority = document.getElementById('priority');
  const date = document.getElementById("todoDate");
  const description = document.getElementById('floatingTextarea');
  const id = document.getElementById('id');
    title.value = todo.title;
    priority.value = todo.priority;
    date.value = todo.date;
    description.value = todo.description;
    id.value = todoId;

    document.querySelector('#add-todo').style.display = 'none';
    document.querySelector('#update-todo').style.display = 'block';
  };

  return { render, updateTodoModel };
};

export default todoView;
