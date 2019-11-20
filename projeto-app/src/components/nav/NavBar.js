import React from 'react';
import { Navbar,Nav, Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavLink from 'react-bootstrap/NavLink';

export default class Square extends React.Component {

    render() {
        return (
            <div>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Soft Eventos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Link to="/eventos">Eventos</Link>
                </Nav>
                <Form inline>
                    <Navbar.Text>
                    Logado com: Thales Henrique
                    </Navbar.Text>
                    <Link variant="outline-success" to="/login"><Button variant="outline-success">Sair</Button></Link>
                </Form>
            </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}

