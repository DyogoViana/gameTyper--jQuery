// main.js


// Tempo inicial.
var tempoInicial = $("#tempo-digitacao").text();

// Campo de digitação;
var campo = $(".campo-digitacao");


// Carrega tudo quando a página for carregada. -- $(document).ready() -- nota no final.
$(function() {
    atualizaTamanhoFrase();
    iniciarContadores();
    iniciarCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciarJogo);
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
});


// Atualiza o tempo inicial.
function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}


// Atualiza o tamanho da frase. Modelo a ser escrito.
function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length; 
    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numeroPalavras);
}


// Iniciar contadores de palavras e caracteres.
function iniciarContadores() {
    campo.on("input", function() {
    
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
function iniciarCronometro() {
    campo.one("focus", function() {
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}


// Marcação da borda.
function inicializaMarcadores() {
    campo.on("input", function() {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        
        if (digitado == comparavel) {
            campo.addClass("bordaCampoCerto");
            campo.removeClass("bordaCampoErrado");
        } else {
            campo.addClass("bordaCampoErrado")
            campo.removeClass("bordaCampoCerto");
        }
    }); 
}


// Finaliza o jogo. Desabilita o campo de txt e coloca o fundo cinza.
function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}


// Botão de reiniciar o jogo.
function reiniciarJogo() {
    campo.attr("disabled", false);
    campo.val("");

    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);

    iniciarCronometro();

    campo.toggleClass("campo-desativado");
    campo.removeClass("bordaCampoErrado");
    campo.removeClass("bordaCampoCerto");
}





// Anexos ---------------------------------------------------------------------------------------------

// campo.one = executa apenas uma vez. Não entra em loop.
// on("click") = shorthand click()
// Quando passamos uma função dentro da função $() , estamos na verdade utilizando a função $(document).ready().