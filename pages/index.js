import styled from "styled-components";
import db from "../db.json";

const BackgroundHome = styled.div`
  background: url(${db.bg}) no-repeat center;
  background-size: cover;
  flex: 1;
  position: relative;

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0), #000);
    display: block;
    position: absolute;
    z-index: 0;
  }
`;

export default function Home() {
  return (
    <BackgroundHome>
    </BackgroundHome>
  );
}
