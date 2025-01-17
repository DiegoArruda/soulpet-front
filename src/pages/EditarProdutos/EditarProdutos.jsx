import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export function EditarProdutos() {

    const { register, handleSubmit, formState: {errors}, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/produtos/${id}`, data)
        .then((response) =>{
            toast.success("Produto editado", {
                position: "bottom-right", 
                duration: 2000
            });
            navigate("/produtos");
        })
        .catch((error) =>{
            toast.error("Algo deu errado", {
                position: "bottom-right", 
                duration: 2000
            });
            console.log(error);
        });
    }

    useEffect(() =>{
        axios.get(`http://localhost:3001/produtos/${id}`)
        .then((response) =>{
            const { nome, preco, descricao, desconto, dataDesconto, categoria } = response.data;
            reset({ nome, preco, descricao, desconto, dataDesconto, categoria });
        });
    }, [id, reset]);

    const dayjs = require("dayjs");
    const today = dayjs();


    return (
        <>
        <div className="container">
            <h1>Editar Produtos</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                    type="text"
                    className={errors.nome && "is-invalid"}
                    {...register("nome", 
                    { required: "O nome é obrigatório",
                    maxLength: { value: 100, message: "Limite de 100 caracteres"}}
                    )}/>
                    {errors.nome && 
                    <Form.Text className="invalid-feedback">
                        {errors.nome.message}
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label> 
                    <Form.Control 
                    type="number"
                    className={errors.preco && "is-invalid"}
                    {...register("preco", 
                    { required: "O preço é obrigatório"}
                    )}
                    />
                    {errors.preco && 
                    <Form.Text className="invalid-feedback">
                        {errors.preco.message}
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control 
                    type="text" 
                    className={errors.descricao && "is-invalid"}
                    {...register("descricao", 
                    { required: "A descrição é obrigatória",
                    maxLength: { value: 150, message: "Limite de 150 caracteres"}}
                    )}
                    />
                    {errors.descricao && 
                    <Form.Text className="invalid-feedback">
                        {errors.descricao.message}
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Desconto (Em %)</Form.Label>
                    <Form.Control 
                    type="number"
                    className={errors.desconto && "is-invalid"}
                    {...register("desconto", 
                    { required: "O desconto é obrigatório",
                    maxLength: { value: 2, message: "O desconto não pode ser maior que 99%"}}
                    )}
                    />
                    {errors.desconto && 
                    <Form.Text className="invalid-feedback">
                        {errors.desconto.message}
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Data do Desconto</Form.Label>
                    <Form.Control 
                    type="date"
                    min={today.format("YYYY-MM-DD")}
                    // min={new Date().toISOString().split(0,10)}
                    className={errors.dataDesconto && "is-invalid"}
                    {...register("dataDesconto", 
                    { required: "A data do desconto é obrigatória"}
                    )}
                    />
                    {errors.dataDesconto && 
                    <Form.Text className="invalid-feedback">
                        {errors.dataDesconto.message}
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select defaultValue="Selecione uma categoria"
                    className={errors.categoria && "is-invalid"}
                    {...register("categoria", 
                    { required: "A categoria é obrigatória"}
                    )}
                    >
                        <option disabled>Selecione uma categoria</option>
                        <option value="Alimentação">Alimentação</option>
                        <option value="Brinquedos">Brinquedos</option>
                        <option value="Conforto">Conforto</option>
                        <option value="Higiene">Higiene</option>
                        <option value="Roupas">Roupas</option>
                    </Form.Select>
                    {errors.categoria && 
                    <Form.Text className="invalid-feedback">
                        {errors.categoria.message}
                    </Form.Text>}
                </Form.Group>

            <Button variant="primary" type="submit">
                Editar
            </Button>
            </Form>
        </div>
        </>
    );
}