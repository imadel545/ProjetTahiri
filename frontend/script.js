document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const confirmationMessage = document.getElementById("confirmation");
  const errorMessage = document.getElementById("error");

  if (!form) {
    console.error("Form element not found");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupère les valeurs des champs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Form submitted", { name, email, message });

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        // Affiche le message de confirmation
        confirmationMessage.style.display = "block";
        errorMessage.style.display = "none";
        form.reset();

        // Cache le message après 3 secondes
        setTimeout(() => {
          confirmationMessage.style.display = "none";
        }, 3000);
      } else {
        throw new Error("Erreur lors de l'envoi des données.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Affiche le message d'erreur
      errorMessage.style.display = "block";
      confirmationMessage.style.display = "none";
    }
  });

  // Bouton de retour en haut de page
  const backToTopButton = document.createElement("button");
  backToTopButton.classList.add("back-to-top");
  backToTopButton.innerHTML = "↑";
  document.body.appendChild(backToTopButton);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
