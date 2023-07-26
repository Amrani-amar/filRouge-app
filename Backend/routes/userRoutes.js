import express from 'express';
import * as salleController from '../controllers/salleController.js';
import * as userController from '../controllers/userController.js';
import { userAuthValidation } from '../middelwares/auth.js';
import multer from '../middelwares/config-multer.js'
import * as reservationController from '../controllers/reservationController.js'

const userRoutes = express.Router();

                          // Routes pour les utilisateurs
userRoutes.post("/users/register", userController.register);
userRoutes.post("/users/login", userController.login);
userRoutes.post("/users/logout", userController.logout);

userRoutes.get("/users", userAuthValidation,userController.getUsers);
userRoutes.get("/users/salles",userAuthValidation, userController.getSalles);
userRoutes.get("/users/reservation",userAuthValidation, userController.getReservation);

                            // Routes pour les salles
userRoutes.post('/salle', userAuthValidation,multer,salleController.createSalle);

userRoutes.get('/salle',userAuthValidation,salleController.getAllSalles);
userRoutes.get('/salle/:id',salleController.getSalleById);
userRoutes.get('/salleEnAttente',userAuthValidation,salleController.getSallesEnAttente);
userRoutes.get('/salleValidee',salleController.getSallesValidees);
userRoutes.get('/salleNonValidee',userAuthValidation,salleController.getSallesNonValidees);


userRoutes.put('/salle/:id',userAuthValidation,multer, salleController.updateSalle);
userRoutes.put('/salleVal/:id',userAuthValidation, salleController.validerSalle);
userRoutes.put('/refusersalle/:id',userAuthValidation, salleController.refuserSalle);

userRoutes.delete('/salle/:id',userAuthValidation,multer, salleController.deleteSalle);

userRoutes.get('/salle/:id/reservations/confirmees', userAuthValidation, reservationController.getReservationsConfirmées);
userRoutes.get('/salle/:id/reservations/enattente', userAuthValidation, reservationController.getReservationsEnAttente);
userRoutes.get('/salle/:id/reservations/annulees', userAuthValidation, reservationController.getReservationsAnnulees);


                               // Routes pour les réservations
userRoutes.post('/reservations/:id',userAuthValidation,reservationController.createReservation);

userRoutes.get('/salle/:id/reservations', userAuthValidation, reservationController.getReservationsBySalle);

userRoutes.put('/reservations/:reservationId', userAuthValidation, reservationController.confirmerReservationById);
userRoutes.put('/reservations/:reservationId/annuler',userAuthValidation, reservationController.annulerReservationById);

userRoutes.delete('/reservations/:reservationId', userAuthValidation, reservationController.supprimerReservationById);


userRoutes.get('/reservations/:reservationId', userAuthValidation, reservationController.getReservationById);

userRoutes.get('/salle/:id/reservations/confirmees', userAuthValidation, reservationController.getReservationsConfirmées);
userRoutes.get('/salle/:id/reservations/enattente', userAuthValidation, reservationController.getReservationsEnAttente);
userRoutes.get('/salle/:id/reservations/annulees', userAuthValidation, reservationController.getReservationsAnnulees);




export default userRoutes;
 