import express from "express";
import Client from "../models/client.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Afficher tous les client
router.get("/all", async (req, res) => {
  Client.find({})
    .then((clients) => {
      return res.status(201).json(clients);
    })
    .catch((err) => {
      return res.status(510).send("Erreur getClients ...");
    });
});

// Afficher les infos d'un client
router.get("/:idclient", (req, res) => {
  var ID = req.params.idclient;
  Client.find({ id: ID }, {})
    .then((client) => {
      return res.status(201).json(client);
    })
    .catch((err) => {
      return res.status(510).send("Erreur client ...");
    });
});

// Ajouter un client
router.post("/add", (req, res) => {
  const id = uuidv4();
  const client = Object.assign({}, { id }, req.body);
  Client.create(client)
    .then(() => {
      return res.status(201).json("add client okk");
    })
    .catch((err) => {
      return res.status(510).send("Erreur add client ..." + err);
    });
});

// Modifier un client
router.put("/update/:idclient", (req, res) => {
  const { idclient } = req.params;
  const { nom, email } = req.body;

  Client.updateOne({ id: idclient }, { $set: { nom: nom, email: email } })
    .then(() => {
      return res.status(201).json("Client updated");
    })
    .catch((err) => {
      return res.status(500).send("Erreur update client..." + err);
    });
});

// Supprimer un client
router.delete("delete/:idclient", (req, res) => {
  const ID = req.params.idclient;

  Client.deleteOne({ id: ID })
    .then(() => {
      return res.status(201).json("client deleted");
    })
    .catch((err) => {
      return res.status(510).send("Erreur delete client...");
    });
});



export default router;
