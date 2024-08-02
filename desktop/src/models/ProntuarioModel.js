const conectarBancoDeDados = require("../config/db");

async function criarProntuario(consulta_id, pessoa_id, funcionario_id, especialidade_id, prontuario, paciente_id, pessoa_funcionario_id) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const insertProntuario = await bd.query(`
            INSERT INTO tbl_prontuario 
            (diagnostico, medicacao, consulta_id, consulta_paciente_id, consulta_paciente_pessoa_id, consulta_funcionario_id, consulta_funcionario_pessoa_id, consulta_especialidade_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [prontuario.diagnostico,
            prontuario.medicacao,
            consulta_id.id,
            paciente_id.id,
            pessoa_id.id,
            funcionario_id.id,
            pessoa_funcionario_id.id,
            especialidade_id.id]);
        await bd.commit();
        console.log(insertProntuario);
        return insertProntuario;
    } catch (error) {
        await bd.rollback();
        console.error('Erro ao criar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }
}



async function EditaProntuario(prontuario) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const res = await bd.query(
            `update tbl_prontuario set diagnostico = ?,medicacao = ? where id =?;`,
            [prontuario.diagnostico, prontuario.medicacao, prontuario.id]);
        console.log(res)
        await bd.commit();
        return res;
    } catch (error) {
        console.error('Erro ao editar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }

}


async function excluirProntu(prontu) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const [res] = await bd.query(`DELETE FROM tbl_prontuario WHERE id = ?`, [prontu.id])
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

async function historicoProntuario(id,id_espec) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const result = await bd.query(`
           Select id as id_prontuario,diagnostico,medicacao 
from tbl_prontuario 
where consulta_paciente_pessoa_id = ? and consulta_especialidade_id = ?;`, [id,id_espec])
        await bd.commit();
        return result;
    } catch (error) {
        console.error('Erro ao deletar Consulta:', error);
        await bd.rollback();
        return { error: 'Falha no delete', details: error };
    } finally {
        await bd.release();
    }
}


async function itemProntuario(id) {
    console.log(id)
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const result = await bd.query(`
            SELECT 
    c.id as id_consulta,
    DATE_FORMAT(c.data, '%d/%m/%Y') AS data,
    c.hora,
    p.nome AS nome_paciente,
    p.cpf AS cpf_paciente,
    pf.nome AS nome_funcionario,
    e.desc_especialidade
    FROM 
        tbl_consulta c
    JOIN
    tbl_prontuario pt on c.id = pt.consulta_id
    JOIN
        tbl_pessoa p ON c.paciente_pessoa_id = p.id
    JOIN 
        tbl_funcionario f ON c.funcionario_pessoa_id = f.pessoa_id
    JOIN
        tbl_pessoa pf ON f.pessoa_id = pf.id
    JOIN 
        tbl_funcionario_has_tbl_especialidade fe ON fe.funcionario_id = f.id
    JOIN
        tbl_especialidade e ON e.id = fe.especialidade_id
    Where
    pt.id =?;`, 
            [id])
        console.log(result)
        await bd.commit();
        return result;
    } catch (error) {
        console.error('Erro ao deletar Consulta:', error);
        await bd.rollback();
        return { error: 'Falha no delete', details: error };
    } finally {
        await bd.release();
    }
}



module.exports = { criarProntuario, EditaProntuario, excluirProntu,historicoProntuario,itemProntuario };