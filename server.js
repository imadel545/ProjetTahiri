const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware pour parser les données du formulaire
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route pour servir le fichier index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route pour le formulaire de contact
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Nom : ${name}`);
  console.log(`Email : ${email}`);
  console.log(`Message : ${message}`);

  // Répondre avec un message de confirmation
  res
    .status(200)
    .json({ success: true, message: "Votre message a été reçu avec succès !" });
});

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      success: false,
      message: "Une erreur est survenue. Veuillez réessayer plus tard.",
    });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
