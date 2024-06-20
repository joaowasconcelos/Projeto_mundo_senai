const {SelectsConsultas} = require("../models/SelectsModel")
const {SelectsMedicos} = require("../models/SelectsModel")
const {SelectPessoas} = require("../models/SelectsModel")

const selects = {
    selecionaTodasConsultas: async (req, res) => {
        try {
            const TdConsultas = await SelectsConsultas()
            console.log(TdConsultas)
            return res.json(TdConsultas[0])
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    SelecionaTodosMedicos: async(req,res) =>{
        try {
            const TdMedicos = await SelectsMedicos()
            console.log(TdMedicos)
            return res.json(TdMedicos[0])
            
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },
    SelecionaTodasPessoas: async(req,res) =>{
        try {
            const TdPessoas = await SelectPessoas()
            console.log(TdPessoas)
            return res.json(TdPessoas[0])
            
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    }
}

module.exports = {selects}