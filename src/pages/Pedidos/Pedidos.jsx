import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Pedidos() {

  const [pedidos, setPedidos] = useState(null);
  const [show, setShow] = useState(false);
  const [idpedido, setIdpedido] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroProduto, setFiltroProduto] = useState('');

  const handleClose = () => {
    setIdpedido(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setIdpedido(id);
    setShow(true);
  };

  const resetFiltros = () => {
    setFiltroCliente('');
    setFiltroProduto('');

  };

  useEffect(() => {
    axios.get("http://localhost:3001/clientes")
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get("http://localhost:3001/produtos")
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/pedidos")
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function onDelete() {
    axios
      .delete(`http://localhost:3001/pedidos/${idpedido}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeTable();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }


  return (
    <div className="produtos container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Pedidos</h1>
        <Button as={Link} to="/pedidos/novo">
          <i className="bi bi-plus-lg me-2"></i> Pedidos
        </Button>
      </div>
      <Row className="mb-3">
        <Col>
          <Form.Select onChange={(event) => { setFiltroCliente(event.target.value) }} aria-label="Default select example">
            <option value="">Digite o nome do cliente</option>
            {clientes.map(cliente =>
              <option value={cliente.nome}>{cliente.nome}</option>
            )}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select onChange={(event) => { setFiltroProduto(event.target.value) }} aria-label="Default select example">
            <option value="">Digite o nome do produto</option>
            {produtos.map(produto =>
              <option value={produto.nome}>{produto.nome}</option>
            )}
          </Form.Select>
        </Col>
        <Col>
          <Button onClick={() => resetFiltros()}>Reiniciar filtros</Button>
        </Col>
      </Row>
      {pedidos === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos
              .filter((pedido) => pedido.cliente.nome.includes(filtroCliente))
              .filter((pedido) => pedido.produto.nome.includes(filtroProduto))
              .map(pedido => {
                return (
                  <tr key={pedido.codigo}>
                    <td>{pedido.quantidade}</td>
                    <td>{pedido.cliente.nome}</td>
                    <td>{pedido.produto.nome}</td>
                    <td className="d-flex gap-2">
                      <Button onClick={() => handleShow(pedido.codigo)}>
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button as={Link} to={`/pedidos/editar/${pedido.codigo}`}>
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o Pet?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


