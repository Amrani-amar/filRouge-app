import Reservation from '../models/reservation.js';
import Salle from '../models/salles.js'; 


// Créer une Réservation
export const createReservation = async (req, res) => {
  const { nom, prenom, telephone, dateDebut, dateFin } = req.body;
  const salleId = req.params.id; // Récupération de l'ID de la salle depuis les paramètres de la requête
  const utilisateurId = res.locals.userId; // Récupération de l'ID de l'utilisateur connecté

  console.log('Données de la réservation :');
  console.log('Nom :', nom);
  console.log('Prénom :', prenom);
  console.log('Date de début :', dateDebut);
  console.log('Date de fin :', dateFin);
  console.log('ID de la salle :', salleId);
  console.log('ID d utilisateur :', utilisateurId);

  // if (d < f) {
  //   res.status(400).json("date fin > d") 
  //   return
  // }

  // Vérifier la disponibilité de la salle
  const isSalleOccupied = await Reservation.exists({
    salle: salleId,
    dateDebut: { $lt: dateFin },
    dateFin: { $gt: dateDebut }
  });

  console.log('La salle est occupée :', isSalleOccupied);

  if (isSalleOccupied) {
    return res.status(409).json({ message: 'La salle est déjà réservée pour les dates spécifiées.' });
  }

  try {
    const reservation = await Reservation.create({
      nom,
      prenom,
      telephone,
      salle: salleId,
      dateDebut,
      dateFin,
      utilisateur: utilisateurId
    });

    console.log('Réservation créée :', reservation);

    res.status(201).json(reservation);
  } catch (error) {
    console.log('Erreur lors de la création de la réservation :', error);

    res.status(400).json({ message: error.message });
  }
};
// Récuperer les reservations d'une salle
export const getReservationsBySalle = async (req, res) => {
  try {
    const salleId = req.params.id;
    const utilisateurId = res.locals.userId; // Récupération de l'ID de l'utilisateur connecté (gérant)

    console.log("Salle ID:", salleId);
    console.log("ID de l'utilisateur connecté :", utilisateurId);

    // Vérifier si l'utilisateur connecté est le gérant de la salle
    const salle = await Salle.findOne({ _id: salleId, user: utilisateurId });
    if (!salle) {
      console.log("Salle non trouvée ou non autorisée pour l'utilisateur connecté.");
      return res.status(403).json({ message: "Non autorisé à accéder aux réservations de cette salle." });
    }

    console.log("Salle trouvée :", salle);

    // Récupérer les réservations de la salle spécifique
    const reservations = await Reservation.find({ salle: salleId });

    console.log("Réservations trouvées :", reservations);

    return res.json(reservations);
  } catch (error) {
    console.log("Erreur lors de la récupération des réservations :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des réservations." });
  }
};
// Recuperer une Reservation par id
export const getReservationById = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const utilisateurId = res.locals.userId; // Récupération de l'ID de l'utilisateur connecté

    console.log("ID de la réservation :", reservationId);
    console.log("ID de l'utilisateur connecté :", utilisateurId);

    // Recherche de la réservation par son ID
    const reservation = await Reservation.findById(reservationId).populate('salle');

    if (!reservation) {
      console.log("Réservation introuvable.");
      return res.status(404).json({ message: "Réservation introuvable." });
    }

    console.log("Réservation trouvée :", reservation);

    // Vérification si l'utilisateur est autorisé à accéder à la réservation
    const salleId = reservation.salle._id;

    // Vérification si l'utilisateur est le gérant de la salle associée à la réservation
    const salle = await Salle.findOne({ _id: salleId, user: utilisateurId });

    if (!salle) {
      console.log("Accès refusé. Vous n'êtes pas autorisé à accéder à cette réservation.");
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas autorisé à accéder à cette réservation." });
    }

    console.log("Accès autorisé. Utilisateur est le gérant de la salle.");

    // Si nécessaire, vous pouvez également vérifier si l'utilisateur est le créateur de la réservation
    // ...

    return res.json(reservation);
  } catch (error) {
    console.log("Erreur lors de la récupération de la réservation :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération de la réservation." });
  }
};
// Recuperer les Réservation CONFIRMEES
export const getReservationsConfirmées = async (req, res) => {
  try {
    const salleId = req.params.id;
    const utilisateurId = res.locals.userId; // Récupération de l'ID de l'utilisateur connecté (gérant)

    console.log("Salle ID:", salleId);
    console.log("ID de l'utilisateur connecté :", utilisateurId);

    // Vérifier si l'utilisateur connecté est le gérant de la salle
    const salle = await Salle.findOne({ _id: salleId, user: utilisateurId });
    if (!salle) {
      console.log("Salle non trouvée ou non autorisée pour l'utilisateur connecté.");
      return res.status(403).json({ message: "Non autorisé à accéder aux réservations de cette salle." });
    }

    console.log("Salle trouvée :", salle);

    // Récupérer les réservations confirmées de la salle spécifique
    const reservationsConfirmees = await Reservation.find({ salle: salleId, statut: "Confirmée" });

    console.log("Réservations confirmées trouvées :", reservationsConfirmees);

    return res.json(reservationsConfirmees);
  } catch (error) {
    console.log("Erreur lors de la récupération des réservations confirmées :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des réservations confirmées." });
  }
};
// Recuperer les Réservation En Attente
export const getReservationsEnAttente = async (req, res) => {
  try {
    const salleId = req.params.id;
    const utilisateurId = res.locals.userId; // Récupération de l'ID de l'utilisateur connecté (gérant)

    console.log("Salle ID:", salleId);
    console.log("ID de l'utilisateur connecté :", utilisateurId);

    // Vérifier si l'utilisateur connecté est le gérant de la salle
    const salle = await Salle.findOne({ _id: salleId, user: utilisateurId });
    if (!salle) {
      console.log("Salle non trouvée ou non autorisée pour l'utilisateur connecté.");
      return res.status(403).json({ message: "Non autorisé à accéder aux réservations de cette salle." });
    }

    console.log("Salle trouvée :", salle);

    // Récupérer les réservations en attente de la salle spécifique
    const reservationsEnAttente = await Reservation.find({ salle: salleId, statut: "En attente" });

    console.log("Réservations en attente trouvées :", reservationsEnAttente);

    return res.json(reservationsEnAttente);
  } catch (error) {
    console.log("Erreur lors de la récupération des réservations en attente :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des réservations en attente." });
  }
};
// Recuperer les Réservation ANNULEES
export const getReservationsAnnulees = async (req, res) => {
  try {
    const salleId = req.params.id;
    const utilisateurId = res.locals.userId;

    console.log("Salle ID:", salleId);
    console.log("ID de l'utilisateur connecté :", utilisateurId);

    const salle = await Salle.findOne({ _id: salleId, user: utilisateurId });
    if (!salle) {
      console.log("Salle non trouvée ou non autorisée pour l'utilisateur connecté.");
      return res.status(403).json({ message: "Non autorisé à accéder aux réservations de cette salle." });
    }

    console.log("Salle trouvée :", salle);

    const reservations = await Reservation.find({ salle: salleId, statut: "Annulée" });

    console.log("Réservations annulées trouvées :", reservations);

    return res.json(reservations);
  } catch (error) {
    console.log("Erreur lors de la récupération des réservations annulées :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des réservations annulées." });
  }
};
// CONFIRMER UNE RESRVATION
export const confirmerReservationById = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const userId = res.locals.userId;

    // verifier le role de l'utilisateur
    const userRole = res.locals.role;
    console.log('le role :', userRole);
    
    if (userRole !== 'gerant') {
      throw new Error('acces  refusé. Seul le gerant peut confirmer la réservation.');
    }

    // chercher la réservation par ID
    const reservation = await Reservation.findById(reservationId).populate('salle');
    console.log('réservation trouvéee:', reservation);
    if (!reservation) {
      throw new Error('réservation introuvable.');
    }

    // verifier si l'utilisateur connecté est le gerant de la salle associée à la réservation
    console.log('ID utilisateur connecté:', userId);
    console.log('ID du gérant de la salle:', reservation.salle.user.toString());
    if (reservation.salle.user.toString() !== userId) {
      throw new Error('Accès refusé.NON autorisé à confirmer cette réservation.');
    }

    // verifier si la salle associée à la réservation a été validée
    if (reservation.salle.statut !== 'validée') {
      throw new Error('La salle associée à cette réservation n\'a pas été validée.');
    }

    // Mettre à jour le statut de la réservation en "Confirmée"
    reservation.statut = 'Confirmée';
    await reservation.save();

    console.log('Réservation confirmée:', reservation);

    res.status(200).json({ message: 'La réservation a été confirmée avec succès', reservation });
  } catch (error) {
    console.error('Erreur lors de la confirmation de la réservation:', error);
    res.status(500).json({ message: error.message });
  }
};
//ANNULER UNE RESREVATION
export const annulerReservationById = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const userId = res.locals.userId;

    const reservation = await Reservation.findById(reservationId).populate('salle');
    console.log('Réservation trouvée:', reservation);
    if (!reservation) {
      throw new Error('Réservation introuvable.');
    }

    console.log('ID de l\'utilisateur connecté:', userId);
    console.log('ID du gérant de la salle:', reservation.salle.user.toString());
    console.log('ID de l\'utilisateur qui a créé la réservation:', reservation.utilisateur.toString());

    if (reservation.salle.user.toString() !== userId && reservation.utilisateur.toString() !== userId) {
      throw new Error('Accès refusé. Vous n\'êtes pas autorisé à annuler cette réservation.');
    }

    reservation.statut = 'Annulée';
    await reservation.save();

    console.log('Réservation annulée:', reservation);

    res.status(200).json({ message: 'La réservation a été annulée avec succès', reservation });
  } catch (error) {
    console.error('Erreur lors de l\'annulation de la réservation:', error);
    res.status(500).json({ message: error.message });
  }
};
// Suprimer une reservation
export const supprimerReservationById = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const userId = res.locals.userId;

    const reservation = await Reservation.findById(reservationId).populate('salle');
    console.log('Réservation trouvée:', reservation);
    if (!reservation) {
      throw new Error('Réservation introuvable.');
    }

    console.log('ID de l\'utilisateur connecté:', userId);
    console.log('ID du gérant de la salle:', reservation.salle.user.toString());
    console.log('ID de l\'utilisateur qui a créé la réservation:', reservation.utilisateur.toString());

    if (reservation.salle.user.toString() !== userId && reservation.utilisateur.toString() !== userId) {
      throw new Error('Accès refusé. Vous n\'êtes pas autorisé à supprimer cette réservation.');
    }

    await Reservation.findByIdAndRemove(reservationId);

    console.log('Réservation supprimée avec succès.');

    res.status(200).json({ message: 'La réservation a été supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la réservation:', error);
    res.status(500).json({ message: error.message });
  }
};



