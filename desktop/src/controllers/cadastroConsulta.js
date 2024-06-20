const Consulta = require("../models/classes/Consulta");
const Pessoa = require("../models/classes/Pessoa")
const { insertConsulta, updateConsul} = require("../models/ConsultaModel");


const cadastroConsulta = {

    paginaConsulta: async (req, res) => {
        try {
            res.render('pages/Consulta');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }


    },
    cadastraConsulta: async (req, res) => {
        try {
            const { nome, cpf, nomeMedico, cpfMedico, Consulta: [{ data, hora, status }] } = req.body;
            console.log(req.body);
            const novaConsulta = new Consulta(null, data, hora, status);
            const novoPaciente = new Pessoa(null,cpf,nome,null,null,null);
            const novoMedico = new Pessoa(null,cpfMedico,nomeMedico,null,null,null)
            if (!novaConsulta.validaCampos()) {
                return res.json({ message: 'Todos os campos são obrigatórios.' });
            }
            const dataConsulta = novaConsulta.DataConvert(novaConsulta.Data)
            if (dataConsulta == "Invalid Date" || !(new Date(novaConsulta.Data) instanceof Date)) {
                return res.json({ message: "Data informada é invalida" });
            }
           

            const result = await insertConsulta(novoPaciente, novaConsulta, novoMedico);
            return res.json({message:"Consulta inserida com sucesso"})     

        } catch (error) {
            console.error("Erro ao cadastrar Consulta:", error);
            res.status(500).json({ error: "Erro ao cadastrar uma Consulta" });
        }
    },

    updateConsultas:async(req,res) =>{
        try {
            const {Consulta: [{ data, hora, status }] } = req.body;
            const ConsultaId = req.params.id
            const updateConsulta = new Consulta(ConsultaId, data, hora, status,null);
            const dataConsulta = updateConsulta.DataConvert(updateConsulta.Data)
            if (dataConsulta == "Invalid Date" || !(new Date(updateConsulta.Data) instanceof Date)) {
                return res.json({ message: "Data informada é invalida" });
            }
           
            result = await updateConsul(updateConsulta)
            return res.json({message: "Consulta Atualizada"})

        } catch (error) {   
            console.error("Erro ao cadastrar Consulta:", error);
            res.status(500).json({ error: "Erro ao cadastrar Consulta" });
        }
    },

};


module.exports = { cadastroConsulta};
