const isQuestion = line => line.startsWith('س:');
const isCorrectAnswer = line => line.startsWith('*');

/**
 * @param text {string}
 */
export default function getQuestionsWithAnswers(text) {
  const lines = text
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length);
  const questionsWithAnswers = [];
  while (lines.length > 0) {
    const line = lines.shift();
    if (isQuestion(line)) {
      const question = line.replace('س:', '').trim();
      const possibleAnswers = [];
      let correctAnswerIndex = null;
      while (lines.length > 0 && !isQuestion(lines[0])) {
        const possibleAnswer = lines.shift();

        if (correctAnswerIndex === null && isCorrectAnswer(possibleAnswer)) {
          correctAnswerIndex = possibleAnswers.length;
        }
        possibleAnswers.push(possibleAnswer.replace('*', '').trim());
      }

      questionsWithAnswers.push({
        question,
        possibleAnswers,
        correctAnswerIndex,
      });
    }
  }

  return questionsWithAnswers;
}
