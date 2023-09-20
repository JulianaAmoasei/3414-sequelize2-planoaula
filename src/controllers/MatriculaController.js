const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async pegaUmaMatricula(req, res) { 
    const { estudanteId, id } = req.params;
    try {
      const umaMatricula = await matriculaServices.pegaUmRegistro({ id: id, estudante_id: estudanteId });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = MatriculaController;
