// frase.js


// botão para frases aleatórias.
$("#botao-frase").click(fraseAleatoria);

// Frases aleatórias com spinner e mensagem de erro.
function fraseAleatoria() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(function(){
        $("#erro").toggle(); // Ao falhar, mostra mensagem de erro.

        setTimeout(function() {
            $("#erro").toggle();
        }, 3000);
    }).always(function() {
        $("#spinner").toggle();
    });
}

// Troca as frases aleatórias.
function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto); // Pega a primeira frase.
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo); //'tempo' pq tá assim no array do servidor.
}