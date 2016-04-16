var criaOpcoesDoCartao = (function() {
  'use strict'

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

  return function(idNovoCartao) {
    var botaoRemove = $('<button>').addClass('opcoesDoCartao-remove')
                                   .addClass('opcoesDoCartao-opcao')
                                   .attr('data-ref', idNovoCartao)
                                   .text('Remover')
                                   .click(removeCartao);

    var opcoes = $('div').addClass('opcoesDoCartao')
                         .append(botaoRemove);

    return opcoes;
  }

})();
