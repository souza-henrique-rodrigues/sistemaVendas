import "./App.css";
import ListaClientes from "./ListaClientes";
import ListaProdutos from "./ListaProdutos";
import Pedidos from "./Pedidos";

const URL = "http://localhost:3000";

function App() {
  return (
    <>
      <Pedidos url={URL} />
      <ListaClientes url={URL} />
      <ListaProdutos url={URL} />
    </>
  );
}

export default App;
