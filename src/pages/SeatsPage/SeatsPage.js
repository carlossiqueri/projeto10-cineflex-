import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SeatsPage() {
  const [assentos, setAssentos] = useState(undefined);
  const { idSessao } = useParams();
  const [ids, setIds] = useState([]);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
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
    e.preventDefault()
    const url =
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
    const promise = axios.post(url, ticket);
    const ticket = { ids, name, cpf };
    promise.then(res => alert("Seus assentos foram reservados com sucesso!"))
    promise.catch(err => console.log(err.response.data))
  }


  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {assentos.seats.map((s) => (
          <SeatItem
            onClick={() => {
              if (!s.isAvailable) {
                alert("Esse assento não está disponível");
                return;
              }

              if (ids.includes(s.id)) {
                let index = ids.indexOf(s.id);
                ids.splice(index, 1);
                setIds([...ids]);
              } else {
                setIds([...ids, s.id]);
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
        <form>
          <label htmlFor="name">Nome do Comprador:</label>
          <input
            id="name"
            placeholder="Digite seu nome..."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="cpf">CPF do Comprador:</label>
          <input
            id="cpf"
            placeholder="Digite seu CPF..."
            required
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <Link to="/finalizar-pedido">
          <button type="submit" onSubmit={choosenSeat}>
            Reservar Assento(s)
          </button>
          </Link>
        </form>
      </FormContainer>
      <FooterContainer>
        <div>
          <img src={assentos.movie.posterURL} alt={assentos.movie.title} />
          {console.log(assentos)}
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
