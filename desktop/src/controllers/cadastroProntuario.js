const Prontuario = require("../models/classes/Prontuario");
const Consulta = require("../models/classes/Consulta")
const {criarProntu,EditaProntuario } = require("../models/ProntuarioModel");

const cadastroProntuario = {
    cadastraProntuario: async (req, res) => {
        try {
            const {Prontuario:[{diagnostico,medicacao}]}= req.body;
            const id = req.params.id
            console.log(id)
            const novoProntuario = new Prontuario(null,diagnostico,medicacao)
            const novaConsulta = new Consulta(null,null,null,null,id)
            if (!novoProntuario.validaCampos()) {
                return res.json({ message: 'Todos os campos são obrigatórios.' });
            }
            const result= await criarProntu(novoProntuario,novaConsulta);
            return res.json({message:"Prontuario inserido"})    

        } catch (error) {
            console.error("Erro ao cadastrar Consulta:", error);
            res.status(500).json({ error: "Erro ao cadastrar uma Consulta" });
        }
    },

    UpdateProntuario: async (req, res) => {
        try {
            const {Prontuario:[{diagnostico,medicacao}]}= req.body;
            const id = req.params.id
            const novoProntuario = new Prontuario(id,diagnostico,medicacao)
            const result= await EditaProntuario(novoProntuario);
            return res.json({message:"Prontuario Atualizado"})    
        } catch (error) {
            console.error("Erro ao Editar Prontuario:", error);
            res.status(500).json({ error: "Erro ao Editar Prontuario" });
        }
    },



};

module.exports = { cadastroProntuario };
