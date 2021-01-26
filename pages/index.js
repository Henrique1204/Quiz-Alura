import styled from "styled-components";
// Importando componentes da interface.
import Widget from "../src/Componentes/Widget";
import Footer from "../src/Componentes/Footer";
import GithubCorner from "../src/Componentes/GithubCorner";
// Importando informações do projeto.
import db from "../db.json";

const BackgroundHome = styled.div`
  background: url(${db.bg}) no-repeat center;
  background-size: cover;
  flex: 1;
  position: relative;
`;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;

  @media (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <BackgroundHome>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
              <p>{db.description}</p>
          </Widget.Content>
        </Widget>
  
        <Widget>
          <Widget.Header>
            <h1>Quiz da Galera</h1>
          </Widget.Header>
    
          <Widget.Content>
            <p>Lorem impsum door set amet...</p>
          </Widget.Content>
        </Widget>
      </QuizContainer>
    </BackgroundHome>
  );
}
