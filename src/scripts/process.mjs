import fs from 'fs';
import { getQuestionsWithAnswers } from '../helpers/getQuestionsWithAnswers';

const text = String(fs.readFileSync('src/source.txt')).trim();

console.log(getQuestionsWithAnswers(text));
