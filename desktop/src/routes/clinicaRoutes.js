const express = require("express");
const router = express.Router();

const { cadastro } = require("../controllers/cadastroController");
const { LoginPerfis } = require("../controllers/loginController");
const { cadastroEspecia, selectEspecialidade, updateEspecialidade } = require("../controllers/cadastroEspecialidade");
const { cadastroConsulta, selectEspecialidadeMedico } = require("../controllers/cadastroConsulta");
const { cadastroProntuario } = require("../controllers/cadastroProntuario");
const { viewPaciente } = require("../controllers/pacienteController");
const { selects } = require("../controllers/selectController");
const {ensureAuthenticated,ensureAdmin,ensureMedico} = require("../js/verificacaoLogin")

router.get('/', (req, res) => {
  res.render('index', { title: 'Página Inicial' });
});

router.post('/auth/login', LoginPerfis.LoginPessoa);
router.post("/Pessoa/novo", cadastro.adicionaPessoa);
router.post("/Cadastro/Especialidade", cadastroEspecia.cadastraEspecialidade)
router.post("/Cadastro/Consulta", cadastroConsulta.cadastraConsulta)
router.post("/Cadastro/Prontuario/:id", cadastroProntuario.cadastraProntuario)
router.post("/CadastraEspecialidade", cadastroEspecia.cadastraEspecialidade);
// router.post("/Login",LoginPerfis.LoginPessoa);
// router.post("/Verifica/Login",LoginPerfis.LoginPessoa);



router.get('/Paciente/Usuario', ensureAuthenticated, (req, res) => {
  res.render('pages/PacienteUsuario', { user: req.session.user });
});

router.get('/Medico', ensureMedico, (req, res) => {
  res.render('pages/Medico', { user: req.session.user });
});

router.get('/adm', ensureAdmin, (req, res) => {
  res.render('pages/Adm', { user: req.session.user });
});

router.get('/Cadastro', ensureAdmin, (req, res) => {
  res.render('pages/Cadastro', { user: req.session.user });
});

router.get('/Paciente', ensureAdmin, (req, res) => {
  selects.SelecionaTodasPessoas(req, res, (err, tdPessoas) => {
      res.render('pages/Paciente', { tdPessoas, user: req.session.user });
  });
});

router.get('/Especialidade', ensureAdmin, (req, res) => {
  selectEspecialidade.selectsEspecialidade(req, res, (err, especialidades) => {
      res.render('pages/Especialidade', { especialidades, user: req.session.user });
  });
});

router.get('/MedicoAdm', ensureAdmin, (req, res) => {
  selects.SelecionaTodosMedicos(req, res, (err, TdsMedicos) => {
      res.render('pages/MedicoAdm', { TdsMedicos, user: req.session.user });
  });
});

router.get('/Prontuario', ensureMedico, (req, res) => {
  res.render('pages/Prontuario', { user: req.session.user });
});

router.get('/ConsultaAdm', ensureAdmin, (req, res) => {
  selects.selecionaTodasConsultas(req, res, (err, tdsConsultas) => {
      res.render('pages/ConsultaAdm', { tdsConsultas, user: req.session.user });
  });
});

router.get('/Consulta', ensureAdmin, (req, res) => {
  selectEspecialidadeMedico.selectsEspecialidadeMedico(req, res, (err, Especialidade, medico, especialidade ,pacientes) => {
      res.render('pages/Consulta', {Especialidade, medico, especialidadeSelecionada: especialidade ,pacientes, user: req.session.user });
  });
});

router.get('/login', LoginPerfis.paginaLogin);
router.get("/PacienteInfo/:id", viewPaciente.selecionaInfosPaciente) /*Direciona para a pagina de info dos paciente*/
router.get("/paciente/consultas/:id", viewPaciente.selecionaConsultas);

// router.get("/Consulta", selectEspecialidadeMedico.selectsEspecialidadeMedico);
// router.get("/ConsultaAdm", selects.selecionaTodasConsultas);
// router.get("/Prontuario", viewProntuario.paginaProntuario)
// router.get("/MedicoAdm", selects.SelecionaTodosMedicos);
// router.get('/Paciente', selects.SelecionaTodasPessoas);
//router.get("/Especialidade", selectEspecialidade.selectsEspecialidade);
// router.get("/Medico", viewMedico.paginaMedico);
// router.get("/Medico", viewMedico.paginaMedico) /*Direciona para a pagina de medico*/
// router.get("/Adm", viewAdm.paginaAdm) /*Direciona para a pagina de adm*/
// router.get("/Seleciona/Todas/Pessoas", selects.SelecionaTodasPessoas);
// router.get("/Adm", viewAdm.paginaAdm);
// router.get ("/Especialidade",cadastroEspecia.paginaEspecialidade) /*Direciona para a pagina especialidade*/
// router.get("/Seleciona/Medicos",selects.SelecionaMedicoEspec);
// router.get("/pessoas/infos/:id",viewPaciente.selecionaInfosPaciente);
// router.get("/ConsultaAdm", viewAdm.paginaConsultaAdm) /*Direciona para ver a pagina consulta*/
// router.get ("/MedicoAdm", viewAdm.paginaMedicoAdm) /*Direciona para a pagina de vizualiçoes dos medicos*/
// router.get ("/Login",LoginPerfis.paginaLogin) /*Direciona para a pagina de login*/
// router.get ("/Paciente",viewPaciente.paginaPaciente) /*Direciona para a pagina de paciente*/
// router.get ("/Login",LoginPerfis.paginaLogin);
// router.get('/login/loginTipo', LoginPerfis.selecionaTipo);
// router.get('/login/loginCef', LoginPerfis.selecionaLogin);
// router.get('/login/loginTipo', LoginPerfis.selecionaTipo);
// router.get("/paciente/infos", viewPaciente.selecionaInfosPaciente);
// router.get("/paciente/consultas", viewPaciente.selecionaConsultas);


router.put("/Update/especialidade/:id", updateEspecialidade.updateEspec);
router.put("/Update/telefone/:id", cadastro.updateTelefone);
router.put("/Update/endereco/:id", cadastro.updateEndereco);
router.put("/Update/consulta/:id", cadastroConsulta.updateConsultas);
router.put("/Update/prontuario/:id", cadastroProntuario.UpdateProntuario);

router.delete('/deletar/pessoa/:id', cadastro.deletePessoa)
router.delete('/deletar/funcionario/:id', cadastro.deletarFuncionario)

router.use(function (req, res) {
  res.status(404).render(`pages/pag_erro`, { message: '404 - Página não encontrada' })
})
module.exports = router;
