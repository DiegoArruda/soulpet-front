import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Agendamento() {
    return(
        <div className="container">
        <div className="d-flex justify-content-between align-items-center">
            <h1>Agendamentos</h1>
            <Button as={Link} to="/agendamentos/novo">
                <i className="bi bi-plus-lg me-2"></i> Agendar
            </Button>
        </div>
    </div>   
    );
}