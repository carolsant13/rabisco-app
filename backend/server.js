const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ mensagem: "API funcionando 🚀" });
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});