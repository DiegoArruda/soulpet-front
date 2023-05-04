import axios from 'axios';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import "./Dashboard.css"
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function Dashboard() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/dashboard")
            .then((response) => {
                setDashboard(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="div-container">
            <div>
                <h1 className="">Dashboard</h1>
                <div>
                <Button variant="outline-secondary" className='botao-dashboard' as={Link} to='/dashboard'>Inicio</Button>
                <Button variant="outline-secondary" className='botao-dashboard'  as={Link} to='/dashboard/graficos'>Gráficos</Button>
                </div>
            </div>
            {dashboard === null ? (
                <Loader />
            ) : (
                <div className="div-dashboard">
                    <div className="div-contador">
                        <div>
                            <h1>{dashboard.totalClientes}</h1>
                            <h4>Clientes</h4>
                        </div>
                    </div>
                    <div className="div-contador">
                        <div>
                            <h1>{dashboard.totalPets}</h1>
                            <h4>Pets</h4>
                        </div>
                    </div>
                    <div className="div-contador">
                        <div>
                            <h1>{dashboard.totalProdutos}</h1>
                            <h4>Produtos cadastrados</h4>
                        </div>
                    </div>
                    <div className="div-contador">
                        <div>
                            <h1>{dashboard.totalServicos}</h1>
                            <h4>Serviços cadastrados</h4>
                        </div>
                    </div>
                    <div className="div-contador">
                        <div>
                            <h1>{dashboard.totalAgendamentos}</h1>
                            <h4>Total de agendamentos</h4>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
