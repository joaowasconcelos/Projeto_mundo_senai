const { createPool } = require("mysql2/promise")

let pool = null;

async function criarPoolDeConexoes() {
    if (!pool) {
        pool = createPool({
            // host: '192.168.4.111',
            port: '3306',
            database: 'clinica',
            user: 'root',
            password: '12345',
            waitForConnections: true, // Aguarda conexões se não houver disponíveis no momento
            connectionLimit: 10, // Limite máximo de conexões no pool
            multipleStatements: true // Permitir a execução de várias queries ao mesmo tempo
        });
    }
    return pool;
}

async function obterConexaoDoPool() {
    const pool = await criarPoolDeConexoes();
    return pool.getConnection();
}

module.exports = obterConexaoDoPool;
