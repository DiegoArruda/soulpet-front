import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Agendamentos() {

  const [agendamentos, setAgendamentos] = useState(null);

  function initializeTable() {
    axios.get("http://localhost:3001/agendamentos")
      .then(response => {
        console.log(response.data)
        setAgendamentos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    initializeTable();
  }, []);

  return (
    <div className="agendamentos container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Agendamentos</h1>
        <Button as={Link} to="/agendamentos/novo">
          <i className="bi bi-plus-lg me-2"></i> Agendamento
        </Button>
      </div>
      {
        agendamentos === null ?
          <Loader />
          :
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Data de Agendamento</th>
                <th>Pet</th>
                <th>Serviço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map(agendamento => {
                return (
                  <tr key={agendamento}>
                    <td>{agendamento.dataAgendada}</td>
                    <td>{agendamento.petId}</td>
                    <td>{agendamento.servicoId}</td>
                    <td className="d-flex gap-2">
                      <Button>
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button>
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
      }
    </div>
  );
}