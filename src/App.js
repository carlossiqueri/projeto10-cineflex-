import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [assentos, setAssentos] = useState(undefined);
  const [ids, setIds] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [reservado, setReservado] = useState([])
  return (
    <>
      <BrowserRouter>
        <Link to="/">
          <NavContainer>CINEFLEX</NavContainer>
        </Link>

        <Routes>
          <Route
            path="/"
            element={<HomePage filmes={filmes} setFilmes={setFilmes} />}
          />
          <Route
            path="/assentos/:idSessao"
            element={
              <SeatsPage
                assentos={assentos}
                setAssentos={setAssentos}
                ids={ids}
                setIds={setIds}
                nome={nome}
                setNome={setNome}
                cpf={cpf}
                setCpf={setCpf}
                reservado={reservado}
                setReservado={setReservado}
              />
            }
          />
          <Route
            path="/sessoes/:idFilme"
            element={
              <SessionsPage 
              selected={selected} 
              setSelected={setSelected} />
            }
          />
          <Route
            path="/sucesso"
            element={
              <SuccessPage
                selected={selected}
                setSelected={setSelected}
                assentos={assentos}
                setAssentos={setAssentos}
                ids={ids}
                setIds={setIds}
                nome={nome}
                setNome={setNome}
                cpf={cpf}
                setCpf={setCpf}
                reservado={reservado}
                setReservado={setReservado}
              />
            }
          />
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
