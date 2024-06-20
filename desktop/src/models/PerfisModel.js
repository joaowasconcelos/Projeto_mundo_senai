const conectarBancoDeDados = require("../config/db")

async function selectTipo(tipo) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const Tipo= await bd.query(`SELECT tipo FROM tbl_perfis WHERE cpf = ?;`, [tipo]);
    } catch (error) {
        
    }
}

module.exports = { selectTipo };