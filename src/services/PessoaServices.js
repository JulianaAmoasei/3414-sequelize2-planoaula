const Services = require('./Services.js');
const dataSource = require('../database/models');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaServices = new Services('Matricula');
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaTodasAsMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async pegaPessoaEscopoTodos() {
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  async cancelaPessoaEMatriculas(estudanteId){
    return dataSource.sequelize.transaction(async (t) => {
      await super
        .atualizaRegistro(
          { ativo: false }, 
          { id: estudanteId }, 
          { transaction: t });
      await this.matriculaServices
        .atualizaRegistro(
          { status: 'cancelado' }, 
          { estudante_id: estudanteId },
          { transaction: t });        
    });
  }
}

module.exports = PessoaServices;
