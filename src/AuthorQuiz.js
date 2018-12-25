// react
import React from 'react';
// react props typing
import PropTypes from 'prop-types';
// react routing
import { Link } from 'react-router-dom';
// redux store
import { connect } from 'react-redux';

// component css
import './AddAuthorForm.css';

// React Object Typing
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

// React Component [local]
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

// React Component [local]
function Book({ title, onClick }) {
  return (
    <div className="answer" onClick={() => { onClick(title); }}>
      <h4>{title}</h4>
    </div>
  );
}

// React Component [local]
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
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
      </div>
    </div>
  );
}

// React Component [local]
function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
      {show ?
        <div className="col-11">
          <button className="btn btn-primary btn-lg" onClick={onContinue}>Continue</button>
        </div> : null
      }
    </div>
  );
}

// React Component [local]
function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">All images are from WWW.</p>
      </div>
    </div>
  );
}

// Store (state => props)
function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  }
}

// Store (dispatch => props)
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

// Connect react compoent to redux store
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

export default AuthorQuiz;
