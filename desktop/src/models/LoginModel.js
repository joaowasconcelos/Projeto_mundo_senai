const conectarBancoDeDados = require("../config/db")

async function selectLogin(objLogin) {
    console.log('HELP =>', objLogin.login, objLogin.senha);
    const bd = await conectarBancoDeDados();
    try {
        console.log(objLogin.login, objLogin.senha);
        await bd.beginTransaction();

        const selectLogin = await bd.query(`
            SELECT 
                lo.id,
                lo.login,
                lo.senha,
                pe.tipo
            FROM
                tbl_login AS lo
            INNER JOIN tbl_perfis AS pe
            ON lo.id= pe.login_id
            inner join tbl_pessoa AS p
            ON lo.pessoa_id=p.id
            WHERE lo.login=? AND lo.senha=?;`, [objLogin.login, objLogin.senha]);

        const perfilLogin = selectLogin[0][0].tipo
        return perfilLogin
    }
    catch (error) {
        // if (result.length === 0) {
        //     res.json({ success: false, message: 'Usuário não encontrado' });
        //     return;
        // }

        // if (error) {
        //     console.error('Erro ao consultar o banco de dados:', error);
        //     res.status(500).json({ success: false, message: 'Erro no servidor' });
        //     return;
        // }
    }
}

async function verificarSenha() {
    const bd = conectarBancoDeDados()
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            console.error('Erro ao comparar as senhas:', err);
            res.status(500).json({ success: false, message: 'Erro no servidor' });
            return;
        }

        if (isMatch) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Senha incorreta' });
        }
    });
}



module.exports = { selectLogin, verificarSenha }
