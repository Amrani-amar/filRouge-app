import validator from "validator";
import bcrypt from "bcrypt";
import { createToken } from "../middelwares/auth.js";
import { User } from "../models/user.js";

// Obtenir tous les utilisateurs
export const getUsers = async (req, res) => {
  try {
    const userRole = res.locals.role; // Récupérer le rôle de l'utilisateur connecté

    if (userRole !== "admin") {
      throw new Error("Accès refusé. Vous devez être administrateur.");
    }

    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// S'enregistrer en tant qu'utilisateur
export const register = async (req, res) => {
  const { email, password, nom, prenom, role } = req.body;

  try {
    const newUser = await User.signup(email, password, nom, prenom, role);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Authentification et création du token
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Tous les champs sont requis !");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email invalide");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Utilisateur introuvable !");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new Error("Mot de passe incorrect");
    }

    // const authToken = createToken(user._id);
    const authToken = createToken(user._id, user.role);


    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 1000 * 3,
    });
    res.status(200).json({role:user.role});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Déconnexion de l'utilisateur
export const logout = (req, res) => {
  try {
    // Effacer le cookie d'authentification
    res.clearCookie("authToken");
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
  }
};
