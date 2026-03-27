import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

const LinhaSchema = new mongoose.Schema({
  cor: String,
  quantidade: Number,
  tonalidade: String,
});

const Linha = mongoose.models.Linha || mongoose.model("Linha", LinhaSchema);

// PATCH
export async function PATCH(req, context) {
  await connectDB();

  const params = await context.params; // ✅ CORRETO
  const id = params.id;

  const { quantidade } = await req.json();

  const linha = await Linha.findById(id);

  if (!linha) {
    return Response.json({ error: "Linha não encontrada" }, { status: 404 });
  }

  linha.quantidade -= quantidade;

  if (linha.quantidade < 0) linha.quantidade = 0;

  await linha.save();

  return Response.json(linha);
}

// DELETE
export async function DELETE(req, context) {
  await connectDB();

  const params = await context.params; // ✅ CORRETO
  const id = params.id;

  await Linha.findByIdAndDelete(id);

  return Response.json({ message: "Linha deletada" });
}