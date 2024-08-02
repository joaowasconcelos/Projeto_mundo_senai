const Consulta = require("../models/classes/Consulta");
const Pessoa = require("../models/classes/Pessoa")

const { insertConsulta, updateConsul, excluirConsulta } = require("../models/ConsultaModel");
const Funcionario = require("../models/classes/Funcionario")
const Especialidade = require("../models/classes/Especialidade")
const Paciente = require("../models/classes/Paciente")
const { SelectMedicoEspec } = require("../models/SelectsModel")
const { selectEspecialidades } = require("../models/EspecialidadeModel");
const { SelectPessoas } = require("../models/SelectsModel")



const cadastroConsulta = {
    cadastraConsulta: async (req, res) => {
        try {
            const { data, hora, status, paciente, ID_PACIENTE, especialidade, medico, id_funcionario } = req.body;
            const novaConsulta = new Consulta(null, data, hora, status, null);
            const novoPaciente = new Pessoa(paciente, null, null, null, null, null);
            const novoMedico = new Pessoa(medico, null, null, null, null, null)
            const novoFuncionario = new Funcionario(id_funcionario, null, null, null, null, null, null, null)
            const novoEspecialidade = new Especialidade(especialidade, null)
            const novoPacientes = new Paciente(ID_PACIENTE, null, null, null, null, null)

            if (!novaConsulta.validaCampos()) {
                return res.json({ message: 'Todos os campos são obrigatórios.' });
            }
            const dataConsulta = novaConsulta.DataConvert(novaConsulta.Data)
            if (dataConsulta == "Invalid Date" || !(new Date(novaConsulta.Data) instanceof Date)) {
                return res.json({ message: "Data informada é invalida" });
            }
            const result = await insertConsulta(novoPaciente, novaConsulta, novoMedico, novoFuncionario, novoEspecialidade, novoPacientes);
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
    excluirConsulta: async (req, res) => {
        try {
            const id = req.params.id;
            const obgConsult = new Consulta(id)
            const result = await excluirConsulta(obgConsult)
            if (result.error) {
                res.status(500).json({ success: false, message: 'Erro ao excluir Login', error: result.details });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao excluir Consulta" });
        }
    }

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


            const resultPacientes = await SelectPessoas()
            const pacientes = resultPacientes[0]
            console.log("Pacientes recuperados:", pacientes)

            return res.render('pages/Consulta', { Especialidade, medico: [], especialidadeSelecionada: null, pacientes, user: req.session.user });
        } catch (error) {
            console.error("Erro ao selecionar especialidades:", error);
            res.status(500).json({ error: "Erro ao selecionar especialidades" });
        }
    },

    selectEspecialidade: async (req, res) => {
        try {
            const result = await selectEspecialidades();
            const Especialidade = result[0];
            console.log("Especialidades recuperadas:", Especialidade);
            return res.render('pages/Cadastro', { Especialidade });
        } catch (error) {
            console.error("Erro ao selecionar especialidades:", error);
            res.status(500).json({ error: "Erro ao selecionar especialidades" });
        }
    }

}

const teste = {
    selectsEspecialidade: async (req, res) => {
        try {
            const { especialidade } = req.query;
            if (!especialidade) {
                return res.json({ error: 'Especialidade não informada' });
            }

            let medico = [];
            if (especialidade > 0) {
                const result = await SelectMedicoEspec(especialidade);
                medico = result[0];
            }

            return res.json(medico);
        } catch (error) {
            console.error("Erro ao selecionar especialidades:", error);
            res.status(500).json({ error: "Erro ao selecionar especialidades" });
        }
    }
};



module.exports = { cadastroConsulta, selectEspecialidadeMedico, teste };
