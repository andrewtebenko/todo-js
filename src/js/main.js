window.addEventListener('DOMContentLoaded', () => {

    const todoInput = document.querySelector('.todo-input'),
          todoButton = document.querySelector('.todo-button'),
          todoForm = document.querySelector('.todo-form'),
          todoListOfTasks = document.querySelector('.todo-list-block');

    let arrOfTasks = [];

    todoButton.addEventListener('click', () => {
        if (todoInput.value === '') {
            insertMessage(todoForm);
        } else {
            createTasks(todoListOfTasks, todoInput);
            if (todoForm.children.length > 2) {
                document.querySelector('.help').remove();
            }
        }
    });

    todoListOfTasks.addEventListener('click', deleteTask);
    todoListOfTasks.addEventListener('click', completeTask);

    function createTasks (listOfTasks, input) {
        const objOfTask = {
            id: Date.now(),
            textOfTask: input.value,
            statusOfTask: false
        };

        arrOfTasks = [...arrOfTasks, objOfTask];

        const task = `
            <li class="todo-item" id="${objOfTask.id}">
                <div class="title-block">
                    <p class="todo-title">${objOfTask.textOfTask}</p>
                </div>
                <div class="todo-block-buttons">
                    <button class="button-done">
                        <i class="bi bi-check-square-fill" data-action="done"></i>
                    </button>
                    <button class="button-delete">
                        <i class="bi bi-x-square-fill" data-action="delete"></i>
                    </button>
                </div>
            </li>
        `;

        input.value = '';

        listOfTasks.insertAdjacentHTML('beforeend', task);
    }

    function deleteTask(event) {
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
    }

    function completeTask(event) {
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
    }

    function insertMessage(block) {
        const message = document.createElement('p');
        message.classList.add('help');
        message.innerText = 'You need to enter the text';
        if (block.children.length <= 2) {
            block.append(message);
        } else {
            message.remove();
        }
    }

});
