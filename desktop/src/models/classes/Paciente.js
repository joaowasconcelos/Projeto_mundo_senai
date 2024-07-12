const Pessoa = require("../classes/Pessoa")

class Paciente extends Pessoa {
    constructor(pId, pCpf, pNome, pDataNasc, pGenero, pEmail) {
        super(pId, pCpf, pNome, pDataNasc, pGenero, pEmail);
    }
}

module.exports = Paciente;