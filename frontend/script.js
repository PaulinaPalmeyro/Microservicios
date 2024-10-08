// frontend/script.js
const API_BASE_URL = 'http://localhost:3000/api';
let authToken = '';
let editingSculptureId = null; // Para almacenar el ID de la escultura que se está editando

// Función para mostrar mensajes
const showMessage = (message) => {
    const authMessage = document.getElementById('auth-message');
    authMessage.textContent = message;
};

// Función para mostrar la sección de esculturas
const showSculptureSection = () => {
    document.getElementById('sculpture-section').style.display = 'block';
    fetchSculptures(); // Cargar esculturas al mostrar la sección
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
        const method = editingSculptureId ? 'PUT' : 'POST';
        const url = editingSculptureId ? `${API_BASE_URL}/sculptures/${editingSculptureId}` : `${API_BASE_URL}/sculptures`;

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ name, artist, year, material, location }),
        });

        if (response.ok) {
            if (editingSculptureId) {
                showMessage('Escultura actualizada con éxito');
            } else {
                alert('Escultura creada con éxito');
            }
            resetForm();
            fetchSculptures(); // Refrescar la lista de esculturas
        } else {
            alert('Error creando o actualizando escultura');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Función para obtener las esculturas
const fetchSculptures = async () => {
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
                
                // Botón de editar
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.onclick = () => editSculpture(sculpture);
                
                // Botón de eliminar
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.onclick = () => deleteSculpture(sculpture._id);
                
                div.appendChild(editButton);
                div.appendChild(deleteButton);
                sculptureList.appendChild(div);
            });
        } else {
            sculptureList.textContent = 'No hay esculturas disponibles.';
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error obteniendo las esculturas. Por favor, intenta de nuevo.');
    }
};

// Función para eliminar esculturas
const deleteSculpture = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta escultura?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/sculptures/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                alert('Escultura eliminada con éxito');
                fetchSculptures(); // Refrescar la lista de esculturas
            } else {
                alert('Error eliminando escultura');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

// Función para editar esculturas
const editSculpture = (sculpture) => {
    document.getElementById('sculpture-name').value = sculpture.name;
    document.getElementById('sculpture-artist').value = sculpture.artist;
    document.getElementById('sculpture-year').value = sculpture.year;
    document.getElementById('sculpture-material').value = sculpture.material;
    document.getElementById('sculpture-location').value = sculpture.location;
    editingSculptureId = sculpture._id; // Guardar el ID para editar
};

// Función para resetear el formulario
const resetForm = () => {
    document.getElementById('create-sculpture-form').reset();
    editingSculptureId = null; // Resetear ID de edición
};
