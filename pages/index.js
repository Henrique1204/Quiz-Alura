import styled from "styled-components";
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

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid #730300;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.mainBg};
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400px;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px;

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  ul {
    padding: 0;
    list-style: none;
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
