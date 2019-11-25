import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col, Nav }  from "react-bootstrap";
import EventoService from "./../services/EventoService";
import { withRouter } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';

class EditEvento extends Component {

    constructor(props){
        super(props);
        this.state ={
            tema: '',
            local: '',
            dataEvento: '',
            qtdPessoas: '',
            imagemUrl: '',
            telefone: '',
            email: '',
            salvando: '',
            message: null
        }

        this.saveEvento = this.saveEvento.bind(this);
        this.loadEvento = this.loadEvento.bind(this);
    }

    componentDidMount() {
        this.loadEvento();
    }

    cancelar = () => this.props.history.push('/eventos');
    

    loadEvento() {
        EventoService.fetchEventoById(window.localStorage.getItem("eventoId"))
            .then((res) => {
                let evento = res.data;
                this.setState({
                    id: evento.id,
                    tema: evento.tema,
                    local: evento.local,
                    dataEvento: evento.dataEvento,
                    qtdPessoas: evento.qtdPessoas,
                    imagemUrl: evento.imagemUrl,
                    telefone: evento.telefone,
                    email: evento.email,
                })
            });
    }

    handleChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveEvento = (e) => {
        e.preventDefault();
        let evento = {
            Id: this.state.id,
            Tema: this.state.tema, 
            Local: this.state.local, 
            DataEvento: this.state.dataEvento, 
            QtdPessoas: this.state.qtdPessoas,
            ImagemUrl: this.state.imagemUrl, 
            Telefone: this.state.telefone,
            Email: this.state.email
        };

        this.props.update(evento);
    }

    onChange = date => this.setState({dataEvento: date })

    render() {
        const { salvando } = this.state;
        return (
            <div>
                <h2 className="text-center">Edit Evento</h2>
                <Form>
                    <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Tema</Form.Label>
                            <Form.Control  name="tema" value={this.state.tema || ''} onChange={this.handleChange} placeholder="Tema" />
                        </Col>
                        <Col>
                            <Form.Label>Local</Form.Label>
                            <Form.Control name="local" value={this.state.local} onChange={this.handleChange} placeholder="Local" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Data e Hora</Form.Label>
                            <DateTimePicker
                                onChange={this.onChange}
                                value={this.state.dataEvento}
                            />
                            <Form.Control name="dataEvento" value={this.state.dataEvento}  onChange={this.handleChange} placeholder="Data" />
                        </Col>
                        <Col>
                            <Form.Label>Qtd Pessoas</Form.Label>
                            <Form.Control name="qtdPessoas" value={this.state.qtdPessoas} onChange={this.handleChange} placeholder="Qtd Pessoas" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control type="file" name="imagemUrl" value={this.state.magemUrl}  onChange={this.handleChange} placeholder="Data" />
                        </Col>
                        <Col>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control name="telefone" value={this.state.telefone}  onChange={this.handleChange} placeholder="Telefone" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                        </Col>
                    </Row>
                </Form.Group>
                    <Button variant="secondary" onClick={this.cancelar}>Cancelar</Button>
                    <Button variant="primary" onClick={this.saveEvento} disabled={salvando}>
                        {salvando ? 'Salvando...' : 'Salvar'}</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(EditEvento);