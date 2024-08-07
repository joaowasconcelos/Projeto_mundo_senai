const { selectInfosPaciente, selectConsultas } = require("../models/PacienteModel");
const Pessoa = require("../models/classes/Pessoa");
const Consultas = require("../models/classes/Consulta");

const viewPaciente = {
    paginaPaciente: async (req, res) => {
        res.render('pages/PacienteUsuario', { user: req.session.user });
    },
    selecionaInfosPaciente: async (req, res) => {
        try {
            const { id } = req.params
            const pacienteID = req.params.id
            const novaPessoa = new Pessoa(pacienteID, null, null, null, null, null)
            const infosPaciente = await selectInfosPaciente(novaPessoa.id)
            const infoPaciente = infosPaciente[0]
            return res.render('pages/PacienteInfo', { infoPaciente });
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    selecionaInfosPacienteMobile: async (req, res) => {
        try {
        console.log("aqui",req.session.user.id )
            const ids = req.session.user.id 
            const novaPessoa = new Pessoa(ids, null, null, null, null, null)
            const infosPaciente = await selectInfosPaciente(novaPessoa.id)
            const infoPaciente = infosPaciente[0]
            return res.json({infoPaciente});
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    selecionaConsultas: async (req, res) => {
        try {
            const { id } = req.params.id
            const consultaId = req.params.id
            const consulta = new Consultas(consultaId, null, null, null,)
            const infosConsulta = await selectConsultas(consulta.id)
            return res.json(infosConsulta[0][0])
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    logout: async (req, res) => {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Erro ao destruir a sessão:', err);
                    return res.status(500).json({ message: 'Erro ao tentar sair.' });
                }
    
                res.clearCookie('connect.sid'); 
                res.redirect('/login'); 
            });
        } catch (error) {
            console.error('Erro no processo de logout:', error);
            res.status(500).json({ message: 'Erro inesperado durante o logout.' });
        }
    },
    
}

module.exports = { viewPaciente }