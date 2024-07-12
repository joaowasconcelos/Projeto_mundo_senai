const {SelectsConsultas} = require("../models/SelectsModel")
const {SelectsMedicos} = require("../models/SelectsModel")
const {SelectPessoas} = require("../models/SelectsModel")


const selects = {
    selecionaTodasConsultas: async (req, res) => {
        try {
            const TdConsultas = await SelectsConsultas()
            const tdsConsultas = TdConsultas[0]
            console.log(tdsConsultas)
            return res.render('pages/ConsultaAdm', { tdsConsultas });
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    SelecionaTodosMedicos: async(req,res) =>{
        try {
            const TdMedicos = await SelectsMedicos()
            const TdsMedicos =TdMedicos[0]
            return res.render('pages/MedicoAdm', { TdsMedicos });
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    SelecionaTodasPessoas: async(req,res) =>{
        try {
            const TdPessoas = await SelectPessoas()
            const tdPessoas = TdPessoas[0]
            console.log(tdPessoas)
            return res.render('pages/Paciente', {tdPessoas});
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },
}

module.exports = {selects}