"use client";
import React, { useEffect, useState } from "react";

function CadastroModelos() {

  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [cor, setCor] = useState("");

  const [linhas, setLinhas] = useState([]);

  // 🔄 buscar linhas
  async function buscarLinhas() {
    const res = await fetch("/api/linhas");
    const data = await res.json();
    setLinhas(data);
  }

  useEffect(() => {
    buscarLinhas();
  }, []);

  // 🔗 linhas da mesma cor
  const linhasDaCor = linhas.filter(
    (l) => l.cor.toLowerCase() === cor.toLowerCase()
  );

  const totalDisponivel = linhasDaCor.reduce(
    (acc, l) => acc + l.quantidade,
    0
  );

  // ➕ cadastrar modelo
  async function cadastrarModelo(e) {
    e.preventDefault();

    if (quantidade > totalDisponivel) {
      return alert("Sem linhas suficientes para esse modelo");
    }

    await fetch("/api/modelos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        quantidade,
        cor
      })
    });

    setNome("");
    setQuantidade("");
    setCor("");
  }

  return (
    <div className="flex flex-col items-center justify-center font-['Montserrat'] px-4 mt-10  w-full ">

      <form 
        onSubmit={cadastrarModelo}
        className="p-5 bg-white border-2 border-red-900 rounded-2xl w-full shadow-md  max-w-4xl"
      >
        <h1 className="font-semibold text-center mb-4 text-red-900">
          Cadastro de Modelos
        </h1>

        <input
          type="text"
          placeholder="Nome do modelo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border mb-3 p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          className="border mb-3 p-2 w-full rounded"
        />

        {/* 🔗 RELAÇÃO COM LINHAS */}
        {cor && (
          <div className="mb-3 bg-gray-50 border rounded p-3">
            <p className="font-semibold text-red-900">
              Linhas disponíveis:
            </p>

            {linhasDaCor.length === 0 ? (
              <p className="text-sm text-gray-500">
                Nenhuma disponível
              </p>
            ) : (
              <>
                {linhasDaCor.map((l) => (
                  <p key={l._id} className="text-sm">
                    {l.cor} - {l.tonalidade} - qtd {l.quantidade}
                  </p>
                ))}

                <p className="text-sm mt-2 font-semibold">
                  Total disponível: {totalDisponivel}
                </p>
              </>
            )}
          </div>
        )}

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="border mb-3 p-2 w-full rounded"
        />

        <button className="bg-red-900 hover:bg-red-800 text-white w-full py-2 rounded">
          Cadastrar
        </button>

      </form>

    </div>
  );
}

export default CadastroModelos;