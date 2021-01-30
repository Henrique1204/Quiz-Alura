/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { motion } from 'framer-motion';
// Importando hooks do Next.
import { useRouter } from 'next/router';
// Importando componentes da interface.
import QuizBackground from '../src/Componentes/QuizBackground';
import QuizContainer from '../src/Componentes/QuizContainer';
import QuizLogo from '../src/Componentes/QuizLogo';
import Widget from '../src/Componentes/Widget';
import Input from '../src/Componentes/Input';
import Button from '../src/Componentes/Button';
import Link from '../src/Componentes/Link';
import Footer from '../src/Componentes/Footer';
import GithubCorner from '../src/Componentes/GithubCorner';
// Importando informações do projeto.
import db from '../db.json';

export default function Home() {
  const [name, setName] = React.useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/quiz?name=${name}`);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '-50%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={handleSubmit}>
              <Input
                name="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
                placeholder="Digite o seu nome..."
              />
              <Button type="submit" disabled={name.length === 0}>Jogar {name}</Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '-50%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quiz da Galera</h1>
          </Widget.Header>

          <Widget.Content>
            <ul>
              {db.external.map((link) => {
                const [nomeDoProjeto, usuarioGithub] = link.replace(/\//g, '').replace('https:', '').replace('.vercel.app', '').split('.');

                return (
                  <li key={`link__${link}`}>
                    <Widget.Topic as={Link} href={`/quiz/${nomeDoProjeto}___${usuarioGithub}`}>
                      {`${usuarioGithub}/${nomeDoProjeto}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '-50%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>

      <GithubCorner projectUrl="https://github.com/Henrique1204/Quiz-Alura" />
    </QuizBackground>
  );
}
