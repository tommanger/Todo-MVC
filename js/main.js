'use strict'

// This is our controller it is responsible for rendering the view and action upon events
console.log('Todo');

function init() {
    createTodos();
    render();
}

function render() {
    renderTodos();
    renderStats();
}


function renderTodos() {
    var todos = getTodos();
    var elNoTodos = document.querySelector('.no-todo');
    if (todos.length === 0 && gTodosFilter === 'all') {
        elNoTodos.innerHTML = 'No ToDos!';
    } else if (todos.length === 0 && gTodosFilter === 'active') {
        elNoTodos.innerHTML = 'No Active Todos';
    } else if (todos.length === 0 && gTodosFilter === 'done') {
        elNoTodos.innerHTML = ' No Done Todos';
    } else {
        elNoTodos.innerHTML = '';
    }
    var strHtmls = todos.map(function (todo) {
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onTodoClicked('${todo.id}')">
                   <span class="imp-num">${todo.importance}</span>
                   <span class="todo">${todo.txt}</span>
                   <span class="time-todo">${addTimeTodo(todo.createdAt)}</span> 
                   <span class="btn-up" onclick="onUpTodo('${todo.id}', event)">
                   🔺
                    </span>
                    <span class="btn-down" onclick="onDownTodo('${todo.id}', event)">
                    🔻
                     </span>
                   <button class="btn-delete" onclick="onDeleteTodo('${todo.id}', event)">
                      &times;
                    </button>
                </li>`;
    })
    document.querySelector('.todo-list').innerHTML = strHtmls.join('')
}

function renderStats() {
    document.querySelector('.todo-count').innerHTML = getTodoCount();
    document.querySelector('.active-count').innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    render();
}

function onSetFilter(statusFilter) {
    setFilter(statusFilter);
    render();
}

function onSetSort(statusSort) {
    setSort(statusSort);
    render();
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('#newTodoTxt');
    var newTodoTxt = elNewTodoTxt.value;
    var elImportance = document.querySelector('#importance');
    var newImportance = +elImportance.value;

    if (newTodoTxt !== '') addTodo(newTodoTxt, newImportance);

    document.querySelector('h4').classList.add('animated', 'tada');
    setTimeout(function () {
        document.querySelector('h4').classList.remove('animated', 'tada');
    }, 1000)

    elNewTodoTxt.value = '';
    render()
}

function onDeleteTodo(todoId, ev) {
    // Stop the propegation of the click event so the LI onclick will not trigger
    ev.stopPropagation();
    var confirmDel = confirm('Are you sure?');
    if (confirmDel) {
        deleteTodo(todoId);
        render();
    }
}

function onUpTodo(todoId, ev) {
    ev.stopPropagation();
    upTodoPlace(todoId);
    render();

}

function onDownTodo(todoId, ev) {
    ev.stopPropagation();
    downTodoPlace(todoId);
    render();
}




function goToGallery() {
    window.open(`https://tommanger.github.io/ca-gallery-master/`, '_blank');
}