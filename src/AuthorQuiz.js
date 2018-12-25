import React from 'react';
// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import logo from './logo.svg';
import './bootstrap.min.css';
import './App.css';

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book witten by author shown</p>
      </div>
    </div>
  );
}

function Book({ title, onClick }) {
  return (
    <div className="answer" onClick={() => { onClick(title); }}>
      <h4>{title}</h4>
    </div>
  );
}

function Turn({ author, books, highlight, onAnswerSelected }) {
  function highlightBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return (
    <div className="row turn" style={{ backgroundColor: highlightBgColor(highlight) }}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="author-image" alt="Author" />
        <span>{author.name}</span>
      </div>
      <div className="col-6">
        {/* {books.map((title) => <p>{title}</p>)} */}
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
      </div>
    </div>
  );
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

// function Continue() {
//   return (<div />);
// }

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
      {show ?
        <div className="col-11">
          <button className="btn btn-primary btn-lg" onClick={onContinue}>Continue</button>
        </div> : null
      }
    </div>);
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">All images are from WWW.</p>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer });
    },
    onContinue: () => {
      dispatch({ type: 'CONTINUE' });
    }
  }
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({ turnData, highlight, onAnswerSelected, onContinue }) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue} />
        <p><Link to="/add">Add Author</Link></p>
        <Footer />
      </div>
    );
  });

// class AuthorQuiz extends Component {
//   render() { 
//     return (
//       <div className="container-fluid">
//         <Hero />
//         <Turn />
//         <Continue />
//         <Footer/>
//       </div>
//     );
//   }
// }

export default AuthorQuiz;
