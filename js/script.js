window.addEventListener('load', start);

var globalNames = ['Guilherme Soares Cota', 'Kenzawin Adliz Pereira'];
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start() {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault(); // Evita que o formulário seja recarregado
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {

    var hasText = !!event.target.value && event.target.value.trim() !== ''; // Verificação, se o input estiver vazio torna a variavel false, senao true

    if (!hasText) {      
      if (event.key === 'Enter') {
        M.toast({ html: 'Preencha um nome.' });
      }
      clearInput();
      return;
    }

    if (event.key === 'Enter') {
      if (event.target.value.length >= 6) {
        if (isEditing) {
          updateName(event.target.value);
        }
        else {
          insertName(event.target.value);
        }
      }
      else {
        M.toast({ html: 'O neme deve conter no mínimo 6 letras.' })
        return;
      }

      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping)
  inputName.focus();
}

function render() {
  function createDelletButton(index) {
    function deleteName() {
      globalNames.splice(index, 1); // Eclui o elemento do vetor na posição index, exclui apenas 1
      M.toast({ html: 'Nome excluído com sucesso!' });
      render();
    }

    var button = document.createElement('button');
    var iconDelete = document.createElement('i');
    iconDelete.classList.add('material-icons');
    iconDelete.textContent = 'delete';
    button.classList.add('deleteButton', 'btn-floating', 'waves-effect', 'waves-light', 'red');
    button.classList.add('z-depth-2');
    button.appendChild(iconDelete);
    button.addEventListener('click', deleteName);

    return button;
  }

  function crateSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable', 'flow-text');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }


  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDelletButton(i);
    var span = crateSpan(currentName, i);


    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);

  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}