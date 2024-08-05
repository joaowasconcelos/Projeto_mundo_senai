const conectarBancoDeDados = require("../config/db")
const bcrypt = require("bcrypt");
const { teste } = require("../controllers/cadastroConsulta");

async function verificaCpf(pessoa) {
    const bd = await conectarBancoDeDados();
    try {
        const verificaCPF = await bd.query(`SELECT count (cpf) as total FROM tbl_pessoa where cpf =? `, [pessoa])
        return verificaCPF
    } catch (error) {
        await bd.rollback();
        console.log('Erro na transação:', error);
        return { error: 'Falha na transação', details: error };
    } finally {
        bd.release();
    }
}

async function verificaEndereco(endereco,numeroEndereco) {
    const bd = await conectarBancoDeDados();
    try {
        console.log(endereco,numeroEndereco)
        const verificaCep = await bd.query(`SELECT count(cep) as total FROM tbl_endereco where cep =? and numero=?; `, [endereco,numeroEndereco])
        return verificaCep
    } catch (error) {
        await bd.rollback();
        console.log('Erro na transação:', error);
        return { error: 'Falha na transação', details: error };
    } finally {
        bd.release();
    }
}


async function insert(pessoa, endereco, telefones, pacienteFuncionario, loginP, perfis, especialidades) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();

        const idtel = []
        telefones.forEach(async (tel) => {
            console.log(tel.numeroTelefone)
            const resTel = await bd.query('INSERT INTO tbl_telefone (numero) VALUES (?)', [tel.numeroTelefone]);
            idtel.push(resTel[0].insertId);
            console.log('ID do Telefone:', idtel[0]);
        });


        const enderecoResult = await bd.query('INSERT INTO tbl_endereco (logradouro, bairro, estado, numero, complemento, cep) VALUES (?, ?, ?, ?, ?, ?)',
            [endereco.logradouro, endereco.bairro, endereco.estado, endereco.numeroEndereco, endereco.complementoEndereco, endereco.cep]);
        const enderecoId = enderecoResult[0].insertId;
        console.log('ID do Endereço:', enderecoId);

        const pessoaResult = await bd.query('INSERT INTO tbl_pessoa (cpf, nome, data_nasc, genero, email,data_cad,endereco_id) VALUES (?, ?, ?, ?, ?, NOW(),?)',
            [pessoa.cpf, pessoa.nome, pessoa.dataNasc, pessoa.genero, pessoa.email, enderecoId]);
        const pessoaId = pessoaResult[0].insertId;
        console.log('ID da Pessoa:', pessoaId);

        const idtelHasPessoa = []
        idtel.forEach(async (id) => {
            const resTelPessoa = await bd.query("INSERT INTO tbl_pessoa_has_tbl_telefone(pessoa_id,telefone_id, pessoa_tbl_endereco_id) VALUES (?,?,?)",
                [pessoaId, id, enderecoId]);
            idtelHasPessoa.push(resTelPessoa[0].insertId)
            console.log("Inseriu Pessoa e Telefone")
        });

        await bd.query('INSERT INTO tbl_paciente (pessoa_id) VALUES (?)', [pessoaId]);
        let funcionarioId = null;

        if (pacienteFuncionario !== null) {
            const { dataAdmissao, crm } = pacienteFuncionario;
            const funcionarioResult = await bd.query('INSERT INTO tbl_funcionario (pessoa_id,pessoa_endereco_id, data_admissao, crm) VALUES (?, ?, ?,?)', [pessoaId, enderecoId, dataAdmissao, crm]);
            funcionarioId = funcionarioResult[0].insertId
        }
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(loginP.senha, salt);
        console.log(passwordHash)
        //loginP.senha = passwordHash;

        const loginResul = await bd.query(`INSERT INTO tbl_login(login,senha,status,pessoa_id,pessoa_endereco_id) values(?,?,?,?,?)`,
            [loginP.login, loginP.senha, loginP.status, pessoaId, enderecoId])
        const loginId = loginResul[0].insertId
        console.log('ID do Login:', loginId);

    
        const PerfisTipo = perfis.tipo
        const arrayTipo = []
        PerfisTipo.forEach(async (id) => {
            console.log(id)
            const perfisResult = await bd.query(`INSERT INTO tbl_perfis(tipo,login_id,login_pessoa_id,login_pessoa_endereco_id) values(?,?,?,?)`,
                [id, loginId, pessoaId, enderecoId])
                arrayTipo.push(perfisResult[0].insertId)
                console.log('ID do Perfil:', arrayTipo);
        });

        // const perfisResult = await bd.query(`INSERT INTO tbl_perfis(tipo,login_id,login_pessoa_id,login_pessoa_endereco_id) values(?,?,?,?)`,
        //     [perfis.tipo, loginId, pessoaId, enderecoId])
        // const perfisId = perfisResult[0].insertId
        // console.log('ID do Perfil:', perfisId);


        if (pacienteFuncionario !== null && pacienteFuncionario.crm != null) {
            const IdEspecialidade = await bd.query(`SELECT id FROM tbl_especialidade WHERE id  = ?;`, [especialidades.descEspecialidade]);
            const IdEspecialidades = IdEspecialidade[0][0].id;
            console.log("ID da Especialidade", IdEspecialidade[0][0].id)

            const idesp = []
            testeEsp = [especialidades]

            testeEsp.forEach(async (esp) => {
                const resEsp = await bd.query(`INSERT INTO tbl_funcionario_has_tbl_especialidade (funcionario_id,funcionario_pessoa_id,funcionario_pessoa_endereco_id,especialidade_id) VALUES (?,?,?,?);`,
                    [funcionarioId, pessoaId, enderecoId, IdEspecialidades]);
                idesp.push(resEsp.insertId);
                console.log("Inseriu Funcionario e Especialidade")
            });
        }

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

async function updatePaciente(id,novaPessoa,novoEndereco,novoTelefone,novoPerfil,novoLogin,novoFuncionario,novaEspecialidade) {
    console.log("chegou os dados na model",id,novaPessoa,novoEndereco,novoTelefone,novoPerfil,novoLogin,novoFuncionario,novaEspecialidade)
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();

        const UpdateTelefone = await bd.query('UPDATE tbl_telefone SET numero = ? WHERE id IN (SELECT telefone_id FROM tbl_pessoa_has_tbl_telefone WHERE pessoa_id = ?);',
            [novoTelefone.numeroTelefone,id]
        );

        const UpdateEnderecos = await bd.query('update tbl_endereco set logradouro = ?,bairro = ?,estado = ?, numero = ?, complemento=?, cep=? where id IN(select endereco_id from tbl_pessoa where id = ?);',
            [novoEndereco.logradouro,novoEndereco.bairro,novoEndereco.estado,novoEndereco.numeroEndereco,novoEndereco.complementoEndereco,novoEndereco.cep,id]);
            console.log(UpdateEnderecos)

        await bd.commit();
    } catch (error) {
        await bd.rollback();
        console.log('Erro na transação:', error);
        return { error: 'Falha na transação', details: error };
    } finally {
        bd.release();
    }
}

// async function updateTel(tel){
//     const bd = await conectarBancoDeDados();
//     try {
//         await bd.beginTransaction();
//         const UpdateTelefone = await bd.query('update tbl_telefone set numero = ? where id =?;',
//             [tel.numeroTelefone,tel.id]
//         );
//         console.log(UpdateTelefone)
//         return UpdateTelefone;
//         await bd.commit();
//     } catch (error) {
//         await bd.rollback();
//         console.log('Erro na transação:', error);
//         return { error: 'Falha na transação', details: error };
//     } finally {
//         bd.release();
//     }
// }

// async function updateEndereco(endere){
//     const bd = await conectarBancoDeDados();
//     try {
//         await bd.beginTransaction();
//         const UpdateEnderecos = await bd.query('update tbl_endereco set logradouro = ?,bairro = ?,estado = ?, numero = ?, complemento=?, cep=? where id =?;',
//             [endere.logradouro,endere.bairro,endere.estado,endere.numeroEndereco,endere.complementoEndereco,endere.cep,endere.id]
//         );
//         console.log(UpdateEnderecos)
//         return UpdateEnderecos;
//         await bd.commit();
//     } catch (error) {
//         await bd.rollback();
//         console.log('Erro na transação:', error);
//         return { error: 'Falha na transação', details: error };
//     } finally {
//         bd.release();
//     }
// }

async function deletePessoa(id){
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const [res] = await bd.query('DELETE FROM tbl_pessoa WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE Pessoa =>', res);
        if (res.affectedRows === 0) {
            throw new Error('Funcionario não encontrado');
        }else {
            await bd.commit();
            return res;
        }
    } catch (error) {
        console.error('Erro ao deletar Pessoa:', error);
        await bd.rollback();
        return { error: 'Falha no delete', details: error };
    } finally {
        await bd.release();
    }
}

async function deletarFuncionario(id) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const [res] = await bd.query('DELETE FROM tbl_funcionario WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE Funcionario =>', res);
        if (res.affectedRows === 0) {
            throw new Error('Funcionario não encontrado');
        }else {
            await bd.commit();
            return res;
        }

    } catch (error) {
        console.error('Erro ao deletar Funcionario:', error);
        await bd.rollback();
        return { error: 'Falha no delete', details: error };
    } finally {
        await bd.release();
    }
}
async function deletarEndereco(id) {

    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const [res] = await bd.query('DELETE FROM tbl_endereco WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE Endereco =>', res);
        if (res.affectedRows === 0) {
            throw new Error('endereço não encontrado');
        }else {
            await bd.commit();
            return res;
        }
    } catch (error) {
        console.error('Erro ao deletar endereço:', error);
        await bd.rollback();
        return { error: 'Falha no delete', details: error };
    } finally {
        await bd.release();
    }
}

async function deletarTelefone(id) {
    const bd = await conectarBancoDeDados();
    try {
        await bd.beginTransaction();
        const [res] = await bd.query('DELETE FROM tbl_telefone WHERE id = ?', [id.id]);
        console.log('RESULTADO DELETE Telefone =>', res);
        if (res.affectedRows === 0) {
            throw new Error('telefone não encontrado');
        }else {
            await bd.commit();
            return res;
        }
    } catch (error) {
        console.error('Erro ao deletar Telefone:', error);
        await bd.rollback();
        return { error: 'Falha no delete', details: error };
    } finally {
        await bd.release();
    }
}
module.exports = { insert, verificaCpf, verificaEndereco,updatePaciente,deletePessoa,deletarFuncionario,deletarEndereco,deletarTelefone };