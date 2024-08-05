const Login = require("../models/classes/Login");
const { selectLogin, verificarSenha, deletarLogin } = require('../models/LoginModel')
const Perfis = require("../models/PerfisModel");

const LoginPerfis = {
    paginaLogin: async (req, res) => {
        res.render('pages/Login');
    },
    LoginPessoa: async (req, res) => {
        try {
            const { login, senha } = req.body;
            const loginConsulta = new Login(null, login, senha, null, null, null);
            const result = await selectLogin(loginConsulta);
            console.log(result)
            if (result.length === 0) {
                req.flash('error', 'Login ou senha incorretos.');
                return res.redirect('/login');  
            }

            let firstObject, secondObject, thirdObject;
    

            if (result[0].tipo.includes("paciente")) {
                firstObject = "paciente";
                req.session.isAuthenticated = true;
                req.session.user = result[0];
            }
            if (result[0].tipo.includes("medico")) {
                secondObject = "medico";
                req.session.isAuthenticated = true;
                req.session.user = result[0];
            }
            if (result[0].tipo.includes("adm")) {
                thirdObject = "adm";
                req.session.isAuthenticated = true;
                req.session.user = result[0];
            }

            if (result[0].tipo.length>=0) {

                const resultl = result[0].login
                const results = result[0].senha
                return res.render("pages/Login", { firstObject, secondObject,thirdObject,resultl,results})
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            return res.send('adfhadn um erro no servidor. Por favor, tente novamente mais tarde.');
        }
    },

    direcionaLogin: async (req, res) => {
        try {
            const { tipo } = req.body;
            switch (tipo.toLowerCase()) {
                case 'paciente':
                    return res.redirect('/Paciente/Usuario');   
                case 'medico':
                    return res.redirect('/Medico');
                case 'adm':
                    return res.redirect('/adm');
                default:
                    return res.json({ error: 'Tipo de usuário não reconhecido' });
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.' });
        }
    },



    LoginPessoaMobile: async (req, res) => {
        try {
            console.log('oi1');
            const { login, senha } = req.body

            const loginConsulta = new Login(null, login, senha, null, null, null);
            const resultMobile = await selectLogin(loginConsulta);

            if (senha != resultMobile[0].senha) {

                return res.json({ message: 'Senha incorreta' })
            }

            if (resultMobile[0].tipo.includes("paciente")) {
                const tipo = "paciente"
                req.session.user = resultMobile[0];
                const id = resultMobile[0].id
                return res.json({ id, tipo, user: req.session.user });
            }

            if (resultMobile[0].tipo.includes("medico")) {
                const tipo = "medico"
                const id = resultMobile[0].id
                req.session.user = resultMobile[0];
                console.log("requisição do usuario",req.session.user)
                return res.json({ id, tipo, user: req.session.user });
            }

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
    // };

    deletarLogin: async (req, res) => {
        try {
            const id = req.params.id;
            const obgLog = new Login(id);
            const result = await deletarLogin(obgLog);
            if (result.error) {
                res.status(500).json({ success: false, message: 'Erro ao excluir Login', error: result.details });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao excluir login" });
        }
    },
}
module.exports = { LoginPerfis }