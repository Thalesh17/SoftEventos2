import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col }  from "react-bootstrap";
import axios from 'axios';
import api from './../../services/api';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'


class ModalEvento extends Component {
    constructor(props){
        super(props);

        this.initialState  = {
            id: "",
            tema: "",
            local: "",
            qtdPessoas: "",
            imagemUrl: "",
            dataEvento: "",
            telefone: "",
            email: ""
        }
      
        if(props.evento){
            this.state = props.evento
        } else {
            this.state = this.initialState;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);

    }

    handleChange= (e)=> {  
        this.setState({ [e.target.name]: e.target.value});  
    } 

    render(){

        let tituloPagina; 
        if(this.initialState.id) {
            tituloPagina = <h2>Editar Evento</h2>
        } else {
            tituloPagina = <h2>Cadastrar Evento</h2>
        }

        return( 
        <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                    {tituloPagina}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Tema</Form.Label>
                        <Form.Control value={this.state.tema} name="tema" onChange={this.handleChange} placeholder="Tema" />
                    </Col>
                    <Col>
                        <Form.Label>Local</Form.Label>
                        <Form.Control name="local" onChange={this.handleChange} placeholder="Local" />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Data e Hora</Form.Label>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Fechar</Button>
                <Button type="submit" variant="primary">Salvar</Button>
            </Modal.Footer>
            </Form>
          </Modal>)
    }
}
export default ModalEvento;