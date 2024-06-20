class Especialidade {
    constructor(pId, pDescEspecialidade) {
        this.id = pId;
        this._descEspecialidade = pDescEspecialidade;
    }

    get Id() {
        return this.id;
    }

    get descEspecialidade() {
        return this._descEspecialidade;
    }

    set descEspecialidade(sDescEspecialidade) {
        this._descEspecialidade = sDescEspecialidade;
    }

    validaCampos() {
        return !!this._descEspecialidade;
    }
}

module.exports = Especialidade;
