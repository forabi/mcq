import mapValues from 'lodash/mapValues';
import { createStore } from 'redux';

import { actionTypes } from './actionTypes';

const initialState = {
  activeQuestionIndex: 0,
  questions: [],
  isAnswerShown: false,
  answers: {},
  seenAnswers: {},
};

export const store = createStore((state, action) => {
  if (action.type === actionTypes.MOVE_BY_STEP) {
    return {
      ...state,
      activeQuestionIndex: state.activeQuestionIndex + action.payload,
    };
  } else if (action.type === actionTypes.SET_QUESTIONS) {
    return {
      ...state,
      questions: action.payload,
    };
  } else if (action.type === actionTypes.TOGGLE_IS_ANSWER_SHOWN) {
    return {
      ...state,
      isAnswerShown: !state.isAnswerShown,
      seenAnswers: !state.isAnswerShown
        ? {
            ...state.seenAnswers,
            ...mapValues(state.answers, () => true),
          }
        : state.seenAnswers,
    };
  } else if (action.type === actionTypes.CHOOSE_ANSWER) {
    return {
      ...state,
      // activeQuestionIndex: action.payload.question + 1,
      answers: {
        ...state.answers,
        [action.payload.question]: action.payload.chosenAnswer,
      },
      seenAnswers: state.isAnswerShown
        ? {
            ...state.seenAnswers,
            [action.payload.question]: true,
          }
        : state.seenAnswers,
    };
  }

  return state;
}, initialState);

export default store;
