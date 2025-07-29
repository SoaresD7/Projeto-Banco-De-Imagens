const API_URL = "http://localhost:8080/api/imagens";
const tabela = document.getElementById("tabelaImagens");

// Carrega imagens da API
async function carregarImagens() {
  tabela.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    const imagens = await res.json();
    imagens.forEach(img => adicionarLinha(img));
  } catch (err) {
    console.error("Erro ao carregar imagens:", err);
  }
}

function adicionarLinha({ id = "-", nome, url }) {
  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td class="px-4 py-2 text-center align-middle">${id}</td>
    <td class="px-4 py-2 text-center align-middle">${nome}</td>
    <td class="px-4 py-2 text-center align-middle">
      <img src="${url}" alt="Imagem de ${nome}" class="w-48 h-auto mx-auto rounded shadow"
           onerror="this.src='https://via.placeholder.com/100x100?text=Erro';" />
    </td>
    <td class="px-4 py-2 text-center align-middle">
      <button onclick="editarImagem(this)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Editar</button>
    </td>
    <td class="px-4 py-2 text-center align-middle">
      <button onclick="removerImagem(this)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remover</button>
    </td>
  `;
  tabela.appendChild(linha);
}



// Adiciona nova imagem
async function adicionarImagem(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const url = document.getElementById("url").value.trim();

  if (!nome || !url) return;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, url })
    });
    const novaImagem = await response.json();
    adicionarLinha(novaImagem);

    document.getElementById("imageForm").reset();
    Swal.fire("Sucesso", "Imagem adicionada!", "success");
  } catch (err) {
    console.error("Erro ao adicionar imagem:", err);
    Swal.fire("Erro", "Falha ao enviar imagem", "error");
  }
}

// Editar imagem
async function editarImagem(botao) {
  const linha = botao.closest("tr");
  const id = linha.children[0].textContent;
  const nomeAtual = linha.children[1].textContent;
  const urlAtual = linha.children[2].textContent;

  const { value: dados } = await Swal.fire({
    title: "Editar Imagem",
    html: `
      <input id="swal-nome" class="swal2-input" value="${nomeAtual}" placeholder="Nome">
      <input id="swal-url" class="swal2-input" value="${urlAtual}" placeholder="URL">
    `,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      const nome = document.getElementById("swal-nome").value.trim();
      const url = document.getElementById("swal-url").value.trim();
      if (!nome || !url) {
        Swal.showValidationMessage("Preencha todos os campos");
        return false;
      }
      return { nome, url };
    }
  });

  if (dados && id !== "-") {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
      linha.children[1].textContent = dados.nome;
      linha.children[2].innerHTML = `<a href="${dados.url}" target="_blank" class="text-blue-600 underline">${dados.url}</a>`;
      Swal.fire("Atualizado!", "A imagem foi atualizada.", "success");
    } catch (err) {
      console.error("Erro ao editar imagem:", err);
      Swal.fire("Erro", "Falha ao atualizar imagem", "error");
    }
  }
}

// Remover imagem
async function removerImagem(botao) {
  const linha = botao.closest("tr");
  const id = linha.children[0].textContent;

  const confirmacao = await Swal.fire({
    title: "Tem certeza?",
    text: "Essa imagem será removida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, remover",
    cancelButtonText: "Cancelar"
  });

  if (confirmacao.isConfirmed && id !== "-") {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      linha.remove();
      Swal.fire("Removido!", "Imagem excluída com sucesso.", "success");
    } catch (err) {
      console.error("Erro ao remover imagem:", err);
      Swal.fire("Erro", "Não foi possível remover a imagem", "error");
    }
  }
}

// Inicializa
carregarImagens();
