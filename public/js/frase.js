// frase.js


// Botão para frases aleatórias.
$("#botao-frase").click(fraseAleatoria);

// Botão para buscar frases via id no servidor.
$("#botao-busca-id").click(buscaFrase);



// Frases aleatórias com spinner e mensagem de erro.
function fraseAleatoria() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(function() {
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

// Usuário escolhe a frase via ID.
function buscaFrase() {
    $("#spinner").toggle();

    var buscaViaId = $("#busca-id").val();
    var dados = {id: buscaViaId}; // Criacao do objeto JS que guarda a id.

    // Passsando objetos como segundo plano.
    $.get("http://localhost:3000/frases", dados, trocaFrase).fail(function() {
        $("#erro").toggle();

        setTimeout(function() {
            $("#erro").toggle();
        }, 3000);
    }).always(function() {
        $("#spinner").toggle();
    });
}

// Troca frase pelo id.
function trocaFrase(data) {
    var frase = $(".frase");

    frase.text(data.texto); // 'texto' por causa que tá assim no array do servidor.
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo); // 'tempo' por causa que tá assim no array do servidor.
}