const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const tasksCount = document.getElementById('tasksCount');
const clearCompletedBtn = document.getElementById('clearCompleted');

function updateCount() {
  const total = taskList.children.length;
  const completed = taskList.querySelectorAll('li.completed').length;
  const pending = total - completed;
  tasksCount.textContent = pending === 1 ? '1 tarefa pendente' : `${pending} tarefas pendentes`;
  clearCompletedBtn.style.display = completed > 0 ? 'inline-block' : 'none';
}

function createTaskElement(taskText) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = taskText;
  span.contentEditable = true;
  span.spellcheck = false;

  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateCount();
  });

  // Atualiza texto da tarefa após editar
  span.addEventListener('blur', () => {
    if (!span.textContent.trim()) {
      li.remove();
      updateCount();
    }
  });

  const delBtn = document.createElement('button');
  delBtn.innerHTML = '&#10006;'; // ✖
  delBtn.title = 'Excluir tarefa';
  delBtn.classList.add('deleteBtn');
  delBtn.addEventListener('click', () => {
    li.remove();
    updateCount();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  return li;
}

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
    taskInput.value = '';
    taskInput.focus();
    updateCount();
  }
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('input', () => {
  addBtn.disabled = taskInput.value.trim().length === 0;
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !addBtn.disabled) {
    addTask();
  }
});

clearCompletedBtn.addEventListener('click', () => {
  const completedTasks = taskList.querySelectorAll('li.completed');
  completedTasks.forEach(task => task.remove());
  updateCount();
});

updateCount();
