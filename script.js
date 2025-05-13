const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskProgress = document.getElementById('taskProgress');
const progressText = document.getElementById('progressText');

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', updateProgress);

  const span = document.createElement('span');
  span.textContent = taskText;

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '✏️';
  editBtn.className = 'edit-btn';
  editBtn.onclick = () => editTask(span);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    li.remove();
    updateProgress();
  };

  checkbox.addEventListener('change', () => {
    span.classList.toggle('completed', checkbox.checked);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  taskInput.value = '';

  updateProgress();
}

function editTask(span) {
  const newText = prompt('Edit your task:', span.textContent);
  if (newText !== null && newText.trim() !== '') {
    span.textContent = newText.trim();
  }
}

function updateProgress() {
  const tasks = taskList.querySelectorAll('li');
  const completedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked');

  const total = tasks.length;
  const completed = completedTasks.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  taskProgress.value = percentage;
  progressText.textContent = `${percentage}%`;
}
