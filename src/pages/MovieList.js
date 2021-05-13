import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: false, // criação do estado inicial do load na tela
    };
  }

  componentDidMount() { // constructor > render > componentDidMount(invocado imediatamente após um componente ser montado)
    this.loadingState(true); // chamada na mudança do estado do load
    movieAPI.getMovies().then((result) => { // chamada da API em movieAPI buscando a funçao getMovies
      this.setState({ movies: result }); // chamada da API em movieAPI buscando a funçao getMovies e alterando o estado
      this.loadingState(false);
    });
  }

  loadingState() {
    this.setState((state) => ({ loading: !state.loading })); // mudança no estado do load, explicação aula ao vivo dia 05/05
  }

  render() {
    const { movies, loading } = this.state;

    // Render Loading here if the request is still happening
    return (
      <div data-testid="movie-list">
        { loading ? <Loading /> // renderização condicional, explicação aula ao vivo dia 05/05
          : movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />) }
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        {/* req6, redirecionamento de rota */}
      </div>
    );
  }
}

export default MovieList;
