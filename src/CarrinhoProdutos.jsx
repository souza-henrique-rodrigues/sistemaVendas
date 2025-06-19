export default function CarrinhoProdutos({ key, nome, valor }) {
  return (
    <div>
      <span>&#8226; {nome}</span> - <span>R$ {valor}</span>
    </div>
  );
}
