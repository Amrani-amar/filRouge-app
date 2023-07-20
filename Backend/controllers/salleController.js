import Salle from '../models/salles.js';
import User from '../models/user.js'
import fs from 'fs';


// valider la salle 
export const validerSalle = async (req, res) => { 
      // Vérifier le rôle de l'utilisateur
    const userRole = res.locals.role;
    console.log(userRole);
    if (userRole !== 'admin') {
      throw new Error('Accès refusé. Seuls les admiNs peuvent valider une salle.');
    }
    
    try {
    const { id } = req.params;
    // const {status} = req.body
    const salle = await Salle.findById(id);

    if (!salle) {
      throw new Error('Salle introuvable');
    }
    

    // salle.statut = status;
    salle.statut = "validée";
    await salle.save();

    res.status(200).json({ message: 'La salle a été validée avec succès', salle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Recuperer toutes les salles
export const getAllSalles = async (req, res) => {
  console.log('ici getallsalles');
  const userRole = res.locals.role;
  const userId = res.locals.userId

 // Vérifier le rôle de l'utilisateur
 if (userRole !== "admin") {
  console.log("Acces refuser. User role:", userRole);
  return res.status(403).json({ message: "Seuls les utilisateurs avec le rôle \"admin\"peuvent regarder la liste salle." });
}
  try {
    const salles = await Salle.find();
    res.status(200).json(salles);  
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Recuperer Toutes les salles EN ATTENTE
export const getSallesEnAttente = async (req, res) => {
  const userRole = res.locals.role;

  console.log("Recherche des salles en attente pour l'administrateur");

  if (userRole !== "admin") {
    console.log("Accès refusé. Seuls les utilisateurs avec le rôle \"admin\" peuvent consulter les salles en attente.");
    return res.status(403).json({ message: "Accès refusé. Seuls les utilisateurs avec le rôle \"admin\" peuvent consulter les salles en attente." });
  }

  try {
    const salles = await Salle.find({ statut: "En attente" });
    console.log("Salles en attente :", salles);
    res.status(200).json(salles);
  } catch (error) {
    console.log("Erreur lors de la récupération des salles en attente :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des salles en attente" });
  }
};

// get toutes les SALLES VALIDEES
export const getSallesValidees = async (req, res) => {
  const filter = {statut:'validée'}

  try {
    const salles = await Salle.find(filter);
    console.log("Salles validées :", salles);
    res.status(200).json(salles);
  } catch (error) {
    console.log("Erreur lors de la récupération des salles validées :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des salles validées" });
  }
};
// get toutes les SALLES-NON-VALIDEES
export const getSallesNonValidees = async (req, res) => {
  const userRole = res.locals.role;

  console.log("Recherche des salles NON Validées pour l'administrateur");

  if (userRole !== "admin") {
    console.log("Accès refusé. Seuls les utilisateurs avec le rôle \"admin\" peuvent consulter les salles non validées.");
    return res.status(403).json({ message: "Accès refusé. Seuls les utilisateurs avec le rôle \"admin\" peuvent consulter les salles nonValidées." });
  }

  try {
    const salles = await Salle.find({ statut: "nonValidée" });
    console.log("Salles nonValidée :", salles);
    res.status(200).json(salles);
  } catch (error) {
    console.log("Erreur lors de la récupération des salles nonValidées :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des salles nonValidées" });
  }
};


// Recuperer une salle par son ID
export const getSalleById = async (req, res) => {
  try {
    const { id } = req.params;
    const salle = await Salle.findById(id);
    if (!salle) throw new Error('Salle introuvable');
    res.status(200).json(salle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}; 
// création d'une salle (ajouter une salle)<
export const createSalle = async (req, res) => {
  const user = res.locals.userId;
  const userRole = res.locals.role;

  // Vérifier le rôle de l'utilisateur
  if (userRole !== "admin" && userRole !== "gerant") {
    console.log("Acces refuser. User role:", userRole);
    return res.status(403).json({ message: "Seuls les utilisateurs avec le rôle ADMIN ou GERANT peuvent ajouter une salle." });
  }

  const { nom, adresse, commune, wilaya, agrement,telephone,nombre_de_tables, description, places_Parking, type_Evenement } = req.body;
  const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

  try {
    const salle = await Salle.create({ nom, adresse, commune, wilaya, agrement,telephone,nombre_de_tables, description, type_Evenement, places_Parking, user, images: { url: imageUrl } });
    console.log("Salle created:", salle);
    res.status(201).json(salle);
  } catch (error) {
    console.error("Error creating salle:", error);
    res.status(400).json({ message: error.message });
  }
};
// Modifier une Salle
export const updateSalle = async (req, res) => {
  const { id } = req.params;
  const userRole = res.locals.role;
  const userId = res.locals.userId;

  // Vérifier le rôle de l'utilisateur
  if (userRole !== "admin" && userRole !== "gerant") {
    console.log("Acces refuser. User role:", userRole);
    return res.status(403).json({ message: "Seuls les utilisateurs avec le rôle \"admin\" ou \"gerant\" peuvent modifier une salle." });
  }

  try {
    const salle = await Salle.findById(id);

    if (!salle) {
      return res.status(404).json({ message: "La salle n'a pas été trouvée." });
    }

    // Vérifier si l'utilisateur connecté est l'admin ou le gérant qui a créé la salle
    if (salle.user.toString() !== userId) {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier cette salle." });
    }

    const { nom, adresse, commune, wilaya, agrement, telephone, nombre_de_tables, description, places_Parking, type_Evenement } = req.body;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : salle.images.url;

    salle.nom = nom;
    salle.adresse = adresse;
    salle.commune = commune;
    salle.wilaya = wilaya;
    salle.agrement = agrement;
    salle.telephone = telephone;
    salle.nombre_de_tables = nombre_de_tables;
    salle.description = description;
    salle.places_Parking = places_Parking;
    salle.images.url = imageUrl;
    salle.type_Evenement = type_Evenement

    const updatedSalle = await salle.save();
    console.log("Salle updated:", updatedSalle);
    res.status(200).json(updatedSalle);
  } catch (error) {
    console.error("Error updating salle:", error);
    res.status(400).json({ message: error.message });
  }
};
// Supprimer une Salle
export const deleteSalle = async (req, res) => {
  try {
    const { id } = req.params;
    const salle = await Salle.findById(id);
    if (!salle) throw new Error('Salle introuvable');

    const userRole = res.locals.userRole; // Récupérer le rôle de l'utilisateur
    const userId = res.locals.userId; // Récupérer l'ID de l'utilisateur connecté

    // Vérifier si l'utilisateur connecté est l'admin ou le gérant qui a créé la salle
    if (userRole !== 'admin' && (userRole !== 'gerant' || salle.user !== userId)) {
      return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette salle." });
    }

    // Supprimer l'image associée si elle existe
    if (salle.images && salle.images.url) {
      const imagePath = salle.images.url.split('/images/')[1];
      fs.unlinkSync(`images/${imagePath}`);
    }

    await Salle.findByIdAndRemove(id);
    res.status(200).json({ message: 'Salle supprimée avec succès' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



  


