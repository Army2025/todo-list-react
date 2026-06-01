import { useState, useEffect } from "react";

type Tarefa = {
  texto: string;
  concluida: boolean;
};

function App() {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() {
    if (tarefa.trim() === "") return;

    setTarefas([
      ...tarefas,
      {
        texto: tarefa,
        concluida: false,
      },
    ]);

    setTarefa("");
  }

  function removerTarefa(indexParaRemover: number) {
    const novaLista = tarefas.filter(
      (_, index) => index !== indexParaRemover
    );

    setTarefas(novaLista);
  }

  function concluirTarefa(index: number) {
    const novaLista = [...tarefas];

    novaLista[index].concluida =
      !novaLista[index].concluida;

    setTarefas(novaLista);
  }

  const total = tarefas.length;

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const pendentes = total - concluidas;

  return (
    <div className="container">
      <h1>Minha Lista de Tarefas</h1>

      <div>
        <p>Total: {total}</p>
        <p>Concluídas: {concluidas}</p>
        <p>Pendentes: {pendentes}</p>
      </div>

      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={tarefa}
        onChange={(e) => setTarefa(e.target.value)}
      />

      <button onClick={adicionarTarefa}>
        Adicionar
      </button>

      <ul>
        {tarefas.map((item, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: item.concluida
                  ? "line-through"
                  : "none",
              }}
            >
              {item.texto}
            </span>

            <button
              onClick={() => concluirTarefa(index)}
            >
              ✅
            </button>

            <button
              onClick={() => removerTarefa(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;