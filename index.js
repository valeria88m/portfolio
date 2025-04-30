// Funzione per caricare la pagina
function loadPage(event) {
  event.preventDefault();
  
  const link = event.target.closest('a');
  const page = link?.getAttribute('data-page');

  if (!page) {
      console.error('Errore: data-page non trovato.');
      return;
  }

  const content = document.getElementById('dynamic-content');
  const navbar = document.querySelector('nav');
  const footer = document.querySelector('footer');


    // Funzione per caricare il contenuto dinamico
    const loadContent = (page, content, navbar, footer) => {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const mainContent = doc.querySelector('#dynamic-content') || doc.body;

                if (mainContent) {
                    content.innerHTML = mainContent.innerHTML;
                    updateStyles(page, navbar, footer);
                } else {
                    console.error('Errore: #dynamic-content non trovato nella pagina caricata.');
                }
            })
            .catch(error => console.error(`Errore nel caricamento della pagina ${page}:`, error));
    };

    // Funzione per aggiornare gli stili dinamici
    const updateStyles = (page, navbar, footer) => {
        // Rimuovi eventuali fogli di stile esistenti
        const existingStyle = document.getElementById('dynamic-style');
        if (existingStyle) existingStyle.remove();

        // Aggiungi il nuovo foglio di stile
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.id = 'dynamic-style';

        if (page === 'contatti.html') {
            style.href = 'new.css';
            if (navbar) navbar.style.display = 'none';
            if (footer) footer.style.display = 'none';
        } else {
            style.href = 'style.css';
            if (navbar) navbar.style.display = '';
            if (footer) footer.style.display = '';
        }

        document.head.appendChild(style);
    };

    // Carica il contenuto della pagina
    loadContent(page, content, navbar, footer);
}

// Funzione per gestire la classe 'active' dei link della navbar
const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
navbarLinks.forEach(item => {
    item.addEventListener('click', function () {
        navbarLinks.forEach(link => link.classList.remove('active')); // Rimuovi 'active' da tutti
        item.classList.add('active'); // Aggiungi 'active' al link cliccato
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const thankYouMessage = document.getElementById("thank-you-message");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Blocca il comportamento di invio predefinito
  
      const formData = new FormData(form);
  
      // Esegui il fetch con Formspree
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          form.reset(); // Reset del form dopo l'invio
          thankYouMessage.style.display = "block"; // Mostra il messaggio di successo
  
          // Visualizza l'alert e reindirizza dopo un delay di 4 secondi
          setTimeout(() => {
            alert("Messaggio inviato con successo!");
            window.location.href = "index.html"; // Puoi cambiare l'URL
          }, 4000);
        } else {
          alert("Errore durante l'invio. Riprova.");
        }
      }).catch(error => {
        alert("Errore di rete. Controlla la connessione.");
      });
    });
  });