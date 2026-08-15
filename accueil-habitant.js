/* ============================================================
   accueil-habitant.js
   L'habitant de la maison accueille l'apprenant sur sa page d'outil.
   - un message a la premiere visite, un autre aux retours
   - le son de porte se joue a la fermeture du popup, sauf si le son est coupe
   - accessible : focus piege, Echap, lecture par les lecteurs d'ecran
   Usage : <script src="accueil-habitant.js" data-outil="liste_taches"></script>
   ============================================================ */
(function () {
  "use strict";

  // ---- le son, a deposer a cote des pages ----
  var SON_ACCUEIL = "sting-habitant.mp3";   // bruit de porte qui se referme

  // chaque personnage a sa tete a une hauteur differente
  var CADRAGES = {
    habitantA: "38 26 46 46",
    habitantB: "38 26 46 46",
    habitantC: "38 54 46 46",
    habitantD: "34 10 54 54",
    habitantE: "38 22 46 46",
    habitantF: "38 28 46 46",
    habitantG: "38 28 46 46",
    habitantH: "38 26 46 46",
    habitantI: "38 24 46 46",
    habitantJ: "38 22 46 46",
    habitantK: "38 26 46 46",
    habitantN: "38 46 48 48",
    habitantO: "38 22 46 46"
  };

  // ---- les onze habitants et leurs messages ----
  var HABITANTS = {
    liste_taches: {
      symbole: "habitantA",
      nom: "Iléa",
      role: "exploratrice",
      premiere: "✅ Bienvenue chez moi ! Je suis Iléa, exploratrice de la planète Mnémosia.<br><br>Tu trouveras chez moi de quoi lister toutes tes tâches de révision et les cocher au fur et à mesure.<br><br>Rien ne t'échappera.",
      retour: "✅ Content de te revoir !<br><br>Tes tâches t'attendent. Prêt·e à en cocher quelques-unes ?"
    },
    agenda_revision: {
      symbole: "habitantB",
      nom: "Torvin",
      role: "pilote",
      premiere: "📅 Bienvenue chez moi ! Je suis Torvin, pilote des longues traversées.<br><br>Tu trouveras chez moi un agenda pour espacer tes révisions : J+1, J+3, J+7…<br><br>C'est cette régularité qui ancre les savoirs dans ta mémoire.",
      retour: "📅 Te revoilà à bord !<br><br>Ton agenda est prêt. On repart pour un tour ?"
    },
    planning_hebdomadaire: {
      symbole: "habitantC",
      nom: "Pixo",
      role: "droïde de service",
      premiere: "🗓️ Bienvenue chez moi ! Je suis Pixo, droïde d'organisation.<br><br>Tu trouveras chez moi un planning pour répartir tes révisions sur la semaine, matière par matière.<br><br>Un plan clair, c'est déjà la moitié du travail.",
      retour: "🗓️ Content de te revoir !<br><br>Ta semaine est à organiser. Je t'aide ?"
    },
    fiche_studiometrique: {
      symbole: "habitantD",
      nom: "Selen",
      role: "gardien",
      premiere: "📊 Bienvenue chez moi ! Je suis Selen, gardien des savoirs.<br><br>Tu trouveras chez moi de quoi recenser tes notions et repérer celles qui commencent à pâlir.<br><br>Mon rôle, c'est de veiller sur ta mémoire.",
      retour: "📊 Te revoilà parmi mes fiches !<br><br>Quelles notions veux-tu raviver aujourd'hui ?"
    },
    minuteur_visuel: {
      symbole: "habitantE",
      nom: "Orann",
      role: "sage",
      premiere: "⏳ Bienvenue chez moi ! Je suis Orann, le sage du temps.<br><br>Tu trouveras chez moi un minuteur pour travailler par cycles courts.<br><br>C'est ainsi qu'on reste concentré·e sans s'épuiser.",
      retour: "⏳ Encore là !<br><br>Prêt·e à lancer un nouveau cycle ?"
    },
    flashcards_conception: {
      symbole: "habitantF",
      nom: "Maya",
      role: "mécanicienne",
      premiere: "🃏 Bienvenue chez moi ! Je suis Maya, mécanicienne des cartes.<br><br>Tu trouveras chez moi de quoi fabriquer tes propres cartes de révision : la question devant, la réponse derrière.<br><br>Se tester soi-même, c'est la meilleure façon d'apprendre.",
      retour: "🃏 Te revoilà dans mon atelier !<br><br>On fabrique de nouvelles cartes ?"
    },
    carte_mentale_index: {
      symbole: "habitantG",
      nom: "Naïs",
      role: "éclaireur",
      premiere: "🌳 Bienvenue chez moi ! Je suis Naïs, éclaireur des chemins de pensée.<br><br>Tu trouveras chez moi de quoi organiser tes idées autour d'un sujet central, en branches et sous-branches.<br><br>Voir la structure d'un cours aide beaucoup à le retenir.",
      retour: "🌳 Te revoilà sur mes sentiers !<br><br>Quelle idée veux-tu explorer aujourd'hui ?"
    },
    sketchnote: {
      symbole: "habitantH",
      nom: "Véha",
      role: "veilleuse",
      premiere: "🎨 Bienvenue chez moi ! Je suis Véha, veilleuse des images.<br><br>Tu trouveras chez moi de quoi transformer tes notes en dessins, avec des icônes et des couleurs.<br><br>Ce que l'œil retient, l'esprit le garde plus longtemps.",
      retour: "🎨 Te revoilà dans mon atelier !<br><br>On sort les crayons ?"
    },
    memory: {
      symbole: "habitantI",
      nom: "Sylve",
      role: "botaniste",
      premiere: "🧩 Bienvenue chez moi ! Je suis Sylve, botaniste de la mémoire.<br><br>Tu trouveras chez moi un jeu de memory à créer avec tes propres notions.<br><br>En jouant, on mémorise sans même s'en rendre compte.",
      retour: "🧩 Te revoilà dans mon jardin !<br><br>On lance une nouvelle partie ?"
    },
    podcast: {
      symbole: "habitantJ",
      nom: "Céleste",
      role: "astronome",
      premiere: "🎙️ Bienvenue chez moi ! Je suis Céleste, astronome des voix.<br><br>Tu trouveras chez moi de quoi enregistrer ton cours et le réécouter.<br><br>Réviser avec les oreilles, c'est une autre façon d'apprendre.",
      retour: "🎙️ Te revoilà sous mon télescope !<br><br>Prêt·e pour un nouvel enregistrement ?"
    },
    grille_evaluation: {
      symbole: "habitantN",
      nom: "Naël",
      role: "jeune curieux",
      premiere: "📋 Bienvenue chez moi ! Je suis Naël, le curieux du village.<br><br>Tu trouveras chez moi une grille pour faire le point sur chaque notion du cours.<br><br>Savoir où tu en es, c'est déjà la moitié du chemin.",
      retour: "📋 Te revoilà !<br><br>On refait le point sur tes notions ?"
    },
    grille_metacognition: {
      symbole: "habitantO",
      nom: "Ombeline",
      role: "guérisseuse",
      premiere: "🔍 Bienvenue chez moi ! Je suis Ombeline, guérisseuse de Mnémosia.<br><br>Tu trouveras chez moi une grille pour réfléchir à ta façon d'apprendre : avant, pendant et après un exercice.<br><br>Comprendre comment on apprend, c'est apprendre mieux.",
      retour: "🔍 Te revoilà dans mon cabinet !<br><br>Prêt·e à analyser ta façon de travailler ?"
    },
    mots_croises: {
      symbole: "habitantK",
      nom: "Ferra",
      role: "forgeronne",
      premiere: "🔤 Bienvenue chez moi ! Je suis Ferra, forgeronne des mots.<br><br>Tu trouveras chez moi de quoi générer une grille de mots croisés à partir de tes notions clés.<br><br>Chercher un mot, c'est déjà le réviser.",
      retour: "🔤 Te revoilà à ma forge !<br><br>On façonne une nouvelle grille ?"
    }
  };

  // ---- reperer l'outil courant ----
  function outilCourant() {
    var s = document.currentScript || document.querySelector('script[data-outil]');
    if (s && s.dataset.outil) return s.dataset.outil;
    var f = window.location.pathname.split("/").pop().replace(".html", "");
    return f;
  }

  var cle = outilCourant();
  var habitant = HABITANTS[cle];
  if (!habitant) return;

  var CLE_VISITE = "habitant-visite-" + cle;

  // ---- le son, coupe si l'apprenant l'a demande ----
  function sonEstCoupe() {
    try { return sessionStorage.getItem("accueil-son-coupe") === "1"; } catch (e) { return false; }
  }
  function jouerSon() {
    if (sonEstCoupe()) return;
    try {
      var a = new Audio(SON_ACCUEIL);
      a.volume = 0.45;
      a.play().catch(function () { /* lecture auto bloquee : sans consequence */ });
    } catch (e) { /* fichier absent : on ignore */ }
  }

  // ---- construire le popup ----
  function construire(message) {
    var overlay = document.createElement("div");
    overlay.className = "habitant-overlay";
    overlay.id = "habitantOverlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "habitantMessage");

    overlay.innerHTML =
      '<div class="habitant-boite">' +
        '<div class="habitant-portrait" aria-hidden="true">' +
          '<svg viewBox="' + (CADRAGES[habitant.symbole] || "38 24 46 46") + '"><use href="#' + habitant.symbole + '" width="120" height="160"/></svg>' +
        '</div>' +
        '<p class="habitant-nom">' + habitant.nom + '<span class="habitant-role"> — ' + habitant.role + '</span></p>' +
        '<p class="habitant-message" id="habitantMessage">' + message + '</p>' +
        '<button type="button" class="habitant-fermer" id="habitantFermer">Commencer</button>' +
      '</div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  // ---- styles ----
  function injecterStyles() {
    if (document.getElementById("habitant-styles")) return;
    var st = document.createElement("style");
    st.id = "habitant-styles";
    st.textContent = [
      ".habitant-overlay{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;",
      "  background:rgba(10,16,30,0.72);padding:18px;opacity:0;transition:opacity 0.25s ease;}",
      ".habitant-overlay.visible{opacity:1;}",
      ".habitant-boite{background:#FFFFFF;border-radius:20px;padding:26px 24px 22px;max-width:400px;width:100%;",
      "  text-align:center;border:2px solid #0E1626;",
      "  box-shadow:inset 2px 2px 0 rgba(255,255,255,0.22),inset -2px -2px 0 rgba(0,0,0,0.12),0 14px 32px -8px rgba(0,0,0,0.55);}",
      ".habitant-portrait{width:104px;height:104px;margin:0 auto 12px;border-radius:50%;overflow:hidden;",
      "  border:3px solid #C9A96E;position:relative;",
      "  background:radial-gradient(circle at 34% 28%,#FFFEF8 0%,#F8ECD2 44%,#E4CFA0 78%,#C9A96E 100%);",
      "  box-shadow:0 4px 10px -2px rgba(0,0,0,0.4),inset 2px 2px 0 rgba(255,250,235,0.5),inset -2px -2px 0 rgba(90,70,40,0.35);}",
      ".habitant-portrait::after{content:'';position:absolute;inset:0;border-radius:50%;pointer-events:none;",
      "  box-shadow:inset 0 0 0 2px rgba(255,250,235,0.35),inset -3px -3px 8px rgba(90,70,40,0.28);}",
      ".habitant-portrait svg{width:100%;height:100%;display:block;position:relative;z-index:2;}",
      ".habitant-nom{font-size:18px;font-weight:800;color:#1F3864;margin:0 0 4px;}",
      ".habitant-role{font-size:14px;font-weight:600;color:#5A6B8C;font-style:italic;}",
      ".habitant-message{font-size:15px;line-height:1.55;color:#1F3864;margin:12px 0 18px;}",
      ".habitant-fermer{font-family:inherit;font-size:15px;font-weight:700;color:#FFFFFF;",
      "  background:linear-gradient(160deg,#2C4A7C 0%,#1F3864 55%,#16294D 100%);border:2px solid #0E1A30;",
      "  border-radius:999px;padding:11px 26px;cursor:pointer;min-height:44px;}",
      ".habitant-fermer:hover{filter:brightness(1.12);}",
      ".habitant-fermer:focus-visible{outline:3px solid #C9A96E;outline-offset:3px;}",
      "@media (prefers-reduced-motion: reduce){.habitant-overlay{transition:none;}}",
      "body.a11y-contrast .habitant-boite{background:#FFFFFF;border-color:#000000;}",
      "body.a11y-contrast .habitant-nom,body.a11y-contrast .habitant-message{color:#000000;}"
    ].join("\n");
    document.head.appendChild(st);
  }

  // ---- ouvrir et fermer ----
  var elementAvant = null;

  function ouvrir() {
    var premiere = true;
    try { premiere = localStorage.getItem(CLE_VISITE) !== "1"; } catch (e) {}
    try { localStorage.setItem(CLE_VISITE, "1"); } catch (e) {}

    injecterStyles();
    var overlay = construire(premiere ? habitant.premiere : habitant.retour);
    elementAvant = document.activeElement;
    requestAnimationFrame(function () { overlay.classList.add("visible"); });

    var bouton = document.getElementById("habitantFermer");
    setTimeout(function () { if (bouton) bouton.focus(); }, 80);

    bouton.addEventListener("click", fermer);
    overlay.addEventListener("click", function (ev) { if (ev.target === overlay) fermer(); });

    overlay.__surTouche = function (ev) {
      if (ev.key === "Escape") { fermer(); return; }
      if (ev.key !== "Tab") return;
      // piege le focus dans la fenetre
      var f = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var premierEl = f[0], dernierEl = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === premierEl) { ev.preventDefault(); dernierEl.focus(); }
      else if (!ev.shiftKey && document.activeElement === dernierEl) { ev.preventDefault(); premierEl.focus(); }
    };
    document.addEventListener("keydown", overlay.__surTouche);
  }

  function fermer() {
    var overlay = document.getElementById("habitantOverlay");
    if (!overlay) return;
    // la porte se referme : l'apprenant vient d'entrer chez l'habitant
    jouerSon();
    overlay.classList.remove("visible");
    if (overlay.__surTouche) document.removeEventListener("keydown", overlay.__surTouche);
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (elementAvant && elementAvant.focus) elementAvant.focus();
    }, 260);
  }

  // ---- le symbole du personnage doit exister dans la page ----
  function symbolePresent() {
    return !!document.getElementById(habitant.symbole);
  }

  function demarrer() {
    if (!symbolePresent()) return;   // sans le dessin, pas de popup

    // Le message ne s'affiche qu'une fois par session, pour ne pas lasser.
    // Le bruit de porte, lui, se joue a chaque arrivee : l'apprenant entre
    // chez l'habitant, la porte se referme derriere lui a chaque fois.
    var CLE_SESSION = "habitant-vu-" + cle;
    var dejaVu = false;
    try { dejaVu = sessionStorage.getItem(CLE_SESSION) === "1"; } catch (e) {}
    try { sessionStorage.setItem(CLE_SESSION, "1"); } catch (e) {}

    if (dejaVu) {
      // sans popup, la porte se referme quand meme. Le navigateur exige une
      // interaction prealable : on attend donc le premier geste de l'apprenant.
      var refermee = false;
      var refermer = function () {
        if (refermee) return;
        refermee = true;
        jouerSon();
        document.removeEventListener("pointerdown", refermer);
        document.removeEventListener("keydown", refermer);
      };
      jouerSon();   // on tente d'abord directement
      document.addEventListener("pointerdown", refermer, { once: true });
      document.addEventListener("keydown", refermer, { once: true });
      return;
    }

    ouvrir();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
