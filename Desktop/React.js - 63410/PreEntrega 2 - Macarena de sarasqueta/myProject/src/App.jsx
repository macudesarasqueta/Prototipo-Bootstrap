import "./App.css";
import Button from "./components/Button";
import CardProduct from "./components/CardProduct";

export default function App() {
  return (
    <>
      <section>
        <Button textButtom = "Carrito" color = "brown"/>
        <Button textButtom = "Disabled" disabled = {true}/>
      </section>
      <section>
        <CardProduct 
          price={25.50} 
          title="Mate imperial"
          text="Mate de cuero con bombilla"
        />
         <CardProduct 
          price={35.50} 
          title="Mate camionero"
          text="Mate de cuero con bombilla"
        />
         <CardProduct 
          price={15} 
          title="Mate torpedo"
          text="Mate de cuero con bombilla"
        />
      </section>
    </>
  );
}