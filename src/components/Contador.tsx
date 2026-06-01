import { useState, useEffect } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log("O contador mudou para:", contador);
  }, [contador]);

  return (
    <div>
      <h2>Contador: {contador}</h2>

      <button onClick={() => setContador(contador + 1)}>
        Somar
      </button>

      <button onClick={() => setContador(contador - 1)}>
        Diminuir
      </button>
    </div>
  );
}

export default Contador;