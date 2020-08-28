import React from 'react';
import axios from 'axios';

export default class List extends React.Component {
    // Init empy state to receive data
    state = {
        items: [],
        name: '',
        number: 0,
    }

    // Get data
    componentDidMount() {
        axios.get('http://localhost:5000/items/')
        .then(res => {
            const items = res.data;
            this.setState({ items })
        });
    }

    // Add Item Form Methods
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
            isDone: '❌',
        };

        axios.post('http://localhost:5000/items/add', item)
        .then(res => {
            console.log(res);
            console.log(res.data);
            const items = res.data;
            this.setState({ items });
        })
    }

    // Delete Item
    deleteItem(id){
        axios.get('http://localhost:5000/items/delete/'+id)
        .then(res => {
            const items = res.data;
            console.log('Deletion completed');
            this.setState({ items });
        });
    }

    // Update item
    updateItem(id){
        const done = {
            isDone: '👍',
        }
        axios.post('http://localhost:5000/items/update/'+id, done)
        .then(res => {
            const items = res.data;
            console.log('Shopping Done');
            this.setState({ items });
        })
    }
    // Render table
    renderTableData(){
        return this.state.items.map((item, index) => {
            const { _id, name, amount, isDone } = item;
            return (
                <tr key={_id}>
                    <td className="border px-4 py-2 text-center">{name}</td>
                    <td className="border px-4 py-2 text-center">{amount}</td>
                    <td className="border px-4 py-2 text-center">{isDone}</td>
                    <td className="border px-4 py-2 text-center">
                        <button 
                            className="mx-2 bg-green-300 hover:bg-green-500 py-2 px-4 rounded shadow" 
                            onClick={() => this.updateItem(item._id)}
                        >
                            <span role="img" aria-label="validate mark">✔️</span>
                        </button>
                        <button 
                            className="bg-red-300 hover:bg-red-500 py-2 px-4 rounded shadow" 
                            onClick={() => this.deleteItem(item._id)}
                        >
                            <span role="img" aria-label="bin">🗑️</span>
                        </button>
                    </td>
                </tr>
            )
        })
    }




    render(){
        return(
            <div className="w-full mx-auto mt-8 font-mono">
                <h2 className="text-center underline">List</h2>
                <table className="table-auto w-5/6 mx-auto" id="items">
                        <thead>
                            <tr>
                                <td className="font-bold px-4 py-2 text-center">Product</td>
                                <td className="font-bold px-4 py-2 text-center">Amount to purchase</td>
                                <td className="font-bold px-4 py-2 text-center">Purchased ?</td>
                                <td className="font-bold px-4 py-2 text-center">Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                </table>
                <div className="w-5/6  mx-auto mt-12">
                <h3 className="w-3/6 mx-auto text-center underline mb-4">Add Item</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label className="w-3/7 text-center font-bold pr-4 block">
                            Product :
                            <input className="appearance-none p-2 border-2 bg-gray-200 rounded mb-1 pr-4 ml-2" type="text" name="name" onChange={this.handleNameChange}></input>
                        </label>
                        <label className="w-3/7 text-center font-bold pr-4 block">
                            Amount :
                            <input className="appearance-none p-2 border-2 bg-gray-200 rounded mb-1 pr-4 ml-2" type="number" name="amount" onChange={this.handleAmountChange}></input>
                        </label>
                        <button 
                            className="mt-4 w-1/6 mx-auto block py-2 px-4 rounded bg-blue-300 hover:bg-blue-400 shadow" 
                            type="submit">
                                <span role="img" aria-label="add cross">➕</span>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

