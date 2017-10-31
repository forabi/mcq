import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import lightGreen from 'material-ui/colors/lightGreen';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import { actionTypes } from './actionTypes';

import './Question.css';

const styles = () => ({
  answerChosen: {
    background: grey[400],
  },
  answerWrong: {
    background: red[500],
  },
  answerCorrect: {
    background: lightGreen[500],
  },
});

class App extends React.Component {
  state = {
    isAnswerShown: false,
  };

  choosePossibleAnswer = i => e => {
    this.props.dispatch({
      type: actionTypes.CHOOSE_ANSWER,
      payload: {
        question: this.props.questionIndex,
        chosenAnswer: i,
      },
    });
  };

  render() {
    const {
      classes,
      isAnswerShown,
      possibleAnswers,
      question,
      correctAnswerIndex,
      chosenAnswerIndex,
      hasSeenAnswer,
    } = this.props;

    const canShowAnswer = typeof chosenAnswerIndex === 'number';
    const canSetAnswer = true;

    return (
      <Card>
        {question ? (
          <CardContent>
            <Typography type="title">{question}</Typography>
            {possibleAnswers.map((answer, i) => (
              <ListItem
                key={i}
                onClick={
                  canSetAnswer ? this.choosePossibleAnswer(i) : undefined
                }
                className={cx({
                  [classes.answerChosen]: i === chosenAnswerIndex,
                  [classes.answerWrong]:
                    canShowAnswer &&
                    isAnswerShown &&
                    chosenAnswerIndex !== correctAnswerIndex &&
                    i === chosenAnswerIndex,
                  [classes.answerCorrect]:
                    canShowAnswer && isAnswerShown && i === correctAnswerIndex,
                })}
              >
                <ListItemText primary={`${i + 1}. ${answer}`} />
              </ListItem>
            ))}
          </CardContent>
        ) : (
          <CardContent>
            <Typography type="alignCenter">
              <CircularProgress />;
            </Typography>
          </CardContent>
        )}
      </Card>
    );
  }
}

export default connect()(withStyles(styles)(App));
