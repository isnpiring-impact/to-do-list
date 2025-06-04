function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    try {
        const data = localStorage.getItem('tasks');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function createTaskElement(text, completed) {
    const task = document.createElement('div');
    task.className = 'task';
    if (completed) task.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        task.classList.toggle('completed');
        data[text].completed = checkbox.checked;
        saveTasks(Object.values(data));
    });

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = text;

    const del = document.createElement('span');
    del.className = 'delete';
    del.textContent = '🗑️';
    del.addEventListener('click', () => {
        task.classList.add('removing');
        setTimeout(() => {
            delete data[text];
            task.remove();
            saveTasks(Object.values(data));
        }, 300);
    });

    task.appendChild(checkbox);
    task.appendChild(span);
    task.appendChild(del);
    return task;
}

const tasksContainer = document.getElementById('tasks');
const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');

let data = {};

function render() {
    tasksContainer.innerHTML = '';
    Object.keys(data).forEach(key => {
        const t = data[key];
        const elem = createTaskElement(t.text, t.completed);
        tasksContainer.appendChild(elem);
    });
}

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    if (!data[text]) {
        data[text] = { text, completed: false };
        const elem = createTaskElement(text, false);
        tasksContainer.appendChild(elem);
        saveTasks(Object.values(data));
    }
    input.value = '';
});

window.addEventListener('load', () => {
    const loaded = loadTasks();
    loaded.forEach(t => {
        data[t.text] = t;
    });
    render();
});
