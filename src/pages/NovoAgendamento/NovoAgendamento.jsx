import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoAgendamento() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            dataAgendada: "",
            petId: "",
            servicoId: "",
        }
    });

    const [pets, setPets] = useState([]);
    const [servicos, setServicos] = useState([]);
    const navigate = useNavigate();

    function buscaPets() {
        axios.get("http://localhost:3001/pets")
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function buscaServicos() {
        axios.get("http://localhost:3001/servicos")
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        buscaPets();
        buscaServicos();
    }, []);

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/agendamentos", data)
            .then(response => {
                toast.success("Agendamento realizado com sucesso.", { position: "bottom-right", duration: 2000 });
                navigate("/agendamentos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error)
            })
    }

    return (
        <div className="agendamento container">
            <h1>Novo Agendamento</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3">
                    <Form.Label>Pet</Form.Label>
                    <Form.Select className={errors.petId && "is-invalid"}
                        {...register("petId", {
                            required: "Pet é obrigatório!"
                        })}>
                        <option value="" disabled>Selecione um Pet</option>
                        {pets.map(pet => (
                            <option key={pet.id} value={pet.id}>{pet.nome}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Serviço</Form.Label>
                    <Form.Select className={errors.servicoId && "is-invalid"}
                        {...register("servicoId", {
                            required: "Serviço é obrigatório!"
                        })}>
                        <option value="" disabled>Selecione um Serviço</option>
                        {servicos.map(servico => (
                            <option key={servico.id} value={servico.id}>{servico.nome}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Data de Agendamento</Form.Label>
                    <Form.Control type="date" className={errors.dataAgendada && "is-invalid"}
                        {...register("dataAgendada", { required: "Data é obrigatória!" })} />
                </Form.Group>

                <Button className="primary" type="submit">Agendar</Button>

            </form>
        </div>
    );
};
