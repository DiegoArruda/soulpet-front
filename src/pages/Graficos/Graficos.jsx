import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "./Graficos.css"

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels,
    Colors
)


export function Graficos() {
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

    //Construção dos gráficos
    const tiposPets = dashboard && dashboard.tiposDePets.map(pet => pet.tipo);
    const quantidadePets = dashboard && dashboard.tiposDePets.map(pet => pet.quantidade);

    const Pets = {
        labels: tiposPets,
        datasets: [
            {
                label: 'Pets',
                data: quantidadePets,
                borderColor: 'black'
            }
        ]
    };

    const clienteCidades = dashboard && dashboard.cidadeClientes.map(clientes => clientes.cidade);
    const quantidadeCidades = dashboard && dashboard.cidadeClientes.map(clientes => clientes.quantidade_enderecos);

    const Endereco = {
        labels: clienteCidades,
        datasets: [
            {
                label: 'Clientes',
                data: quantidadeCidades,
                borderColor: 'black',
            }
        ]
    };

    const agendamentosMes = dashboard && dashboard.agendamentosPorMesUltimos12meses.map(agendamentos => agendamentos.mes);
    const quantidadeAgendamentosMes = dashboard && dashboard.agendamentosPorMesUltimos12meses.map(agendamentos => agendamentos.quantidade);

    const AgendamentosUltimos12meses = {
        labels: agendamentosMes,
        datasets: [
            {
                label: 'Agendamentos',
                data: quantidadeAgendamentosMes,
                borderColor: 'black',
            }
        ]
    };

    const agendamentosAno = dashboard && dashboard.agendamentosPorAno.map(agendamentos => agendamentos.ano);
    const quantidadeAgendamentosAno = dashboard && dashboard.agendamentosPorAno.map(agendamentos => agendamentos.total);

    const agendamentosPorAno = {
        labels: agendamentosAno,
        datasets: [
            {
                label: 'Agendamentos',
                data: quantidadeAgendamentosAno,
                borderColor: 'black'
            }
        ]
    };

    const tiposDeServicos = dashboard && dashboard.tiposServico.map(servicos => servicos.nome);
    const quantidadeServicos = dashboard && dashboard.tiposServico.map(servicos => 1);

    const tipoServicos = {
        labels: tiposDeServicos,
        datasets: [
            {
                data: quantidadeServicos,
                borderColor: 'black'
            }
        ]
    };

    const tiposDeProdutos = dashboard && dashboard.tipoProdutos.map(produtos => produtos.categoria);
    const quantidadeProdutos = dashboard && dashboard.tipoProdutos.map(produtos => produtos.quantidade);

    const tipoProdutos = {
        labels: tiposDeProdutos,
        datasets: [
            {
                label: 'Serviços',
                data: quantidadeProdutos,
                borderColor: 'black'
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom"
            },
            colors: {
                forceOverride: true
            },
            datalabels: {
                color: 'black',
                font: {
                    weight: 'bold',
                    size: 16,
                },
                formatter: function (value, context) {
                    var total = context.dataset.data.reduce(function (accumulator, currentValue) {
                        return accumulator + currentValue;
                    });
                    var percentage = Math.round((value / total) * 100);
                    return percentage + '%';
                }
            }
        },
        maintainAspectRatio: false,
        aspectRatio: 1,
    };

    const chartRef = useRef();


    return (
        <div className='div-container'>
            <div>
                <h1 className="">Dashboard</h1>
                <div>
                    <Button variant="outline-secondary" className='botao-dashboard' as={Link} to='/dashboard'>Inicio</Button>
                    <Button variant="outline-secondary" className='botao-dashboard' as={Link} to='/dashboard/graficos'>Gráficos</Button>
                </div>
            </div>
            <div className='graficos-container'>
                <div className='cards'>
                    <h4>Espécies de pets</h4>
                    <div >
                        <Pie className='graficos-cards'
                            data={Pets}
                            options={options}
                            ref={chartRef}
                        />
                    </div>
                </div>
                <div className='cards'>
                    <h4>Clientes por cidade</h4>
                    <div >
                        <Pie className='graficos-cards'
                            data={Endereco}
                            options={options}
                            ref={chartRef}
                        />
                    </div>
                </div>
                <div className='cards'>
                    <h4>Agendamentos por mês</h4>
                    <div >
                        <Pie className='graficos-cards'
                            data={AgendamentosUltimos12meses}
                            options={options}
                            ref={chartRef}
                        />
                    </div>
                </div>
                <div className='cards'>
                    <h4>Agendamentos por ano</h4>
                    <div >
                        <Pie className='graficos-cards'
                            data={agendamentosPorAno}
                            options={options}
                            ref={chartRef}
                        />
                    </div>
                </div>
                <div className='cards'>
                    <h4>Tipos de serviços</h4>
                    <div>
                        <Pie className='graficos-cards'
                            data={tipoServicos}
                            options={options}
                            ref={chartRef}
                        />
                    </div>
                </div>
                <div className='cards'>
                    <h4>Categoria de produtos</h4>
                    <div>
                        <Pie className='graficos-cards'
                            data={tipoProdutos}
                            options={options}
                            ref={chartRef}
                        />
                    </div>
                </div>
            </div>
        </div>


    )
}