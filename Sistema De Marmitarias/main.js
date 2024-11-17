// Função para obter as marmitarias do localStorage
function obterMarmitarias() {
    const marmitarias = localStorage.getItem('marmitarias');
    return marmitarias ? JSON.parse(marmitarias) : [];
}

// Função para salvar as marmitarias no localStorage
function salvarMarmitarias(marmitarias) {
    localStorage.setItem('marmitarias', JSON.stringify(marmitarias));
}

// Função para validar o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove qualquer caractere não numérico

    // Verifica se o CPF tem 11 números
    if (cpf.length !== 11) return false;

    // Verifica se o CPF não é de números repetidos (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Valida o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;
    if (parseInt(cpf[9]) !== resto) return false;

    // Valida o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;
    if (parseInt(cpf[10]) !== resto) return false;

    return true;
}

// Função para validar o CNPJ
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove qualquer caractere não numérico

    // Verifica se o CNPJ tem 14 números
    if (cnpj.length !== 14) return false;

    // Valida o primeiro dígito verificador
    let soma = 0;
    const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) soma += parseInt(cnpj[i]) * pesos[i + 1];
    let resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;
    if (parseInt(cnpj[12]) !== resto) return false;

    // Valida o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 13; i++) soma += parseInt(cnpj[i]) * pesos[i];
    resto = soma % 11;
    if (resto < 2) resto = 0;
    else resto = 11 - resto;
    if (parseInt(cnpj[13]) !== resto) return false;

    return true;
}

// Função para mostrar ou esconder a senha
function alternarSenha() {
    const senhaInput = document.getElementById('senha');
    const iconeSenha = document.getElementById('btn-senha');
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        iconeSenha.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
        senhaInput.type = 'password';
        iconeSenha.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
}

// Função para ajustar o campo de documento (CPF ou CNPJ) com base na escolha
function ajustarCampoDocumento() {
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

// Função para validar o login do usuário
function validarLogin(event) {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const emailValido = email.includes('@') && email.includes('.'); 
    const senhaValida = senha.length >= 8 && /\d/.test(senha) && /[A-Za-z]/.test(senha) && /[!@#$%*?&]/.test(senha);

    if (!emailValido) {
        alert('Por favor, insira um email válido.');
        event.preventDefault();
    } else if (!senhaValida) {
        alert('A senha deve ter pelo menos 8 caracteres, incluindo números, letras e um caractere especial.');
        event.preventDefault();
    } else {
        alert('Login realizado com sucesso!');
        window.location.href = 'inicio.html';
    }
}

// Função para cadastrar uma nova marmitaria
function cadastrarMarmitaria(event) {
    const nome = document.getElementById('nome').value.trim();
    const tipo = document.getElementById('tipo').value;
    const documento = document.getElementById('documento').value.trim();
    const numDocumento = document.getElementById('num_documento').value.trim();

    if (!nome || !tipo || !documento || !numDocumento) {
        alert('Preencha todos os campos!');
        event.preventDefault();
        return;
    }

    // Validação de CPF ou CNPJ
    if (tipo === 'cpf' && !validarCPF(documento)) {
        alert('CPF inválido!');
        event.preventDefault();
        return;
    } else if (tipo === 'cnpj' && !validarCNPJ(documento)) {
        alert('CNPJ inválido!');
        event.preventDefault();
        return;
    }

    // Verificação de duplicação de marmitarias
    const marmitarias = obterMarmitarias();
    const marmitariaExistente = marmitarias.some(marmitaria => marmitaria.nome === nome);
    if (marmitariaExistente) {
        alert('Já existe uma marmitaria com esse nome!');
        event.preventDefault();
        return;
    }

    // Adiciona a nova marmitaria
    marmitarias.push({ nome, tipo, documento, numDocumento });

    // Salva novamente no localStorage
    salvarMarmitarias(marmitarias);

    alert('Marmitaria cadastrada com sucesso!');
    window.location.href = 'inicio.html';
}

// Função para exibir as marmitarias cadastradas
function mostrarMarmitarias() {
    const lista = document.getElementById('marmitarias-lista');
    lista.innerHTML = '';

    // Obtém as marmitarias do localStorage
    const marmitarias = obterMarmitarias();

    if (marmitarias.length === 0) {
        lista.innerHTML = '<li>Nenhuma marmitaria cadastrada.</li>';
    } else {
        marmitarias.forEach((marmitaria, index) => {
            const item = document.createElement('li');
            item.textContent = `${index + 1}. ${marmitaria.nome} - (${marmitaria.tipo.toUpperCase()}): ${marmitaria.documento}`;
            lista.appendChild(item);
        });
    }

    document.getElementById('lista-marmitarias').style.display = 'block';
}

// Função para adicionar ações aos botões
function adicionarAcoes() {
    document.getElementById('btn-senha')?.addEventListener('click', alternarSenha);
    document.getElementById('btn-submit-login')?.addEventListener('click', validarLogin);
    document.getElementById('btn-submit-marmitaria')?.addEventListener('click', cadastrarMarmitaria);
    document.getElementById('listar-marmitarias')?.addEventListener('click', mostrarMarmitarias);

    // Botão de cadastro de marmitaria
    document.getElementById('cadastrar-btn')?.addEventListener('click', () => window.location.href = 'login_marmitaria.html');

    // Botão de voltar para a tela de login
    document.getElementById('entrar-btn')?.addEventListener('click', () => window.location.href = 'login.html');

    // Botão de cancelar, retorna à tela inicial
    document.getElementById('cancelar-btn')?.addEventListener('click', () => window.location.href = 'inicio.html');
    
    // Botão de voltar para o login
    document.getElementById('voltar-btn')?.addEventListener('click', () => window.location.href = 'login.html');
}

adicionarAcoes(); 
