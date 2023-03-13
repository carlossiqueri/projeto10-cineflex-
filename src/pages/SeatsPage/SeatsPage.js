import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SeatsPage( { reservado, setReservado, assentos, setAssentos, ids, setIds, nome, setNome, cpf, setCpf}) {
  const { idSessao } = useParams();
  let navigate = useNavigate()
  useEffect(() => {
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;

    const promise = axios.get(url);
    promise.then((res) => setAssentos(res.data));
    promise.catch((err) => console.log(err.response.data));
  }, []);

  if (assentos === undefined) {
    return <div>Carregando, aguarde...</div>;
  }

  function choosenSeat(e) {
    console.log(ids)
    e.preventDefault();
    const url =
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
    const ticket = { ids, name:nome, cpf };
    const promise = axios.post(url, ticket);
    promise.then((res) => navigate("/sucesso"));
    promise.catch((err) => alert(err.response.data.mensagem));
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {assentos.seats.map((s) => (
          <SeatItem data-test="seat"
            onClick={() => {
              if (!s.isAvailable) {
                alert("Esse assento não está disponível");
                return;
              }

              if (ids.includes(s.id)) {
                let index = ids.indexOf(s.id);
                ids.splice(index, 1);
                setIds([...ids]);

                let i = reservado.indexOf(s.name)
                reservado.splice(i, 1)
                setReservado([...reservado])
              } else {
                setIds([...ids, s.id]);
                setReservado([...reservado, s.name])
              }
              console.log(assentos);
            }}
            key={s.id}
            color={
              ids.includes(s.id)
                ? `#1AAE9E`
                : s.isAvailable
                ? `#C3CFD9`
                : `#FBE192`
            }
            border={s.isAvailable ? `#7B8B99` : `#F7C52B`}
          >
            {s.name}
          </SeatItem>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle color={`#1AAE9E`} border={`#0E7D71`} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle color={`#C3CFD9`} border={`#7B8B99`} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle color={`#FBE192`} border={`#F7C52B`} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer>
        <form onSubmit={choosenSeat}>
          <label htmlFor="nome">Nome do Comprador:</label>
          <input
          data-test="client-name"
            id="nome"
            placeholder="Digite seu nome..."
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label htmlFor="cpf">CPF do Comprador:</label>
          <input
          data-test="client-cpf"
            id="cpf"
            placeholder="Digite seu CPF..."
            required
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          {/* <Link to="/finalizar-pedido"> */}
            <button type="submit" >
              Reservar Assento(s)
            </button>
          {/* </Link> */}
        </form >
      </FormContainer>
      <FooterContainer>
        <div data-test="footer">
          <img src={assentos.movie.posterURL} alt={assentos.movie.title} />
        </div>
        <div>
          <p>{assentos.movie.title}</p>
          <p>
            {assentos.day.weekday} - {assentos.name}
          </p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  a {
    text-decoration: none;
  }
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: 1px solid ${(props) => props.border}; // Essa cor deve mudar
  background-color: ${(props) => props.color}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid ${(props) => props.border}; // Essa cor deve mudar
  background-color: ${(props) => props.color}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
