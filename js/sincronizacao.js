(function() {
  'use strict';
  
  var usuario = 'franklindeoliveira@gmail.com';
  $('#sync').click(salvarCartoes);
  $.getJSON('https://ceep.herokuapp.com/cartoes/carregar?callback=?',
            {usuario, usuario},
            function(res){
              var cartoes = res.cartoes;
              console.log(cartoes.length + ' carregados em ' + res.usuario);
              cartoes.forEach(function(cartao) {
                controladorDeCartoes.adicionaCartao(cartao.conteudo, '');
              });
            });

  function salvarCartoes() {

    $('#sync').removeClass('botaoSync--sincronizado');
    $('#sync').addClass('botaoSync--esperando');

    var cartoes = [];
    $('.cartao').each(function() {
      var cartao = {};
      cartao.conteudo = $(this).find('.cartao-conteudo').html();
      cartoes.push(cartao);
    });
    // escolha seu nome de usuário aqui
    var mural = {
      usuario: usuario,
      cartoes: cartoes
    };

    $.ajax({
      url: 'https://ceep.herokuapp.com/cartoes/salvar',
      method: 'POST',
      data: mural,
      success: function(res) {
        $('#sync').addClass('botaoSync--sincronizado');
        console.log(res.quantidade + ' cartões salvos em ' + res.usuario);
      },
      error: function() {
        $('#sync').addClass('botaoSync--deuRuim');
        console.log('Não foi possível salvar o mural.');
      },
      complete: function() {
        $('#sync').removeClass('botaoSync--esperando');
      }
    });
  };
})();
