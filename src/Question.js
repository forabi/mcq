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
  answerChoosen: {
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

  choosePossibleAnswer = i => () => {
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
      choosenAnswerIndex,
      hasSeenAnswer,
    } = this.props;

    const canShowAnswer = typeof choosenAnswerIndex === 'number';
    const canSetAnswer = !hasSeenAnswer;

    return (
      <Card>
        {question ? (
          <CardContent>
            <Typography type="title">{question}</Typography>
            {possibleAnswers.map((answer, i) => (
              <ListItem
                key={i}
                button
                onClick={
                  canSetAnswer ? this.choosePossibleAnswer(i) : undefined
                }
                className={cx({
                  [classes.answerChoosen]: i === choosenAnswerIndex,
                  [classes.answerWrong]:
                    canShowAnswer &&
                    choosenAnswerIndex !== correctAnswerIndex &&
                    i === choosenAnswerIndex &&
                    isAnswerShown,
                  [classes.answerCorrect]:
                    canShowAnswer && i === correctAnswerIndex && isAnswerShown,
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
