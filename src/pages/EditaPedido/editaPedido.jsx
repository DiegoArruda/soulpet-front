import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export function EditaPedido() {

    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "pedidos",
    });

    useEffect(() => {
        axios.get("http://localhost:3001/produtos").then(response => {
            setProdutos(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/clientes").then(response => {
            setClientes(response.data);
        });
    }, []);


    function onSubmit(data) {
        axios.put(`http://localhost:3001/pedidos/${id}`, data)
            .then(response => {
                toast.success("Pedido editado.", { position: "bottom-right", duration: 2000 });
                navigate("/pedidos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/pedidos/${id}`)
            .then(response => {
                const { codigo, quantidade, clienteId, produtoId } = response.data;
                reset({ codigo, quantidade, clienteId, produtoId });
            })
    }, [id, reset])

    return (
        <div className="container">
            <h1>Editar Pedido</h1>
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
                        {...register("clienteId", { required: "O cliente deve estar cadastrado." })}>
                        <option value=""> Escolha um cliente</option>
                        {clientes.map(cliente =>
                            <option value={cliente.id}>{cliente.nome}</option>
                        )}
                    </Form.Select>
                    {errors.clienteId && <Form.Text className="invalid-feedback">{errors.clienteId.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Produtos</Form.Label>
                    <Form.Select className={errors.produtoId && "is-invalid"}
                        {...register("produtoId", { required: "O produto deve estar cadastrado." })}>
                        <option value=""> Escolha um produto</option>
                        {produtos.map(produto =>
                            <option value={produto.id}>{produto.nome}</option>
                        )}
                    </Form.Select>
                    {errors.produtoId && <Form.Text className="invalid-feedback">{errors.produtoId.message}</Form.Text>}
                </Form.Group>

                <Form onSubmit={handleSubmit((data) => console.log(data))}>
                    {fields.map((field, index) => (
                        <Form.Group className="mb-3" produtoId={`items[${index}].name`}>
                            <Form.Label>Produtos</Form.Label>
                            <Form.Select {...register(`items.${index}.name`)} defaultValue="">
                                <option value="">Escolha um produto</option>
                                {produtos.map(produto => (
                                    <option value={produto.id}>
                                        {produto.nome}
                                    </option>
                                ))}
                            </Form.Select>
                            <br></br>
                            <Button variant="danger" onClick={() => remove(index)}>
                                Remover
                            </Button>
                        </Form.Group>
                    ))}
                    <div className="mb-3">
                        <Button variant="primary" onClick={() => append({ name: '' })}>
                            Adicionar novo produto
                        </Button>
                    </div>
                </Form>

                <hr></hr>
                <Button variant="primary" type="submit">
                    Editar
                </Button>
            </Form>
        </div>
    );
}