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
  var conteudo = campoConteudo.val().trim();

  if (conteudo) {

    var numeroDoCartao = $('.cartao').length + 1;

    // cria o botão de remove
    var botaoRemove = $('<button>').addClass('opcoesDoCartao-remove').attr('data-ref', numeroDoCartao).text('Remover').click(removeCartao);

    // cria a div de opções
    var opcoes = $('<div>').addClass('opcoesDoCartao').append(botaoRemove);

    var conteudoTag = $('<p>').addClass("cartao-conteudo").append(conteudo);
    $('<div>').addClass('cartao').attr('id', 'cartao_' + numeroDoCartao).append(opcoes).append(conteudoTag).prependTo('.mural');
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
