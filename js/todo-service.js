'use strict'
const KEY_TODOS = 'todos';

var gTodos;
var gTodosFilter = 'all';
var gTodoSort = 'time';

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos) ? todos : [createTodo('Learn HTML', 1), createTodo('Practice CSS', 2)]
}
function createTodo(txt, impNum) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: createdAt(),
        importance: impNum
    }
}

function getTodos() {
    return gTodos.filter(function (todo) {
        return gTodosFilter === 'all' ||
            (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    });
}


function addTodo(todoTxt, impNum) {
    gTodos.unshift(createTodo(todoTxt, impNum));
    saveToStorage(KEY_TODOS, gTodos);

}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    });
    todo.isDone = !todo.isDone;
    saveToStorage(KEY_TODOS, gTodos);
}

function setFilter(statusFilter) {
    gTodosFilter = statusFilter;
}

function setSort(statusSort){
    gTodoSort = statusSort;
    if(statusSort === 'time'){
        gTodos.sort(sortTime);
    } else if(statusSort === 'importance'){
        gTodos.sort(sortImportance);
    } else if(statusSort === 'txt'){
        gTodos.sort(sortTxt);
    }
    saveToStorage(KEY_TODOS, gTodos);
}

function sortTime(num1,num2) {
    return num2.createdAt - num1.createdAt;
}
function sortImportance(num1,num2) {
    return num1.importance - num2.importance;
}
function sortTxt(a,b){
    
    if(a.txt.toLowerCase() < b.txt.toLowerCase()) return -1;
    if(a.txt.toLowerCase() > b.txt.toLowerCase()) return 1;
    return 0;
}

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    gTodos.splice(todoIdx, 1);
    saveToStorage(KEY_TODOS, gTodos);
}

function getTodoCount() {
    return gTodos.length;
}
function getActiveCount() {
    return gTodos.filter(function (todo) {
        return !todo.isDone
    }).length
}

function createdAt(){
    return Date.now();
}

function addTimeTodo(elTime) {
    var time = new Date(elTime);
    var year = time.getFullYear();
    var day = time.getDate();
    var month = time.getMonth() + 1;

    var hour = time.getHours();
    var minutes = time.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var str = `${hour}:${minutes} , ${day}/${month}/${year}`;
    return str;
}
function upTodoPlace(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    if (todoIdx > 0) {
        gTodos[todoIdx].importance--;
        gTodos[todoIdx-1].importance++;

        var currTodo = gTodos.splice(todoIdx, 1);
        gTodos.splice(todoIdx - 1, 0, currTodo[0]);
        saveToStorage(KEY_TODOS, gTodos);
    }
}

function downTodoPlace(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    if (todoIdx < gTodos.length) {
        gTodos[todoIdx].importance++;
        gTodos[todoIdx+1].importance--;

        var currTodo = gTodos.splice(todoIdx, 1);
        gTodos.splice(todoIdx + 1, 0, currTodo[0]);
        saveToStorage(KEY_TODOS, gTodos);
    }
}

