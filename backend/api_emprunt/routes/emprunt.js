import express from "express"
import Emprunt from "../models/emprunt.js"
import Client from "../../api_client/models/client.js";
import Livre from "../../api_livre/models/livre.js"
import { v4 as uuidv4 } from "uuid";


const router = express.Router();


//afficher les empruntes d'un client

router.get("/:id_client", (req, res) => {
  const { id_client } = req.params;
  Emprunt.find({ id_client: id_client })
    .then((emprunts) => {

      res.status(200).json(emprunts);
    })
    .catch((error) => {
      res.status(500).json("Error retrieving emprunts: " + error);
    });
});





//ajouter emprunt
router.post('/add', (req, res) => {
   try {
     const id = uuidv4();
     const { id_client, id_livre, date_emprunt, date_retour } = req.body;
     
 
     // Vérifier si le client existe
     const client = Client.findOne({ id: id_client });
    
     if (!client) {
       return res.status(404).json({ message: 'Client not found' });
     }
     
     const livre = Livre.findOne({ id: id_livre });
     if (!livre) {
       return res.status(404).json({ message: 'Livre not found' });
     }
 
     // Créer un nouvel emprunt
     const emprunt = Emprunt.create({
      id,
      id_client: id_client,
      id_livre: id_livre,
      date_emprunt:date_emprunt,
      date_retour:date_retour 
    });
     res.status(201).json(emprunt);
   } catch (error) {
     res.status(500).json({ message: 'Error creating emprunt', error: error.message });
   }
 });
export default router;