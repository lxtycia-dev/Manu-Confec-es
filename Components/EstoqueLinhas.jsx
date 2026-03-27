import React from 'react'

function EstoqueLinhas() {
  return (
    <div className="flex flex-col sm:flex-row font-['Montserrat'] items-center justify-center gap-4 sm:gap-10 mt-10 sm:mt-20 px-4">
      
      <a 
        href="../ModelosCadastrados" 
        className="bg-red-900 text-white py-6 px-6 rounded-2xl w-full sm:w-auto text-center hover:bg-red-800 transition"
      >
        Ver Modelos Cadastrados
      </a>

      <a 
        href="../LinhasCadastradas" 
        className="bg-red-900 text-white py-6 px-6 rounded-2xl w-full sm:w-auto text-center hover:bg-red-800 transition"
      >
        Ver Linhas Cadastradas
      </a>

    </div>
  )
}

export default EstoqueLinhas