import styled from 'styled-components';
/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import Widget from '../src/Componentes/Widget';
import QuizLogo from '../src/Componentes/QuizLogo';
import QuizBackground from '../src/Componentes/QuizBackground';
import QuizContainer from '../src/Componentes/QuizContainer';
import AlternativesForm from '../src/Componentes/AlternativesForm';
import Button from '../src/Componentes/Button';

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes girar {
    to { transform: rotate(360deg); }
  }

  &::after {
      content: "";
      width: 40px;
      height: 40px;
      border: 4px solid #EEE;
      border-top-color: ${({ theme }) => theme.colors.secondary};
      border-radius: 50%;
      display: block;
      animation: girar 1s ease infinite;
  }
`;

function ResultWidget({ result }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultado
      </Widget.Header>

      <Widget.Content>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <p>Você acertou {result} perguntas</p>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Spinner />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  setResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionsSubmited, setIsQuestionsSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative === undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();

            setIsQuestionsSubmited(true);

            setTimeout(() => {
              onSubmit();
              setResult((result) => ((isCorrect) ? result + 1 : result));
              setSelectedAlternative(undefined);
              setIsQuestionsSubmited(false);
            }, 2000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = (isCorrect) ? 'SUCCESS' : 'ERROR';
            const isSelected = alternativeIndex === selectedAlternative;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionsSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  checked={isSelected}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={isQuestionsSubmited || hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [result, setResult] = React.useState(0);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1.5 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            setResult={setResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget result={result} />}
      </QuizContainer>
    </QuizBackground>
  );
}
