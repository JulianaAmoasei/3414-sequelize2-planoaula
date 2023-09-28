const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async pegaTodasAsPessoas(req, res) {
    try {
      const listaTodasAsPessoas = await pessoaServices.pegaPessoaEscopoTodos();
      return res.status(200).json(listaTodasAsPessoas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaMatriculasAtivas(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      // erro
    }
  }

  async pegaTodasAsMatriculas(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      // erro
    }
  }

  async cancelaRegistroPessoa(req, res) {
    const { estudante_id } = req.params;
    try {
      await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));
      return res.status(200).json({message: `matrículas ref. estudante ${estudante_id} canceladas`});
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
