const Consulta = require("../models/classes/Consulta");
const Pessoa = require("../models/classes/Pessoa")
const Funcionario = require("../models/classes/Funcionario")
const Especialidade = require("../models/classes/Especialidade")
const Paciente = require("../models/classes/Paciente")
const { insertConsulta, updateConsul } = require("../models/ConsultaModel");
const {SelectMedicoEspec} = require("../models/SelectsModel")
const {selectEspecialidades } = require("../models/EspecialidadeModel");
const {SelectPessoas} = require("../models/SelectsModel")


const cadastroConsulta = {
    cadastraConsulta: async (req, res) => {
        try {
            console.log("entrou")
            const {data, hora, status, paciente, ID_PACIENTE,especialidade,medico,id_funcionario } = req.body;
            console.log(req.body);
            const novaConsulta = new Consulta(null, data, hora, status,null);
            const novoPaciente = new Pessoa(paciente, null, null, null, null, null);
            const novoMedico = new Pessoa(medico, null, null, null, null, null)
            const novoFuncionario = new Funcionario(id_funcionario,null,null,null,null,null,null,null)
            const novoEspecialidade = new Especialidade(especialidade,null)
            const novoPacientes = new Paciente(ID_PACIENTE,null,null,null,null,null)

            if (!novaConsulta.validaCampos()) {
                return res.json({ message: 'Todos os campos são obrigatórios.' });
            }
            console.log("DATA",novaConsulta.Data)
            const dataConsulta = novaConsulta.DataConvert(novaConsulta.Data)
            console.log("DATA2",dataConsulta)
            if (dataConsulta == "Invalid Date" || !(new Date(novaConsulta.Data) instanceof Date)) {
                return res.json({ message: "Data informada é invalida" });
            }
            const result = await insertConsulta(novoPaciente, novaConsulta, novoMedico,novoFuncionario,novoEspecialidade,novoPacientes);
            return res.json({ message: "Consulta inserida com sucesso" })

        } catch (error) {
            console.error("Erro ao cadastrar Consulta:", error);
            res.status(500).json({ error: "Erro ao cadastrar uma Consulta" });
        }
    },


    updateConsultas: async (req, res) => {
        try {
            const { Consulta: [{ data, hora, status }] } = req.body;
            const ConsultaId = req.params.id
            const updateConsulta = new Consulta(ConsultaId, data, hora, status, null);
            const dataConsulta = updateConsulta.DataConvert(updateConsulta.Data)
            if (dataConsulta == "Invalid Date" || !(new Date(updateConsulta.Data) instanceof Date)) {
                return res.json({ message: "Data informada é invalida" });
            }

            result = await updateConsul(updateConsulta)
            return res.json({ message: "Consulta Atualizada" })

        } catch (error) {
            console.error("Erro ao cadastrar Consulta:", error);
            res.status(500).json({ error: "Erro ao cadastrar Consulta" });
        }
    },

};

const selectEspecialidadeMedico = {
    selectsEspecialidadeMedico: async (req, res) => {
        try {
            const result = await selectEspecialidades();
            const Especialidade = result[0];
            console.log("Especialidades recuperadas:", Especialidade);

            const { especialidade } = req.query;
            console.log("Especialidade selecionada:", especialidade);
            console.log("Query params:", req.query);
            console.log(typeof especialidade);

            let medico = []
            if (especialidade > 0) {
                const result1 = await SelectMedicoEspec(especialidade);
                medico = result1[0];
                console.log("Médicos recuperados:", medico);
            }

            const resultPacientes = await SelectPessoas()
            const pacientes = resultPacientes[0]
            console.log("Pacientes recuperados:",pacientes)

            return res.render('pages/Consulta', { Especialidade, medico, especialidadeSelecionada: especialidade ,pacientes});
        } catch (error) {
            console.error("Erro ao selecionar especialidades:", error);
            res.status(500).json({ error: "Erro ao selecionar especialidades" });
        }
    }
}


module.exports = { cadastroConsulta,selectEspecialidadeMedico};
