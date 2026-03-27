import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

const ModeloSchema = new mongoose.Schema({
  nome: String,
  quantidade: Number,
  cor: String,
});

const Modelo = mongoose.models.Modelo || mongoose.model("Modelo", ModeloSchema);

// PATCH (diminuir quantidade)
export async function PATCH(req, context) {
  await connectDB();

  const params = await context.params; // ✅ padrão Next 16
  const id = params.id;

  const { quantidade } = await req.json();

  const modelo = await Modelo.findById(id);

  if (!modelo) {
    return Response.json({ error: "Modelo não encontrado" }, { status: 404 });
  }

  modelo.quantidade -= quantidade;

  if (modelo.quantidade < 0) modelo.quantidade = 0;

  await modelo.save();

  return Response.json(modelo);
}

// DELETE
export async function DELETE(req, context) {
  await connectDB();

  const params = await context.params; // ✅ padrão Next 16
  const id = params.id;

  await Modelo.findByIdAndDelete(id);

  return Response.json({ message: "Modelo deletado" });
}