# TaskMaster Pro

Sistema profesional de gestión de tareas con API REST completa.

## Tecnologías
- Python 3.11 + FastAPI
- SQLite + SQLAlchemy
- JavaScript vanilla + CSS3

## Características
- CRUD completo de tareas
- Filtros y búsqueda avanzada
- Dashboard de estadísticas en tiempo real
- Interfaz moderna con tema oscuro

## Instalación
```bash
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
cd frontend && python3 -m http.server 3000

API Endpoints

| Método | Endpoint               | Descripción            |
| ------ | ---------------------- | ---------------------- |
| POST   | `/tasks`               | Crear tarea            |
| GET    | `/tasks`               | Listar tareas          |
| GET    | `/tasks/{id}`          | Obtener tarea          |
| PUT    | `/tasks/{id}`          | Actualizar tarea       |
| DELETE | `/tasks/{id}`          | Eliminar tarea         |
| PATCH  | `/tasks/{id}/complete` | Completar/descompletar |
| GET    | `/stats`               | Estadísticas           |

Documentación interactiva
Una vez iniciado el backend, accede a:
http://localhost:8000/docs


## Resumen comandos

| ¿Qué necesitas?       | Comando                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------|
| **Iniciar backend**   | `cd backend && source venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`|
| **Iniciar frontend**  | `cd frontend && python3 -m http.server 3000`|
| **Ver API**           | `curl http://localhost:8000/health`|
| **Ver app web**       | Chromium → `http://localhost:3000`|
| **Ver documentación** | Chromium → `http://localhost:8000/docs`|