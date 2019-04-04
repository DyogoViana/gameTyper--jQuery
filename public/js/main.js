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

    // Contador de palavras.
    var quantidadePalavras = conteudo.split (/\S+/).length - 1; // Exp. regular p/ n contar os espaços.
    $("#contador-palavras").text (quantidadePalavras);

    // Contador de caracteres.
    var quantidadeCaracteres = conteudo.length;
    $("#contador-caracteres").text (quantidadeCaracteres);
});