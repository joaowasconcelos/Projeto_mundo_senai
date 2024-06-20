class Pessoa {
    constructor(pId, pCpf, pNome, pDataNasc, pGenero, pEmail) {
        this.id = pId
        this.cpf = pCpf;
        this.nome = pNome;
        this.dataNasc = pDataNasc;
        this.genero = pGenero;
        this.email = pEmail;
    }

    get Id() { return this.id; }

    get Cpf() { return this.cpf; }
    set Cpf(sCpf) { this.cpf = sCpf; }

    get Nome() { return this.nome }
    set Nome(sNome) { this.nome = sNome; }

    get DataNasc() { return this.dataNasc }
    set DataNasc(sDataNasc) { this.dataNasc = sDataNasc; }

    get Genero() { return this.genero }
    set Genero(sGenero) { this.genero = sGenero; }

    get Email() { return this.email }
    set Email(sEmail) { this.email = sEmail; }


    DataConvert(value) {
        let [dia, mes, ano] = value.split('/');
        let dataFormatada = `${ano}-${mes}-${dia}`;
        this.dataNasc = new Date(dataFormatada);
        return this.DataNasc
    }
    
    validaCampos() {
        return (
            this.cpf &&
            this.nome &&
            this.dataNasc &&
            this.genero &&
            this.email
        )
    }

    validaCpf() {
        // Remover caracteres especiais do CPF
        let value = this.cpf.replace(/[.-]/g, '');

        // Verificar se o CPF tem 11 dígitos, caso negativo, retorna false
        if (value.length !== 11) {
            return false;
        }

        // Verificar se todos os dígitos são iguais, caso positivo, retorna false
        if (/^(\d)\1{10}$/.test(value)) {
            return false;
        }

        // Inicia o cálculo para avaliar se o número informado é um CPF válido

        // Calcular o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(value.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

        // Verificar se o primeiro dígito verificador está correto
        if (digitoVerificador1 !== parseInt(value.charAt(9))) {
            return false;
        }

        // Calcular o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(value.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

        // Verificar se o segundo dígito verificador está correto
        if (digitoVerificador2 !== parseInt(value.charAt(10))) {
            return false;
        }
        this.Cpf = value;
        // CPF válido
        return true;
    }
}


module.exports = Pessoa;