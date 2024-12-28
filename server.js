const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware pour parser les données du formulaire
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, "frontend")));

// Route pour servir la page HTML principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Route pour gérer le formulaire de contact
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validation des champs
  if (!name || !email || !message) {
    console.error("Erreur : Champs obligatoires manquants.");
    return res.status(400).json({
      success: false,
      message: "Tous les champs obligatoires doivent être remplis.",
    });
  }

  // Affichage des données reçues
  console.log(`Nom: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Téléphone: ${phone}`);
  console.log(`Message: ${message}`);

  // Réponse de succès
  res.status(200).json({
    success: true,
    message: "Votre message a été envoyé avec succès.",
  });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.stack);
  res.status(500).json({
    success: false,
    message: "Une erreur est survenue. Veuillez réessayer plus tard.",
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
