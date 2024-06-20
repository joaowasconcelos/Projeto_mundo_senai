class Prontuario {
    constructor(pId, pDiagnostico, pMedicacao) {
        this.id = pId;
        this.diagnostico = pDiagnostico;
        this.medicacao = pMedicacao;
    }

    get Id() { return this.id; }

    get Diagnostico() { return this.diagnostico; }
    set Diagnostico(sDiagnostico) { this.diagnostico = sDiagnostico; }

    get Medicacao() { return this.medicacao; }
    set Medicacao(sMedicacao) { this.medicacao = sMedicacao; }

    validaCampos(){
        return(
            this.Diagnostico&&
            this.Medicacao
        )
    }
}

module.exports = Prontuario;