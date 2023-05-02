import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoPedido() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "produtos",
  });

  const navigate = useNavigate();

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/pedidos", data)
      .then((response) => {
        toast.success("Pedido adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/pets");
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  const dayjs = require("dayjs");
  const today = dayjs();

  return (
    <div className="container">
      <h1>Novo Pedido</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Cliente</Form.Label>
          <Form.Control
            type="text"
            className={errors.cliente && "is-invalid"}
            {...register("cliente", {
              required: "O nome do cliente é obrigatório.",
              maxLength: { value: 130, message: "Limite de 130 caracteres." },
            })}
          />
          {errors.cliente && (
            <Form.Text className="invalid-feedback">
              {errors.cliente.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            className={errors.data && "is-invalid"}
            {...register("data", {
              required: "A data é obrigatória.",
            })}
          />
          {errors.data && (
            <Form.Text className="invalid-feedback">
              {errors.data.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          {fields.map((item, index) => (
            <div key={item.id}>
              <Form.Label>Produto:</Form.Label>
              <Form.Control
                type="text"
                className={errors.produtos && "is-invalid"}
                {...register(`produtos[${index}].nome`, {
                  required: "O nome do produto é obrigatório.",
                  maxLength: {
                    value: 130,
                    message: "Limite de 130 caracteres.",
                  },
                })}
              />
              <Form.Control
                type="text"
                className={errors.produtos && "is-invalid"}
                {...register(`produtos[${index}].quantidade`, {
                  required: "A quantidade é obrigatória.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "A quantidade deve ser um número inteiro.",
                  },
                })}
              />
              <Button variant="danger" onClick={() => remove(index)} className="mt-3 mb-3">
                Remover
              </Button>
            </div>
          ))}
          <Button
            variant="primary"
            onClick={() => append({ nome: "", quantidade: 0 })}
            >
            Adicionar produto
            </Button>
            {errors.produtos && (
            <Form.Text className="invalid-feedback">
            {errors.produtos.message}
            </Form.Text>
            )}
            </Form.Group>
            
                <Button variant="primary" type="submit">
                  Cadastrar
                </Button>
              </Form>
            </div>
            );
            }
            
            
            
            
            
            
            
