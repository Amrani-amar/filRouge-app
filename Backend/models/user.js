import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["utilisateur", "admin", "gerant"],
    required: true
  }
});

userSchema.statics.signup = async function (email, password, nom, prenom, role) {
  console.log("ici sigup");
  if (!email || !password || !nom || !prenom || !role) {
    throw new Error('tous les champs sont requis !!');
  }

  if (!validator.isEmail(email)) {
    console.log("mail");
    throw new Error("email invalid !!");
  }

  if (!validator.isStrongPassword(password)) {
    console.log("password");
    throw new Error('entrez un mot de passe fort !!');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    console.log("exists");
    throw new Error('email existe deja !!');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  const newUser = await this.create({ email, password: hashedPassword, nom, prenom, role });

  console.log({ newUser });

  return newUser;
};

export const User = mongoose.model('User', userSchema);
export default User;




