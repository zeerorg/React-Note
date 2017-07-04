import React, { Component } from 'react';
import Parse from 'parse';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render() {

    }
}