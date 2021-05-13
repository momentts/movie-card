import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div data-testid="movie-card">
        {/* Req3, Será validado se cada MovieCard exibe pelo menos o
        título e a sinopse de seu respectivo filme */}
        <h3>{ movie.title }</h3>
        {/* Req3, Será validado se cada MovieCard exibe pelo menos o
        título e a sinopse de seu respectivo filme */}
        <span>{ movie.storyline }</span>
        <Link to={ `movies/${movie.id}` }>VER DETALHES</Link>
        {/* Será validado se cada MovieCard contém um link com o texto VER DETALHES que redireciona para a página de
        detalhes do filme */}
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    storyline: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
