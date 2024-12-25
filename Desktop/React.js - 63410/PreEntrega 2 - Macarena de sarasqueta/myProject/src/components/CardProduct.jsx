// import Button from "./Button";

import Button from "./Button";

export default function CardProduct(props) {
  const {price, title, text} = props;

  return (
    <div className="card">
      <img src="https://picsum.photos/200/300" alt="product img" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">
            {text}
        </p>
        <div>
          <p className="card-price">$ {price}</p>
        </div>
        <Button>Agregar al carrito</Button>
      </div>
    </div>
  );
}