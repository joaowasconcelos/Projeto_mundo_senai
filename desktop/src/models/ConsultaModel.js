const conectarBancoDeDados = require("../config/db");

async function insertConsulta(novoPaciente, novaConsulta, novoMedico, novoProntuario) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();

        const pessoaResult = await bd.query(
            `SELECT id FROM tbl_pessoa WHERE nome = ? AND cpf = ? limit 1;`,
            [novoPaciente.nome, novoPaciente.cpf]

        );

        console.log(pessoaResult[0][0].id)
        const pessoaId = pessoaResult[0][0].id;
        console.log("teste", pessoaId)
        console.log('ID da Pessoa:', pessoaId);


        const [pacienteResult] = await bd.query(
            `SELECT id FROM tbl_paciente WHERE pessoa_id = ?;`,
            [pessoaId]
        );
        const pacienteId = pacienteResult[0].id;
        console.log('ID do Paciente:', pacienteId);
        const [funcionarioResult] = await bd.query(
            `SELECT id FROM tbl_funcionario WHERE pessoa_id = (SELECT id FROM tbl_pessoa WHERE nome = ? AND cpf = ?);`,
            [novoMedico.nome, novoMedico.cpf]

        );
        const funcionarioId = funcionarioResult[0].id;
        console.log('ID do Funcionário:', funcionarioId);

        const funcionarioPessoaResult = await bd.query(
            `SELECT funcionario_pessoa_id FROM tbl_funcionario_has_tbl_especialidade WHERE funcionario_id = ?;`,
            [funcionarioId]
        );

        if (funcionarioPessoaResult.length === 0) {
            throw new Error('Funcionário Pessoa não encontrado.');
        }

        const funcionarioPessoaId = funcionarioPessoaResult[0][0].funcionario_pessoa_id;
        console.log('ID do Funcionário Pessoa:', funcionarioPessoaId);

        const especialidadeResult = await bd.query(
            `SELECT especialidade_id FROM tbl_funcionario_has_tbl_especialidade WHERE funcionario_id = ?;`,
            [funcionarioId]
        );

        if (especialidadeResult.length === 0) {
            throw new Error('Especialidade não encontrada.');
        }

        const especialidadeId = especialidadeResult[0][0].especialidade_id;
        console.log('ID da Especialidade:', especialidadeId);

        // Inserir a consulta
        const [IdConsulta] = await bd.query(
            `INSERT INTO tbl_consulta (data, hora, status, paciente_id, paciente_pessoa_id, funcionario_id, funcionario_pessoa_id, especialidade_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [novaConsulta.data, novaConsulta.hora, novaConsulta.status, pacienteId, pessoaId, funcionarioId, funcionarioPessoaId, especialidadeId]
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
