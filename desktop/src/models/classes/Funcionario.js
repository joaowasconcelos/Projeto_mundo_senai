const Pessoa = require("../classes/Pessoa");

class Funcionario extends Pessoa {
    constructor(pId, pCpf, pNome, pDataNasc, pGenero, pEmail, pDataAdmissao, pCrm) {
        super(pId, pCpf, pNome, pDataNasc, pGenero, pEmail);
        this.crm = pCrm;

        if (pDataAdmissao === null) {
            this.dataAdmissao = pDataAdmissao;
        } else {
            this.dataAdmissao = this.DataConvert(pDataAdmissao);
        }
    }

    get DataAdmissao() { return this.dataAdmissao; }
    set DataAdmissao(sDataAdmissao) { this.dataAdmissao = sDataAdmissao; }

    get Crm() { return this.crm; }
    set Crm(sCRM) { this.crm = sCRM; }

  
    DataConvert(value) {
        console.log()
        let [dia, mes, ano] = value.split('/');
        let dataFormatada = `${ano}-${mes}-${dia}`;
        this.dataAdmissao = new Date(dataFormatada);
        return this.DataAdmissao
    }
    
    validaCampos() {
        return (
            this.DataAdmissao 
        )
    }
}

module.exports = Funcionario;
