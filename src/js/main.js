window.addEventListener('DOMContentLoaded', () => {

    const todoInput = document.querySelector('.todo-input'),
          todoButton = document.querySelector('.todo-button'),
          todoForm = document.querySelector('.todo-form');
          todoListBlock = document.querySelector('.todo-list-block');
    
    function addBlockToList(btn) {
        btn.addEventListener('click', () => {
            createElementsOfList(todoListBlock, todoInput);
            resetInputForm(todoInput);
    });
    }

    addBlockToList(todoButton, todoInput, todoForm, todoListBlock);

    function createElementsOfList (listBlock, input) {

        const todoItemBlock = document.createElement('div'),
              todoTitleBlock = document.createElement('div'),
              todoTitle = document.createElement('p'),
              blockOfButtons = document.createElement('div'),
              buttonDone = document.createElement('button'),
              buttonDelete = document.createElement('button');


        todoItemBlock.classList.add('todo-item');
        listBlock.append(todoItemBlock);

        todoTitleBlock.classList.add('title-block');
        todoItemBlock.append(todoTitleBlock);

        todoTitle.textContent = input.value;
        todoTitle.classList.add('todo-title');
        todoTitleBlock.append(todoTitle); 

        blockOfButtons.classList.add('todo-block-buttons');
        todoItemBlock.appendChild(blockOfButtons);

        buttonDone.innerHTML = '<i class="bi bi-check-square-fill"></i>';
        buttonDone.classList.add('button-done');

        buttonDelete.innerHTML = '<i class="bi bi-x-square-fill"></i>';
        buttonDelete.classList.add('button-delete');

        blockOfButtons.appendChild(buttonDone);
        blockOfButtons.appendChild(buttonDelete);

        finishTask(buttonDone, todoItemBlock);

    }

    function resetInputForm(input) {
        input.value = '';
    }

    function finishTask (button, list) {
        button.addEventListener('click', () => {
            list.classList.add('opacity');
        });
    }
    
});
