import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
    const { movie: { title, storyline, id } } = this.props;
    const idName = `/movies/${id}`; // template literals para deixar dinamico o id do filme
    return (
      <div data-testid="movie-card">
        {/* Req3, Será validado se cada MovieCard exibe pelo menos o
        título e a sinopse de seu respectivo filme */}
        <h3>{ title }</h3>
        {/* Req3, Será validado se cada MovieCard exibe pelo menos o
        título e a sinopse de seu respectivo filme */}
        <span>{ storyline }</span>
        <Link to={ idName }>VER DETALHES</Link>
        {/* Será validado se cada MovieCard contém um link com o texto VER DETALHES que redireciona para a página de
        detalhes do filme */}
      </div>
    );
  }
}
// Pesquisa relacionada ao uso do Shape
// https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
MovieCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    storyline: PropTypes.string,
  }),
};
// Pesquisa relacionada ao uso do defaultProps
// https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
// A defaultProps será usada para garantir que this.props.name tenha
// um valor caso não tenha sido especificado pelo componente pai.
// A checagem de tipos de propTypes acontece após defaultProps ser
// resolvida, logo a checagem também será aplicada à defaultProps.

MovieCard.defaultProps = {
  movie: {
    id: 0,
    title: '',
    storyline: '',
  },
  match: {
    params: {
      id: 0,
    },
  },
};

export default MovieCard;
