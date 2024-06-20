class Perfis {
    constructor(pid, ptipo, ploginId,ploginPessoaId,ploginPessoaEnderecoId) {
        this.id = pid;
        this.tipo = ptipo;
        this.loginId = ploginId;
        this.loginPessoaId = ploginPessoaId;
        this.loginPessoaEnderecoId = ploginPessoaEnderecoId;
    }
    get Id() { return this.id; }

    get Tipo() { return this.tipo; }
    set Tipo(sTipo) { this.tipo = sTipo; }

    get LoginId() {return this.loginId;}

    get LoginPessoaId() {return this.loginPessoaId;}
    get LoginPessoaEnderecoId() {return this.loginPessoaEnderecoId;}

    validaCampos(){
        return(
            this.Tipo
        )
    }

}
module.exports = Perfis