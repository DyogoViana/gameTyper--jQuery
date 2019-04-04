// main.js

// Modelo a ser escrito.
var frase = $(".frase").text ();
var numeroPalavras = frase.split (" ").length; 
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text (numeroPalavras);



// Campo de digitação;
var campo = $(".campo-digitacao");

campo.on ("input", function () {
    
    var conteudo = campo.val (); // Ler os value's.

    var conteudoSemEspaco = conteudo.replace(/\s+/g,''); // Exp. regular p/ n contar os espaços.

    // Contador de palavras.
    var quantidadePalavras = conteudo.split (/\s+/).length - 1; // Exp. regular p/ n contar os espaços.
    $("#contador-palavras").text (quantidadePalavras);

    // Contador de caracteres.
    var quantidadeCaracteres = conteudoSemEspaco.length;
    $("#contador-caracteres").text (quantidadeCaracteres);
});


// Cronômentro.
var tempoRestante = $("#tempo-digitacao").text();

campo.one ("focus", function () {

    var cronometroID = setInterval (function () {
        tempoRestante--;
        $("#tempo-digitacao").text (tempoRestante);
        
        if (tempoRestante < 1) {
            campo.attr ("disabled", true);
            clearInterval (cronometroID);
        }
    }, 1000);
});


// Anexos ---------------------------------------------------------------------------------------------

// campo.one = executa apenas uma vez. Não entra em loop.