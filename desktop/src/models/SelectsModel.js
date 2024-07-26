const conectarBancoDeDados = require("../config/db");

async function SelectsConsultas() {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        console.log("entrou1")
        const SelectsConsulta = await bd.query(`SELECT 
    c.id,
    DATE_FORMAT(c.data, '%d/%m/%Y') AS data,
    c.hora,
    p.nome AS nome_paciente,
    p.cpf AS cpf_paciente,
    pf.nome AS nome_funcionario,
    e.desc_especialidade
FROM 
    tbl_consulta c
JOIN
    tbl_pessoa p ON c.paciente_pessoa_id = p.id
JOIN 
    tbl_funcionario f ON c.funcionario_pessoa_id = f.pessoa_id
JOIN
    tbl_pessoa pf ON f.pessoa_id = pf.id
JOIN 
    tbl_funcionario_has_tbl_especialidade fe ON fe.funcionario_id = f.id
JOIN
    tbl_especialidade e ON e.id = fe.especialidade_id;`);
        console.log(SelectsConsulta)
        return SelectsConsulta;
        await bd.commit();

    } catch (error) {
        console.error('Erro ao criar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }

}

async function SelectsMedicos() {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const SelectsMedicos = await bd.query(`
            SELECT 
    p.id,
    p.nome,
    p.cpf,
    DATE_FORMAT(p.data_nasc, '%d/%m/%Y') as data_nasc,
    f.crm,
    DATE_FORMAT(f.data_admissao, '%d/%m/%Y') as data_admissao,
    e.desc_especialidade
FROM 
    tbl_funcionario f
JOIN 
    tbl_pessoa p ON f.pessoa_id = p.id
JOIN
    tbl_funcionario_has_tbl_especialidade fe ON f.id = fe.funcionario_id
JOIN 
    tbl_especialidade e ON fe.especialidade_id = e.id
WHERE 
    f.crm > 0;`);


        console.log(SelectsMedicos)
        return SelectsMedicos;
        await bd.commit();

    } catch (error) {
        console.error('Erro ao criar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }
}

async function SelectPessoas() {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const SelectsPessoas = await bd.query(`
    SELECT 
    p.id,
    cpf as CPF, 
    nome as NOME,
    DATE_FORMAT(p.data_nasc, '%d/%m/%Y') as DATA_NASCIMENTO, 
    genero as GENERO,
    GROUP_CONCAT(pf.tipo ORDER BY pf.tipo SEPARATOR ', ') AS TIPO,
    pa.id AS ID_PACIENTE
    FROM 
        tbl_pessoa p 
    JOIN 
        tbl_perfis pf ON pf.login_pessoa_id = p.id
    JOIN 
        tbl_paciente pa ON pa.id = p.id
    GROUP BY
        p.id, p.cpf, p.nome, p.data_nasc, p.genero, pa.id;`)
        return SelectsPessoas;
        await bd.commit();
    } catch (error) {
        console.error('Erro ao criar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }
}

async function SelectMedicoEspec(especialidade) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const SelectMedico = await bd.query(`SELECT 
    p.id,
    p.nome,
    f.id as id_funcionario
    FROM 
    tbl_funcionario f
    JOIN 
        tbl_pessoa p ON f.pessoa_id = p.id
    JOIN
        tbl_funcionario_has_tbl_especialidade fe ON f.id = fe.funcionario_id
    JOIN 
        tbl_especialidade e ON fe.especialidade_id = e.id
    WHERE 
        e.id = ?;`,
            [especialidade])
        return SelectMedico;
        await bd.commit();
    } catch (error) {
        console.error('Erro ao criar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }
}

async function SelectConsultaData(id) {
    const bd = await conectarBancoDeDados();
    try {
        console.log(id)
        await bd.beginTransaction();
        const dataHoje = await bd.query(`SELECT CURDATE();`);
        const dateOnly = dataHoje[0][0]['CURDATE()'].toISOString().split('T')[0];
        console.log(dateOnly); // Output: 2024-07-13


        const selectConsulta = await bd.query
            (`SELECT 
    c.id,
    DATE_FORMAT(c.data, '%d/%m/%Y') AS data,
    c.hora,
    p.nome AS nome_paciente,
    p.cpf AS cpf_paciente,
    pf.nome AS nome_funcionario,
    e.desc_especialidade
FROM 
    tbl_consulta c
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
WHERE 
    c.paciente_pessoa_id = ? AND c.data >= ?;`, [id, dateOnly])
        return selectConsulta
        await bd.commit()
    } catch (error) {
        console.error('Erro ao criar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }
}

async function SelectConsultaMedico(cpf,id) {
    console.log(cpf,id)
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const dataHoje = await bd.query(`SELECT CURDATE();`);
        const dateOnly = dataHoje[0][0]['CURDATE()'].toISOString().split('T')[0];

        const selectConsultaMedicos = await bd.query(
            `SELECT 
    c.id,
    DATE_FORMAT(c.data, '%d/%m/%Y') AS data,
    c.hora,
    p.id AS pessoa_id,
    p.nome AS nome_paciente,
    p.cpf AS cpf_paciente,
    pf.nome AS nome_funcionario,
    pf.cpf AS cpf_medico,
    e.desc_especialidade,
    e.id as id_especialidade
FROM 
    tbl_consulta c
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
WHERE 
    c.data = ? AND pf.cpf = ?;`, 
            [dateOnly, cpf]
        );
        const selectConsultaIds = await bd.query(
            `SELECT * FROM tbl_consulta c WHERE c.data = ? AND c.id = ?;`, 
            [dateOnly, id]
        );
        await bd.commit();
        return { selectConsultaIds, selectConsultaMedicos };
    } catch (error) {
        console.error('Erro ao criar prontuario:', error);
        await bd.rollback(); 
        throw error;
    } finally {
        await bd.release(); 
    }
}


async function SelectConsultasAnteriores(id) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const dataHoje = await bd.query(`SELECT CURDATE();`);
        const dateOnly = dataHoje[0][0]['CURDATE()'].toISOString().split('T')[0];
        console.log(dateOnly); // Output: 2024-07-13

        const selectConsulta = await bd.query
            (`SELECT 
    c.id,
    DATE_FORMAT(c.data, '%d/%m/%Y') AS data,
    c.hora,
    p.nome AS nome_paciente,
    p.cpf AS cpf_paciente,
    pf.nome AS nome_funcionario,
    e.desc_especialidade
FROM 
    tbl_consulta c
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
WHERE 
    c.paciente_pessoa_id = ? 
    AND c.data < ?;`, [id, dateOnly])
        return selectConsulta
        await bd.commit()
    } catch (error) {
        console.error('Erro ao criar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }
}



module.exports = { SelectsConsultas, SelectsMedicos, SelectPessoas, SelectMedicoEspec, SelectConsultaData, SelectConsultasAnteriores, SelectConsultaMedico };