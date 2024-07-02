const Pessoa = require("../models/classes/Pessoa")
const Endereco = require("../models/classes/Endereco");
const Telefone = require("../models/classes/Telefone");
const Funcionario = require("../models/classes/Funcionario");
const Login = require("../models/classes/Login");
const Perfis = require("../models/classes/Perfis")
const Especialidade = require("../models/classes/Especialidade")
const { insert, verificaCpf, verificaEndereco,updateTel,updateEndereco,deletePessoa,deletarFuncionario } = require("../models/PessoaModel")


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
            let result = null;

            const { cpf, nome, dataNasc, genero, email, endereco: [{ logradouro, bairro, estado, numeroEndereco, complementoEndereco, cep }], telefone, funcionario: [{ dataAdmissao, crm }], Login: [{ login, senha, status }], Perfis: [{ tipo }],Especialidade:[{descEspecialidade}] } = req.body;
            console.log(req.body)
            const novaPessoa = new Pessoa(null, cpf, nome, dataNasc, genero, email);
            const verificaCp = novaPessoa.validaCpf(novaPessoa.Cpf)
            if (verificaCp !== true) {
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
            result = await verificaEndereco(novoEndereco.cep,novoEndereco.numeroEndereco)
            if(result[0][0].total > 0){
                return res.json({ message: "Endereço já cadastrado" })
            }
            const novoLogin = new Login(null, login, senha, status, null, null);
            if(novoLogin.login != novaPessoa.cpf){
                return res.json({ message: "Login tem que ser o CPF" });
            }
            const novoPerfis = new Perfis(null, tipo, null, null, null);


            const objTelefone = [];

            if (telefone.length > 0) {
                telefone.forEach(tel => {
                    const novoTelefone = new Telefone(null, tel.numeroTelefone);
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
                return res.json({ message: "Funcionario cadastrado com sucesso" });

            }
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    updateTelefone:async(req,res) =>{
        try {
            const {numeroTelefone} = req.body;
            const TelId = req.params.id
            const updateTelefone = new Telefone(TelId,numeroTelefone)
            console.log(updateTel)
            result = await updateTel(updateTelefone)
            return res.json({message: "Telefone atualizado"})
        } catch (error) {   
            console.error("Erro ao cadastrar especialidades:", error);
            res.status(500).json({ error: "Erro ao cadastrar especialidades" });
        }
    },

    updateEndereco:async(req,res) =>{
        try {
            const {endereco: [{ logradouro, bairro, estado, numeroEndereco, complementoEndereco, cep }]} = req.body;
            const EndeId = req.params.id
            const updateEndere = new Endereco(EndeId,logradouro,bairro,estado,numeroEndereco,complementoEndereco,cep)
            result = await updateEndereco(updateEndere)
            return res.json({message: "Endereço Atualizado"})
        } catch (error) {   
            console.error("Erro ao cadastrar especialidades:", error);
            res.status(500).json({ error: "Erro ao cadastrar especialidades" });
        }
    },
    deletePessoa:async(req,res) => {
        try {
            const id = req.params.id;
            const objPessoa = new Pessoa(id)
            console.log(objPessoa)
            const result = await deletePessoa(objPessoa);
            if (result.error) {
                res.status(500).json({ success: false, message: 'Erro ao excluir Funcionario', error: result.details });
            } else {
                res.status(200).json(result);
            }
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
    }
    
}
module.exports = { cadastro }