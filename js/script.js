/* ==========================================================================
   Effet "machine à écrire" — Portfolio de Kylian Prebost
   Fait défiler les compétences sous le nom : écrit, efface, écrit la suivante.
   ========================================================================== */
(function () {
    var element = document.getElementById("texte-machine");
    if (!element) {
        return;
    }

    var phrases = [
        "Étudiant en BUT R&T",
        "Administrateur Réseaux",
        "Développeur Web"
    ];

    // Accessibilité : si l'utilisateur préfère moins de mouvement,
    // on affiche simplement la première phrase, sans animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        element.textContent = phrases[0];
        return;
    }

    var indexPhrase = 0;
    var indexLettre = 0;
    var suppression = false;

    var VITESSE_ECRITURE = 70;    // ms entre chaque lettre tapée
    var VITESSE_SUPPRESSION = 38; // ms entre chaque lettre effacée
    var PAUSE_FIN = 1900;         // pause quand la phrase est complète
    var PAUSE_DEBUT = 350;        // pause avant de taper la suivante

    function taper() {
        var phrase = phrases[indexPhrase];

        if (!suppression) {
            indexLettre++;
            element.textContent = phrase.slice(0, indexLettre);

            if (indexLettre === phrase.length) {
                suppression = true;
                setTimeout(taper, PAUSE_FIN);
                return;
            }
            setTimeout(taper, VITESSE_ECRITURE);
        } else {
            indexLettre--;
            element.textContent = phrase.slice(0, indexLettre);

            if (indexLettre === 0) {
                suppression = false;
                indexPhrase = (indexPhrase + 1) % phrases.length;
                setTimeout(taper, PAUSE_DEBUT);
                return;
            }
            setTimeout(taper, VITESSE_SUPPRESSION);
        }
    }

    setTimeout(taper, 400);
})();
