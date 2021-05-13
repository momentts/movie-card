import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor() {
    super();

    this.state = {
      status: 'loading',
      Redirecting: false,
      movie: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() { // constructor > render > componentDidMount(invocado imediatamente após um componente ser montado)
    const { match: { params } } = this.props; // obtendo acesso especifico aos params através do match, deixando o acesso dinamico
    movieAPI.getMovie(params.id) // fazendo a requizição a função utilizando o params acessado na linha 21
      .then((data) => this.setState( // resposta positiva da requisição e mudança no estado de movie e status
        { movie: data,
          status: '',
        },
      ));
  } // mesma logica utilizada no MovieDetails.

  handleSubmit(updatedMovie) {
    movieAPI.updateMovie(updatedMovie); // acessando a API e modificando o filme escolhido
    this.setState({ Redirecting: true }); // modificando o status do redirecionamento
  }

  render() {
    const { status, Redirecting, movie } = this.state;
    if (Redirecting) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
        {/* faz uma requisiçao utilizando a função handleSubmit enviando as modificação
        feitas no filme para o card */}
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default EditMovie;
