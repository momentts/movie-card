// vindo de MovieList, la no req6
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor() {
    super();

    this.state = { // setando os estados iniciais ao chegar no componente atraves do
      // <Link to="/movies/new">ADICIONAR CARTÃO</Link> em MovieList
      Redirecting: false,
      movie: {
        title: '',
        subtitle: '',
        imagePath: '',
        storyline: '',
        genre: '',
        rating: '',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(newMovie) {
  // }
  handleSubmit(newMovie) {
    movieAPI.createMovie(newMovie); // acessando a API e criando o novo filme
    this.setState({ Redirecting: true }); // modifica o estado do redirect da pagina apos a criação do novo filme
  }

  render() {
    const { Redirecting, movie } = this.state;
    if (Redirecting) { // condicional inicial da pagina após o render
      return <Redirect to="/" />; // Redirecionamento para a pagina inicial após a criaçao do novo filme, como pedido no req6
    }

    return (
      <div data-testid="new-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
        {/* handleSubmit adicionada ao btn submit, guardando as informaçoes do
        novo filme no card */}
      </div>
    );
  }
}

export default NewMovie;
