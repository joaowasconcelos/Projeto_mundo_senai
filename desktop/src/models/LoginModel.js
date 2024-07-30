const conectarBancoDeDados = require("../config/db")
const bcrypt = require('bcrypt');

async function selectLogin(objLogin) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();

        const selectLogin = await bd.query(`
          SELECT
    p.nome AS nome_pessoa,
    lo.pessoa_id AS id,
    lo.login,
    lo.senha,
    GROUP_CONCAT(pe.tipo ORDER BY pe.tipo SEPARATOR ', ') AS tipo
    FROM
        tbl_login AS lo
    INNER JOIN tbl_perfis AS pe ON lo.id = pe.login_id
    INNER JOIN tbl_pessoa AS p ON lo.pessoa_id = p.id
    WHERE lo.login = ? AND lo.senha = ?
    GROUP BY lo.login, lo.senha, p.nome, lo.pessoa_id;`, [objLogin.login, objLogin.senha]);

        const perfilLogin = selectLogin[0]
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

async function deletarLogin(id) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const [res] = await bd.query('DELETE FROM tbl_login WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE LOGIN =>', res);
        if (res.affectedRows === 0) {
            throw new Error('Login não encontrado');
        }else {
            await bd.commit();
            return res;
        }

    }catch (error) {
        console.error('Erro ao deletar Login:', error);
        await bd.rollback();
        return { error: 'Falha no delete', details: error };
    } finally {
        await bd.release();
    }
}



module.exports = { selectLogin, verificarSenha,deletarLogin }

