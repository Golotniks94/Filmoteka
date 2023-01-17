import {load,save, remove } from './localStorageApi';
import ApiData from './ApiData';
import {spinnerOn, spinnerOff} from './spinner';

const btnQueue = document.querySelector('#queue');
const btnWatch = document.querySelector('#watched');
console.log(btnQueue);
console.log(btnWatch);


btnWatch.addEventListener('click', addWatchList);
btnQueue.addEventListener('click', addQueueList)
// Функція зміни тексту кнопок Watched/Queue
export function textModalBtn(id) {
    const btnQueue = document.querySelector('#queue');
    const btnWatch = document.querySelector('#watched');
    if (inList(id, 'watched')) {
        function changeText() {
            btnWatch.textContent = 'Remove from watched';
            
            btnWatch.disabled = false;
            btnWatch.classList.add('active');
        }
        setTimeout(changeText, 200);
    } else {
            btnWatch.textContent = 'Add to watched';
        
        btnWatch.classList.remove('active');
        btnWatch.disabled = false;
    }
    if (inList(id, 'queue')) {
        function changeText() {
        btnQueue.textContent = 'Remove from queue';
        
        btnQueue.disabled = false;
        btnQueue.classList.add('active');
        }
        setTimeout(changeText, 200);
    } else {
        btnQueue.textContent = 'Add to queue';
    
        btnQueue.classList.remove('active');
        btnQueue.disabled = false;
    }
}

// Додаємо фільм в лист переглянутих
export function addWatchList() {
    const btnWatch = document.querySelector('#watched');
    let id = btnWatch.dataset.action;
    console.log(id);
    if (btnWatch.classList.contains('active')) {
    removeFromWatchedList(id);
    } else {
    let watchList = [];
    let localWatchListJson = load('watched');
    if (localWatchListJson) {
        watchList = [...localWatchListJson];
    }

    let queueList = [];
    let localQueueListJson = load('queue');
    if (localQueueListJson) {
        queueList = [...localQueueListJson];
    }
    let queueSet = new Set(queueList);
    if (queueSet.has(id)) {
        remove('queue');
        let index = queueList.indexOf(id);
        queueList.splice(index, 1);
        save('queue', queueList);
    }

    const watchSet = new Set(watchList);
    if (watchSet.has(id)) {
        textModalBtn(id);
    } else {
        watchList.push(id);
        save('watched', watchList);
        textModalBtn(id);
    }
    }
}

// Видалення з листа перглянутих
export function removeFromWatchedList(id) {
    console.log('delete from watched');
    let watchList = [];
    let localWatchListJson = load('watched');
    if (localWatchListJson) {
    watchList = [...localWatchListJson];
    }

    remove('watched');
    let index = watchList.indexOf(id);
    watchList.splice(index, 1);
    save('watched', watchList);

    textModalBtn(id);
}

// Додаємо в лист бажаних для перегляду
export function addQueueList() {
    const btnQueue = document.querySelector('#queue');
    let id = btnQueue.dataset.action;
    if (btnQueue.classList.contains('active')) {
    removeFromQueueList(id);
    } else {
    let queueList = [];
    let localQueueListJson = load('queue');
    if (localQueueListJson) {
        queueList = [...localQueueListJson];
    }

    let watchList = [];
    let localWatchListJson = load('watched');
    if (localWatchListJson) {
        watchList = [...localWatchListJson];
    }
    let watchSet = new Set(watchList);
    if (watchSet.has(id)) {
        remove('watched');
        let index = watchList.indexOf(id);
        watchList.splice(index, 1);
        save('watched', watchList);
    }

    const queueSet = new Set(queueList);
    if (queueSet.has(id)) {
        textModalBtn(id);
    } else {
        queueList.push(id);
        save('queue', queueList);
        textModalBtn(id);
    }
    }
}

// Видаляємо з листа бажаних
export function removeFromQueueList(id) {
    console.log('delete from queue');
    let queueList = [];
    let localQueueListJson = load('queue');
    if (localQueueListJson) {
    queueList = [...localQueueListJson];
    }

    remove('queue');
    let index = queueList.indexOf(id);
    queueList.splice(index, 1);
    save('queue', queueList);

    textModalBtn(id);
}


export function inList(id, list) {
    let arrList = [];
    let localListJson = load(list);
    if (localListJson) {
    arrList = [...localListJson];
    }
    const listSet = new Set(arrList);
    return listSet.has(id);
}