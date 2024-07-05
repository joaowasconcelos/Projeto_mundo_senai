const conectarBancoDeDados = require("../config/db");

async function SelectsConsultas() {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        console.log("entrou1")
        const SelectsConsulta = await bd.query(`SELECT 
    c.id,
    c.data,
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
	tbl_funcionario_has_tbl_especialidade fe on fe.especialidade_id = f.id
JOIN
	tbl_especialidade e on e.id = fe.especialidade_id;`);
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
        const SelectsPessoas = await bd.query(`select p.id,cpf as CPF, nome as NOME,DATE_FORMAT(p.data_nasc, '%d/%m/%Y') as DATA_NASCIMENTO, genero as GENERO,pf.tipo as TIPO from tbl_pessoa p join tbl_perfis pf on login_pessoa_id = p.id;`)
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
p.nome
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
        console.log(SelectMedico)
        return SelectMedico;
        await bd.commit();
    } catch (error) {
        console.error('Erro ao criar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }
}


module.exports = { SelectsConsultas, SelectsMedicos, SelectPessoas, SelectMedicoEspec };