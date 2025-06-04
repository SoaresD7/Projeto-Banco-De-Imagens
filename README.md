# Projeto-Banco-De-Imagens
**Atividade – Projeto Banco de Imagens (CRUD Simples)**
**Objetivo da Atividade**
Desenvolver um sistema web de Banco de Imagens, utilizando Java com
Spring Boot (back-end), MySQL (banco de dados), HTML, CSS e JavaScript
(front-end). O sistema deve permitir adicionar, editar e remover imagens,
armazenando os dados no banco e exibindo todas as imagens na tela principal.

**Descrição do Sistema**
A ideia é criar uma galeria simples com as seguintes funcionalidades:
Mostrar todas as imagens cadastradas na página inicial (index.html);
Permitir que o usuário cadastre seu nome e a URL da imagem;
Permitir que o usuário remova e edite as imagens da galeria.

✅ Tarefas Obrigatórias
**1. Criação de Diagramas**
Diagrama de Caso de Uso: deve mostrar as interações do usuário (ex:adicionar imagem, remover imagem, visualizar galeria).

Diagrama Entidade-Relacionamento (DER): deve representar aestrutura do banco de dados com a tabela imagens.

**2. Banco de Dados (MySQL)**
Criar banco chamado banco_imagens.
Criar tabela imagens com os seguintes campos:

id
nome
url

**3. API Spring Boot**
**Crie uma API RESTful com os seguintes endpoints:**

POST /api/imagens – Adiciona uma nova imagem.
GET /api/imagens – Lista todas as imagens cadastradas.
DELETE /api/imagens/{id} – Remove uma imagem pelo ID.
PUT /api/imagens/{id} – Editar uma imagem pelo ID.
**Sua API deve conter:**
Model: ImagemModel
Repository: ImagemRepository
Service: ImagemService
Controller: ImagemController

**4. Interface Web (HTML, CSS, JavaScript)**
**A página index.html deve conter:**
**Um formulário com os campos:**
o Nome
o URL da imagem
o Botão “Adicionar”
**Uma galeria com todas as imagens cadastradas:**
o Cada imagem deve exibir o nome do autor
o Deve ter um botão “Remover” ao lado de cada imagem
**O JavaScript deve:**
o Enviar dados para a API (POST)
o Buscar a lista de imagens (GET)
o Remover imagens (DELETE)
o Editar imagens (PUT)
o Atualizar a galeria dinamicamente após cada ação
