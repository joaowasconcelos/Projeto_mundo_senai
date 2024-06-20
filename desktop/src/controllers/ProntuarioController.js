
const viewProntuario = {

    paginaProntuario: async (req, res) => {
        try {
            res.render('pages/Prontuario');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }

    },

}

module.exports = { viewProntuario }