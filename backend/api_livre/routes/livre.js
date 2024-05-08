import express from "express";
import Livre from "../models/livre.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Afficher tous les livre
router.get("/all", async (req, res) => {
  Livre.find({})
    .then((livres) => {
      return res.status(201).json(livres);
    })
    .catch((err) => {
      return res.status(510).send("Erreur getLivres ...");
    });
});

router.get("/:id", async (req, res) => {
  const ID=req.params.id
  Livre.find({id:ID})
    .then((livre) => {
      return res.status(201).json(livre);
    })
    .catch((err) => {
      return res.status(510).send("Erreur getLivre..."+err);
    });
});

// Ajouter un client
router.post("/add", (req, res) => {
  const id = uuidv4();
  const livre = Object.assign({}, { id }, req.body);
  Livre.create(livre)
    .then(() => {
      return res.status(201).json("add livre okk");
    })
    .catch((err) => {
      return res.status(510).send("Erreur add livre ..." + err);
    });
});

// Modifier un livre
router.put("/update/:idlivre", (req, res) => {
  const id = req.params.idlivre;
  const titre = req.body.titre;
  const auteur = req.body.auteur;
  const prix = req.body.prix;

  Livre.updateOne(
    { id: id },
    { $set: { titre: titre, auteur: auteur, prix: prix } }
  )
    .then(() => {
      return res.status(201).json("livre updated");
    })
    .catch((err) => {
      return res.status(510).send("Erreur update livre ..."+err);
    });
});

// Supprimer un client
router.delete("/delete/:idlivre", (req, res) => {
  const ID = req.params.idlivre;

  Livre.deleteOne({ id: ID })
    .then(() => {
      return res.status(201).send("livre deleted");
    })
    .catch((err) => {
      return res.status(510).send("Erreur delete livre..."+err);
    });
});

//les livre d'un client
router.get('/emprunt/names', async (req, res) => {
  try {
    const { ids } = req.query; 
    const livres=[];
    for (const id of ids) {
      const livre = await Livre.findOne({ id: id });
      if (livre) {
        livres.push(livre);
        return res.send(livre)
      }
    }
    return res.send(livres);
    /* 
    const names = livres.map((livre) => livre.name);
    res.json(names); */
  } catch (err) {
    console.error('Erreur lors de la recherche des noms :', err);
    res.status(500).json({ error: 'Erreur lors de la recherche des noms' });
  }
});

export default router;
