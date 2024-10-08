// frontend/script.js
const API_BASE_URL = 'http://localhost:3000/api';
let authToken = '';

// Función para mostrar mensajes
const showMessage = (message) => {
    const authMessage = document.getElementById('auth-message');
    authMessage.textContent = message;
};

// Función para mostrar la sección de esculturas
const showSculptureSection = () => {
    document.getElementById('sculpture-section').style.display = 'block';
};

// Función para manejar el registro
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            showMessage('Usuario registrado con éxito. Por favor, inicia sesión.');
        } else {
            showMessage('Error registrando usuario. El nombre de usuario ya existe.');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Ocurrió un error al registrar el usuario.');
    }
});

// Función para manejar el inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            authToken = data.token;
            showMessage('Sesión iniciada correctamente');
            showSculptureSection(); // Mostrar la sección de esculturas
        } else {
            showMessage(data.error || 'Error en el inicio de sesión. Por favor, verifica tus credenciales.');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Ocurrió un error al iniciar sesión.');
    }
});

// Función para manejar la creación de esculturas
document.getElementById('create-sculpture-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('sculpture-name').value;
    const artist = document.getElementById('sculpture-artist').value;
    const year = parseInt(document.getElementById('sculpture-year').value);
    const material = document.getElementById('sculpture-material').value;
    const location = document.getElementById('sculpture-location').value;

    try {
        const response = await fetch(`${API_BASE_URL}/sculptures`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ name, artist, year, material, location }),
        });

        if (response.ok) {
            alert('Escultura creada con éxito');
        } else {
            alert('Error creando escultura');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Función para obtener las esculturas
document.getElementById('fetch-sculptures').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/sculptures`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });

        const sculptures = await response.json();
        const sculptureList = document.getElementById('sculpture-list');
        sculptureList.innerHTML = '';

        if (sculptures.length > 0) {
            sculptures.forEach((sculpture) => {
                const div = document.createElement('div');
                div.textContent = `${sculpture.name} por ${sculpture.artist} (${sculpture.year}) - ${sculpture.material} en ${sculpture.location}`;
                sculptureList.appendChild(div);
            });
        } else {
            sculptureList.textContent = 'No hay esculturas disponibles.';
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error obteniendo las esculturas. Por favor, intenta de nuevo.');
    }
});
