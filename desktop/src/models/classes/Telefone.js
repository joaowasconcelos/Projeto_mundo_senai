class Telefone {
    constructor(pId, pNumeroTelefone) {
        this.id = pId;
        this.numeroTelefone = pNumeroTelefone || [];
    }

    get Id() { return this.id; }

    get NumerosTelefone() { return this.numeroTelefone; }
    set NumerosTelefone(sNumeroTelefone) { this.numeroTelefone = sNumeroTelefone; }

    validaCampos() {
        return this.numeroTelefone;
    }

    telefone_validation(telefone) {
        // Remove todos os caracteres não numéricos
        telefone = telefone.replace(/\D/g, '');

        // Verifica se a quantidade de números está correta
        if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

        // Se tiver 11 dígitos, o terceiro dígito deve ser 9 (para números móveis)
        if (telefone.length == 11 && parseInt(telefone[2]) !== 9) return false;

        // Verifica por sequências repetidas do mesmo dígito
        for (let n = 0; n < 10; n++) {
            const repetido10 = new Array(11).join(n);
            const repetido11 = new Array(12).join(n);
            if (telefone === repetido10 || telefone === repetido11) return false;
        }

        // Códigos DDD válidos
        const codigosDDD = [
            11, 12, 13, 14, 15, 16, 17, 18, 19,
            21, 22, 24, 27, 28, 31, 32, 33, 34,
            35, 37, 38, 41, 42, 43, 44, 45, 46,
            47, 48, 49, 51, 53, 54, 55, 61, 62,
            64, 63, 65, 66, 67, 68, 69, 71, 73,
            74, 75, 77, 79, 81, 82, 83, 84, 85,
            86, 87, 88, 89, 91, 92, 93, 94, 95,
            96, 97, 98, 99
        ];

        // Verifica se o DDD é válido
        if (!codigosDDD.includes(parseInt(telefone.substring(0, 2)))) return false;

        // Validação adicional para números antes de 2017
        if (new Date().getFullYear() < 2017) return true;
        if (telefone.length == 10 && ![2, 3, 4, 5, 7].includes(parseInt(telefone[2]))) return false;

        // Se passou por todas as validações acima, então está tudo certo
        return true;
    }

}

module.exports = Telefone;
