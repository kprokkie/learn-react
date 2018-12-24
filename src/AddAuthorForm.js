import React from 'react';
import './AddAuthorForm.css';

class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            tempBook: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }
    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }
    handleAddBook(event) {
        this.setState({
            books: this.state.books.concat([this.state.tempBook]),
            tempBook: ''
        });
        // this.state.books.push(this.state.tempBook);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
                </div>
                <div className="form-input">
                    <label htmlFor="imageUrl">Image Url</label>
                    <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}></input>
                </div>
                <div className="form-input">
                    <label htmlFor="tempBook">Add Book</label>
                    {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    <input type="text" name="tempBook" value={this.state.tempBook} onChange={this.onFieldChange}></input>
                    <input type="button" value="+" onClick={this.handleAddBook}></input>
                </div>
                <input type="submit" value="ADD"></input>
            </form>
        );
    }
}

function AddAuthorForm({ match, onAddAuthor }) {
    return (
        <div className="author-form">
            <h1>Author Form</h1>
            <p>{JSON.stringify(match)}</p>
            <AuthorForm onAddAuthor={onAddAuthor}></AuthorForm>
        </div>
    );
}

export default AddAuthorForm;