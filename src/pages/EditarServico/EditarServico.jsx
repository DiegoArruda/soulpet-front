import { Form,Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


export function EditarServico(){
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();


    function onSubmit(data){
        axios.put(`http://localhost:3001/servicos/${id}`, data)
            .then(response => {
                toast.success("Serviço editado.", { position:"bottom-right", duration: 2000 });
                navigate("/servicos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", {position: "bottom-right", duration: 2000});
                console.log(error);
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/servicos/${id}`)
            .then(response => {
                const { nome, preco} = response.data;
                reset({ nome, preco: preco.toFixed(2) });
            })
    }, [id, reset])

    return(
        <div className="container">
        <h1>Editar Serviço</h1>
        <Form onSubmit={handleSubmit(onSubmit)} >
            <Form.Group className="mb-3">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o nome do serviço"
                    className={errors.nome && "is-invalid"}
                    {...register("nome", { required: "O nome do serviço é obrigatório.", maxLength: { value: 131, message: "Limite de 131 caracteres." }, minLength: { value: 3, message: "É preciso digitar 3 caracteres ou mais." } })} />
                {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Preço:</Form.Label>
                <InputGroup>
                    <InputGroup.Text>R$</InputGroup.Text>
                    <Form.Control
                        placeholder="Digite o valor do serviço."
                        type="number"
                        step="0.01"
                        className={errors.preco && "is-invalid"}
                        {...register("preco", {
                            required: "O preço é obrigatório.",
                            pattern: { 
                                value: /^\d+\.\d{2}$/, 
                                message: "Por favor, digite um valor com duas casas decimais." 
                            }})}/>
                    {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                </InputGroup>
            </Form.Group>



            <div className="d-flex -flex justify-content-evenly mt-4">
                <Button variant="primary"  type="Submit">
                    Editar
                </Button>
                <Button variant="primary" type="Reset">
                    Limpar
                </Button>
            </div>
        </Form>
    </div>
    )
}