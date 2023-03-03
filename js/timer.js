import {state} from "./state.js";
import {alarm} from "./alarm.js";
import {addZero} from "./util.js";
import {changeActiveBtn} from "./control.js";
import {showTodo, updateTodo} from "./todo.js";

const minutesElement = document.querySelector('.time__minutes')
const secondsElement = document.querySelector('.time__seconds')


export const showTime = (seconds) => {
    minutesElement.textContent = addZero(Math.floor(seconds / 60));
    secondsElement.textContent = addZero(seconds % 60); //показывает на таймере секунды и минуты
}

const title = document.title;

export const startTimer = () => {
    const countdown = new Date().getTime() + state.timeLeft * 1000;


    state.timerId = setInterval(() => {
        state.timeLeft -= 1;  //ход одной секунды
        showTime(state.timeLeft);

        document.title = state.timeLeft;

        if (!(state.timeLeft % 5)){
            const now = new Date().getTime();
            state.timeLeft =Math.floor ((countdown - now) / 1000);
        }


        if (state.timeLeft > 0 && state.isActive) {
            return;
        }
            document.title = title;
            clearTimeout(state.timerId);

        if (state.status === 'work') {
            state.activeTodo.pomodoro += 1;
            updateTodo(state.activeTodo);
            if (state.activeTodo.pomodoro % state.count !== 0) {
                state.status = 'break'
            } else {
                state.status = 'relax';
            }
        } else {
            state.status = 'work';
        }
        alarm();
        state.timeLeft = state[state.status] * 60;
        changeActiveBtn(state.status);
        showTodo();
        startTimer();
    }, 1000)
}