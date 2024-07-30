const {SelectConsultaMedico} = require("../models/SelectsModel");
const {criarProntuario,historicoProntuario,itemProntuario} = require("../models/ProntuarioModel")
const Pessoa = require("../models/classes/Pessoa");
const Funcionario = require("../models/classes/Funcionario");
const Prontuario = require("../models/classes/Prontuario")
const Especialidade = require("../models/classes/Especialidade");
const Paciente = require("../models/classes/Paciente");
const Consulta = require("../models/classes/Consulta");

const CadastroProntuario = {
    Prontuario: async (req, res) => {
        try {
            const {id} = req.params
            const result = await SelectConsultaMedico(null,id);
            const { selectConsultaIds } = result;
            const resultId = selectConsultaIds[0]
            req.session.resultId = resultId;
            return res.render('pages/Prontuario');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }
    }, 

    Prontuariocadastro: async (req, res) => {
        try {
            const resultId = req.session.resultId[0];
            const {id,paciente_id,paciente_pessoa_id,funcionario_id,funcionario_pessoa_id,especialidade_id}= resultId
            const {diagnostico,medicacao} = req.body

            const novaConsulta = new Consulta(id,null,null,null,null)
            const novaPessoaPaciente = new Pessoa(paciente_pessoa_id,null,null,null,null,null)
            const novoFuncionario =new Funcionario(funcionario_id,null,null,null,null,null,null,null);
            const novaEspecialidade = new Especialidade(especialidade_id,null,null);
            const novoProntuario = new Prontuario(null,diagnostico,medicacao)
            const novoPaciente = new Paciente(paciente_id,null,null,null,null,null,null)
            const novaPessoaFuncionario = new Pessoa(funcionario_pessoa_id,null,null,null,null,null)

            const insert = criarProntuario(novaConsulta,novaPessoaPaciente,novoFuncionario,novaEspecialidade,novoProntuario,novoPaciente,novaPessoaFuncionario)
            return res.render("pages/Medico", { results: [] });

        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }
    },

    HistoricoProntuario: async (req, res) => {
        try {
            console.log(req.query)
            const {id} = req.params;
            const {id_especialidade} = req.query
            const result = await historicoProntuario(id,id_especialidade);
            const resultProntuario = result[0]
            console.log("resultProntuario",resultProntuario)
            return res.render("pages/HistoricoProntuario",{resultProntuario});
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }
    },

    ItemProntuario: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id)
            const result = await itemProntuario(id);
            const resultItemProntu = result[0][0];
            console.log("resultProntuario", resultItemProntu);
            return res.json(resultItemProntu);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = { CadastroProntuario }