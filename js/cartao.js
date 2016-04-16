var controladorDeCartoes = (function() {
  'use strict';

  // pega os botões
  var $botoes = document.querySelectorAll('.opcoesDoCartao-remove');

  for (var i = 0; i < $botoes.length; i++) {
    // adiciona o evento de clique em cada botão
    $botoes[i].addEventListener('click', removeCartao);
  }

  var $novoCartaoSalvar = document.querySelector('.novoCartao-salvar');
  $novoCartaoSalvar.addEventListener('click', validaCartao);

  $('.novoCartao').submit(criaNovoCartao);

  function criaNovoCartao(event) {
    var campoConteudo = $('.novoCartao-conteudo');
    var conteudo = campoConteudo.val().trim().replace(/\n/g, '<br>');

    if (conteudo) {
      adicionaCartao(conteudo, '#00ff00');
      $(document).trigger('precisaSincronizar');
    }
    campoConteudo.val("");

    event.preventDefault();
  };

  function validaCartao(event) {
    // limpa os erros de validações anteriores
    if (document.getElementsByClassName('error').length > 0) {
      document.getElementsByClassName('error')[0].remove(0);
    }

    if (!document.querySelector('.novoCartao-conteudo').value) {
      $error = document.createElement('span');
      $error.textContent = "Digite um valor no campo acima.";
      $error.classList.add("error");
      this.parentNode.insertBefore($error, this);

      event.preventDefault();
    }
  };

  function removeCartao() {
    var $cartao = document.querySelector('#cartao_' + this.dataset.ref);

    // dá uma classe que faz ele sumir devagar
    $cartao.classList.add('cartao--some');

    // tira da página depois da animação
    setTimeout(function() {
      $cartao.remove();
      $(document).trigger('precisaSincronizar');
    }, 500);
  };

  function adicionaCartao(conteudo, cor) {
    var numeroDoCartao = $('.cartao').length + 1;

    // cria o botão de remove
    var botaoRemove = $('<button>').addClass('opcoesDoCartao-remove')
                                   .attr('data-ref', numeroDoCartao)
                                   .text('Remover')
                                   .click(removeCartao);

    // cria a div de opções
    var opcoes = criaOpcoesDoCartao(numeroDoCartao);

  var tipoCartao = decideTipoCartao(conteudo);

  var conteudoTag = $('<p>').addClass("cartao-conteudo").append(conteudo);

  $('<div>').addClass('cartao')
            .attr('id', 'cartao_' + numeroDoCartao)
            .append(opcoes)
            .append(conteudoTag)
            .css('background-color', cor)
            .prependTo('.mural');

  };

  function decideTipoCartao(conteudo) {
    var quebras = conteudo.split('<br>').length;
    var totalDeLetras = conteudo.split(/<br>/g, ' ').length;

    var ultimoMaior = '';
    conteudo.replace(/<br>/g, ' ')
            .split(' ')
            .forEach(function(palavra) {
              if (palavra.length > ultimoMaior.length) {
                ultimoMaior = palavra;
              }
            });
    var tamanhoMaior = ultimoMaior.length;

    // no mínimo, todo cartão tem o texto pequeno
    var tipoCartao = 'cartao--textoPequeno';

    if (tamanhoMaior < 9 && quebras < 5 && totalDeLetras < 55) {
      tipoCartao = 'cartao--textoGrande';
    } else if (tamanhoMaior < 12 && quebras < 6 && totalDeLetras < 75) {
      tipoCartao = 'cartao--textoMedio';
    }

    return tipoCartao;

  };

  return {
    adicionaCartao: adicionaCartao,
    removeCartao: removeCartao
  };
})();
