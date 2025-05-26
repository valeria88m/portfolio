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
        style.href = 'assets/css/new.css'; // percorso corretto
        if (navbar) navbar.style.display = 'none';
        if (footer) footer.style.display = 'none';
    } else {
        style.href = 'assets/css/style.css'; // percorso corretto
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

    if (form) { // <-- aggiungi questo controllo!
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    form.reset();
                    thankYouMessage.style.display = "block";
                    setTimeout(() => {
                        alert("Messaggio inviato con successo!");
                        window.location.href = "index.html";
                    }, 4000);
                } else {
                    alert("Errore durante l'invio. Riprova.");
                }
            }).catch(error => {
                alert("Errore di rete. Controlla la connessione.");
            });
        });
    }
});