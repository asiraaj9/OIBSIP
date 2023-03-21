let tasks = [];

function addTask() {
   const taskInput = document.getElementById('task');
   const taskText = taskInput.value.trim();
   if (taskText !== '') {
      const taskObject = {
         id: Date.now(),
         taskText: taskText,
         completed: false,
         addedAt: new Date()
      };
      tasks.push(taskObject);
      displayTasks();
      taskInput.value = '';
   }
}

function displayTasks() {
   const pendingTasksList = document.getElementById('pendingTasks');
   const completedTasksList = document.getElementById('completedTasks');
   pendingTasksList.innerHTML = '';
   completedTasksList.innerHTML = '';
   tasks.forEach(task => {
      const taskElement = document.createElement('li');
      taskElement.setAttribute('data-id', task.id);
      taskElement.innerHTML = `
         <span>${task.taskText}</span>
         <span>${task.addedAt.toLocaleString()}</span>
         <button class="complete" onclick="completeTask(${task.id})">Complete</button>
         <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      `;
      if (task.completed) {
         taskElement.classList.add('completed');
         completedTasksList.appendChild(taskElement);
      } else {
         pendingTasksList.appendChild(taskElement);
      }
   });
}

function completeTask(id) {
   const taskIndex = tasks.findIndex(task => task.id === id);
   if (taskIndex !== -1) {
      tasks[taskIndex].completed = true;
      displayTasks();
   }
}

function deleteTask(id) {
   const taskIndex = tasks.findIndex(task => task.id === id);
   if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      displayTasks();
   }
}

displayTasks();
