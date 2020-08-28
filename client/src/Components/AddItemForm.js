import React from 'react';
import axios from 'axios';

export default class AddItemForm extends React.Component {
    state = {
        name: '',
        amount: 0,
    }

    handleNameChange = event => {
        this.setState({name: event.target.value});
    }
    handleAmountChange = event => {
        this.setState({amount: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const item = {
            name: this.state.name,
            amount: this.state.amount,
        };

        axios.post('http://localhost:5000/items/add', item)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        window.location.reload(false);
    }

    render(){
        return (
            <div>
                <h3>Add Item</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Product Name :
                        <input type="text" name="name" onChange={this.handleNameChange}></input>
                    </label>
                    <label>
                        Amount :
                        <input type="number" name="amount" onChange={this.handleAmountChange}></input>
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}
