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
            const { login, senha } = req.body

            const loginConsulta = new Login(null, login, senha, null, null, null)
            console.log(loginConsulta)
            const result = await selectLogin(loginConsulta)

            if (result === "Medico") {
                console.log(result)
                console.log("entrou")
              
                return res.render('pages/Cadastro'); 
           
            }

            console.log('aqui', result[0][0].senha)
            if (senha != result[0][0].senha) {
                return res.json({ message: 'Senha incorreta' })
            }
            if (result[0].tipo === 'Paciente') {
                return res.render('/Paciente', { data: result[0] })
            } else if (result[0].tipo === 'Medico') {
                return res.render('/Medico', { data: result[0] })
            }
            return res.render('/Adm', { data: result[0] })


        } catch (error) {
            console.log(error)
            res.json(error);
        }
    },



    LoginPessoaMobile: async (req, res) => {
        console.log('HELP=>');
        try {
            const { login, senha } = req.body
            console.log('HELP=>');
            // const loginConsulta = new Login(null, login, senha, null, null, null)
            // console.log(loginConsulta)
            const result = await selectLogin(login)
            console.log('aaaaaaa',result);
            console.log('aqui', result[0][0].senha)
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