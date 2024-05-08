import mongoose from "mongoose"


const empruntSchema = new mongoose.Schema({
    id: { type: String, required: true,unique:true },
    id_client: { type: String, ref: 'Client' },
    id_livre: { type: String, ref: 'Livre' },
    date_emprunt: Date,
    date_retour: Date
  });

export default mongoose.model('Emprunt', empruntSchema);
