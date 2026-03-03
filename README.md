# SmartFall - aplicacion web 

## 📋 Descripción

SmartFall es una plicacin web que tiene un registro de usuario 
   y autenticacion y un area de trabajo basica que  permite arrastrar componentes 

Este proyecto incluye:
- **Frontend**: Aplicación React con área de trabajo visual (drag-and-drop)
- **Backend**: API REST con Django y autenticación JWT
- **Autenticación**: Registro e inicio de sesión de usuarios
- **Workspace**: Sistema modular para crear y gestionar componentes arrastrables

## 🛠 Requisitos

- Python 3.12+
- Node.js 18+
- npm 9+
- PostgreSQL (opcional, actualmente usa SQLite)

## 📦 Instalación

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

El servidor backend estará disponible en `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm start
```

El servidor frontend estará disponible en `http://localhost:3000`

## 🚀 Uso

1. **Registrarse**: Ve a `http://localhost:3000/register` y crea una cuenta
2. **Iniciar sesión**: Con tus credenciales
3. **Crear tableros**: En el workspace, puedes crear nuevos tableros
4. **Añadir componentes**: Usa el botón "+ Add Component" para crear componentes arrastrables
5. **Gestionar componentes**: Arrastra componentes para cambiar su posición, guarda o elimina según sea necesario

## 📂 Estructura del Proyecto

```
.
├── backend/                      # Django REST API
│   ├── smartfall/                # Configuración del proyecto
│   │   ├── settings.py          # Configuración de Django
│   │   ├── urls.py              # URLs principales
│   │   └── wsgi.py              # WSGI app
│   ├── users/                    # App de autenticación
│   │   ├── views.py             # Vistas REST
│   │   ├── serializers.py        # Serializadores
│   │   └── urls.py              # URLs de autenticación
│   ├── workspace/                # App de workspace
│   │   ├── models.py            # Modelos (Board, Component)
│   │   ├── views.py             # ViewSets
│   │   ├── serializers.py        # Serializadores
│   │   └── urls.py              # URLs de workspace
│   ├── manage.py
│   ├── requirements.txt
│   ├── Makefile
│   ├── pytest.ini
│   └── pyproject.toml
├── frontend/                     # Aplicación React
│   ├── src/
│   │   ├── api.js               # Cliente HTTP
│   │   ├── AuthContext.js        # Context de autenticación
│   │   ├── ProtectedRoute.jsx    # Rutas protegidas
│   │   ├── pages/
│   │   │   ├── Auth.jsx          # Login/Register
│   │   │   ├── Auth.css
│   │   │   ├── Workspace.jsx     # Área de trabajo
│   │   │   └── Workspace.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── .eslintrc.json
│   └── .prettierrc
├── .github/workflows/            # CI/CD
│   ├── ci-backend.yml
│   └── ci-frontend.yml
└── README.md                     # Este archivo
```

## 🔐 API Endpoints

### Autenticación

- `POST /api/auth/register/` - Registrar usuario
- `POST /api/auth/token/` - Obtener tokens JWT
- `POST /api/auth/token/refresh/` - Refrescar token
- `GET /api/auth/me/` - Obtener perfil del usuario actual

### Workspace

- `GET /api/workspace/boards/` - Listar tableros
- `POST /api/workspace/boards/` - Crear tablero
- `GET /api/workspace/boards/{id}/` - Obtener tablero
- `PUT /api/workspace/boards/{id}/` - Actualizar tablero
- `DELETE /api/workspace/boards/{id}/` - Eliminar tablero

- `GET /api/workspace/components/` - Listar componentes
- `POST /api/workspace/components/` - Crear componente
- `PATCH /api/workspace/components/{id}/` - Actualizar componente
- `DELETE /api/workspace/components/{id}/` - Eliminar componente

## 🧪 Testing

### Backend

```bash
cd backend
source venv/bin/activate

# Ejecutar tests
make test

# Linting
make lint

# Formatear código
make format
```

### Frontend

```bash
cd frontend

# Run linting
npm run lint

# Fix linting errors
npm run lint:fix

# Format code
npm run format
```

## 🔄 CI/CD

El proyecto incluye workflows de GitHub Actions para:

- **Backend**: Linting (flake8), format check (black, isort), tests (pytest)
- **Frontend**: Linting (ESLint), format check (Prettier), build

Los workflows se ejecutan automáticamente en ramas `develop`, `develop_test` y `main`.

## 🛠 Desarrollo

### Backend

```bash
cd backend
source venv/bin/activate
python manage.py runserver              # Servidor de desarrollo
make lint                                # Validar código
make format                              # Formatear código
make test                                # Ejecutar tests
```

### Frontend

```bash
cd frontend
npm start                                # Servidor de desarrollo
npm run lint                             # Validar código
npm run lint:fix                         # Corregir errores de linting
npm run format                           # Formatear código
npm test                                 # Ejecutar tests
```

## 📝 Variables de Entorno

### Backend

Crear un archivo `.env` en la carpeta `backend/`:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

### Frontend

Crear un archivo `.env` en la carpeta `frontend/`:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

## 🐛 Solución de Problemas

### Backend no inicia

1. Verifica que estés en la carpeta `backend`
2. Activa el virtualenv: `source venv/bin/activate`
3. Ejecuta migraciones: `python manage.py migrate`
4. Intenta nuevamente: `python manage.py runserver`

### Frontend no carga

1. Verifica que el backend esté corriendo en `http://localhost:8000`
2. Limpia caché: `npm cache clean --force`
3. Reinstala dependencias: `rm -rf node_modules && npm install`
4. Inicia nuevamente: `npm start`

### Error de CORS

Asegúrate de que `django-cors-headers` está instalado y configurado en `settings.py`:

```python
CORS_ALLOW_ALL_ORIGINS = True
```

## 📚 Tecnologías Utilizadas

### Backend
- Django 6.0.3
- Django REST Framework 3.16.1
- Django JWT SimpleJWT 5.5.1
- PostgreSQL / SQLite

### Frontend
- React 19.2.4
- React Router 7.13.1
- Axios 1.13.6
- DnD Kit (drag-and-drop)

### DevOps
- GitHub Actions
- Black, isort, flake8
- ESLint, Prettier
- Pytest, Jest

## 👥 Contribuir

Las contribuciones son bienvenidas. Para cambios significativos:

1. Crea una rama (`git checkout -b feature/AmazingFeature`)
2. Realiza tus cambios
3. Haz commits descriptivos (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Por favor asegúrate de que el código pase linting y tests antes de enviar PR.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 📧 Contacto

Para preguntas o sugerencias, contacta al equipo de desarrollo.

---

**Última actualización**: 3 de marzo de 2026
