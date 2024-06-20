const conectarBancoDeDados = require("../config/db");

async function SelectsConsultas() {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        console.log("entrou1")
        const SelectsConsulta = await bd.query(`SELECT * FROM tbl_consulta`);
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
    p.nome,
    p.cpf,
    p.data_nasc,
    f.crm,
    f.data_admissao,
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
    f.crm > 0; `);

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

async function SelectPessoas(){
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const SelectsPessoas = await bd.query(`select p.id as ID,cpf as CPF, nome as NOME, data_nasc as DATA_NASCIMENTO, genero as GENERO,pf.tipo as TIPO from tbl_pessoa p join tbl_perfis pf on login_pessoa_id = p.id;`)
        return SelectsPessoas;
        await bd.commit();
    } catch (error) {
        console.error('Erro ao criar prontuario:', error);
        throw error;
    } finally {
        await bd.release();
    }
}



module.exports = { SelectsConsultas, SelectsMedicos,SelectPessoas };