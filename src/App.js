import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { NovoPet } from "./pages/NovoPet/NovoPet";
import { NovoServicos } from "./pages/NovoServicos/NovoServicos";
import { DetalheClientes } from "./pages/DetalheClientes/DetalheClientes";
import { Pets } from "./pages/Pets/Pets";
import { EditaPet } from "./pages/EditaPet/EditaPet";
import { EditarServico } from "./pages/EditarServico/EditarServico";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";
import { NovoAgendamento } from "./pages/NovoAgendamento/NovoAgendamento";
import { Servicos } from "./pages/Servicos/Servicos";
import { Produtos } from "./pages/Produtos/Produtos";
import { Agendamento } from "./pages/Agendamento/Agendamento";
import { EditaPedido } from "./pages/EditaPedido/editaPedido";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Graficos } from "./pages/Graficos/Graficos";
import { EditarProdutos } from "./pages/EditarProdutos/EditarProdutos";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/detalhes/:id" element={<DetalheClientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<NovoPet />} />
          <Route path="/pets/editar/:id" element={<EditaPet />} />
          <Route path="/servicos" element={<Servicos/>}/>
          <Route path="/servicos/novo" element={<NovoServicos />} />
          <Route path="/servicos/editar/:id" element={<EditarServico/>} />
          <Route path="/pedidos" element={<Pedidos/>} />
          <Route path="/pedidos/novo" element={<NovoPedido/>} /> 
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/editar/:id" element={<EditarProdutos/>} />
          <Route path="/produtos/novo" element={<NovoProduto />} />
          <Route path="/pedidos/editar/:id" element={<EditaPedido/>} />
          <Route path="/agendamentos" element={<Agendamento />} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/graficos" element= {<Graficos/>} />          
          <Route path="/agendamentos" element={<Agendamento />} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
