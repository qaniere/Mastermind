var ligneActuelle = 10; //On commence à remplir la dixième puis on descend
var derniereCase = null //La dernière case dont un jeton a été deplacée
var code = ["Bleu", "Blanc", "Rouge", "Vert"]
var couleurs = ["Bleu", "Blanc", "Rouge", "Vert", "Jaune", "Orange", "Blanc", "Rose", "Violet"]

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

        if (origineJeton != null) {
            origineJeton.innerHTML = "";
        }

        if (caseReception == "poubelle") {
            document.getElementById("poubelle").innerHTML = "";
        }

        //PROCESS A APPLIQUER :
        // 1 - Récupération du numéro de case (1 à 4) 
        // 2 - moins 1 pour correspondre à la liste
        // 3 - Si les 4 jetons sont entrés, vérification d'égalité avec le code
        // 4 - Sinon, comparaison case par case et incrémantation compteur si égalité, si bonne couleur
    }
}

function seSouvenir(caseJeton) {
    //Fonction appellée quand on retire un jeton d'une case
    //Si la case fait partie du plateau, on note son id pour pouvoir la retrouver plus tard
    origineJeton = !couleurs.includes(caseJeton.id) ? caseJeton : null;
}
