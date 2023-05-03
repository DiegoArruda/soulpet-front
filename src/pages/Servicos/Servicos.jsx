import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";


export function Servicos() {
    const [ servicos, setServicos ] = useState(null);



    useEffect(() => {
        initializeTable()
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/servicos")
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Serviços</h1>
                <Button as={Link} to="/servicos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Serviços
                </Button>
            </div>
            {servicos === null ?
                <Loader />
                :
                <Table striped bordered hover>
                    <colgroup>
                        <col style={{width: "70%"}}/>
                        <col style={{width: "20%"}}/>
                        <col style={{width: "10%"}}/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map(servico => (
                                <tr  key={servico.id}>
                                    <td>{servico.nome}</td>
                                    <td>R$ {servico.preco.toFixed(2)}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <Button>
                                            <i className="bi bi-trash-fill"></i>
                                        </Button>
                                        <Button as={Link} to={`/servicos/editar/${servico.id}`}>
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}