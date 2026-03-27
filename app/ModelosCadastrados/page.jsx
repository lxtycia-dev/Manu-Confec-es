"use client";

import React, { useEffect, useState } from "react";

function ModelosCadastrados() {
  const [modelos, setModelos] = useState([]);
  const [valores, setValores] = useState({});

  async function buscarModelos() {
    const res = await fetch("/api/modelos");
    const data = await res.json();
    setModelos(data);
  }

  useEffect(() => {
    buscarModelos();
  }, []);

  async function deletarModelo(id) {
    await fetch(`/api/modelos/${id}`, {
      method: "DELETE",
    });

    buscarModelos();
  }

  async function diminuirQuantidade(id) {
    const valor = valores[id] || 0;

    if (valor <= 0) return alert("Digite um valor válido");

    await fetch(`/api/modelos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantidade: Number(valor),
      }),
    });

    setValores({ ...valores, [id]: "" });
    buscarModelos();
  }

  return (
    <div className="p-4 sm:p-6 flex flex-col items-center font-['Montserrat']">
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-red-900">
        Modelos cadastrados
      </h1>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {modelos.map((modelo) => (
          <div
            key={modelo._id}
            className="border-2 border-red-900 rounded-2xl p-4 bg-white shadow-md flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <p><strong>Nome:</strong> {modelo.nome}</p>
              <p><strong>Qtd:</strong> {modelo.quantidade}</p>
              <p><strong>Cor:</strong> {modelo.cor}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-center">

              <input
                type="number"
                placeholder="Qtd"
                value={valores[modelo._id] || ""}
                onChange={(e) =>
                  setValores({
                    ...valores,
                    [modelo._id]: e.target.value,
                  })
                }
                className="border-2 border-gray-300 rounded-md p-2 w-full sm:w-24"
              />

              <button
                onClick={() => diminuirQuantidade(modelo._id)}
                className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Remover
              </button>

              <button
                onClick={() => deletarModelo(modelo._id)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Excluir
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default ModelosCadastrados;