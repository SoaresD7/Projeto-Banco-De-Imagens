const API_URL = "http://localhost:3000/imagens"; // Altere conforme a URL da sua API
const galeria = document.getElementById("galeria");
const form = document.getElementById("imageForm");

// Carregar imagens da API
async function carregarImagens() {
  galeria.innerHTML = "";
  const res = await fetch(API_URL);
  const imagens = await res.json();

  imagens.forEach(img => {
    const div = document.createElement("div");
    div.className = "bg-white rounded shadow p-2 flex flex-col items-center";

    div.innerHTML = `
      <img src="${img.url}" alt="Imagem de ${img.nome}" class="w-full h-40 object-cover rounded mb-2" />
      <p class="text-lg font-semibold">${img.nome}</p>
      <div class="flex gap-2 mt-2">
        <button onclick="removerImagem(${img.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remover</button>
        <button onclick="editarImagem(${img.id}, '${img.nome}', '${img.url}')" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
      </div>
    `;
    galeria.appendChild(div);
  });
}

// Adicionar nova imagem
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const url = document.getElementById("url").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, url })
  });

  form.reset();
  carregarImagens();
});

// Remover imagem
async function removerImagem(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  carregarImagens();
}

// Editar imagem
async function editarImagem(id, nomeAtual, urlAtual) {
  const novoNome = prompt("Novo nome:", nomeAtual);
  const novaUrl = prompt("Nova URL da imagem:", urlAtual);

  if (novoNome && novaUrl) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: novoNome, url: novaUrl })
    });
    carregarImagens();
  }
}

// Inicializar galeria ao carregar a página
carregarImagens();
