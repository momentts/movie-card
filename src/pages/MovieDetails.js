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
      loading: true, // diferente do MovieList aqui o estado inicia verdadeiro, ja que é uma pagina nova(redirecionamento)
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    movieAPI
      .getMovie(params.id)
      .then((data) => this.setState({ data, loading: false }));
  }

  handleDelete(id) {
    movieAPI.deleteMovie(id);
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { loading, data } = this.state;
    if (loading) return <Loading />; // if (true) return <Loading />;
    const { title, storyline, imagePath, genre, rating, subtitle, id } = data;

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
        <Link to="/" onClick={ () => this.handleDelete(id) }>DELETAR</Link>
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
