import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

const ModeloSchema = new mongoose.Schema(
  {
    nome: String,
    quantidade: Number,
    cor: String,
  },
  { timestamps: true },
);

const Modelo = mongoose.models.Modelo || mongoose.model("Modelo", ModeloSchema);

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const novoModelo = await Modelo.create(body);

  return Response.json(novoModelo);
}

export async function GET() {
  await connectDB();

  const modelos = await Modelo.find();

  return Response.json(modelos);
}