export default function Produto({ id, nome, valor, estoque, onAdicionarProdutoCarrinho }) {
  return (
    <>
      <div>
        <span>&#8226; Nome : {nome}</span> -<span>Valor R$ : {valor}</span> -<span>Estoque : {estoque}</span>
        <button onClick={() => onAdicionarProdutoCarrinho(id)}>Adicionar</button>
      </div>
    </>
  );
}
