import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
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

const state = {
    turnData: getTurnData(authors),
    highlight: ''
};

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

// application rendered
// ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />, document.getElementById('root'));

function render() {
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />, document.getElementById('root'));
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
