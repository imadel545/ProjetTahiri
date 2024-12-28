document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const confirmationMessage = document.getElementById("confirmation");
  const errorMessage = document.getElementById("error");

  if (!form) {
    console.error("Formulaire introuvable.");
    return;
  }

  // Cacher les messages au chargement de la page
  confirmationMessage.style.display = "none";
  errorMessage.style.display = "none";

  // Gestionnaire d'événement pour le formulaire
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupère les valeurs des champs
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation des champs requis
    if (!name || !email || !message) {
      errorMessage.textContent = "Tous les champs requis doivent être remplis.";
      errorMessage.style.display = "block";
      confirmationMessage.style.display = "none";
      return;
    }

    console.log("Envoi des données :", { name, email, phone, message });

    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (response.ok) {
        // Affiche le message de confirmation
        confirmationMessage.textContent =
          "Votre message a été envoyé avec succès !";
        confirmationMessage.style.display = "block";
        errorMessage.style.display = "none";
        form.reset();

        // Cache le message après 3 secondes
        setTimeout(() => {
          confirmationMessage.style.display = "none";
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Erreur serveur :", errorData);
        errorMessage.textContent =
          errorData.message || "Une erreur est survenue. Veuillez réessayer.";
        errorMessage.style.display = "block";
        confirmationMessage.style.display = "none";
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      errorMessage.textContent =
        "Une erreur est survenue. Veuillez vérifier votre connexion.";
      errorMessage.style.display = "block";
      confirmationMessage.style.display = "none";
    }
  });

  // Gestion des liens actifs dans la barre de navigation
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
