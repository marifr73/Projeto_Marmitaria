function mostraSenha() {
    var inputPass = document.getElementById('senha');
    var btnShowPass = document.getElementById('btn-senha');

    if (inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text');
        btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
        inputPass.setAttribute('type', 'password');
        btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
}

function ajustarCampo() {
    var tipo = document.getElementById('tipo').value;
    var documento = document.getElementById('documento');
    
    if (tipo === 'cpf') {
        documento.setAttribute('pattern', '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}');
        documento.setAttribute('title', 'Formato esperado: 000.000.000-00');
        documento.setAttribute('placeholder', '000.000.000-00');
    } else if (tipo === 'cnpj') {
        documento.setAttribute('pattern', '\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2}');
        documento.setAttribute('title', 'Formato esperado: 00.000.000/0000-00');
        documento.setAttribute('placeholder', '00.000.000/0000-00');
    }
}

function validarEmail(event) {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%*?&])[A-Za-z\d!@#$%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de email válido.');
        event.preventDefault();
    } else if (!senhaRegex.test(senha)) {
        alert('A senha deve conter pelo menos 8 caracteres, incluindo letras, números e um caractere especial.');
        event.preventDefault();
    } else {
        var formAction = document.createElement('form');
        formAction.action = "login_marmitaria.html";
        document.body.appendChild(formAction);
        formAction.submit();
    }
}

document.getElementById('btn-submit').addEventListener('click', validarEmail);
