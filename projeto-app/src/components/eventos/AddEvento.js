import React, { Component } from 'react'
import EventoService from "./../services/EventoService";
import { Button, Modal, Form, Row, Col }  from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';

class AddEvento extends Component{

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
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let evento = {
            Tema: this.state.tema, 
            Local: this.state.local, 
            DataEvento: new Date(this.state.dataEvento), 
            QtdPessoas: this.state.qtdPessoas,
            ImagemUrl: this.state.imagemUrl, 
            Telefone: this.state.telefone,
            Email: this.state.email
        };
        this.props.insert(evento);
    }

    handleChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    
    onChange = date => this.setState({dataEvento: date })

    render() {
        const { evento, salvando } = this.state;
        const isNew = !this.props.person;

        return(
            <div>
                <h2 className="text-center">Add Evento</h2>
                <Form>
                    <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Tema</Form.Label>
                            <Form.Control value={this.state.tema} name="tema" onChange={this.handleChange} placeholder="Tema" />
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
                            <Form.Control name="dataEvento" value={this.state.dataEvento}  onChange={this.handleChange} placeholder="Data" />
                            <DateTimePicker
                                onChange={this.onChange}
                                value={this.state.dataEvento}
                            />
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
                            <Form.Control type="file" name="imagemUrl" value={this.state.imagemUrl}  onChange={this.handleChange} placeholder="Data" />
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
                    <Button variant="secondary" onClick={this.close}>Fechar</Button>
                    <Button type="submit" variant="primary" onClick={this.handleSubmit} disabled={salvando}>
                        {salvando ? 'Salvando...' : 'Salvar'}</Button>
                </Form>
            </div>
        );
    }
}

export default AddEvento;