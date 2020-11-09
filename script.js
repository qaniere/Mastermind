var ligneActuelle = 10; //On commence à remplir la dixième puis on descend
var derniereCase = null //La dernière case dont un jeton a été deplacée
var contenuLigne = [null, null, null, null];
var couleurs = ["Bleu", "Blanc", "Rouge", "Vert", "Jaune", "Orange", "Rose", "Violet"]

var listeTriee = couleurs.sort(() => Math.random() - 0.5)
var code = listeTriee.slice(0, 4);

var audioJeton = document.getElementById("bruitJeton");
var audioSolution = document.getElementById("bruitSolution");
var audioVictoire = document.getElementById("bruitVictoire");
var audioDefaite = document.getElementById("bruitDéfaite");

var utiliseFirefox = typeof InstallTrigger !== "undefined";
if(utiliseFirefox) {
    alert("ATTENTION : Le drag and drop ne fonctionne pas encore sur Firefox en raison d'une API différente.")
} 

MicroModal.init(); //Initilisation des fenêtres modales

function deplacement(element) {
    // Fonction qui est appellée quand on fait bouger un jeton du menu
    // element contient des informations comme les attributs html du jeton, ses coordonnées x et y
    element.dataTransfer.setData("text", element.target.id);
}

function autoriserDeposer(element) {
    // Fonction appellée quand on veut déposer un jeton sur élement. 
    // la fonction autorise le déplacement
    element.preventDefault();
}

function deposer(element) {

    var caseReception = element.path[0].id; //id de la case qui recoit un jeton
    var ligneJeton = parseInt(caseReception.slice(-2)); //La ligne sur laquelle on vient de poser le jeton*

    if(ligneJeton == ligneActuelle || caseReception == "poubelle") {

        element.preventDefault(); //Empecher l'action par défaut
        var jeton = element.dataTransfer.getData("text"); //On récupere l'élement à ajouter
        element.target.appendChild(document.getElementById(jeton)); // On l'ajoute au bon 
        var destination = document.getElementById(jeton.replace("menu", ""));
        
        var nouveauJeton = document.createElement("div");
        nouveauJeton.setAttribute("id", jeton);
        nouveauJeton.setAttribute("class", "caseJeton");
        nouveauJeton.setAttribute("draggable", "true");
        nouveauJeton.setAttribute("ondragstart", "deplacement(event)");
        destination.appendChild(nouveauJeton);
        //Création d'un nouveau jeton identique à celui déplacé, puis déplacement dans le menu

        audioJeton.play();

        if (origineJeton != null) {
            origineJeton.innerHTML = "";
        }

        if (caseReception == "poubelle") {
            document.getElementById("poubelle").innerHTML = "";
        }

        verification()
    }
}

function seSouvenir(caseJeton) {
    //Fonction appellée quand on retire un jeton d'une case
    //Si la case fait partie du plateau, on note son id pour pouvoir la retrouver plus tard
    origineJeton = !couleurs.includes(caseJeton.id) ? caseJeton : null;
}

function verification() {
    //Fonction qui vérifie le contenu de la ligne actuelle

    var ligne = document.getElementById(ligneActuelle); 
    var casesLigne = ligne.children;
    //Récupération des 4 cases jetons sous forme de liste 

    for(i = 0; i < 4; i++) {

        if (casesLigne[i].children.length != 0) {
        //Si la case est remplie
            var jeton = casesLigne[i].children[0].id.replace("menu", "");
            contenuLigne[i] = jeton;
            //On récupere la couleur du jeton présent grâce à son ID
        } else {
            contenuLigne[i] = null;
        }
    }

    if(!contenuLigne.includes(null)) {
    //Si la ligne est totalement remplie

        var bienPlace = 0;
        var bonneCouleur = 0;
        for(i = 0; i < 4; i++) {
            if (contenuLigne[i] == code[i]) {
                bienPlace++;
            } else if(code.includes(contenuLigne[i])){
                bonneCouleur++;
            }
        }
 
        if(bienPlace == 4) {
            $.confetti.start();
            bruitVictoire.play();
            for(i = 1; i <= 4; i++) {

                var idCaseSolution = "cs_" + i + "_" + ligneActuelle;
                var caseSolution = document.getElementById(idCaseSolution);
                //On récupere chaque case solution
                caseSolution.classList.add("caseSolutionBienPlace");
            }
        } else {
            
            for(i = 1; i <= 4; i++) {

                var idCaseSolution = "cs_" + i + "_" + ligneActuelle;
                var caseSolution = document.getElementById(idCaseSolution);
                //On récupere chaque case solution

                if(bienPlace != 0) {
                    caseSolution.classList.add("caseSolutionBienPlace");
                    bienPlace -= 1;
                } else if (bonneCouleur != 0) {
                    caseSolution.classList.add("caseSolutionBonneCouleur");
                    bonneCouleur -= 1;
                }
                //On ajoute les indices au fur et à mesure                 
            }
        
            ligneActuelle -=1;
            //On remonte d'une ligne
        
            if(ligneActuelle == 0) {
                audioDefaite.play();
                MicroModal.show("modal-defaite");
            } else {
                audioSolution.play();
            }
        }
    }
}

document.getElementById("rejouer").addEventListener("click", function() {
    document.location.reload()
});