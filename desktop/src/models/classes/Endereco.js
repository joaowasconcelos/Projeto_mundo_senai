class Endereco {
    constructor(pId, pLogradouro, pBairro, pEstado, pNumeroEndereco, pComplementoEndereco, pCep) {
        this.id = pId
        this.logradouro = pLogradouro;
        this.bairro = pBairro;
        this.estado = pEstado;
        this.numeroEndereco = pNumeroEndereco;
        this.complementoEndereco = pComplementoEndereco;
        this.cep = pCep;
    }
    get Id() { return this.id; }

    get Logradouro() { return this.logradouro; }
    set Logradouro(sLogradouro) { this.logradouro = sLogradouro; }

    get Bairro() { return this.bairro; }
    set Bairro(sBairro) { this.bairro = sBairro; }

    get Estado() { return this.estado; }
    set Estado(sEstado) { this.estado = sEstado; }

    get NumeroEndereco() { return this.numeroEndereco; }
    set NumeroEndereco(sNumeroEndereco) { this.numeroEndereco = sNumeroEndereco; }

    get ComplementoEndereco() { return this.complementoEndereco; }
    set ComplementoEndereco(sComplementoEndereco) { this.complementoEndereco = sComplementoEndereco; }

    get Cep() { return this.cep; }
    set Cep(sCep) { this.cep = sCep; }

    validaCampos(){
        return(
            this.logradouro&&
            this.bairro&&
            this.estado&&
            this.numeroEndereco&&
            this.cep
        )
    }
}

module.exports = Endereco;