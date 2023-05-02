import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

export function Pedidos() {
  //
    const [pets, setPedidos] = useState(null);

     useEffect(() => {
    initializeTable();
  }, []);

    function initializeTable() {
    axios
      .get("http://localhost:3001/pedidos")
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="produtos container">
        <div className="d-flex justify-content-between align-items-center">
            <h1>Pedidos</h1>
            <Button as={Link} to="/pedidos/novo">
                <i className="bi bi-plus-lg me-2"></i> Pedidos
            </Button>
        </div>
    </div>   
  )
}