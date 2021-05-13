import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [], // criação do estado inicial do load na tela
      loading: true, // criação do estado inicial do load na tela
    };
  }

  componentDidMount() { // constructor > render > componentDidMount(invocado imediatamente após um componente ser montado)
    movieAPI.getMovies() // chamada da API em movieAPI buscando a funçao getMovies
      .then((data) => this.setState( // resposta positiva da API e alterando o estado
        { movies: data,
          loading: false,
        },
      ));
  }

  render() {
    const { movies, loading } = this.state;
    if (loading) return <Loading />; // condicional do componente Loading ser exibido ou nao na tela

    return (
      <div data-testid="movie-list">
        {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        {/* Req6 - O link deve conter o texto "ADICIONAR CARTÃO" e apontar para a rota /movies/new,
         contendo um formulário para criar novos cartões. */}
      </div>
    );
  }
}

export default MovieList;
