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
      loading: false,
    };
  }

  componentDidMount() {
    this.loadingState(true); // chamada na mudança do estado
    movieAPI.getMovies().then((result) => { // chamada da API
      this.setState({ movies: result });
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
