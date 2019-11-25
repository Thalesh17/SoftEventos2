import React, { Component } from 'react'
import EventoService from './../services/EventoService';
import { Table, Button, Label, Form, Input, FormControl } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import EditEvento from './EditEvento';
import AddEvento from './AddEvento';
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';   

class ListEventos extends Component {

    constructor(props) {
        super(props)

        this.state = {
            eventos: [],
            showAdd: false,
            showEdit: false,
            search: ''
        }

        this.deleteEvento = this.deleteEvento.bind(this);
        this.editEvento = this.editEvento.bind(this);
        this.addEvento = this.addEvento.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        this.update = this.update.bind(this);
        this.insert = this.insert.bind(this);
    }

    componentDidMount() {
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
               if(res.status == 200){
                    this.setState({eventos: this.state.eventos.filter(user => user.id !== userId)});
                    toast.success('Evento deletado com sucesso', 'Title', {displayDuration:2000})
               }else{
                    toast.error('Erro ao excluir o evento', 'Title', {displayDuration:2000})
               }
           })

    }

    editEvento(id) {
        window.localStorage.setItem("eventoId", id);
        if(id == window.localStorage.getItem("eventoId"))
        {
            const {showEdit} = this.state;
            this.setState({showEdit: !showEdit , showAdd: false});
        }else{
            this.setState({showEdit: true , showAdd: false});
        }
    }

    insert(evento){
        EventoService.addEvento(evento)
        .then(res => {
            if(res.status == 201){     
                this.setState({showAdd: false});
                toast.success('Evento criado com sucesso', 'Title', {displayDuration:2000});
                this.reloadUserList();
            }else{
                toast.error('Erro ao editar o evento', 'Title', {displayDuration:2000})
            }
        });
    }

    update(evento){
        EventoService.editEvento(evento)
        .then(res => {
            if(res.status == 201){     
                this.setState({showEdit: false});
                toast.success('Evento editado com sucesso', 'Title', {displayDuration:2000});
                this.reloadUserList();
            }else{
                toast.error('Erro ao editar o evento', 'Title', {displayDuration:2000})
            }
        });

        localStorage.removeItem("userId")
    }

    addEvento() {
        window.localStorage.removeItem("userId");
        const { showAdd } = this.state;
        this.setState({showEdit: false , showAdd: !showAdd});
    }

    updateSearch = (event) => this.setState({search: event.target.value.substr(0, 20)});

    render() {
        const {showAdd, showEdit} = this.state;
        let filteredEventos = this.state.eventos.filter(
            (evento) => {
                return evento.tema.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div>
                <ToastContainer />
                <div className="d-flex">
                    <div className="form-inline mr-auto">
                        <div className="form-group mb-2">
                            <FormControl type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Pesquisar" className="mr-sm-2" />
                        </div>
                    </div>
                    <div>
                        <Button variant="outline-primary" onClick={this.addEvento}> 
                            Novo Evento</Button>
                    </div>
                </div>
                <h2 className="text-center">Evento Details</h2>
                <Table striped bordered hover>
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
                    {filteredEventos.map(evento => (
                        <tr key={evento.id}>
                            <td></td>    
                            <td><img src={evento.imagemUrl}></img></td>    
                            <td>{evento.tema}</td>  
                            <td>{evento.local}</td>    
                            <td>{new Date(evento.dataEvento).toLocaleDateString()}</td>    
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
                {showEdit ? <EditEvento update={this.update}></EditEvento> : ''}
                {showAdd  ? <AddEvento insert={this.insert}></AddEvento> : ''}
            </div>
        );
    }

}
export default withRouter(ListEventos);
