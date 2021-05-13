import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import * as movieAPI from '../services/movieAPI';

import { Loading, MovieForm } from '../components';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    const { movie } = props;
    this.state = { status: 'loading', shouldRedirect: false, movie };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.movieId();
  }

  async handleSubmit(updatedMovie) {
    const resolved = await movieAPI.updateMovie(updatedMovie);
    this.setState({
      status: 'loading',
      shouldRedirect: true,
      movie: resolved,
    });
  }

  movieId = async () => {
    const { match: { params: { id } } } = this.props;
    const getMovie = await movieAPI.getMovie(id);
    this.setState({
      movie: getMovie,
      status: null,
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  match: PropTypes.shape().isRequired,
};

export default EditMovie;
