import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = { // estados iniciais do component
      movie: [],
      loading: true, // diferente do MovieList aqui o estado inicia verdadeiro, ja que é uma pagina nova(redirecionamento)
    };
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() { // constructor > render > componentDidMount(invocado imediatamente após um componente ser montado)
    this.getIdMovie(); // componente montado fazendo requisição para getIdMovie
    this.loadingState(true); // chamada na mudança do estado do load
  }

  getIdMovie() {
    // auxilio extraído do site https://scotch.io/courses/using-react-router-4/route-params
    // req 4 do projeto
    const { match: { params: { id } } } = this.props; // obtendo acesso especifico ao ID através do match, deixando o acesso a rota dinamico
    movieAPI.getMovie(id) // fazendo a requizição a função utilizando o ID acessado na linha 27
      .then((data) => { // resposta positiva da requisição
        this.setState({ // mudança no estado de movie e loading
          movie: data,
          loading: false,
        });
      });
  }

  deleteMovie() {
    // auxilio extraído do site https://scotch.io/courses/using-react-router-4/route-params
    // req 7 do projeto
    const { match: { params: { id } } } = this.props; // obtendo acesso especifico ao ID através do match, deixando o acesso a rota dinamico
    movieAPI.deleteMovie(id) // resolvendo a requisição através do ID extraido na linha 40
      .then((data) => data);
  }

  loadingState() {
    this.setState((state) => ({ loading: !state.loading })); // mudança no estado do load, explicação aula ao vivo dia 05/05
  } // mesma logica do MovieList, copiado e colado literalmente

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;
    const { loading, movie } = this.state;
    if (loading) return <Loading />; // if (true) return <Loading />;
    const { match: { params: { id } } } = this.props;
    const { title, storyline, imagePath, genre, rating, subtitle } = movie;

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
        <Link to="/" onClick={ this.deleteMovie }>DELETAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default MovieDetails;
