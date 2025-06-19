import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Pedidos({ url }) {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState("");
  const modalRef = useRef(null);

  async function carregarPedidos() {
    try {
      const request = await axios.get(url + `/pedidos`);
      const pedidos = request.data;
      setPedidos(pedidos);
    } catch (e) {
      console.log("Erro : ", e);
    }
  }

  function sincronaCarregaPedidos() {
    carregarPedidos();
    return () => {};
  }

  useEffect(sincronaCarregaPedidos, []);

  function abrirModal(e) {
    e.preventDefault();
    if (modalRef.current) {
      modalRef.current.show();
    }
  }

  function fecharModal(e) {
    e.preventDefault();
    if (modalRef.current) {
      modalRef.current.close();
    }
  }
  return (
    <>
      <dialog ref={modalRef}>
        <form method="dialog">
          <h2>Visualizar pedidos</h2>
          <p>
            <label>
              selecione o pedido :
              <select value={pedidoSelecionado} onChange={evento => setPedidoSelecionado(evento.target.value)}>
                {console.log(pedidoSelecionado)}
                <option>Selecione um pedido…</option>
                {pedidos.map(objetoPedido => {
                  return (
                    <option key={objetoPedido.id} value={objetoPedido.id}>
                      ID:{objetoPedido.id}, Data: {objetoPedido.data_pedido}
                    </option>
                  );
                })}
              </select>
            </label>
          </p>
          <div>
            <button onClick={fecharModal}>Fechar</button>
          </div>
          {pedidoSelecionado && (
            <div>
              <h2>aqui vao estar os dados dos clientes</h2>
            </div>
          )}
        </form>
      </dialog>
      <p>
        <button onClick={abrirModal}>Visualizar Pedidos</button>
      </p>
    </>
  );
}
