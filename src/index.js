import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import { shuffle, sample } from 'underscore';
import * as serviceWorker from './serviceWorker';

// aplication data

const authors = [
    {
        name: 'Rokkie 1',
        imageUrl: '/images/authors/a1.JPG',
        imageSrc: 'Rokkie Code',
        books: ['Rokkie 11 ASDE', 'Rokkie 12 KDSL', 'Rokkie 13 JDLS', 'Rokkie 14 JDLL']
    },
    {
        name: 'Rokkie 2',
        imageUrl: '/images/authors/a2.JPG',
        imageSrc: 'Rokkie Code',
        books: ['Rokkie 21 ASDE', 'Rokkie 22 KDSL', 'Rokkie 23 JDLS', 'Rokkie 24 JDLL']
    },
    {
        name: 'Rokkie 3',
        imageUrl: '/images/authors/a3.JPG',
        imageSrc: 'Rokkie Code',
        books: ['Rokkie 31 ASDE', 'Rokkie 32 KDSL', 'Rokkie 33 JDLS', 'Rokkie 34 JDLL']
    },
    {
        name: 'Rokkie 4',
        imageUrl: '/images/authors/a4.JPG',
        imageSrc: 'Rokkie Code',
        books: ['Rokkie 41 ASDE', 'Rokkie 42 KDSL', 'Rokkie 43 JDLS', 'Rokkie 44 JDLL']
    }
];

// const state = {
//     turnData: {
//         author: authors[0],
//         books: authors[0].books
//     }
// };

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === answer))
    }
}

// function resetState() {
//     return {
//         turnData: getTurnData(authors),
//         highlight: ''
//     }
// }

// let state = resetState();

function reducer(state = { authors, turnData: getTurnData(authors), highlight: '' }, action) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, { highlight: isCorrect ? 'correct' : 'wrong' });
        case 'CONTINUE':
            return Object.assign({}, state, { highlight: '' }, { turnData: getTurnData(authors) });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author])
            });
        default: return state;
    }
}


let store = Redux.createStore(reducer);

// function onAnswerSelected(answer) {
//     const isCorrect = state.turnData.author.books.some((book) => book === answer);
//     state.highlight = isCorrect ? 'correct' : 'wrong';
//     render();
// }

// function App() {
//     return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />;
// }

// function App() {
//     return (
//         <ReactRedux.Provider store={store}>
//             <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />
//         </ReactRedux.Provider>
//     );
// }

// function App() {
//     return (
//         <ReactRedux.Provider store={store}>
//             <AuthorQuiz />
//         </ReactRedux.Provider>
//     );
// }

// function App() {
//     return (
//         <AuthorQuiz />
//     );
// }

// function AddAuthorForm({ match }) {
//     return (
//         <div>
//             <h1>Author Form</h1>
//             <p>{JSON.stringify(match)}</p>
//         </div>
//     );
// }

// application rendered
// ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />, document.getElementById('root'));

// function render() {
//     ReactDOM.render(<App />, document.getElementById('root'));
// }

// function render() {
//     // ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />, document.getElementById('root'));
//     ReactDOM.render(
//         <BrowserRouter>
//             <React.Fragment>
//                 <Route exact path="/" component={App}></Route>
//                 <Route path="/add" component={AddAuthorForm}></Route>
//             </React.Fragment>
//         </BrowserRouter>,
//         document.getElementById('root'));
// }
// render();

// function AddAuthorFormWrapper () {
//     return(
//         // <AddAuthorForm onAddAuthor={console.log}></AddAuthorForm>
//         <AddAuthorForm onAddAuthor={(author) => {
//             authors.push(author);
//         }}></AddAuthorForm>
//     );
// }

// const AddAuthorFormWrapper = withRouter(({ history }) =>
//     <AddAuthorForm onAddAuthor={(author) => {
//         authors.push(author);
//         history.push('/');
//     }}></AddAuthorForm>
// );

// const AddAuthorFormWrapper = withRouter(({ history }) =>
//     <AddAuthorForm></AddAuthorForm>
// );

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz}></Route>
                <Route path="/add" component={AddAuthorForm}></Route>
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
