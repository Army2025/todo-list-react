import { useState, useEffect } from "react";
import type { Task } from "./types/Task";

function App() {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [filtro, setFiltro] = useState("todas");

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [novoTexto, setNovoTexto] = useState("");

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

    const novaTarefa: Task = {
      id: Date.now(),
      texto: tarefa,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTarefa("");
  }

  function removerTarefa(id: number) {
    const novaLista = tarefas.filter(
      (tarefa) => tarefa.id !== id
    );

    setTarefas(novaLista);
  }

  function concluirTarefa(id: number) {
    const novaLista = tarefas.map((tarefa) =>
      tarefa.id === id
        ? {
            ...tarefa,
            concluida: !tarefa.concluida,
          }
        : tarefa
    );

    setTarefas(novaLista);
  }

  function salvarEdicao() {
    const novaLista = tarefas.map((tarefa) =>
      tarefa.id === editandoId
        ? {
            ...tarefa,
            texto: novoTexto,
          }
        : tarefa
    );

    setTarefas(novaLista);

    setEditandoId(null);
    setNovoTexto("");
  }

  const total = tarefas.length;

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const pendentes = total - concluidas;

  const tarefasFiltradas = tarefas.filter(
    (tarefa) => {
      if (filtro === "pendentes") {
        return !tarefa.concluida;
      }

      if (filtro === "concluidas") {
        return tarefa.concluida;
      }

      return true;
    }
  );

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

      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <button onClick={() => setFiltro("todas")}>
          Todas
        </button>

        <button
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>

        <button
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
      </div>

      <ul>
        {tarefasFiltradas.map((item) => (
          <li key={item.id}>
            {editandoId === item.id ? (
              <>
                <input
                  type="text"
                  value={novoTexto}
                  onChange={(e) =>
                    setNovoTexto(e.target.value)
                  }
                />

                <button onClick={salvarEdicao}>
                  Salvar
                </button>
              </>
            ) : (
              <span
                style={{
                  textDecoration:
                    item.concluida
                      ? "line-through"
                      : "none",
                }}
              >
                {item.texto}
              </span>
            )}

            <button
              onClick={() =>
                concluirTarefa(item.id)
              }
            >
              ✅
            </button>

            <button
              onClick={() =>
                removerTarefa(item.id)
              }
            >
              ❌
            </button>

            <button
              onClick={() => {
                setEditandoId(item.id);
                setNovoTexto(item.texto);
              }}
            >
              ✏️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;