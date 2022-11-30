import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const bancoDados = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

app.get("/all", (req, res) => {
  return res.status(200).json(bancoDados);
});

app.post("/create", (req, res) => {
  const form = req.body;
  bancoDados.push(form);
  return res.status(201).json(bancoDados);
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;

  const editProcesso = bancoDados.find((proc) => proc.id === id);

  if (!editProcesso) {
    res.status(400).json({ msg: "processo nao encontrado" });
  }

  const idx = bancoDados.indexOf(editProcesso);

  bancoDados[idx] = {
    ...editProcesso,
    ...req.body,
  };

  return res.status(200).json(bancoDados[idx]);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const deleteById = bancoDados.find((processo) => processo.id === id);
  const index = bancoDados.indexOf(deleteById);
  bancoDados.splice(index, 1);
  return res.status(200).json(bancoDados);
});

app.get("/process/:id", (req, res) => {
  const { id } = req.params;
  const procById = bancoDados.find((proc) => proc.id === id);
  if (!procById) {
    return res.status(400).json({ msg: "processo nao encontrado" });
  }
  return res.status(200).json(procById);
});

app.put("/addComment/:id", (req, res) => {
  const { id } = req.params;
  const procById = bancoDados.find((proc) => proc.id === id);

  if (!procById) {
    return res.status(400).json({ msg: "processo nao encontrado" });
  }

  const idx = bancoDados.indexOf(procById);

  const comment = req.body.comments;

  comment.map((e) => {
    bancoDados[idx].comments.push(e);
  });

  return res.status(200).json(bancoDados[idx]);
});

app.get("/status/open", (req, res) => {

    const procStatusOpen = bancoDados.find((proc) => proc.status === "Em andamento")

    if(!procStatusOpen){
        return res.status(400).json({ msg: "Not exists process with Open status"})
    }

  return res.status(200).json(procStatusOpen);
});

app.get("/status/close", (req, res) => {

    const procStatusClose = bancoDados.find((proc) => proc.status === "Finalizado")

    if(!procStatusClose){
        return res.status(400).json({ msg: "Not exists process with finally status"})
    }

  return res.status(200).json(procStatusClose);
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server App up and running on http://localhost:${process.env.PORT}`
  );
});
