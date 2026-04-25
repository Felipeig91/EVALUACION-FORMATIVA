// Obtener el botón
let miBotón = document.getElementById("btn-ir-arriba");

// Cuando el usuario hace scroll hacia abajo, mostrar el botón
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        miBotón.style.display = "block";
    } else {
        miBotón.style.display = "none";
    }
}

// Cuando el usuario hace clic, volver al top suavemente
function volverArriba() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}


