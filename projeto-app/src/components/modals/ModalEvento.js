import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col }  from "react-bootstrap";

class ModalEvento extends Component {
    constructor(props){
        super(props);

        this.state = {
            evento      : props.evento || {}
        }
          
        if(props.evento){
            this.state = props.evento
        } else {
            this.state = this.initialState;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const prevEvento = this.props.evento || {};
        const nextEvento = nextProps.evento || {};
        if (prevEvento.objectId !== nextEvento.objectId) {
          this.setState({ evento: nextEvento })
        }
    }

    
    close = () => {
        this.setState({
            person     : {},
            salvando     : false,
            serverError: null
        });
        this.props.onHide()
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const acao 
        = this.props.evento
          ? this.props.updateEvento
          : this.props.saveEvento;
    }

    handleChange= (e)=> {  
        this.setState({ evento: { ...this.state.evento, [e.target.name]: e.target.value } })
        // this.setState({ [e.target.name]: e.target.value});  
    } 

    render(){
        const { show } = this.props;
        const { evento, salvando } = this.state;
        const isNew = !this.props.person;

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
                        <Form.Control value={evento.tema} name="tema" onChange={this.handleChange} placeholder="Tema" />
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
                        <Form.Control name="dataEvento" value={evento.dataEvento}  onChange={this.handleChange} placeholder="Data" />
                    </Col>
                    <Col>
                        <Form.Label>Qtd Pessoas</Form.Label>
                        <Form.Control name="qtdPessoas" value={evento.qtdPessoas} onChange={this.handleChange} placeholder="Qtd Pessoas" />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type="file" name="imagemUrl" value={evento.imagemUrl}  onChange={this.handleChange} placeholder="Data" />
                    </Col>
                    <Col>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control name="telefone" value={evento.telefone}  onChange={this.handleChange} placeholder="Telefone" />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={evento.email} onChange={this.handleChange} placeholder="Email" />
                    </Col>
                </Row>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.close}>Fechar</Button>
                <Button type="submit" variant="primary" onClick={this.handleSubmit} disabled={salvando}>
                    {salvando ? 'Salvando...' : 'Salvar'} Salvar</Button>
            </Modal.Footer>
            </Form>
          </Modal>)
    }
}
export default ModalEvento;