window.addEventListener('DOMContentLoaded', () => {

    const todoInput = document.querySelector('.todo-input'),
          todoButton = document.querySelector('.todo-button'),
          todoForm = document.querySelector('.todo-form');
          todoListBlock = document.querySelector('.todo-list-block');
    
    function addItemsToList(btn, input, form) {
        btn.addEventListener('click', () => {
            if (input.value === '') {
                insertMessage(todoForm);
            } else {
                createElementsOfList(todoListBlock, todoInput);
                resetInputForm(todoInput);
                if (form.children.length > 2) {
                    removeMessage('.help');
                }
            }
        });
    }

    addItemsToList(todoButton, todoInput, todoForm);

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
        deleteBlock(buttonDelete, todoItemBlock);

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
 
    function removeMessage(selector) {
        document.querySelector(selector).remove();
    }

    function resetInputForm(input) {
        input.value = '';
    }

    function finishTask (button, list) {
        button.addEventListener('click', () => {
            list.classList.add('done');
        });
    }

    function deleteBlock (button, list) {
        button.addEventListener('click', () => {
            list.style.display = 'none';
        });
    }  
});
