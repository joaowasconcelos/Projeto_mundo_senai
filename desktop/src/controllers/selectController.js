const { SelectPessoas,SelectConsultaData,SelectConsultasAnteriores,SelectConsultaMedico,SelectsMedicos,SelectsConsultas,SelectConsultaMedicoMobile} = require("../models/SelectsModel")


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

    SelecionaTodosMedicos: async (req, res) => {
        try {
            const TdMedicos = await SelectsMedicos()
            const TdsMedicos = TdMedicos[0]
            return res.render('pages/MedicoAdm', { TdsMedicos });
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    SelecionaTodasPessoas: async (req, res) => {
        try {
            const TdPessoas = await SelectPessoas()
            const tdPessoas = TdPessoas[0]
            console.log(tdPessoas)
            return res.render('pages/Paciente', { tdPessoas });
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    SelecionaConsultaData: async (req, res) => {
        try {
            const id= req
            const result = await SelectConsultaData(id)
            const results = result[0]
            return results
          } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    SelecionaConsultaMobile: async (req, res) => {
        try {
            const id = req.session.user.id
            console.log(id)
            const result = await SelectConsultaData(id)
            const results = result[0]
            console.log(results)
            return res.json(results)
          } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    SelecionaConsultaAnteriores: async (req, res) => {
        try {
            const id= req
            const result = await SelectConsultasAnteriores(id)
            const results = result[0]
            return results
          } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    selectConsultaMedicos: async (req, res) => {
        try {
            const cpf = req.session.user.login
            const result = await SelectConsultaMedico(cpf,null);
            const { selectConsultaMedicos } = result;
            const results = selectConsultaMedicos[0]
            console.log("AQUI",results)
            // const resultId = selectConsultaIds[0]
            return res.render('pages/Medico', { results});
        } catch (error) {
            console.log(error);
            return res.json({ error: error.message });
        }
    },
    selectConsultaMedicosMobile: async (req, res) => {
        try {
            console.log("entrou")
            console.log(req.session.user.id)
            const id = req.session.user.id
            const result = await SelectConsultaMedicoMobile(id);
            const { selectConsultaMedicos } = result;
            const results = selectConsultaMedicos[0]
            console.log("AQUI",results)
            // const resultId = selectConsultaIds[0]
            return res.json({ results});
        } catch (error) {
            console.log(error);
            return res.json({ error: error.message });
        }
    },
    
}

module.exports = { selects }