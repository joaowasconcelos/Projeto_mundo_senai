const conectarBancoDeDados = require("../config/db");

async function selectEspecialidades() {
    console.log("emtrou")
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();

        const resEspecialidade = await bd.query('SELECT * FROM tbl_especialidade');
        console.log(resEspecialidade)
        return resEspecialidade;
        await bd.commit();
    }
    catch (error) {
        await bd.rollback();
        console.log('Erro na transação:', error);
        return { error: 'Falha na transação', details: error };
    } finally {
        bd.release();
    }
}

async function insertEspecialidade(especialidades) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();

        const idEspec = []
        especialidades.forEach(async (espec) => {
            const resEspecialidade = await bd.query('INSERT INTO tbl_especialidade (desc_especialidade) VALUES (?)', [espec.descEspecialidade]);
            idEspec.push(resEspecialidade[0].insertId);
        });

        await bd.commit();
    }
    catch (error) {
        await bd.rollback();
        console.log('Erro na transação:', error);
        return { error: 'Falha na transação', details: error };
    } finally {
        bd.release();
    }
}

async function UpdateEspecialidade(descricao){
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const UpdateEspe = await bd.query('UPDATE tbl_especialidade SET desc_especialidade = ? where id =?;',
            [descricao._descEspecialidade,descricao.id]
        );
        console.log(UpdateEspe)
        return UpdateEspe;
        await bd.commit();
    } catch (error) {
        await bd.rollback();
        console.log('Erro na transação:', error);
        return { error: 'Falha na transação', details: error };
    } finally {
        bd.release();
    }
}
module.exports = { insertEspecialidade,selectEspecialidades,UpdateEspecialidade };