// main.js

// Tempo inicial.
var tempoInicial = $("#tempo-digitacao").text();

// Carrega tudo quando a página for carregada. -- $(document).ready() -- nota no final.
$(function() {
    atualizaTamanhoFrase();
    iniciarContadores();
    iniciarCronometro();
    inicializaMarcadores();
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
        // $("#botao-reiniciar").attr("disabled", true);

        var cronometroID = setInterval (function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.addClass("campo-desativado");
                // $("#botao-reiniciar").attr("disabled", false);
            }
        }, 1000);
    });
}



// Marcação da borda.
function inicializaMarcadores() {
    var frase = $(".frase").text();

    campo.on ("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr (0, digitado.length);
        
        if (digitado == comparavel) {
            campo.addClass ("bordaCampoCerto");
            campo.removeClass ("bordaCampoErrado");
        } else {
            campo.addClass ("bordaCampoErrado")
            campo.removeClass ("bordaCampoCerto");
        }
    }); 
}



// Pontuação do placar.
function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Seu-nome";
    var numeroPalavras = $("contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";

    var linha = novaLinhaPlacar(usuario, numeroPalavras);
    linha.find(".botao-remover").click(removeLinhaPlacar);

    corpoTabela.prepend(linha);
}



// Insere uma nova linha dos jogadores.
function novaLinhaPlacar(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href", "#");
    var icone =$("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td>'s dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}



// Botão de remover a pontuação do jogador.
function removeLinhaPlacar (event) {
    event.preventDefault();
    $(this).parent().parent().remove();
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
    campo.toggleClass("campo-desativado");

    campo.removeClass ("bordaCampoErrado");
    campo.removeClass ("bordaCampoCerto");
}





// Anexos ---------------------------------------------------------------------------------------------

// campo.one = executa apenas uma vez. Não entra em loop.
// on("click") = shorthand click()
// Quando passamos uma função dentro da função $() , estamos na verdade utilizando a função $(document).ready().