const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sMarca = document.querySelector('#m-marca')
const sDescricao = document.querySelector('#m-descricao')
const sValor = document.querySelector('#m-valor')
const btnSalvar = document.querySelector('#btnSalvar')

let itens // Armazena os itens do banco
let id // Armazena o id do item a ser editado
// Abrir modal
function openModal(edit = false, index = 0) {
  modal.classList.add('active')
// Se for edição
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sMarca.value = itens[index].marca
    sDescricao.value = itens[index].descricao
    sValor.value = itens[index].valor
    id = index
  } else {
    sNome.value = ''
    sMarca.value = ''
    sDescricao.value = ''
    sValor.value = ''
  }
  
}
// Editar item
function editItem(index) {

  openModal(true, index)
}
// Deletar item
function deleteItem(index) { //
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}
// Inserir item na tabela
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.marca}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.valor}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}
// Salvar item
btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sMarca.value == '' || sDescricao.value == '' || sValor.value == '') {
    return
  }


  e.preventDefault(); // Parar o evento padrão
// Se for edição
  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].marca = sMarca.value
    itens[id].descricao = sDescricao.value
    itens[id].valor = sValor.value
  } else {
    itens.push({'nome': sNome.value, 'marca': sMarca.value, 'descricao': sDescricao.value, 'valor': sValor.value})
  }

  setItensBD()
// console.log(itens)
  modal.classList.remove('active')
  loadItens()
  id = undefined
}

// Carregar itens do banco de dados
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [] // ?? = se não existir, retorna um array vazio
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens)) // JSON.stringify = converte um objeto em string

loadItens()
