const Login = require("../models/classes/Login");
const { selectLogin, verificarSenha } = require('../models/LoginModel')
const Perfis = require("../models/PerfisModel");



const LoginPerfis = {
    paginaLogin: async (req, res) => {
        try {
            res.render('pages/Login');
        }
        catch (error) {
            console.log(error);
            res.render('pages/pag_erro', { message: error });
        }

    },
    LoginPessoa: async (req, res) => {
        try {
            const { login, senha } = req.body;
            const loginConsulta = new Login(null, login, senha, null, null, null);
            const result = await selectLogin(loginConsulta);
            console.log(result)
            if (result === 'Paciente') {
                console.log("Usuário logado como Paciente");
                return res.render('pages/',);
            }else if (result === 'Medico') {
                console.log("Usuário logado como Médico");
                return res.render('pages/MedicoAdm');
            } else if (result === 'Adm') {
                console.log("Usuário logado como Administrador");
                return res.render('pages/Adm');
            } else {
                return res.json({ message: 'Tipo de usuário desconhecido' });
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.' });
        }
    },




    LoginPessoaMobile: async (req, res) => {
        try {
            const { login, senha } = req.body
            const result = await selectLogin(login)
            if (senha != result[0][0].senha) {
                return res.json({ message: 'Senha incorreta' })
            }
            if (result[0].tipo === 'Paciente') {
                return res.json({ data: result[0] })
            } else if (result[0].tipo === 'Medico') {
                return res.json({ data: result[0] })
            }
            return res.json({ data: result[0] })
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },

    // selecionaLogin: async (req, res) => {
    //     try {
    //         console.log(req.body)
    //         const cpf = req.body;
    //         const selecionaLogin = await selectLogin(cpf)
    //         return res.json(selecionaLogin)
    //     } catch (error) {
    //         console.log(error)
    //         res.json(error);
    //     }
    // },

    selecionaTipo: async (req, res) => {

        const { perfis: [{ tipo }] } = req.body
        console.log(tipo)
        const selecionaTipo = await Perfis.selectTipo(tipo)
        return res.json(selecionaTipo)
    },


    // verificarSenha: () =>{
    //     bcrypt.compare(password, user.password, (err, isMatch) => {
    //         if (err) {
    //             console.error('Erro ao comparar as senhas:', err);
    //             res.status(500).json({ success: false, message: 'Erro no servidor' });
    //             return;
    //         }
    //         if (isMatch) {
    //             res.json({ success: true });
    //         } else {
    //             res.json({ success: false, message: 'Senha incorreta' });
    //         }
    //     });
    // }

}
module.exports = { LoginPerfis }