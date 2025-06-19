import { useEffect, useState } from "react";
import axios from "axios";

export default function ListaClientes({ url }) {
  const [clientes, setClientes] = useState([]);

  async function carregarClientes() {
    const request = await axios.get(url + `/clientes`);
    const dados = request.data;
    setClientes(dados);
  }

  function sincronaCarregarClientes() {
    carregarClientes();
    return () => {};
  }

  useEffect(sincronaCarregarClientes, []);

  return (
    <>
      <label>
        {" "}
        Selecione o cliente :
        <select>
          <option>Escolha...</option>
          {clientes.map(objetoCliente => {
            return (
              <option key={objetoCliente.id} value={objetoCliente.id}>
                {objetoCliente.nome}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
}
