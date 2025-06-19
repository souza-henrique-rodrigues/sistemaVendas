import axios from "axios";
import { useEffect, useState } from "react";
import Produto from "./Produto";
import CarrinhoProdutos from "./CarrinhoProdutos";

export default function ListaProdutos({ url }) {
  const [produtos, setProdutos] = useState([]);
  const [carrinhoProdutos, setCarrinhoProdutos] = useState([]);
  const [valorTotalCarrinho, setvalorTotalCarrinho] = useState(0);

  async function carregarProdutos() {
    try {
      const request = await axios.get(url + `/produtos`);
      const produto = request.data;
      setProdutos(produto);
    } catch (e) {
      console.error(`Erro ao fazer requisição : `, e);
    }
  }

  function sincronaCarregaProdutos() {
    carregarProdutos();
    return () => {};
  }

  useEffect(sincronaCarregaProdutos, []);

  function salvarProdutoCarrinho(id) {
    let valorProduto = 0;

    let copiaCarrinho = [...carrinhoProdutos];
    let produtoParaCarrinho = {};

    produtos.map(objetoProduto => {
      if (objetoProduto.id == id) {
        valorProduto = objetoProduto.valor;
        produtoParaCarrinho = objetoProduto;
        return objetoProduto;
      }
    });
    copiaCarrinho.push(produtoParaCarrinho);
    setCarrinhoProdutos(copiaCarrinho);
    calcularValorCarrinho(valorProduto);
  }

  function calcularValorCarrinho(valorProduto) {
    let copiaValorPrevio = valorTotalCarrinho;
    let valorAtual = copiaValorPrevio + valorProduto;
    setvalorTotalCarrinho(valorAtual);
  }

  return (
    <>
      <div>
        <h1>Carrinho</h1>
        <h2>
          {carrinhoProdutos.map(objetoProduto => {
            return <CarrinhoProdutos key={objetoProduto.key} nome={objetoProduto.nome} valor={objetoProduto.valor} />;
          })}
        </h2>
        <h2>Total R$ : {valorTotalCarrinho} </h2>
      </div>
      <div>
        <button>Finalizar compra</button>
      </div>
      <div>
        <h1>Produtos</h1>
        {produtos.map(objetoProduto => {
          return (
            <Produto
              key={objetoProduto.id}
              id={objetoProduto.id}
              nome={objetoProduto.nome}
              valor={objetoProduto.valor}
              estoque={objetoProduto.estoque}
              onAdicionarProdutoCarrinho={salvarProdutoCarrinho}
            />
          );
        })}
      </div>
    </>
  );
}
