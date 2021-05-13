import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true, // criação do estado inicial do load na tela
    };
  }

  // componentDidMount() { // constructor > render > componentDidMount(invocado imediatamente após um componente ser montado)
  //   this.loadingState(true); // chamada na mudança do estado do load
  //   movieAPI.getMovies().then((result) => { // chamada da API em movieAPI buscando a funçao getMovies
  //     this.setState({ movies: result }); // chamada da API em movieAPI buscando a funçao getMovies e alterando o estado
  //     this.loadingState(false);
  //   });
  // }
  componentDidMount() {
    movieAPI.getMovies().then((data) => this.setState({ movies: data, loading: false }));
  }

  render() {
    const { movies, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div data-testid="movie-list">
        {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
      </div>
    );
  }
}

export default MovieList;
