"use client";

import React, { useEffect, useState } from "react";

function InicialPg() {

  const [cor, setCor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tonalidade, setTonalidade] = useState("");

  const [linhas, setLinhas] = useState([]);
  const [modelos, setModelos] = useState([]);

  // 🔄 Buscar dados
  async function buscarDados() {
    const resLinhas = await fetch("/api/linhas");
    const dataLinhas = await resLinhas.json();

    const resModelos = await fetch("/api/modelos");
    const dataModelos = await resModelos.json();

    setLinhas(dataLinhas);
    setModelos(dataModelos);
  }

  useEffect(() => {
    buscarDados();

    // 🔥 ATUALIZA AUTOMATICAMENTE
    const interval = setInterval(buscarDados, 3000);

    return () => clearInterval(interval);
  }, []);

  // ➕ cadastrar linha
  async function cadastrarLinha(e) {
    e.preventDefault();

    await fetch("/api/linhas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cor,
        quantidade,
        tonalidade
      })
    });

    setCor("");
    setQuantidade("");
    setTonalidade("");

    buscarDados();
  }

  // 📊 Dashboard
  const totalLinhas = linhas.length;
  const totalModelos = modelos.length;

  const somaLinhas = linhas.reduce((acc, l) => acc + l.quantidade, 0);
  const somaModelos = modelos.reduce((acc, m) => acc + m.quantidade, 0);

  // 🔗 RELAÇÃO: LINHAS DA COR
  const linhasDaCor = linhas.filter(
    (l) => l.cor.toLowerCase() === cor.toLowerCase()
  );

  // ⚠️ ALERTA ESTOQUE BAIXO
  const estoqueBaixo = linhas.filter((l) => l.quantidade < 10);

  return (
    <div className="flex flex-col items-center font-['Montserrat'] px-4 pb-10">

      {/* 🔥 ALERTA */}
      {estoqueBaixo.length > 0 && (
        <div className="w-full max-w-4xl bg-red-100 border border-red-500 text-red-800 p-4 rounded-xl mt-4">
          <strong>⚠️ Estoque baixo:</strong>
          {estoqueBaixo.map((l) => (
            <p key={l._id} className="text-sm">
              {l.cor} - {l.tonalidade} (qtd: {l.quantidade})
            </p>
          ))}
        </div>
      )}

      {/* 📊 DASHBOARD */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

        <div className="bg-red-900 text-white p-5 rounded-2xl shadow-lg">
          <p className="text-sm">Linhas cadastradas</p>
          <h2 className="text-3xl font-bold">{totalLinhas}</h2>
          <p className="text-sm">Total: {somaLinhas}</p>
        </div>

        <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg">
          <p className="text-sm">Modelos cadastrados</p>
          <h2 className="text-3xl font-bold">{totalModelos}</h2>
          <p className="text-sm">Total: {somaModelos}</p>
        </div>

      </div>

      {/* FORM */}
      <form 
        onSubmit={cadastrarLinha}
        className="mt-6 p-5 bg-white border-2 border-red-900 rounded-2xl w-full shadow-md  max-w-4xl"
      >
        <h1 className="font-bold text-center mb-4 text-red-900">
          Cadastro de linha
        </h1>

        <input
          type="text"
          placeholder="Cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          className="border mb-3 p-2 w-full rounded"
        />

        {/* 🔗 RELAÇÃO COM MODELOS */}
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
              linhasDaCor.map((l) => (
                <p key={l._id} className="text-sm">
                  {l.cor} | {l.tonalidade} → {l.quantidade}
                </p>
              ))
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

        <input
          type="text"
          placeholder="Tonalidade"
          value={tonalidade}
          onChange={(e) => setTonalidade(e.target.value)}
          className="border mb-3 p-2 w-full rounded"
        />

        <button className="bg-red-900 hover:bg-red-800 text-white w-full py-2 rounded">
          Cadastrar
        </button>
      </form>

    </div>
  );
}

export default InicialPg;