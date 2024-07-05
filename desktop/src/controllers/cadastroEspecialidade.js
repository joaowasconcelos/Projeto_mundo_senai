const Especialidade = require("../models/classes/Especialidade");
const { insertEspecialidade, selectEspecialidades,UpdateEspecialidade } = require("../models/EspecialidadeModel");
const {SelectMedicoEspec} = require("../models/SelectsModel")

const cadastroEspecia = {
    paginaEspecialidade: async (req, res) => {
        try {
            res.render('pages/CadastraEspecialidade');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }

    },

    cadastraEspecialidade: async (req, res) => {
        try {
            const { Especialidade } = req.body;
            if (Especialidade === null || Especialidade === "" || Especialidade === "undefined") {
                return res.send('<script>alert("Descrição Inválida"); window.history.back();</script>');
            }

            const cadEsp = await selectEspecialidades();
            const especialidadeLowerCase = Especialidade.toLowerCase();
            teste = cadEsp[0]

            console.log("cadEsp", cadEsp);
            console.log("teste",teste)
            
            let especialidadeJaCadastrada = false;
            for (let i = 0; i < teste.length; i++) {
                if (teste[i].desc_especialidade.toLowerCase() === especialidadeLowerCase) {
                    especialidadeJaCadastrada = true;
                    break;
                }
            }
            console.log("especialidadeJaCadastrada",especialidadeJaCadastrada)
            if (especialidadeJaCadastrada === true) {
                return res.send('<script>alert("Especialidade já cadastrada"); window.history.back();</script>');
            }
            
            const result = await insertEspecialidade(Especialidade);
            return res.send('<script>alert("Especialidade cadastrada com sucesso"); window.history.back();</script>');
        } catch (error) {
            console.error("Erro ao cadastrar especialidades:", error);
            res.status(500).json({ error: "Erro ao cadastrar especialidades" });
        }
    }
};

const selectEspecialidade = {
    selectsEspecialidade: async (req, res) => {
        try {
            result = await selectEspecialidades()
            const Especialidade = result[0]
            return res.render('pages/Especialidade', { Especialidade });
        
        } catch (error) {
            console.error("Erro ao cadastrar especialidades:", error);
            res.status(500).json({ error: "Erro ao cadastrar especialidades" });
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

            if (especialidade) {
                const result1 = await SelectMedicoEspec(especialidade);
                medico = result1[0];
                console.log("Médicos recuperados:", medico);
            }
            return res.render('pages/Consulta', { Especialidade, medico, especialidadeSelecionada: especialidade });
        }catch (error) {
            console.error("Erro ao selecionar especialidades:", error);
            res.status(500).json({ error: "Erro ao selecionar especialidades" });
        }
    },
    SelecionaMedicoEspec: async (req, res) => {
        try {
            console.log("entrou1")
            const { especialidade } = req.query;
            console.log(especialidade);
            const result = await SelectMedicoEspec(especialidade);
            const medico = result[0];
            const especialidadesResult = await selectEspecialidades();
            const Especialidade = especialidadesResult[0];
            return res.render('pages/Consulta', { Especialidade, medico }); 
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    }
};

const updateEspecialidade = {
    updateEspec: async (req, res) => {
        try {
            const {Especialidades} = req.body;
            const EspId = req.params.id
            const updateEspeciali = new Especialidade(EspId,Especialidades)
            result = await UpdateEspecialidade(updateEspeciali)
            return res.json({message: "Especialidade atualizada"})
        } catch (error) {   
            console.error("Erro ao cadastrar especialidades:", error);
            res.status(500).json({ error: "Erro ao cadastrar especialidades" });
        }
    }
}

module.exports = { cadastroEspecia, selectEspecialidade,updateEspecialidade,selectEspecialidadeMedico };
