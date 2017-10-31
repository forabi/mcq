import mapValues from 'lodash/mapValues';

export const actionTypes = mapValues(
  {
    CHOOSE_ANSWER: '',
    SET_QUESTIONS: '',
    TOGGLE_IS_ANSWER_SHOWN: '',
    MOVE_BY_STEP: '',
  },
  (v, k) => k,
);

export default actionTypes;
