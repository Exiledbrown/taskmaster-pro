// ============================================
// TaskMaster Pro - Sistema de Traducciones
// Idiomas: Español, Inglés, Chino
// ============================================

const translations = {
    es: {
        appTitle: "TaskMaster Pro",
        appSubtitle: "Gestion profesional de tareas",
        statTotal: "Total",
        statCompleted: "Completadas",
        statPending: "Pendientes",
        formTitle: "Nueva Tarea",
        placeholderTitle: "Titulo de la tarea *",
        placeholderDescription: "Descripcion (opcional)",
        placeholderCategory: "Categoria",
        defaultCategory: "general",
        priorityLow: "Baja",
        priorityMedium: "Media",
        priorityHigh: "Alta",
        btnCreate: "Crear Tarea",
        filtersTitle: "Filtros",
        filterAllStatus: "Todos los estados",
        filterCompleted: "Completadas",
        filterPending: "Pendientes",
        filterAllPriorities: "Todas las prioridades",
        filterPriorityLow: "Baja",
        filterPriorityMedium: "Media",
        filterPriorityHigh: "Alta",
        placeholderSearch: "Buscar...",
        btnRefresh: "Actualizar",
        tasksTitle: "Mis Tareas",
        emptyState: "No hay tareas. Crea una nueva!",
        msgTaskCreated: "Tarea creada exitosamente",
        msgTaskCompleted: "Tarea completada",
        msgTaskReactivated: "Tarea reactivada",
        msgTaskDeleted: "Tarea eliminada",
        msgErrorLoad: "Error al cargar tareas",
        msgErrorCreate: "Error al crear tarea",
        msgErrorUpdate: "Error al actualizar tarea",
        msgErrorDelete: "Error al eliminar tarea",
        confirmDelete: "Estas seguro de eliminar esta tarea?",
        language: "Idioma"
    },
    
    en: {
        appTitle: "TaskMaster Pro",
        appSubtitle: "Professional task management",
        statTotal: "Total",
        statCompleted: "Completed",
        statPending: "Pending",
        formTitle: "New Task",
        placeholderTitle: "Task title *",
        placeholderDescription: "Description (optional)",
        placeholderCategory: "Category",
        defaultCategory: "general",
        priorityLow: "Low",
        priorityMedium: "Medium",
        priorityHigh: "High",
        btnCreate: "Create Task",
        filtersTitle: "Filters",
        filterAllStatus: "All statuses",
        filterCompleted: "Completed",
        filterPending: "Pending",
        filterAllPriorities: "All priorities",
        filterPriorityLow: "Low",
        filterPriorityMedium: "Medium",
        filterPriorityHigh: "High",
        placeholderSearch: "Search...",
        btnRefresh: "Refresh",
        tasksTitle: "My Tasks",
        emptyState: "No tasks. Create a new one!",
        msgTaskCreated: "Task created successfully",
        msgTaskCompleted: "Task completed",
        msgTaskReactivated: "Task reactivated",
        msgTaskDeleted: "Task deleted",
        msgErrorLoad: "Error loading tasks",
        msgErrorCreate: "Error creating task",
        msgErrorUpdate: "Error updating task",
        msgErrorDelete: "Error deleting task",
        confirmDelete: "Are you sure you want to delete this task?",
        language: "Language"
    },
    
    zh: {
        appTitle: "TaskMaster Pro",
        appSubtitle: "专业任务管理系统",
        statTotal: "总计",
        statCompleted: "已完成",
        statPending: "待处理",
        formTitle: "新建任务",
        placeholderTitle: "任务标题 *",
        placeholderDescription: "描述（可选）",
        placeholderCategory: "类别",
        defaultCategory: "一般",
        priorityLow: "低",
        priorityMedium: "中",
        priorityHigh: "高",
        btnCreate: "创建任务",
        filtersTitle: "筛选",
        filterAllStatus: "所有状态",
        filterCompleted: "已完成",
        filterPending: "待处理",
        filterAllPriorities: "所有优先级",
        filterPriorityLow: "低",
        filterPriorityMedium: "中",
        filterPriorityHigh: "高",
        placeholderSearch: "搜索...",
        btnRefresh: "刷新",
        tasksTitle: "我的任务",
        emptyState: "没有任务。创建一个新任务！",
        msgTaskCreated: "任务创建成功",
        msgTaskCompleted: "任务已完成",
        msgTaskReactivated: "任务已重新激活",
        msgTaskDeleted: "任务已删除",
        msgErrorLoad: "加载任务时出错",
        msgErrorCreate: "创建任务时出错",
        msgErrorUpdate: "更新任务时出错",
        msgErrorDelete: "删除任务时出错",
        confirmDelete: "确定要删除此任务吗？",
        language: "语言"
    }
};

let currentLang = localStorage.getItem('taskmaster-lang') || 'es';

function t(key) {
    return translations[currentLang][key] || key;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('taskmaster-lang', lang);
    
    // Actualizar el select del idioma
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = lang;
    }
    
    updateUI();
}

function updateUI() {
    // Header
    const headerTitle = document.querySelector('header h1');
    const headerSubtitle = document.querySelector('header p');
    if (headerTitle) headerTitle.textContent = t('appTitle');
    if (headerSubtitle) headerSubtitle.textContent = t('appSubtitle');
    
    // Stats labels
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].textContent = t('statTotal');
    if (statLabels[1]) statLabels[1].textContent = t('statCompleted');
    if (statLabels[2]) statLabels[2].textContent = t('statPending');
    
    // Form
    const formTitle = document.querySelector('.task-form h2');
    if (formTitle) formTitle.textContent = t('formTitle');
    
    const titleInput = document.getElementById('title');
    if (titleInput) titleInput.placeholder = t('placeholderTitle');
    
    const descInput = document.getElementById('description');
    if (descInput) descInput.placeholder = t('placeholderDescription');
    
    const categoryInput = document.getElementById('category');
    if (categoryInput) {
        categoryInput.placeholder = t('placeholderCategory');
        categoryInput.value = t('defaultCategory');
    }
    
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) btnPrimary.textContent = t('btnCreate');
    
    // Priority options
    const prioritySelect = document.getElementById('priority');
    if (prioritySelect) {
        prioritySelect.options[0].text = t('priorityLow');
        prioritySelect.options[1].text = t('priorityMedium');
        prioritySelect.options[2].text = t('priorityHigh');
    }
    
    // Filters
    const filtersTitle = document.querySelector('.filters h3');
    if (filtersTitle) filtersTitle.textContent = t('filtersTitle');
    
    const filterStatus = document.getElementById('filterStatus');
    if (filterStatus) {
        filterStatus.options[0].text = t('filterAllStatus');
        filterStatus.options[1].text = t('filterCompleted');
        filterStatus.options[2].text = t('filterPending');
    }
    
    const filterPriority = document.getElementById('filterPriority');
    if (filterPriority) {
        filterPriority.options[0].text = t('filterAllPriorities');
        filterPriority.options[1].text = t('filterPriorityLow');
        filterPriority.options[2].text = t('filterPriorityMedium');
        filterPriority.options[3].text = t('filterPriorityHigh');
    }
    
    const searchInput = document.getElementById('searchText');
    if (searchInput) searchInput.placeholder = t('placeholderSearch');
    
    const btnSecondary = document.querySelector('.btn-secondary');
    if (btnSecondary) btnSecondary.textContent = t('btnRefresh');
    
    // Tasks
    const tasksTitle = document.querySelector('.tasks-container h2');
    if (tasksTitle) tasksTitle.textContent = t('tasksTitle');
    
    // Recargar tareas para actualizar textos dinamicos
    if (typeof loadTasks === 'function') {
        loadTasks();
    }
}