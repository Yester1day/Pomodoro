import {initControl} from "./control.js";
import {state} from "./state.js";
import {initTodo} from "./todo.js";


const initPomodoro = () =>{
    initTodo();
    initControl();
}

initPomodoro();