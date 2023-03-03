const WORK_TIME = 25; //неизменные константа 25
const BREAK_TIME = 5; //5 мин
const RELAX_TIME = 20;//20 мин


export const state = {
    work: WORK_TIME,
    break: BREAK_TIME,
    relax: RELAX_TIME,
    timeLeft: WORK_TIME * 60,
    status: 'work',
    count: 4,
    isActive: false,
    timerId: 0,
};