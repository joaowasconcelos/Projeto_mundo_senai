const express = require("express");
const router = express.Router();

const { cadastro } = require("../controllers/cadastroController");
const { LoginPerfis } = require("../controllers/loginController");
const {cadastroEspecia, selectEspecialidade, updateEspecialidade,selectEspecialidadeMedico} = require("../controllers/cadastroEspecialidade");
const {cadastroConsulta} = require("../controllers/cadastroConsulta");
const {cadastroProntuario} = require("../controllers/cadastroProntuario");
const { viewPaciente } = require("../controllers/pacienteController");
const { viewMedico }= require("../controllers/MedicoController");
const { viewAdm} = require("../controllers/AdmController")
const { viewProntuario} = require("../controllers/ProntuarioController")
const {selects} = require("../controllers/selectController");

router.get('/', (req, res) => {
  res.render('index', { title: 'Página Inicial' });
 });


router.post("/Pessoa/novo",cadastro.adicionaPessoa);
router.post ("/Cadastro/Especialidade",cadastroEspecia.cadastraEspecialidade)
router.post ("/Cadastro/Consulta",cadastroConsulta.cadastraConsulta)
router.post ("/Cadastro/Prontuario/:id",cadastroProntuario.cadastraProntuario)
router.post("/Login",LoginPerfis.LoginPessoa);
router.post("/Verifica/Login",LoginPerfis.LoginPessoa);
router.post("/CadastraEspecialidade",cadastroEspecia.cadastraEspecialidade);

router.get('/Cadastro', cadastro.paginaCadastro);
router.get ("/Login",LoginPerfis.paginaLogin);
router.get('/login/loginTipo', LoginPerfis.selecionaTipo);
// router.get('/login/loginCef', LoginPerfis.selecionaLogin);
router.get('/login/loginTipo', LoginPerfis.selecionaTipo);
router.get("/paciente/infos",viewPaciente.selecionaInfosPaciente);
router.get("/paciente/consultas", viewPaciente.selecionaConsultas);
// router.get ("/MedicoAdm", viewAdm.paginaMedicoAdm) /*Direciona para a pagina de vizualiçoes dos medicos*/
// router.get ("/Login",LoginPerfis.paginaLogin) /*Direciona para a pagina de login*/

//router.get ("/Paciente",viewPaciente.paginaPaciente) /*Direciona para a pagina de paciente*/
router.get('/Paciente', selects.SelecionaTodasPessoas);
router.get ("/PacienteInfo/:id",viewPaciente.selecionaInfosPaciente) /*Direciona para a pagina de info dos paciente*/
router.get ("/Medico",viewMedico.paginaMedico) /*Direciona para a pagina de medico*/
router.get ("/Adm",viewAdm.paginaAdm) /*Direciona para a pagina de adm*/
router.get ("/ConsultaAdm",viewAdm.paginaConsultaAdm) /*Direciona para ver a pagina consulta*/
router.get ("/Prontuario",viewProntuario.paginaProntuario) /*Direciona para ver a pagina consulta*/
// router.get ("/Especialidade",cadastroEspecia.paginaEspecialidade) /*Direciona para a pagina especialidade*/

router.get ("/Medico",viewMedico.paginaMedico);
router.get ("/Adm",viewAdm.paginaAdm);
router.get("/Especialidade",selectEspecialidade.selectsEspecialidade);


router.get("/Consulta",selectEspecialidadeMedico.selectsEspecialidadeMedico);

// router.get("/pessoas/infos/:id",viewPaciente.selecionaInfosPaciente);
router.get("/paciente/consultas/:id", viewPaciente.selecionaConsultas);
router.get("/Seleciona/Todas/Consultas",selects.selecionaTodasConsultas);
router.get("/MedicoAdm",selects.SelecionaTodosMedicos);
router.get("/Seleciona/Todas/Pessoas",selects.SelecionaTodasPessoas);
// router.get("/Seleciona/Medicos",selects.SelecionaMedicoEspec);

router.put("/Update/especialidade/:id",updateEspecialidade.updateEspec);
router.put("/Update/telefone/:id",cadastro.updateTelefone);
router.put("/Update/endereco/:id",cadastro.updateEndereco);
router.put("/Update/consulta/:id",cadastroConsulta.updateConsultas);
router.put("/Update/prontuario/:id",cadastroProntuario.UpdateProntuario);

router.use(function (req, res) {
    res.status(404).render(`pages/pag_erro`, { message: '404 - Página não encontrada' })
})
module.exports = router;
