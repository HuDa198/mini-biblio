import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    id: { type: String, required: true, unique:true},
    nom: { type: String, required: true },
    email: { type: String, required: true, unique:true }
});

export default mongoose.model('Client', clientSchema);