import React, { Component } from 'react'
import api from './api';

export default class App extends Component {

  // 1- define variáveis
  state = {
    users: [],
  };

  // 2- busca os dados
  async componentDidMount() {
    const response = await api.get('');
    this.setState({ users: response.data });
  };

  render() {

    // 3- joga dados dentro do render da página
    const { users } = this.state;

    return (
      <div>
        <h1>Lista Usuários</h1>
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
          {users.map(user => (
            <li key={user.id}>
              <h2>{user.nome}</h2>
              <p>
                {user.email}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}