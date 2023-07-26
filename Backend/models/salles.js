
import mongoose from 'mongoose';

const salleSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  commune:{
    type:String,
    required:true
  },
  wilaya:{
    type:String,
    required:true
  },
  agrement: {
    type: String,
    required: true
  },
  nombre_de_tables: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    url: {
      type: String,
      required: true
    }
  }],
  places_Parking: {
    type: Number,
    required: true
  },
  statut: {
    type: String,
    enum:['nonValidée','validée','En attente'],
    default: 'En attente'
  },
  type_Evenement:{
    type:[String],
    enum: [ 'Mariages','Anniverssaires','Conferences','Fiançailles','Circoncisions','Caritatives','Religieux','Formations','Seminaires'],
    required:true
    },
},{timestamps:true}
);

const Salle = mongoose.model('Salle', salleSchema);

export default Salle;


