const conectarBancoDeDados = require("../config/db")

async function selectTipo(tipo) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const Tipo= await bd.query(`SELECT tipo FROM tbl_perfis WHERE cpf = ?;`, [tipo]);
    } catch (error) {
        
    }
}

async function deletarPerfil(id) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const [res] = await bd.query('DELETE FROM tbl_perfis WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE perfil =>', res);
        if (res.affectedRows === 0) {
            throw new Error('Perfil não encontrado');
        }else {
            await bd.commit();
            return res;
        }
    } catch (error) {
        console.error('Erro ao deletar Perfil:', error);
        await bd.rollback();
        return { error: 'Falha no delete', details: error };
    } finally {
        await bd.release();
    }
}

module.exports = { selectTipo,deletarPerfil };