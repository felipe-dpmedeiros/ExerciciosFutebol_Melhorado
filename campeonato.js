"use strict";
//Variáveis globais
var formCampeonato = document.getElementById("formCampeonato");
var tabelaCampeonato = document.getElementById("tbCampeonatos");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function atualizarTabela() {
    tabelaCampeonato.innerHTML = "";
    campeonatos.forEach((c) => {
        tabelaCampeonato.innerHTML += `
    <tr>
         <td class="text-white px-4">${c.nome}</td>
         <td class="text-white px-4">${c.categoria}</td>
         <td class="text-white">${c.tipo}</td>
         <td class="text-white">${c.dataInicio}</td>
         <td class="text-white">${c.dataFim}</td>
         <td>
         
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 inline-block" onclick="editarCampeonato(${c.id})"> Editar </button>
            <button class="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 inline-block" onclick="removerCampeonato(${c.id})"> Excluir </button>
         </td>
    </tr>
  `;
    });
}
function editarCampeonato(id) {
    const campeonato = campeonatos.find((c) => c.id == id);
    if (!campeonato)
        return;
    else {
        document.getElementById("nome").value = campeonato.nome;
        document.getElementById("categoria").value = campeonato.categoria;
        document.getElementById("tipo").value = campeonato.tipo;
        document.getElementById("dataInicio").value = campeonato.dataInicio;
        document.getElementById("dataFim").value = campeonato.dataFim;
        //findIndex Buscar index objeto
        const campIndex = campeonatos.findIndex((c) => c.id == id);
        alert("Edite nos campos e depois clique em cadastrar");
        //Validar se encontrou algum item
        if (campIndex !== -1) {
            //remover da lista
            campeonatos.splice(campIndex, 1);
        }
        salvarLocalStorage();
        atualizarTabela();
    }
}
function removerCampeonato(id) {
    const campIndex = campeonatos.findIndex((c) => c.id == id);
    //Validar se encontrou algum item
    if (campIndex !== -1) {
        //remover da lista
        campeonatos.splice(campIndex, 1);
        alert("Campeonato removido com sucesso!");
    }
    salvarLocalStorage();
    atualizarTabela();
}
function salvarLocalStorage() {
    let campeonatosSalvar = JSON.stringify(campeonatos);
    localStorage.setItem("campeonatos", campeonatosSalvar);
}
function salvar(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoCampeonato = {
        id: Date.now(),
        categoria: document.getElementById("categoria").value,
        dataFim: document.getElementById("dataFim").value,
        dataInicio: document.getElementById("dataInicio").value,
        nome: document.getElementById("nome").value,
        tipo: document.getElementById("tipo").value,
    };
    campeonatos.push(novoCampeonato);
    atualizarTabela();
    salvarLocalStorage();
    formCampeonato.reset();
    alert('Cadstrado com sucesso!');
}
formCampeonato.addEventListener("submit", salvar);
atualizarTabela();
