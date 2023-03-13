import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SeatsPage() {
  const [assentos, setAssentos] = useState(undefined);
  const { idSeats } = useParams();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSeats}/seats`;

    const promise = axios.get(url);
    promise.then((res) => setAssentos(res.data));
    promise.catch((err) => console.log(err.response.data));
  }, []);

  if (assentos === undefined) {
    return <div>Carregando, aguarde...</div>;
  }

  
  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {assentos.seats.map((s) => (
            
          <SeatItem
            onClick={() => {
                if (ids.includes(s.id)){
                    let index = ids.indexOf(s.id)
                    ids.splice(index, 1)
                    setIds(...ids)
                }else{
                    setIds([...ids, s.id])
                }
                console.log(ids)
                console.log(s)
            }}
            key={s.id}
            color={ids.includes(s.id) ? `#1AAE9E` : !s.isAvaliable ? `#C3CFD9` : `#FBE192`}
            border={!s.isAvaliable ? `#7B8B99` : `#F7C52B`}
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
        Nome do Comprador:
        <input placeholder="Digite seu nome..." />
        CPF do Comprador:
        <input placeholder="Digite seu CPF..." />
        <button onClick={() => {
            const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
            const promise = axios.post(url)

            promise.then(res => console.log(res.data))
            promise.catch(err => console.log(err.response.data))
        }}>Reservar Assento(s)</button>
      </FormContainer>
      <FooterContainer>
        <div>
          <img src="#" alt="#" />
        </div>
        <div>
          <p>"#"</p>
          <p>Sexta - 14h00</p>
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
