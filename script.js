const firebaseConfig = {
    apiKey: "AIzaSyDhvUNJVDZvJrWUKqjEHFueJbU7qK0gQTQ",
    authDomain: "datos-de-formulario-b8cb0.firebaseapp.com",
    projectId: "datos-de-formulario-b8cb0",
    storageBucket: "datos-de-formulario-b8cb0.firebasestorage.app",
    messagingSenderId: "1071077376927",
    appId: "1:1071077376927:web:1ceb87eb29ef00e66db3aa",
    measurementId: "G-VD8L059NSF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //Validar correo electronico
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor introducí un mail válido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //Validar la contra
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contra debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales. '
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    //Campos validos enviar form
    if (!errorNombre.textContent && !emailEntrada.textContent && !contrasenaError.textContent) {

        //BACKEND que reciba la info

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value,
        })
            .then((docRef) => {
                alert('El formulario se ha enviado con exito', docRef.id)
                document.getElementById('formulario').reset();
            })
            .catch((error) => {
                alert(error)
            });



    }
})