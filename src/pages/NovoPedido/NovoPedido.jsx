import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export function NovoPedido() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/produtos")
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get("http://localhost:3001/clientes")
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/pedidos", data)
      .then((response) => {
        toast.success("Pedido adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/pedidos");
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1>Novo Pedido</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Control type="hidden" {...register("codigo")} value={uuidv4()} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control type="number" className={errors.quantidade && "is-invalid"} {...register("quantidade", {
            required: "A quantidade é obrigatória.",
            maxLength: { value: 255, message: "Limite de 255 caracteres." }
          })} />
          {errors.quantidade && <Form.Text className="invalid-feedback">{errors.quantidade.message}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Clientes</Form.Label>
          <Form.Select className={errors.clienteId && "is-invalid"}
            {...register("clienteId", { required: "Escolha um cliente para poder efetuar o cadastro." })}>
            <option value=""> Escolha um cliente...</option>
            {clientes.map(cliente =>
              <option value={cliente.id}>{cliente.nome}</option>
            )}
          </Form.Select>
          {errors.clienteId && <Form.Text className="invalid-feedback">{errors.clienteId.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Produtos</Form.Label>
          <Form.Select className={errors.produtoId && "is-invalid"}
            {...register("produtoId", { required: "Escolha um produto para poder efetuar o cadastro." })}>
            <option value=""> Escolha um produto...</option>
            {produtos.map(produto =>
              <option value={produto.id}>{produto.nome}</option>
            )}
          </Form.Select>
          {errors.produtoId && <Form.Text className="invalid-feedback">{errors.produtoId.message}</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
}







