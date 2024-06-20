
const viewAdm = {

    paginaAdm: async (req, res) => {
        try {
            res.render('pages/Adm');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }

    },

    paginaConsultaAdm: async (req, res) => {
        try {
            res.render('pages/ConsultaAdm');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }

    },


    paginaMedicoAdm: async(req, res) => {
        try{
            res.render('pages/MedicoAdm');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error});
        }
    }

}

module.exports = { viewAdm }