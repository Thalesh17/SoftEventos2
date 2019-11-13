import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col }  from "react-bootstrap";
import axios from 'axios';
import api from './../../services/api';


class ModalEvento extends Component {
    constructor(props){
        super(props);

        this.state = {
            tema: "",
            local: "",
            qtdPessoas: "",
            imagemUrl: "",
            dataEvento: "",
            telefone: "",
            email: ""
        }
    }
    salvarEvento = async (e) => {
        e.preventDefault();
        const {tema, local, qtdPessoas, imagemUrl, dataEvento, telefone, email} = this.state;
        await api.post(`/evento`, {Tema: tema, QtdPessoas: qtdPessoas, Local: local, ImagemUrl: imagemUrl, Telefone: telefone, Email: email, DataEvento: new Date()})
             .then(res => {
                 if (res.status === 201) {
                    alert("Sucesso");
                 }else{
                     console.log("res", res.status);
                 }
            })

        // const {data: evento} = await api.post('/eventos', { content: this.state});
        // this.setState({ eventos: [ ...this.state.eventos]});
    };

    inserirStateNoForm= (e)=> {  
        this.setState({ [e.target.name]: e.target.value});  
        console.log(this.state);
    } 

    render(){
        return( 
        <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Form onSubmit={this.salvarEvento}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {this.props.acao} Evento
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Tema</Form.Label>
                        <Form.Control name="tema" onChange={this.inserirStateNoForm} placeholder="Tema" />
                    </Col>
                    <Col>
                        <Form.Label>Local</Form.Label>
                        <Form.Control name="local" onChange={this.inserirStateNoForm} placeholder="Local" />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Data e Hora</Form.Label>
                        <Form.Control name="dataEvento" onChange={this.inserirStateNoForm} placeholder="Data" />
                    </Col>
                    <Col>
                        <Form.Label>Qtd Pessoas</Form.Label>
                        <Form.Control name="qtdPessoas" onChange={this.inserirStateNoForm} placeholder="Qtd Pessoas" />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type="file" name="imagemUrl" onChange={this.inserirStateNoForm} placeholder="Data" />
                    </Col>
                    <Col>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control name="telefone" onChange={this.inserirStateNoForm} placeholder="Telefone" />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={this.inserirStateNoForm} placeholder="Email" />
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