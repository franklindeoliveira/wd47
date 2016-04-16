var usuario = 'franklindeoliveira@gmail.com';
$.getJSON('https://ceep.herokuapp.com/cartoes/carregar?callback=?',
          {usuario, usuario},
          function(res){
            var cartoes = res.cartoes;
            console.log(cartoes.length + ' carregados em ' + res.usuario);
            cartoes.forEach(function(cartao) {
              adicionaCartao(cartao.conteudo, '');
            });
          });

// pega os botões
var $botoes = document.querySelectorAll('.opcoesDoCartao-remove');

for (var i = 0; i < $botoes.length; i++) {
  // adiciona o evento de clique em cada botão
  $botoes[i].addEventListener('click', removeCartao);
}

var $novoCartaoSalvar = document.querySelector('.novoCartao-salvar');
$novoCartaoSalvar.addEventListener('click', validaCartao);

document.querySelector('#mudaLayout').addEventListener('click', mudaLayout);

$('.novoCartao').submit(criaNovoCartao);

$('#busca').on('input', buscaCartao);

$('#sync').click(salvarCartoes);

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
    usuario: 'franklindeoliveira@gmail.com',
    cartoes: cartoes
  };

  $.ajax({
    url: 'https://ceep.herokuapp.com/cartoes/salvar',
    method: 'POST',
    data: mural,
    success: function(res) {
      $('#sync').addClass('botaoSync--sincronizado');
      console.log(res.quantidade + ' cartões salvos em ' + res.usuario + '.');
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

function decideTipoCartao(conteudo) {
  var quebras = conteudo.split('<br>').length;
}

function mudaLayout() {
  // pega o elemento com a class="mural"
  var $mural = document.querySelector(".mural");

  // tira o$('.novoCartao').submit(criarNovoCartao);u coloca a classe
  $mural.classList.toggle('mural--linhas');

  if ($mural.classList.contains('mural--linhas')) {
    this.textContent = 'Blocos';
  } else {
    this.textContent = 'Linhas';
  }
}

function removeCartao() {
  var $cartao = document.querySelector('#cartao_' + this.dataset.ref);

  // dá uma classe que faz ele sumir devagar
  $cartao.classList.add('cartao--some');

  // tira da página depois da animação
  setTimeout(function() {
    $cartao.remove();
  }, 500);
};

function criaNovoCartao(event) {
  var campoConteudo = $('.novoCartao-conteudo');
  var conteudo = campoConteudo.val().trim().replace(/\n/g, '<br>');

  if (conteudo) {
    adicionaCartao(conteudo, '#00ff00');
  }
  campoConteudo.val("");

  event.preventDefault();
};

function adicionaCartao(conteudo, cor) {
  var numeroDoCartao = $('.cartao').length + 1;

  // cria o botão de remove
  var botaoRemove = $('<button>').addClass('opcoesDoCartao-remove').attr('data-ref', numeroDoCartao).text('Remover').click(removeCartao);

  // cria a div de opções
  var opcoes = $('<div>').addClass('opcoesDoCartao').append(botaoRemove);

  var tipoCartao = decideTipoCartao(conteudo);

  var conteudoTag = $('<p>').addClass("cartao-conteudo").append(conteudo);
  $('<div>').addClass('cartao')
            .attr('id', 'cartao_' + numeroDoCartao)
            .append(opcoes)
            .append(conteudoTag)
            .css('background-color', cor)
            .prependTo('.mural');

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

function buscaCartao() {
  // Guarda o valor digitado, removendo espaços extras.
  var busca = $(this).val().trim();

  if (busca.length) {
    $('.cartao').hide().filter(function() {
      return $(this).find('.cartao-conteudo')
                    .text()
                    .match(new RegExp(busca, 'i'));
    }).show();
  } else {
    $('.cartao').show();
  }
}



// function getJSON(url, callback) {
//   console.log('Carregando dados do servidor: ' + url);
//   var cartoes = [
//     {'conteudo': 'texto', 'cor': 'azul'},
//     {'conteudo': 'texto', 'cor': 'azul'},
//     {'conteudo': 'texto', 'cor': 'azul'}];
//   callback(cartoes);
// };
//
// getJSON('www.api.com.br/cartoes', function(cartoes) {
//   console.log(cartoes);
// });
