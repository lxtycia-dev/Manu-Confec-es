import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

const LinhaSchema = new mongoose.Schema({
  cor: String,
  quantidade: Number,
  tonalidade: String,
}, { timestamps: true });

const Linha = mongoose.models.Linha || mongoose.model("Linha", LinhaSchema);

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const novaLinha = await Linha.create(body);

  return Response.json(novaLinha);
}
  export async function GET() {

  await connectDB();

  const linhas = await Linha.find();

  return Response.json(linhas);
}
  
export async function PATCH(req, { params }) {
  await connectDB();

  const { quantidade } = await req.json();

  const linha = await Linha.findById(params.id);

  linha.quantidade -= quantidade;

  if (linha.quantidade < 0) {
    linha.quantidade = 0;
  }

  await linha.save();

  return Response.json(linha);
}