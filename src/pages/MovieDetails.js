import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = { // estados iniciais do component
      data: [],
      loading: true,
    };
  }

  componentDidMount() { // constructor > render > componentDidMount(invocado imediatamente após um componente ser montado)
    const { match: { params } } = this.props; // obtendo acesso especifico aos params através do match, deixando o acesso dinamico
    movieAPI.getMovie(params.id) // fazendo a requizição a função utilizando o params acessado na linha 19
      .then((data) => this.setState( // resposta positiva da requisição e mudança no estado de movie e loading
        { data,
          loading: false,
        },
      ));
  }

  deleteMovie(id) { // acessando a API e deletando o filme por sua ID de forma dinamica.
    movieAPI.deleteMovie(id);
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { loading, data } = this.state;
    if (loading) return <Loading />; // if (true) return <Loading />, Loading deve ser renderizado enquanto a requisição estiver em curso.
    const { title, storyline, imagePath, genre, rating, subtitle, id } = data; // {} < antes da desestruturação

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Title: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <Link to="/" onClick={ () => this.deleteMovie(id) }>DELETAR</Link>
        {/* Req7 - fazer uma requisiçao utilizando a função deleteMovie do módulo movieAPI e após a requisição re
        direcionar para a pagina inicial */}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default MovieDetails;
