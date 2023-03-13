import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="/">
          <NavContainer>CINEFLEX</NavContainer>
        </Link>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assentos/:idFilmes" element={<SeatsPage />} />
          <Route path="/sessoes/:idFilmes" element={<SessionsPage />} />
          <Route path="/finalizar-pedido" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
