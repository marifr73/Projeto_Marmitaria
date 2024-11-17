function mostraSenha() {
    const inputPass = document.getElementById('senha');
    const btnShowPass = document.getElementById('btn-senha');
    if (inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text');
        btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
        inputPass.setAttribute('type', 'password');
        btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
}

function ajustarCampo() {
    const tipo = document.getElementById('tipo').value;
    const documento = document.getElementById('documento');
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

function validarParaLogin(event) {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%*?&])[A-Za-z\d!@#$%*?&]{8,}$/;
    if (!nome) {
        alert('Por favor, insira seu nome.');
        event.preventDefault();
    } else if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de email válido.');
        event.preventDefault();
    } else if (!senhaRegex.test(senha)) {
        alert('A senha deve conter pelo menos 8 caracteres, incluindo letras, números e um caractere especial.');
        event.preventDefault();
    } else {
        window.location.href = "login_marmitaria.html";
    }
}

function validarParaMarmitaria(event) {
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const documento = document.getElementById('documento').value;
    const numDocumento = document.getElementById('num_documento').value;
    if (!nome) {
        alert('Por favor, insira o nome do estabelecimento.');
        event.preventDefault();
    } else if (!tipo) {
        alert('Por favor, selecione o tipo de documento.');
        event.preventDefault();
    } else if (!documento) {
        alert('Por favor, insira o CPF ou CNPJ.');
        event.preventDefault();
    } else if (!numDocumento) {
        alert('Por favor, insira o número do documento.');
        event.preventDefault();
    } else {
        window.location.href = "inicio.html";
    }
}

document.getElementById('btn-submit-login').addEventListener('click', validarParaLogin);
document.getElementById('btn-submit-marmitaria').addEventListener('click', validarParaMarmitaria);