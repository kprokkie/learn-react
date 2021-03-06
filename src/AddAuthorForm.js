// react
import React from 'react';
// redux store
import { connect } from 'react-redux';
// react routing
import { withRouter } from 'react-router-dom';

// component css
import './AddAuthorForm.css';

// React Component
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

// React Component Wrapper
function AddAuthorForm({ match, onAddAuthor }) {
    return (
        <div className="author-form">
            <h1>Author Form</h1>
            <p>{JSON.stringify(match)}</p>
            <AuthorForm onAddAuthor={onAddAuthor}></AuthorForm>
        </div>
    );
}

// Store (state => props)
function mapStateToProps(state) {
    return {}
}

// Store (dispatch => props)
function mapDispatchToProps(dispatch, props) {
    return {
        onAddAuthor: (author) => {
            dispatch({ type: 'ADD_AUTHOR', author });
            props.history.push('/');
        }
    };
}

// Connect react compoent to redux store
export default withRouter(connect(() => mapStateToProps, mapDispatchToProps)(AddAuthorForm));