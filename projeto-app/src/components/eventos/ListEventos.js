import React, { Component } from 'react'
import EventoService from './../services/EventoService';
import { Table, Button, Label, Form, Input, FormControl } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import EditEvento from './EditEvento';
import AddEvento from './AddEvento';

class ListEventos extends Component {

    constructor(props) {
        super(props)

        this.state = {
            eventos: [],
            showAdd: false,
            showEdit: false,
            message: null
        }

        this.deleteEvento = this.deleteEvento.bind(this);
        this.editEvento = this.editEvento.bind(this);
        this.addEvento = this.addEvento.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    componentWillReceiveProps(){
        console.log("recebeu")
        this.reloadUserList();
    }

    reloadUserList() {
        EventoService.fetchEventos()
            .then((res) => {
                this.setState({eventos: res.data})
            });
    }

    deleteEvento(userId) {
        EventoService.deleteEvento(userId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.id !== userId)});
           })

    }

    editEvento(id) {
        window.localStorage.setItem("userId", id);
        const {showEdit} = this.state;
        this.setState({showEdit: !showEdit , showAdd: false});
    }

    addEvento() {
        window.localStorage.removeItem("userId");
        const { showAdd } = this.state;
        this.setState({showEdit: false , showAdd: !showAdd});
    }

    render() {
        const {showAdd, showEdit} = this.state;
        return (
            <div>
                <div className="d-flex">
                    <div className="form-inline mr-auto">
                        <div className="form-group mb-2">
                            <FormControl type="text" placeholder="Pesquisar" className="mr-sm-2" />
                        </div>
                    </div>
                    <div>
                        <Button variant="outline-primary" onClick={this.addEvento}> 
                            Novo Evento</Button>
                    </div>
                </div>
                <h2 className="text-center">Evento Details</h2>
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
                                    <Button onClick={() => this.editEvento(evento.id)} className="btn btn-sm btn-success"tooltip="Editar">
                                        <i className="fas fa-edit"></i>Editar
                                    </Button>
                                    <Button className="btn btn-sm btn-danger" onClick={() => this.deleteEvento(evento.id)} tooltip="Excluir">
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
                {showEdit ? <EditEvento></EditEvento> : ''}
                {showAdd  ? <AddEvento></AddEvento> : ''}
            </div>
        );
    }

}
export default withRouter(ListEventos);
