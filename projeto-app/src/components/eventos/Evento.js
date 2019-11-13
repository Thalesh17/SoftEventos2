import React, { Component } from 'react';
import { Table, Button, Label, Form, Input, FormControl } from "react-bootstrap";
import NavBar from './../nav/NavBar';
import ModalEvento from './../modals/ModalEvento';
import api from './../../services/api';

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
// });

export default class Evento extends Component {
    constructor(props){
        super(props);

        this.state = {
            addModalShow: false,
            acao: 'Cadastrar',
            eventos: []
        }
    }

    async componentDidMount(){
        this.getEventos();
    }

    getEventos = async () => {
        const { data: eventos } = await api.get('/evento');

        console.log('eventos', eventos);

        this.setState({eventos});
    }

    editarEvento = (id) => {
        console.log(id);
    }

    deletarEvento = async (id) => {
        await api.delete(`/eventos/${id}`);

        this.setState({ eventos: this.state.eventos.filter(item => item.id !== id)});
    }

    render(){
        let addModalClose = () => this.setState({addModalShow: false});
        return (
            <div className="container">
                <NavBar />
                <br></br>
                <div className="d-flex">
                <div className="form-inline mr-auto">
                    <div className="form-group mb-2">
                    <FormControl type="text" placeholder="Pesquisar" className="mr-sm-2" />
                    </div>
                </div>
                <div>
                    <Button variant="outline-primary" onClick={() => this.setState({addModalShow: true, acao: 'Cadastrar'})}> 
                        Novo Evento</Button>
                </div>
                </div>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Imagem</th>
                    <th>Tema</th>
                    <th>Local</th>
                    <th>Data do Evento</th>
                    <th>Qtd Pessoas</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.eventos.map(evento => (
                        <tr key={evento.id}>
                            <td></td>    
                            <td><img src={evento.imagemUrl}></img></td>    
                            <td>{evento.tema}</td>  
                            <td>{evento.local}</td>    
                            <td>{evento.dataEvento}</td>    
                            <td>{evento.qtdPessoas}</td>    
                            <td>{evento.telefone}</td>    
                            <td>{evento.email}</td>    
                            <td>
                                <div className="btn-group">
                                    <Button className="btn btn-sm btn-success" onClick={this.editarEvento(evento.id)} tooltip="Editar">
                                        <i className="fas fa-edit"></i>Editar
                                    </Button>
                                    <Button className="btn btn-sm btn-danger" tooltip="Excluir">
                                        <i className="fas fa-eraser"></i>Excluir
                                    </Button>
                                </div>
                            </td> 
                        </tr>
                        )
                        )
                    }       
                </tbody>
                </Table>
                <ModalEvento 
                show={this.state.addModalShow}
                onHide={addModalClose}
                acao={this.state.acao}
                />
            </div>
        )
    }
}
