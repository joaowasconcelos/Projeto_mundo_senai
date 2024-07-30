const conectarBancoDeDados = require("../config/db");

async function insertConsulta(novoPaciente, novaConsulta, novoMedico,novoFuncionario,novoEspecialidade,novoPacientes) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const [IdConsulta] = await bd.query(
            `INSERT INTO tbl_consulta (data, hora, status, paciente_id, paciente_pessoa_id, funcionario_id, funcionario_pessoa_id, especialidade_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
           [novaConsulta.data, novaConsulta.hora, novaConsulta.status, novoPaciente.id, novoPacientes.id, novoFuncionario.id, novoMedico.id, novoEspecialidade.id]
        );
        console.log('Consulta inserida com sucesso:', IdConsulta.insertId);
        await bd.commit();
        return


    } catch (error) {
        await bd.rollback();
        console.log('Erro na transação:', error);
        return { error: 'Falha na transação', details: error };
    } finally {
        bd.release();
    }
}

async function updateConsul(consultas) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        console.log(consultas)
        const UpConsultas = await bd.query('update tbl_consulta set data = ?,hora = ?,status = ? where id =?;',
            [consultas.data, consultas.hora, consultas.status, consultas.id]
        );
        await bd.commit();
        return UpConsultas
    } catch (error) {
        await bd.rollback();
        console.log('Erro na transação:', error);
        return { error: 'Falha na transação', details: error };
    } finally {
        bd.release();
    }
}
async function excluirConsulta(consulta) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const [res] = await bd.query(`DELETE FROM tbl_consulta WHERE id = ?`, [consulta.id])
        if (res.affectedRows === 0) {
            throw new Error('Consulta não encontrado');
        } else {
            await bd.commit();
            return res;
        }
    } catch (error) {
        console.error('Erro ao deletar Consulta:', error);
        await bd.rollback();
        return { error: 'Falha no delete', details: error };
    } finally {
        await bd.release();
    }
}


module.exports = { insertConsulta, updateConsul, excluirConsulta };
