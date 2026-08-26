# Especificação de Produto — Weather App

## Overview
Aplicação web responsiva em pt-BR para consulta rápida das condições meteorológicas atuais e da previsão para hoje e os quatro dias seguintes. O produto prioriza uso mobile, acesso sem autenticação e dados públicos do Open-Meteo.

## Functional Requirements
- **RF1 — Busca de Cidades:** Permitir busca por nome da cidade, com sugestões para desambiguação contendo cidade, estado/região quando disponível e país.
- **RF2 — Clima Atual:** Exibir temperatura atual, condição meteorológica com ícone e descrição, umidade, velocidade do vento, pressão atmosférica e precipitação acumulada atual em milímetros.
- **RF3 — Previsão de 5 Dias:** Exibir a previsão para os próximos 5 dias (hoje + 4 dias), contendo temperatura mínima e máxima, condição meteorológica, velocidade do vento e probabilidade de chuva.
- **RF4 — Alternância de Unidades:** Permitir alternar entre Celsius (°C) e Fahrenheit (°F), atualizando todas as temperaturas visíveis sem realizar nova consulta de dados.
- **RF5 — Feedback de Estado da UI:** Exibir estados visuais distintos para carregamento, erro recuperável, resultado vazio e estado inicial.

## User Stories
- **US1 (RF1 — Busca de Cidades):** Como decisor do dia a dia, quero buscar uma cidade por nome e visualizar sugestões com estado e país para selecionar a localização correta sem ambiguidade.
- **US2 (RF2 — Clima Atual):** Como decisor do dia a dia, quero consultar o clima e a temperatura atual de uma cidade para decidir rapidamente qual roupa vestir e se preciso levar guarda-chuva.
- **US3 (RF3 — Previsão de 5 Dias):** Como viajante planejador, quero visualizar a previsão do tempo dos próximos 5 dias para organizar a agenda de compromissos e passeios da minha semana.
- **US4 (RF4 — Alternância de Unidades):** Como viajante planejador, quero alternar entre Celsius e Fahrenheit a qualquer momento para interpretar as temperaturas no formato com o qual estou familiarizado no meu destino.
- **US5 (RF5 — Feedback de Estado da UI):** Como decisor do dia a dia, quero visualizar estados de carregamento e mensagens claras de erro com opção de tentar novamente para acompanhar o status da busca mesmo sob conexões instáveis.

## Acceptance Criteria

### RF1 — Busca de Cidades
- **AC1.1 (Autocompletar e sugestões):**
  - **Given** que o usuário está com o foco no campo de busca de cidade,
  - **When** ele digita 2 ou mais caracteres não vazios e permanece sem digitar por 300ms,
  - **Then** o sistema deve iniciar uma consulta de geocoding e, após uma resposta bem-sucedida, exibir até 5 sugestões no formato "Cidade, Estado/Região - País"; estado/região pode ser omitido quando indisponível.
- **AC1.2 (Seleção de cidade):**
  - **Given** que a lista de sugestões de cidades está visível,
  - **When** o usuário clica ou navega via teclado (Enter) sobre uma das opções,
  - **Then** a lista deve ser fechada, o campo deve exibir a localização selecionada e uma consulta de clima deve ser iniciada com as coordenadas dessa localização.
- **AC1.3 (Submissão sem seleção):**
  - **Given** que o usuário digitou um termo válido e há sugestões visíveis,
  - **When** ele submete a busca sem selecionar uma sugestão,
  - **Then** a primeira sugestão deve receber foco, sem iniciar consulta de clima, para que o usuário confirme explicitamente a localização.

### RF2 — Clima Atual
- **AC2.1 (Renderização de dados atuais):**
  - **Given** que a seleção de uma cidade foi efetuada com sucesso,
  - **When** os dados climáticos retornam da API,
  - **Then** o painel principal deve renderizar: cidade e país, temperatura atual arredondada ao inteiro mais próximo, ícone e descrição da condição, umidade em %, vento em km/h, pressão em hPa e precipitação atual em mm.

### RF3 — Previsão de 5 Dias
- **AC3.1 (Intervalo de dias exibido):**
  - **Given** que a consulta de clima foi concluída com sucesso,
  - **When** o painel de previsão é renderizado,
  - **Then** a interface deve exibir exatamente 5 itens em ordem cronológica, correspondentes ao dia atual e aos quatro dias seguintes, usando o fuso horário retornado para a localização consultada.
- **AC3.2 (Métricas por dia da previsão):**
  - **Given** que a lista de previsão de 5 dias está visível,
  - **When** o usuário inspeciona cada dia da previsão,
  - **Then** cada item deve conter: data ou dia da semana, ícone e descrição da condição, temperaturas mínima e máxima, velocidade do vento e probabilidade de precipitação em %.

### RF4 — Alternância de Unidades
- **AC4.1 (Unidade inicial padrão):**
  - **Given** que a aplicação é carregada pela primeira vez pelo usuário,
  - **When** a interface inicial é renderizada,
  - **Then** a unidade de temperatura selecionada por padrão deve ser Celsius (°C).
- **AC4.2 (Conversão dinâmica Celsius / Fahrenheit):**
  - **Given** que os dados de clima atual e previsão estão sendo exibidos na tela em °C,
  - **When** o usuário clica no seletor de unidade para alternar para °F,
  - **Then** todas as temperaturas visíveis (atual, mínima e máxima) devem ser atualizadas para Fahrenheit ($°F = °C \times 1.8 + 32$), arredondadas ao inteiro mais próximo, sem nova consulta de clima.
- **AC4.3 (Retorno a Celsius):**
  - **Given** que as temperaturas estão sendo exibidas em °F,
  - **When** o usuário seleciona °C,
  - **Then** os valores exibidos devem retornar aos valores originalmente recebidos em Celsius, arredondados ao inteiro mais próximo.

### RF5 — Feedback de Estado da UI
- **AC5.1 (Estado Inicial / Vazio):**
  - **Given** que o usuário abre a aplicação e nenhuma busca por cidade foi realizada,
  - **When** a interface inicial carrega,
  - **Then** o sistema deve exibir uma tela de estado vazio (empty state) com mensagem amigável instruindo o usuário a buscar por uma cidade.
- **AC5.2 (Estado de Carregamento):**
  - **Given** que uma busca de cidade foi confirmada pelo usuário,
  - **When** as requisições de dados à API estão pendentes/em andamento,
  - **Then** a aplicação deve indicar carregamento nas áreas de clima atual e previsão e impedir o envio repetido da mesma busca até sua conclusão; resultados de uma busca anterior podem permanecer visíveis enquanto são atualizados.
- **AC5.3 (Estado de Erro e Recuperação):**
  - **Given** que uma requisição à API de geocoding ou clima falhou por erro de rede ou indisponibilidade,
  - **When** a resposta de erro é recebida ou ocorre timeout,
  - **Then** a aplicação deve exibir uma mensagem de erro sem detalhes técnicos e um botão "Tentar novamente" que repete a última consulta com a mesma localização ou termo.

## Non-Functional Requirements
- **RNF1 — Performance:** Em conexão 4G simulada, o LCP deve ser inferior a 2 segundos. O debounce da busca deve ser de 300ms; o tempo de resposta da API não compõe esse limite.
- **RNF2 — Responsividade:** A aplicação deve permanecer funcional e sem rolagem horizontal em viewports de 320px, 768px e 1440px de largura.
- **RNF3 — Acessibilidade:** O campo de busca, seletor de unidade e ações devem ter nome acessível; sugestões devem ser operáveis por teclado com setas, Enter e Esc; erros devem ser anunciados; texto e componentes interativos devem atingir contraste mínimo de $4.5:1$.
- **RNF4 — Resiliência:** Falhas de comunicação, respostas inválidas e respostas incompletas não podem causar erro não tratado nem impedir nova busca.
- **RNF5 — Fonte de Dados:** Usar Open-Meteo para geocoding e previsão, sem chave de API e sem credenciais expostas no cliente.
- **RNF6 — Mensagens:** Mensagens ao usuário devem estar em pt-BR, explicar a próxima ação possível e não expor detalhes técnicos da API.

## Edge Cases
- **1. Geocoding Sem Resultados / Cidade Inexistente:**
  - *Cenário:* O usuário busca por um termo que não corresponde a nenhuma localização (ex: "xyzabc123").
  - *Comportamento Esperado:* A lista de sugestões exibe "Nenhuma cidade encontrada". Uma submissão não inicia consulta de clima e preserva o último resultado válido, quando houver.
- **2. Input Vazio ou Apenas Espaços:**
  - *Cenário:* O usuário clica no botão de busca ou digita apenas caracteres de espaço no campo de entrada.
  - *Comportamento Esperado:* A ação de busca é ignorada silenciosamente (ou o botão permanece desabilitado). Nenhuma requisição à API é disparada e o estado atual da tela permanece inalterado.
- **3. Caracteres Especiais, Acentos e Números:**
  - *Cenário:* O termo inserido contém acentos ("São Paulo"), hífen ("Saint-Étienne"), apóstrofo ("L'Aquila") ou símbolos/números.
  - *Comportamento Esperado:* A busca aceita letras Unicode, acentos, hífens, apóstrofos e espaços. Uma entrada composta somente de números ou símbolos exibe "Digite um nome de cidade válido" e não inicia consulta.
- **4. Falha de Conexão e Erros de API (HTTP 5xx / Rate Limit / Offline):**
  - *Cenário:* A API Open-Meteo retorna erro de servidor/rate limit ou a conexão do usuário cai durante a busca.
  - *Comportamento Esperado:* A aplicação intercepta o erro e renderiza a tela de erro (Error State) com a mensagem "Não foi possível carregar os dados meteorológicos no momento. Verifique sua conexão ou tente novamente mais tarde." e um botão visível de "Tentar novamente".
- **5. Timeout de Requisição:**
  - *Cenário:* A chamada à API de geocoding ou clima demora mais de 10 segundos para responder (ex: latência alta).
  - *Comportamento Esperado:* Após 10 segundos sem resposta, a consulta é encerrada. A UI interrompe o carregamento e exibe "A requisição demorou muito para responder. Tente novamente." com ação de nova tentativa.
- **6. Resposta Parcial ou Incompleta da API:**
  - *Cenário:* A API de clima retorna os dados de clima atual com sucesso, mas a lista diária de previsão vem vazia ou com dados incompletos.
  - *Comportamento Esperado:* Se houver menos de 5 dias, o painel atual e os dias disponíveis são exibidos com aviso de dados incompletos. Se não houver nenhum dia, a seção de previsão exibe indisponibilidade; a aplicação não falha.

## Assumptions
- O usuário possui acesso à internet na maior parte do tempo de uso.
- A aplicação é de uso individual, não requerendo autenticação, login ou dados de sessão mantidos em servidor.
- Os usuários utilizam navegadores web modernos com suporte a ES6+, Flexbox, Grid e Fetch API.
- A API pública Open-Meteo estará disponível durante o uso normal; alterações de contrato serão tratadas como falha de resposta inválida.

## Risks
| Risco | Probabilidade | Impacto | Mitigação |
| :--- | :--- | :--- | :--- |
| Instabilidade ou rate limiting na API Open-Meteo | Média | Alto | Exibir estado de erro humanizado com retry e implementar bom tratamento de exceptions na camada de serviço. |
| Ambiguidade no nome das cidades (homônimos) | Alta | Médio | Exibir cidade acompanhada do estado/região e país na lista de sugestões de autocompletar. |
| Experiência comprometida em telas muito pequenas | Média | Médio | Adoção estrita da abordagem Mobile-First no CSS e validação automatizada em múltiplos viewports. |
| Cálculos/conversões de unidade com arredondamentos incorretos | Baixa | Alto | Isolar a lógica de conversão em funções puras com cobertura de 100% em testes unitários. |
| Mudança no contrato de dados da API | Baixa | Alto | Validar campos obrigatórios e apresentar estado de erro ou dados parciais, conforme disponível. |

## Out of Scope
- Geolocalização automática via GPS/Navegador na versão 1.0.
- Autenticação de usuários, contas ou perfis.
- Histórico de buscas recentes ou persistência de cidades favoritas em LocalStorage ou Banco de Dados na v1.0.
- Cache de respostas meteorológicas entre buscas, sessões ou recargas da página.
- Exibição de hora local, relógio ou informações detalhadas de fuso horário da cidade consultada.
- Mapas, radar meteorológico e camadas geográficas.
- Suporte a múltiplos idiomas (i18n) — a interface será exclusivamente em Português do Brasil (pt-BR).
- Notificações push ou alertas de condições meteorológicas severas.
- Suporte offline completo via Service Workers / Progressive Web App (PWA).

## Open Questions
Nenhuma para a versão 1.0. Cache de consultas, exibição de hora local e expansão do limite de sugestões podem ser avaliados como evoluções futuras.

## Tabela de Rastreabilidade
| Requisito Funcional | User Story | Valor da Story | Critérios de Aceite | Requisitos Não-Funcionais |
| :--- | :--- | :--- | :--- | :--- |
| **RF1** — Busca | **US1** | Selecionar a localização correta sem ambiguidade. | AC1.1, AC1.2, AC1.3 | RNF1, RNF2, RNF3, RNF5 |
| **RF2** — Clima Atual | **US2** | Decidir roupa e necessidade de guarda-chuva. | AC2.1 | RNF1, RNF2, RNF3 |
| **RF3** — Previsão de 5 Dias | **US3** | Planejar compromissos e passeios da semana. | AC3.1, AC3.2 | RNF1, RNF2, RNF3, RNF4 |
| **RF4** — Unidades | **US4** | Interpretar temperaturas na unidade familiar. | AC4.1, AC4.2, AC4.3 | RNF1, RNF3 |
| **RF5** — Feedback de UI | **US5** | Acompanhar e recuperar buscas em conexões instáveis. | AC5.1, AC5.2, AC5.3 | RNF3, RNF4, RNF6 |
