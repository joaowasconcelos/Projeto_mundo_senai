class Login {
    constructor(pId, pLogin, pSenha, pStatus,pPessoaId,pPessoaEnderecoId) {
        this.id = pId;
        this.login = pLogin;
        this.senha = pSenha;
        this.status = pStatus;
        this.pessoaID = pPessoaId;
        this.pessoaEnderecoId  = pPessoaEnderecoId;
    }

    get Id() { return this.id; }

    get Login() { return this.login; }
    set Login(sLogin) { this.login = sLogin; }

    get Senha() { return this.senha; }
    set Senha(sSenha) { this.senha = sSenha; }

    get Status() { return this.status; }
    set Status(sStatus) { this.status = sStatus; }

    get PessoaId() { return this.PessoaId; }
    set PessoaId(sPessoaId) { this.PessoaId = sPessoaId; }

    get PessoaEnderecoId() { return this.pessoaEnderecoId; }
    set PessoaEnderecoId(sPessoaEnderecoId) { this.pessoaEnderecoId = sPessoaEnderecoId; }

    validaCampos(){
        return(
            this.Login&&
            this.Senha&&
            this.status
        )
    }
}

module.exports = Login;