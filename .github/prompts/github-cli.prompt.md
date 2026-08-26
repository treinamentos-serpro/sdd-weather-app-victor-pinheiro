---
mode: agent
description: 'Executa operações do GitHub CLI (gh) no repositório atual, como issues, PRs, releases e consultas à API.'
argument-hint: 'Ação ou comando gh a executar (ex.: listar PRs abertas; criar issue; ver status da autenticação)'
---

# Prompt — GitHub CLI

Execute a solicitação abaixo usando o GitHub CLI (`gh`) no repositório atual.

## Solicitação

${input:request:Descreva a ação do GitHub CLI}

## Procedimento

1. Identifique o repositório e a branch atual quando forem relevantes para a ação.
2. Verifique se o `gh` está autenticado antes de executar operações que dependam da API do GitHub.
3. Execute o comando `gh` mais direto e não interativo que satisfaça a solicitação.
4. Para consultas, apresente um resumo objetivo do resultado.
5. Para criação ou alteração de issues, pull requests, releases, labels, comentários ou qualquer publicação remota, só prossiga quando a solicitação declarar claramente a intenção de publicar.
6. Para ações destrutivas ou irreversíveis (ex.: excluir issue, PR, release, branch remota ou repositório), informe o comando proposto e solicite confirmação antes da execução.

## Regras

- Não exponha tokens, credenciais ou dados sensíveis.
- Use `gh api` somente quando não houver um subcomando `gh` adequado.
- Prefira argumentos explícitos e evite prompts interativos.
- Não crie commits, branches, issues, PRs ou releases fora do que foi solicitado.
- Se a autenticação ou a permissão necessária estiver ausente, informe o bloqueio e o comando seguro que o usuário deve executar para resolvê-lo.