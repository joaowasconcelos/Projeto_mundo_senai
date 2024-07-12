
const viewMedico = {
    paginaMedico: async (req, res) => {
        try {
            res.render('pages/Medico');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }

    },

}

module.exports = { viewMedico }