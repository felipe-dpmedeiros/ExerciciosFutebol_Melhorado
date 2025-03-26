"use strict";

// Interface para definir a estrutura de um Time
interface Time {
    id: number;
    nome: string;
    nomeCurto: string;
}

// Funções para garantir typagem
function getElementByIdStrict<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Elemento com ID '${id}' não encontrado`);
    }
    return element as T;
}

// Variáveis globais com tipagem
const formTimes = getElementByIdStrict<HTMLFormElement>("formTime");
const tabelaTime = getElementByIdStrict<HTMLTableElement>("tbTimes");

// Array de times com tipagem
let times: Time[] = JSON.parse(localStorage.getItem("times") || "[]");

function atualizarTimes(): void {
    // Limpar conteúdo atual da tabela
    tabelaTime.innerHTML = "";

    // Adicionar linhas para cada time
    times.forEach((t: Time) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="text-white px-4">${t.nome}</td>
            <td class="text-white px-4">${t.nomeCurto}</td>
            <td>
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 inline-block" onclick="editarTime(${t.id})">Editar</button>
                <button class="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300 inline-block" onclick="removerTime(${t.id})">Excluir</button>
            </td>
        `;
        tabelaTime.appendChild(tr);
    });
}

function editarTime(id: number): void {
    const time = times.find((t: Time) => t.id === id);
    
    if (!time) {
        alert("Time não encontrado");
        return;
    }

    // Obter elementos de input com typagem segura
    const nomeInput = getElementByIdStrict<HTMLInputElement>("nome");
    const nomeCurtoInput = getElementByIdStrict<HTMLInputElement>("nomeCurto");
    alert("Edite nos campos e depois clique em cadastrar")

    // Preencher inputs com dados do time
    nomeInput.value = time.nome;
    nomeCurtoInput.value = time.nomeCurto;

    // Remover time atual da lista
    times = times.filter((t: Time) => t.id !== id);

    salvarLocalTimes();
    atualizarTimes();
}

function removerTime(id: number): void {
    // Filtrar times, removendo o time com o ID especificado
    times = times.filter((t: Time) => t.id !== id);

    salvarLocalTimes();
    atualizarTimes();
    alert("Time removido!");
}

function salvarLocalTimes(): void {
    localStorage.setItem("times", JSON.stringify(times));
}

function salvarTime(event: Event | null): void {
    // Prevenir comportamento padrão do formulário
    if (event) {
        event.preventDefault();
    }

    // Obter elementos de input com typagem segura
    const nomeInput = getElementByIdStrict<HTMLInputElement>("nome");
    const nomeCurtoInput = getElementByIdStrict<HTMLInputElement>("nomeCurto");

    // Criar novo time
    const novoTime: Time = {
        id: Date.now(),
        nome: nomeInput.value,
        nomeCurto: nomeCurtoInput.value
    };

    // Adicionar novo time à lista
    times.push(novoTime);

    atualizarTimes();
    salvarLocalTimes();

    // Limpar formulário
    formTimes.reset();
    
    alert('Cadastrado com sucesso!');
}

// Adicionar event listener com verificação de tipo
formTimes.addEventListener("submit", (event: Event) => salvarTime(event));

// Inicializar tabela
atualizarTimes();