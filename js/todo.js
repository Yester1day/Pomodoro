import {state} from "./state.js";
import {changeActiveBtn, stop} from "./control.js";


const titleElem = document.querySelector('.title');
const countElem = document.querySelector('.count_num');
const todoListElem = document.querySelector('.todo__list');

const li = document.createElement('li');
li.classList.add('todo__item');
const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo__add');
todoAddBtn.textContent = 'Добавить новую таску';
li.append(todoAddBtn);

const getTodo = () => {
    const todolist = JSON.parse(localStorage.getItem('pomodoro') || '[]');
    return todolist;
}

const addTodo = (title) =>{
    const todo = {
        title,
        pomodoro: 0,
        id: Math.random().toString(16).substring(2,8)
    }

    const todolist = getTodo();
    todolist.push(todo);
    localStorage.setItem('pomodoro', JSON.stringify(todolist));
    return todo;
}

export const updateTodo = (todo) =>{
    const todolist = getTodo();
    if (!todolist.length){
        return;
    }

    const todoItem = todolist.find((item)=> item.id === todo.id);
    todoItem.title = todo.title;
    todoItem.pomodoro = todo.pomodoro;
    localStorage.setItem('pomodoro', JSON.stringify(todolist));
}

const deleteTodo = (todo) =>{
    const todolist = getTodo();
    const newTodoList = todolist.filter((i)=> i.id !== todo.id);
    if(todo.id === state.activeTodo.id){
        state.activeTodo = newTodolist[newTodolist.length - 1];
    }
    localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
}

const createTodoListItem = (todo) => {
    if (todo.id !== 'default') {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo__item');
        const todoItemWrapper = document.createElement('div');
        todoItemWrapper.classList.add('todo__item-wrapper');
        todoItem.append(todoItemWrapper);

        const todoBtn = document.createElement('button');
        todoBtn.classList.add('todo__btn');
        todoBtn.textContent = todo.title;

        const editBtn = document.createElement('button');
        editBtn.classList.add('todo__edit');
        editBtn.ariaLabel = 'Редактировать задачу';

        const delBtn = document.createElement('button');
        delBtn.classList.add('todo__del');
        delBtn.ariaLabel = 'Удалить задачу';

        todoItemWrapper.append(todoBtn, editBtn, delBtn);
        todoListElem.prepend(todoItem);

        todoBtn.addEventListener('click',()=>{
            state.activeTodo = todo;
            showTodo();
            changeActiveBtn('work');
            stop();
        });
        editBtn.addEventListener('click',()=>{
            todo.title = prompt('Введите название задачи?', todo.title);
            todoBtn.textContent = todo.title;
            if (todo.id === state.activeTodo.id) {
                state.activeTodo.title = todo.title;
            }
            updateTodo(todo);
            showTodo();

        });
        delBtn.addEventListener('click',()=>{
            deleteTodo(todo);
            showTodo();
            todoItem.remove();
        });
    }
};

const renderTodolist = (list) => {
    todoListElem.textContent = '';
    list.forEach(createTodoListItem);
    todoListElem.append(li);

}

export const showTodo = () => {
    if (state.activeTodo) {
        titleElem.textContent = state.activeTodo.title;
        countElem.textContent = state.activeTodo.pomodoro;
    } else{
        titleElem.textContent = '';
        countElem.textContent = 0 ;
    }


}


export const initTodo = () => {
    const todolist = getTodo();

    if (!todolist.length) {
       state.activeTodo = {
            id: 'default',
            pomodoro: 0,
            title: 'Pomodoro'
        }

    } else {state.activeTodo = todolist[todolist.length-1];
    }

    showTodo();

    renderTodolist(todolist);

    todoAddBtn.addEventListener('click',() =>{
        const title = prompt('Введите имя задачи');
        const todo = addTodo(title);
        createTodoListItem(todo);
    })
}