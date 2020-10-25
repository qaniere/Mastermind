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
    element.preventDefault(); //Empecher l'action par défaut
    var data = element.dataTransfer.getData("text"); //On récuperer l'élement à ajouter
    element.target.appendChild(document.getElementById(data)); // On l'ajoute au bon endroit
}