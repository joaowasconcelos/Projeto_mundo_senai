const { selectInfosPaciente, selectConsultas } = require("../models/PacienteModel");
const Pessoa = require("../models/classes/Pessoa");
const Consultas = require("../models/classes/Consulta");



const viewPaciente = {

    paginaPaciente: async (req, res) => {
        try {
            res.render('pages/Paciente');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }


    },

    selecionaInfosPaciente: async (req, res) => {
        try {
            const {id} = req.params.id
            const pacienteID = req.params.id
            const novaPessoa = new Pessoa(pacienteID,null,null,null,null,null)
            const infosPaciente = await selectInfosPaciente(novaPessoa.id)
            console.log(infosPaciente[0][0])
            res.json(infosPaciente[0][0])
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    selecionaConsultas: async (req, res) => {
        try {
            const {id} = req.params.id
            const consultaId = req.params.id
            const consulta = new Consultas(consultaId,null,null,null,)
            const infosConsulta = await selectConsultas(consulta.id)
            return res.json(infosConsulta[0][0])
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    }
}

module.exports = { viewPaciente }