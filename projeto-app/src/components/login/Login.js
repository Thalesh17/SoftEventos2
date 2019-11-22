import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from '../../login.svg';
import api from "../../services/api";
import { Form, Container } from "./styles";

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    }
    try{
      const response = await api
        .post("/User/Login", { username, password })
        .then(res => {
          localStorage.setItem("user_login", username)
          this.props.history.push("/eventos");
      });
    }catch(err){
      this.setState({error:
            "Houve um problema com o login, verifique suas credenciais. T.T"});
    }

  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome de Usuario"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/register">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);