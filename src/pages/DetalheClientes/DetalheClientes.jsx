import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export function DetalheClientes() {

    const [cliente, setCliente] = useState({});
    const [busca, setBusca] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const detalhe = async () => {
            try {
                const detalhes = await axios.get(`http://localhost:3001/clientes/${id}`)
                setCliente(detalhes.data);
                setBusca(false);
            } catch (error) {
                console.error(error);
            }
        };
        detalhe();
    }, [id]);

    return (
        <div className="detalhe container">
            <div className="d-flex justify-content-between align-items-center">
                <h3>Informações do Cliente {cliente.nome}</h3>
            </div>
            <br />

            {busca ? (
                <></>
            ) : (

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>CEP</th>
                            <th>Rua</th>
                            <th>Numero</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={cliente}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.endereco.cidade}</td>
                            <td>{cliente.endereco.uf}</td>
                            <td>{cliente.endereco.cep}</td>
                            <td>{cliente.endereco.rua}</td>
                            <td>{cliente.endereco.numero}</td>
                        </tr>
                    </tbody>
                </Table>

            )}
            <Button variant="primary" as={Link} to="/clientes">Voltar</Button>
        </div>
    );
}