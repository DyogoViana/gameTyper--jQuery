// frase.js


// botão para frases aleatórias.
$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/fraseXs", trocaFraseAleatoria).fail(function(){
        $("#erro").toggle(); // Ao falhar, mostra mensagem de erro.

        setTimeout(function(){
            $("#erro").toggle();
        }, 3000);
    });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto); // Pega a primeira frase.
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo); //'tempo' pq tá assim no array do servidor.
}