(function() {
  'use strict';
  
  document.querySelector('#mudaLayout').addEventListener('click', mudaLayout);

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
})();
