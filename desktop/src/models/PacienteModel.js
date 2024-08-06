const conectarBancoDeDados = require("../config/db");

//SELECT INFOS PESSOAIS
async function selectInfosPaciente(id) {
    const bd = await conectarBancoDeDados();
    try {
        const selectInfosPaciente = await bd.query(`
        SELECT 
    p.id,
    p.nome AS Nome,
    p.cpf AS CPF,
    DATE_FORMAT(p.data_nasc, '%d/%m/%Y') AS DataNascimento,
    p.genero AS Genero,
    p.email AS Email,
    DATE_FORMAT(p.data_cad, '%d/%m/%Y') AS DataCadastro,
    e.logradouro AS Logradouro,
    e.bairro AS Bairro,
    e.estado AS Estado,
    e.numero AS NumeroResidencia,
    e.complemento AS Complemento,
    e.cep AS CEP,
    t.numero AS Telefones,
    GROUP_CONCAT(pf.tipo ORDER BY pf.tipo SEPARATOR ', ') AS Tipo,
    lg.login AS Logins,
    lg.senha AS Senha,
    DATE_FORMAT( f.data_admissao, '%d/%m/%Y') AS DataAdmissao,
    f.crm AS CRM,
    es.desc_especialidade AS Especialidade
    FROM
        tbl_pessoa p
    LEFT JOIN 
        tbl_pessoa_has_tbl_telefone pt ON p.id = pt.pessoa_id
    LEFT JOIN 
        tbl_telefone t ON pt.telefone_id = t.id
    LEFT JOIN 
        tbl_endereco e ON p.endereco_id = e.id
    LEFT JOIN 
        tbl_perfis pf ON pf.login_pessoa_id = p.id
    LEFT JOIN 
        tbl_login lg ON lg.pessoa_id = p.id AND lg.pessoa_endereco_id = p.endereco_id
    LEFT JOIN 
        tbl_funcionario f ON f.pessoa_id = p.id AND f.pessoa_endereco_id = p.endereco_id
    LEFT JOIN 
        tbl_funcionario_has_tbl_especialidade fe ON f.id = fe.funcionario_id
    LEFT JOIN 
        tbl_especialidade es ON fe.especialidade_id = es.id
    WHERE 
        p.id = ? 
    GROUP BY
        p.id, p.nome, p.cpf, p.data_nasc, p.genero, p.email, p.data_cad, e.logradouro, e.bairro, e.estado, 
        e.numero, e.complemento, e.cep, t.numero, lg.login, lg.senha, f.data_admissao, f.crm, es.desc_especialidade;
    `, [id]);
        return selectInfosPaciente
    } catch (error) {
        throw error;
    }
}

async function selectConsultas(id) {
    const bd = await conectarBancoDeDados();
    try {
        const selectConsultas = await bd.query(`
            SELECT 
                c.data AS Data,
                c.hora AS Hora,
                p.nome AS NomeMedico,
                e.desc_especialidade AS Especialidade
            FROM
                tbl_consulta c
            INNER JOIN 
                tbl_pessoa p ON c.funcionario_id = p.id
            INNER JOIN
                tbl_funcionario_has_tbl_especialidade fe ON c.especialidade_id= fe.especialidade_id
            INNER JOIN
                tbl_especialidade e ON c.especialidade_id= e.id
            WHERE  c.id=?;`, [id]);
        return selectConsultas;
    } catch (error) {
        throw error;
    }
}

module.exports = { selectInfosPaciente, selectConsultas };