// Importações necessárias
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";



export function Produtos() {

    // Declarações de variáveis
    const [produtos, setProdutos] = useState(null);
    const [show, setShow] = useState(false);
    const [idProduto, setIdProduto] = useState(null);
    const [pesquisa, setPesquisa] = useState('');
    const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);


    // Abrir Modal
    const handleShow = (id) => {
        setIdProduto(id);
        setShow(true);
    };

    // Fechar Modal
    const handleClose = () => {
        setIdProduto(null);
        setShow(false);
    };

    // Inicializar a Tabela de Produtos
    useEffect(() => {
        initializeTable();
    }, []);

    // Função para iniciar a tabela
    function initializeTable() {
        axios
            .get("http://localhost:3001/produtos")
            .then((response) => {
                setProdutos(response.data);
                setProdutosFiltrados(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Função de Pesquisa por nome e categoria
        const handlePesquisa = (event) =>{
            const pesquisa = event.target.value.toLowerCase();
            const produtosFiltrados = produtos.filter(
                (produto) =>{
                    return (
                        produto.nome.toLowerCase().includes(pesquisa) ||
                        produto.categoria.toLowerCase().includes(pesquisa)
                    );
                }
            );
            setPesquisa(pesquisa);
            setProdutosFiltrados(produtosFiltrados);
        }



    return (
        <>
            <div className="produtos container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Produtos</h1>
                    <Form>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={pesquisa}
                                onChange={handlePesquisa}
                                placeholder="Pesquisar nome ou categoria"
                                aria-label="Pesquisar nome ou categoria"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Form>
                    <Button as={Link} to="/produtos/novo">
                        <i className="bi bi-plus-lg me-2"></i> Produtos
                    </Button>
                </div>

                {produtosFiltrados === null ? (
                    <Loader />
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome do Produto</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th>Desconto</th>
                                <th>Data do Desconto</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtosFiltrados.map((produto) => {
                                return (
                                    <tr key={produto.id}>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.preco}</td>
                                        <td>{produto.desconto}</td>
                                        <td>{produto.dataDesconto}</td>
                                        <td>{produto.categoria}</td>
                                        <td className="d-flex gap-2">
                                            <Button onClick={() => handleShow(produto.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/produtos/editar/${produto.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </Table>
                )
                }
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tem certeza que deseja excluir o Produto?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" >
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}