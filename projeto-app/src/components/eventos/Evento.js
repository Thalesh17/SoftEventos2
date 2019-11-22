import React, { Component } from 'react';
import { Table, Button, Label, Form, Input, FormControl } from "react-bootstrap";
import NavBar from './../nav/NavBar';
import ListEventos from './ListEventos';
import EditEvento from './EditEvento';
import AddEvento from './AddEvento';
export default class Evento extends Component {
    constructor(props){
        super(props);

        this.state = {
            openEdit: false,
            openAdd: false
        }
    }

    render(){
        return (
            <div className="container">
                <NavBar />
                <br></br>
                <ListEventos></ListEventos>
            </div>
        )
    }
}
