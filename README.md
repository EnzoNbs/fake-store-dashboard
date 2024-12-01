# Descrição do Projeto

Este projeto consiste na criação de um painel de controle para gerenciar as informações de uma loja online utilizando a API Fake Store. O painel permite o visualização e manipulação de dados relacionados a produtos, categorias, carrinhos (pedidos) e usuários. Desenvolvido com Vue.Js 3 e Vite

## API

O painel consome dados da API Fake Store através do endpoint: https://fakestoreapi.com/.

# Funcionalidades

Recursos do painel:
  - Visão geral dos indicadores:
    - Total de produtos.
    - Número de categorias.
    - Quandidade de Pedidos.
    - Número total de usuários.

Gerenciar produtos:
  - Visualizar todos os produtos.
  - Visualizar detalhes de um produto específico.
  - Filtrar e classificar produtos.
  - Adicionar, atualizar e remover produtos.

Gerenciar carrinhos:
  - Listar todos os carrinhos de compras.
  - Visualizar detalhes de um pedido.
  - Filtrar carrinhos por data ou usuário.
  - Adicionar, atualizar e remover carrinho.

Gerenciar usuários:
  - Listar todos os usuários.
  - Visualizar detalhes de um usuário específico.
  - Pesquisar nome do usuário.
  - Adicionar, atualizar e remover usuário.

Autenticação:
  - Tela de Login para acessar o sistema.

## Tecnologias usadas
  - Vue.Js 3
  - Vite
  - Axios
  - Vue Router
    
# Executar o projeto

- Clone o repositório
```
git clone https://github.com/EnzoNbs/fake-store-dashboard.git
cd fake-store-dashboard
```
- Instalar dependências.
```sh
npm install
```
- Iniciar servidor de desenvolvimento.
```sh
npm run dev
```
- Acessar o localhost fornecido pelo terminal

## Login para teste
Para fazer login, deve-se usar um e-mail de um usuário registrado na API e os 4 últimos dígitos do telefone do mesmo. Exemplo:
```
Usuário: john@gmail.com
Senha: 7033
``` 
