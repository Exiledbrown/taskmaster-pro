const API_URL = 'http://localhost:8000';

const taskForm = document.getElementById('taskForm');
const tasksList = document.getElementById('tasksList');
const filterStatus = document.getElementById('filterStatus');
const filterPriority = document.getElementById('filterPriority');
const searchText = document.getElementById('searchText');

async function fetchTasks() {
    try {
        const params = new URLSearchParams();
        if (filterStatus.value) params.append('completed', filterStatus.value);
        if (filterPriority.value) params.append('priority', filterPriority.value);
        if (searchText.value) params.append('search', searchText.value);
        
        const response = await fetch(`${API_URL}/tasks?${params}`);
        if (!response.ok) throw new Error('Error');
        return await response.json();
    } catch (error) {
        showNotification('Error al cargar tareas', 'error');
        return [];
    }
}

async function createTask(taskData) {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Error');
        return await response.json();
    } catch (error) {
        showNotification('Error al crear tarea', 'error');
        return null;
    }
}

async function toggleTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, { method: 'PATCH' });
        if (!response.ok) throw new Error('Error');
        return await response.json();
    } catch (error) {
        showNotification('Error al actualizar', 'error');
        return null;
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
        return response.ok;
    } catch (error) {
        showNotification('Error al eliminar', 'error');
        return false;
    }
}

async function fetchStats() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        if (!response.ok) throw new Error('Error');
        return await response.json();
    } catch (error) { return null; }
}

function renderTasks(tasks) {
    if (tasks.length === 0) {
        tasksList.innerHTML = '<p class="empty-state">No hay tareas. Crea una nueva!</p>';
        return;
    }
    
    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="handleToggle(${task.id})">
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.title)}</div>
                <div class="task-meta">
                    <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                    <span>${escapeHtml(task.category)}</span>
                    ${task.description ? `<span>${escapeHtml(task.description.substring(0, 50))}${task.description.length > 50 ? '...' : ''}</span>` : ''}
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-icon" onclick="handleDelete(${task.id})">X</button>
            </div>
        </div>
    `).join('');
}

function updateStats(stats) {
    if (!stats) return;
    document.getElementById('totalTasks').textContent = stats.total;
    document.getElementById('completedTasks').textContent = stats.completed;
    document.getElementById('pendingTasks').textContent = stats.pending;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem;
        border-radius: 8px; color: white; font-weight: 600; z-index: 1000;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

async function loadTasks() {
    const tasks = await fetchTasks();
    renderTasks(tasks);
    const stats = await fetchStats();
    updateStats(stats);
}

async function handleSubmit(e) {
    e.preventDefault();
    const taskData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value || null,
        priority: document.getElementById('priority').value,
        category: document.getElementById('category').value || 'general'
    };
    const created = await createTask(taskData);
    if (created) {
        showNotification('Tarea creada!');
        taskForm.reset();
        document.getElementById('priority').value = 'medium';
        document.getElementById('category').value = 'general';
        await loadTasks();
    }
}

async function handleToggle(taskId) {
    const updated = await toggleTask(taskId);
    if (updated) { showNotification(updated.completed ? 'Completada!' : 'Reactivada!'); await loadTasks(); }
}

async function handleDelete(taskId) {
    if (!confirm('Eliminar esta tarea?')) return;
    const deleted = await deleteTask(taskId);
    if (deleted) { showNotification('Eliminada'); await loadTasks(); }
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

taskForm.addEventListener('submit', handleSubmit);
filterStatus.addEventListener('change', loadTasks);
filterPriority.addEventListener('change', loadTasks);
searchText.addEventListener('input', debounce(loadTasks, 300));

document.addEventListener('DOMContentLoaded', loadTasks);