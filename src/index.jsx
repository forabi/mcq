import * as React from 'react';
import { render } from 'react-dom';
import { Provider as StoreProvider, connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import './index.css';

import { actionTypes } from './actionTypes';
import Question from './Question';

import getQuestionsWithAnswers from './helpers/getQuestionsWithAnswers';

const theme = createMuiTheme({ direction: 'rtl' });

const ActiveQuestion = connect(state => ({
  ...state.questions[state.activeQuestionIndex],
  isAnswerShown: state.isAnswerShown,
  questionIndex: state.activeQuestionIndex,
  chosenAnswerIndex: state.answers[state.activeQuestionIndex],
  hasSeenAnswer: state.seenAnswers[state.activeQuestionIndex],
}))(Question);

const promisedQuestions = import('raw-loader!./source.txt').then(
  getQuestionsWithAnswers,
);

const Navigation = connect(state => ({
  hasNext: state.questions.length - 1 > state.activeQuestionIndex,
  hasPrevious: state.activeQuestionIndex > 0,
  isAnswerShown: state.isAnswerShown,
}))(
  class extends React.Component {
    navigateTo = diff => () => {
      this.props.dispatch({
        type: actionTypes.MOVE_BY_STEP,
        payload: diff,
      });
    };

    toggleAnswer = () => {
      this.props.dispatch({
        type: actionTypes.TOGGLE_IS_ANSWER_SHOWN,
      });
    };

    render() {
      const { hasNext, hasPrevious, isAnswerShown } = this.props;
      return (
        <div className="">
          <FormControlLabel
            control={
              <Checkbox checked={isAnswerShown} onChange={this.toggleAnswer} />
            }
            label="أظهر الحل الصحيح بعد الإجابة"
          />
          <div className="Navigation">
            <Button onClick={this.navigateTo(-1)} disabled={!hasPrevious} dense>
              السابق
            </Button>
            {/* <Button dense>
            العلامة
          </Button> */}
            <Button onClick={this.navigateTo(+1)} disabled={!hasNext} dense>
              التالي
            </Button>
          </div>
        </div>
      );
    }
  },
);

const App = () => (
  <div className="Quiz">
    <div className="Question--active">
      <ActiveQuestion />
    </div>
    <Navigation />
  </div>
);

Promise.all([import('./store')]).then(([{ store }]) => {
  promisedQuestions.then(questions => {
    store.dispatch({
      type: actionTypes.SET_QUESTIONS,
      payload: questions,
    });
  });

  render(
    <MuiThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </MuiThemeProvider>,
    document.getElementById('app'),
  );

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .then(() => console.log('Registered'));
  }
});
