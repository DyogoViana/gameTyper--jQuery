// Placar.js


// Botão mostrar/esconder placar.
$("#botao-placar").click(mostrarPlacar);

// Pontuação do placar.
function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Jogador";
    var numeroPalavras = $("#contador-palavras").text();
    
    var linha = novaLinhaPlacar(usuario, numeroPalavras);
    linha.find(".botao-remover").click(removeLinhaPlacar);

    corpoTabela.append(linha);
}


// Botão mostrar/esconder placar
function mostrarPlacar() {
    $(".placar").slideToggle(600); // Valor de velocidade.
}


// Insere uma nova linha dos jogadores.
function novaLinhaPlacar(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
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
function removeLinhaPlacar() {
    var linhaPlacar = $(this).parent().parent();
    
    linhaPlacar.fadeOut(1000);

    setTimeout(function() {
        linhaPlacar.remove();
    }, 1000);

    event.preventDefault();
}