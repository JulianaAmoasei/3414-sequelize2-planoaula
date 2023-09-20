const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
  }

  async pegaMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistro({ id: id });
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }
}

module.exports = PessoaServices;
