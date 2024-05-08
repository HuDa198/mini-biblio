import mongoose from "mongoose"
const livreSchema = mongoose.Schema({
    id: { type: String, required: true, unique:true },
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    prix: { type: Number, required: true },
});

export default mongoose.model('livre', livreSchema);