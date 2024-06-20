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
        if (value === null || value === undefined) {
            return null;
        } else {
            let [dia, mes, ano] = value.split('/');
            if (!dia || !mes || !ano) {
                throw new Error('Formato de data inválido');
            }
            let dataFormatada = `${ano}-${mes}-${dia}`;
            return dataFormatada;
        }
    }
    
    validaCampos() {
        return (
            this.DataAdmissao 
        )
    }
}

module.exports = Funcionario;
