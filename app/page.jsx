import CadastroModelos from "@/Components/CadastroModelos";
import EstoqueLinhas from "@/Components/EstoqueLinhas";
import InicialPg from "@/Components/InicialPg";
import NavBar from "@/Components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <NavBar />
        <InicialPg />
        <CadastroModelos />
        <EstoqueLinhas />
    </div>
  );
}
