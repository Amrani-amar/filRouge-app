import multer from 'multer';

// Définition des types de fichiers acceptés et de leurs extensions associées
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
};

// Configuration de l'emplacement où les fichiers seront stockés et de leur nom
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // stockage dans le dossier 'images'
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Remplacement des espaces dans le nom de fichier par des underscores
    const extension = MIME_TYPES[file.mimetype]; // Récupération de l'extension correspondante au type MIME du fichier
    callback(null, name + Date.now() + '.' + extension); // Création d'un nom de fichier unique en ajoutant la date courante
  }
});

// Exportation de la configuration Multer sous forme de middleware et spécification du champ "image"
export default multer({ storage: storage }).single('image');
