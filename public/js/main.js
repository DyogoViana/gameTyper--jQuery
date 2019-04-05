// main.js

// Tempo inicial.
var tempoInicial = $("#tempo-digitacao").text();

// Carrega tudo quando a página for carregada. -- $(document).ready() -- nota no final.
$(function() {
    atualizaTamanhoFrase();
    iniciarContadores();
    iniciarCronometro();
    $("#botao-reiniciar").click(reiniciarJogo);
});



// Atualiza o tamanho da frase. Modelo a ser escrito.
function atualizaTamanhoFrase () {
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length; 
    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numeroPalavras);
}



// Campo de digitação;
var campo = $(".campo-digitacao");

// Iniciar contadores de palavras e caracteres.
function iniciarContadores () {
    campo.on ("input", function () {
    
        var conteudo = campo.val(); // Ler os value's.
        var conteudoSemEspaco = conteudo.replace(/\s+/g,''); // Exp. regular p/ n contar os espaços.
    
        // Contador de palavras.
        var quantidadePalavras = conteudo.split(/\s+/).length - 1; // Exp. regular p/ n contar os espaços.
        $("#contador-palavras").text(quantidadePalavras);
    
        // Contador de caracteres.
        var quantidadeCaracteres = conteudoSemEspaco.length;
        $("#contador-caracteres").text(quantidadeCaracteres);
    });    
}



// Cronômentro.
function iniciarCronometro () {
    var tempoRestante = $("#tempo-digitacao").text();

    campo.one ("focus", function () {
        $("#botao-reiniciar").attr("disabled", true);

        var cronometroID = setInterval (function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.addClass("campo-desativado");
                $("#botao-reiniciar").attr("disabled", false);
            }
        }, 1000);
    });
}



// Botão de reiniciar o jogo.
$("#botao-reiniciar").click (reiniciarJogo);

function reiniciarJogo () {
    campo.attr ("disabled", false);
    campo.val ("");

    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);

    iniciarCronometro();
}





// Anexos ---------------------------------------------------------------------------------------------

// campo.one = executa apenas uma vez. Não entra em loop.
// on("click") = shorthand click()
// Quando passamos uma função dentro da função $() , estamos na verdade utilizando a função $(document).ready().