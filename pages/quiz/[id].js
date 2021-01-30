import React from 'react';
import { ThemeProvider } from 'styled-components';
import Quiz from '../../src/screen/Quiz';

// eslint-disable-next-line react/prop-types
const QuizDaGalera = ({ dbExterno }) => (
  // eslint-disable-next-line react/prop-types
  <ThemeProvider theme={dbExterno.theme}>
    <Quiz db={dbExterno} />
  </ThemeProvider>
);

export async function getServerSideProps({ query }) {
  const [nomeDoProjeto, usuarioGithub] = query.id.split('___');

  try {
    const dbExterno = await fetch(`https://${nomeDoProjeto}.${usuarioGithub}.vercel.app/api/db`).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Falha ao carregar dados.');
    });

    return {
      props: { dbExterno },
    };
  } catch ({ message }) {
    return {
      props: { erro: message },
    };
  }
}

export default QuizDaGalera;
