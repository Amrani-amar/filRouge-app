import mongoose from 'mongoose';

const { Schema } = mongoose;
const options = {
  timestamps : true
}
const reservationSchema = new Schema({
  utilisateur :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required:true
  },
  telephone:{
    type:String,
    validate:{
      validator: function(v){
        // validation du numero de tel au min 1 chiffre pour permetre au numero etranger de s'enregistrer
        return   /^\d+$/.test(v); 
      }
  },
    required:true
  },
  salle: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Salle",
    required: true
  },
  dateDebut: {
    type: Date,
    validate:{
        validator: function(v){
          return  new Date(v) >= Date.now();
        },
      
    },
    required: true
  },
  dateFin: {
    type: Date,
    validate:{
      validator: function(v){
        return   new Date(v) >= new Date(this.dateDebut);
      }
  },
    required: true
  },
  statut: {
    type: String,
    enum: ['En attente', 'Confirmée', 'Annulée'],
    default: 'En attente'
  },
 
},options);

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;


