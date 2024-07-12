const conectarBancoDeDados = require("../config/db")
const bcrypt = require('bcrypt');

async function selectLogin(objLogin) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();

        const selectLogin = await bd.query(`
            SELECT
            p.nome,
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

        const perfilLogin = selectLogin[0][0]
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

async function verificarSenha(senhaFornecida, senhaHash) {
    try {
        const isMatch = await bcrypt.compare(senhaFornecida, senhaHash);
        return isMatch;
    } catch (err) {
        console.error('Erro ao comparar as senhas:', err);
        throw err;
    }
}


module.exports = { selectLogin, verificarSenha }
