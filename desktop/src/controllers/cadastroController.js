const Pessoa = require("../models/classes/Pessoa")
const Endereco = require("../models/classes/Endereco");
const Telefone = require("../models/classes/Telefone");
const Funcionario = require("../models/classes/Funcionario");
const Login = require("../models/classes/Login");
const Perfis = require("../models/classes/Perfis")
const Especialidade = require("../models/classes/Especialidade")
const { insert, verificaCpf, verificaEndereco,updateTel,updateEndereco,deletePessoa,deletarFuncionario,deletarEndereco,deletarTelefone, deletarPerfil} = require("../models/PessoaModel")

const cadastro = {
    paginaCadastro: async (req, res) => {
        try {
            res.render('pages/Cadastro');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }
    },

    adicionaPessoa: async (req, res) => {
        try {
            console.log('Dados recebidos no corpo da requisição:', req.body);
            let result = null;
            const { cpf, nome, dataNasc, genero, email, logradouro, bairro, estado, numeroEndereco, complementoEndereco, cep, dataAdmissao, crm, login, senha,confirmSenha, status, tipo, descEspecialidade } = req.body;
            const { telefones } = req.body;

            if (senha != confirmSenha) {
                return res.json({ message: "Senhas divergentes " })
            }
 
            const novaPessoa = new Pessoa(null, cpf, nome, dataNasc, genero, email);
            const verificaCp = novaPessoa.validaCpf(novaPessoa.Cpf)
            if (!verificaCp) {
                return res.json({ message: "CPF INVALIDO" })
            }
            result = await verificaCpf(novaPessoa.cpf)
            if (result[0][0].total > 0) {
                return res.json({ message: "CPF já cadastrado" })
            }
            const dataVal = novaPessoa.DataConvert(novaPessoa.dataNasc);
            if (dataVal == "Invalid Date" || !(new Date(novaPessoa.dataNasc) instanceof Date)) {
                return res.json({ message: "Data informada é invalida" });
            }
            const novoEndereco = new Endereco(null, logradouro, bairro, estado, numeroEndereco, complementoEndereco, cep);
            // result = await verificaEndereco(cep, numeroEndereco)
            // console.log("result endereco",result)
            // if (result[0][0].total > 0) {
            //     return res.json({ message: "Endereço já cadastrado" })
            // }
            const novoLogin = new Login(null, login, senha, status, null, null);
            if (novoLogin.login != novaPessoa.cpf) {
                return res.json({ message: "Login tem que ser o CPF" });
            }
            const novoPerfis = new Perfis(null, tipo, null, null, null);

            const objTelefone = [];
            if (telefones.length > 0) { 
                telefones.forEach(numeroTelefone => {
                    const novoTelefone = new Telefone(null, numeroTelefone);
                    objTelefone.push(novoTelefone);
                });
            }
         

            let novoFuncionario = null;

            console.log(!novaPessoa.validaCampos() || !novoEndereco.validaCampos() || !novoLogin.validaCampos() || !novoPerfis.validaCampos())
            if (!novaPessoa.validaCampos() || !novoEndereco.validaCampos() || !novoLogin.validaCampos() || !novoPerfis.validaCampos()) {
                return res.json({ message: 'Todos os campos são obrigatórios.' });
            }
          
            if (dataAdmissao === null || dataAdmissao === undefined) {
                result = await insert(novaPessoa, novoEndereco, objTelefone, null, novoLogin, novoPerfis, null);
                return res.json({ message: "Paciente cadastrado com sucesso" });
            } else {
                novoFuncionario = new Funcionario(null, cpf, nome, dataNasc, genero, email, dataAdmissao, crm);
                novoFuncionario.DataConvert(dataAdmissao)
                const novaEspecialidade = new Especialidade(null, descEspecialidade);

                if (!novoFuncionario.validaCampos()) {
                    return res.json({ message: 'Todos os campos são obrigatórios.' });
                }
                result = await insert(novaPessoa, novoEndereco, objTelefone, novoFuncionario, novoLogin, novoPerfis, novaEspecialidade);
                console.log(result)
                return res.send("Funcionario cadastrado com sucesso" )
            }
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },


    updateTelefone: async (req, res) => {
        try {
            const { numeroTelefone } = req.body;
            const TelId = req.params.id
            const updateTelefone = new Telefone(TelId, numeroTelefone)
            console.log(updateTel)
            result = await updateTel(updateTelefone)
            return res.json({ message: "Telefone atualizado" })
        } catch (error) {
            console.error("Erro ao cadastrar especialidades:", error);
            res.status(500).json({ error: "Erro ao cadastrar especialidades" });
        }
    },

    updateEndereco: async (req, res) => {
        try {
            const { endereco: [{ logradouro, bairro, estado, numeroEndereco, complementoEndereco, cep }] } = req.body;
            const EndeId = req.params.id
            const updateEndere = new Endereco(EndeId, logradouro, bairro, estado, numeroEndereco, complementoEndereco, cep)
            result = await updateEndereco(updateEndere)
            return res.json({ message: "Endereço Atualizado" })
        } catch (error) {
            console.error("Erro ao cadastrar especialidades:", error);
            res.status(500).json({ error: "Erro ao cadastrar especialidades" });
        }
    },

    deletePessoa:async(req,res) => {
        try {
            const id = req.params.id;
            console.log(id)
            const objPessoa = new Pessoa(id)
            console.log(objPessoa)
            const result = await deletePessoa(objPessoa);
            return res.json({ message: "Delete pessoa" })
        } catch (error) {
            res.status(500).json({  error: "Erro ao excluir pessoa" });
        }
    },
    deletarFuncionario: async (req,res) =>{
        try {
            const id = req.params.id
            const objFunci = new Funcionario(id);
            console.log(objFunci)
            const result = await deletarFuncionario(objFunci);
            if (result.error) {
                res.status(500).json({ success: false, message: 'Erro ao excluir Funcionario', error: result.details });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error('Erro ao editar Funcionario:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir Funcionario', error });
        }
    },
    deletarEndereco: async (req,res) =>{
        try {
            const id = req.params.id
            const obgEndereco = new Endereco(id);
            console.log(obgEndereco)
            const result = await deletarEndereco(obgEndereco);
            if (result.error) {
                res.status(500).json({ success: false, message: 'Erro ao excluir Endereco', error: result.details });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error('Erro ao editar Funcionario:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir Endereco', error });
        }
    },
    deletarTelefone: async (req,res) => {
        try{
            const id = req.params.id
            const obgTele = new Telefone (id)
            console.log(obgTele)
            const result = await deletarTelefone(obgTele);
            if (result.error) {
                res.status(500).json({ success: false, message: 'Erro ao excluir Telefone', error: result.details });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error('Erro ao editar Funcionario:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir Telefone', error });
        }
    },
    deletarPerfil: async (req,res) => {
        try{
            const id = req.params.id
            const obfPerfil = new Perfis (id)
            console.log(obfPerfil)
            const result = await deletarPerfil(obfPerfil);
            if (result.error) {
                res.status(500).json({ success: false, message: 'Erro ao excluir Perfil', error: result.details });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error('Erro ao editar Funcionario:', error);
            res.status(500).json({ success: false, message: 'Erro ao excluir Perfil', error });
        }
    }
}




module.exports = { cadastro }

