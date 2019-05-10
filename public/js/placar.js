// Placar.js


// Botão mostrar/esconder placar.
$("#botao-placar").click(mostrarPlacar);

// Botão de sicronização.
$("#botao-sicronizacao").click(sicronizaPlacar);


// Atualiza o placar assim que começa o jogo.
function atualizaPlacar() {
    $.get("http://localhost:3000/placar", function(data) {
        $(data).each(function() {
            var linha = novaLinhaPlacar(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinhaPlacar);
            $("tbody").append(linha);
        });
    }); 
}


// Pontuação do placar.
function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("usuarios").val();
    var numeroPalavras = $("#contador-palavras").text();
    
    var linha = novaLinhaPlacar(usuario, numeroPalavras);
    linha.find(".botao-remover").click(removeLinhaPlacar);

    corpoTabela.append(linha);

    $(".placar").slideDown(500);
    scrollPlacar();
}


// Sicroniza o placar.
function sicronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var pontuacao = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(pontuacao);
    });

    var dados = {
        placar: placar
    };

    // Enviar o placar pro servidor.
    $.post("http://localhost:3000/placar", dados, function() {
        console.log("Placar sicronizado com sucesso");
        $(".tooltip").tooltipster("open");
    }).fail(function() {
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sicronizar." );
    }).always(function() {
        setTimeout(function() {
            $(".tooltip").tooltipster("close");
        }, 1200);
    });
}


// Scrolla o placar ao fim do jogo e motra ao usuário.
function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate({scrolltop: posicaoPlacar + "px"}, 1000);
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


// Botão mostrar/esconder placar
function mostrarPlacar() {
    $(".placar").stop().slideToggle(600); // Valor de velocidade.
}





// Anotações:

// $(".placar").offset(); ---> mostra a distância do elemento na página, no caso, o placar.