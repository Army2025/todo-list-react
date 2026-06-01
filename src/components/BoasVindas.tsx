type BoasVindasProps = {
  nome: string;
};

function BoasVindas({ nome }: BoasVindasProps) {
  return (
    <p>Bem-vinda, {nome}!</p>
  );
}

export default BoasVindas;