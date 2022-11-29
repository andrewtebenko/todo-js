window.addEventListener('DOMContentLoaded', () => {

    const todoInput = document.querySelector('.todo-input'),
          todoButton = document.querySelector('.todo-button'),
          todoForm = document.querySelector('.todo-form'),
          todoListOfTasks = document.querySelector('.todo-list-block');

    let arrOfTasks = [];

    const renderTasks = (task) => {

        const cssClass = task.statusOfTask === true ? "todo-item done" : "todo-item";

        const taskHTML = `
            <li class="${cssClass}" id="${task.id}">
                <div class="title-block">
                    <p class="todo-title">${task.textOfTask}</p>
                </div>
                <div class="todo-block-buttons">
                    <button class="button-done">
                        <img src="img/done.png" alt="done-button" data-action="done">
                    </button>
                    <button class="button-delete">
                        <img src="img/deleted.png" alt="delete-button" data-action="delete">
                    </button>
                </div>
            </li>
        `;

        todoListOfTasks.insertAdjacentHTML('beforeend', taskHTML);
    };

    const addTasks = () => {
        if (todoInput.value === '') {
            insertMessage(todoForm);
        } else {
            createTasks(todoInput);
            if (todoForm.children.length > 2) {
                document.querySelector('.help').remove();
            }
        }
    };

    const createTasks = (input) => {
        const objOfTask = {
            id: Date.now(),
            textOfTask: input.value,
            statusOfTask: false
        };

        arrOfTasks = [...arrOfTasks, objOfTask];

        saveTasksToLocalStorage();
        renderTasks(objOfTask);
        input.value = '';
    };

    const deleteTask = (event) => {
        if (event.target.dataset.action !== 'delete') return;
            
        const parentNode = event.target.closest('.todo-item');
        const id = Number(parentNode.id);

        const indexOfTask = arrOfTasks.findIndex(function(task) {
            if (task.id === id) {
                return true;
            }
        });

        arrOfTasks.splice(indexOfTask, 1);
        parentNode.remove();
        saveTasksToLocalStorage();
    };

    const completeTask = (event)  => {
        if (event.target.dataset.action !== 'done') return;

        const parentNode = event.target.closest('.todo-item');  
        const id = Number(parentNode.id);

        arrOfTasks.filter(function(task) {
            if (task.id === id) {
                task.statusOfTask = true;
            }
        });

        parentNode.querySelector('.todo-title');
        parentNode.classList.add('done');
        saveTasksToLocalStorage();
    };

    const insertMessage = (block) => {
        const message = document.createElement('p');
        message.classList.add('help');
        message.innerText = 'You need to enter the text';
        if (block.children.length <= 2) {
            block.append(message);
        } else {
            message.remove();
        }
    };

    const saveTasksToLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(arrOfTasks));
    };

    if (localStorage.getItem('tasks')) {
        arrOfTasks = JSON.parse(localStorage.getItem('tasks'));
        arrOfTasks.forEach(task => renderTasks(task));
    }

    todoInput.addEventListener('keypress', (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        addTasks();
    });

    todoButton.addEventListener('click', addTasks);
    todoListOfTasks.addEventListener('click', deleteTask);
    todoListOfTasks.addEventListener('click', completeTask);
});
