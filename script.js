var ligneActuelle = 10;
//On commence à remplir la dixième puis on descend

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
    var ligneJeton = parseInt(caseReception.slice(-2)); //La ligne sur laquelle on vient de poser le jeton

    if(ligneJeton == ligneActuelle) {

        element.preventDefault(); //Empecher l'action par défaut
        var jeton = element.dataTransfer.getData("text"); //On récuperer l'élement à ajouter
        element.target.appendChild(document.getElementById(jeton)); // On l'ajoute au bon endroit
        var destination = document.getElementById(jeton.replace("menu", ""));
    }

}
