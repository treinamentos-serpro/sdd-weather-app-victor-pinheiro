# Backlog de Tarefas — Weather App

Backlog granular derivado do plano técnico (`plans/weather-app-plan.md`) e da especificação (`specs/weather-app-spec.md`), organizado na sequência estrita de implementação: **Tipos $\rightarrow$ Funções Puras $\rightarrow$ Services $\rightarrow$ Hook $\rightarrow$ Componentes $\rightarrow$ Integração $\rightarrow$ Testes $\rightarrow$ Hardening**.

---

## Classificação das Tarefas (Prioridade e Tamanho Relativo)

| ID | Título | Tipo | Prioridade | Tamanho | Dependências |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **T-01** | Definir Contratos e Tipos TypeScript Compartilhados | Data | **P0** | **P** | Nenhuma |
| **T-02** | Implementar Conversões de Temperatura | Data | **P0** | **P** | T-01 |
| **T-03** | Implementar Mapeamento de WMO Weather Codes | Data | **P0** | **P** | T-01 |
| **T-04** | Implementar Formatação de Datas e Números | Data | **P0** | **P** | T-01 |
| **T-05** | Implementar Serviço de Integração HTTP Open-Meteo | Data | **P0** | **M** | T-01 |
| **T-06** | Implementar Custom Hook `useWeather` | Data | **P0** | **M** | T-01, T-02, T-05 |
| **T-07** | Criar Componentes de Estado Inicial e Carregamento | UI | **P0** | **P** | T-01 |
| **T-08** | Criar Componente de Estado de Erro com Botão Retry | UI | **P0** | **P** | T-01 |
| **T-09** | Criar Componente `UnitToggle` | UI | **P0** | **P** | T-01, T-02 |
| **T-10** | Criar Componente `SearchBar` com Autocompletar | UI | **P0** | **M** | T-01 |
| **T-11** | Criar Componente de Clima Atual `CurrentWeather` | UI | **P0** | **M** | T-01, T-02, T-03, T-04 |
| **T-12** | Criar Componente `ForecastCard` para Previsão Diária | UI | **P0** | **P** | T-01, T-02, T-03, T-04 |
| **T-13** | Criar Componente `ForecastList` para Lista de 5 Dias | UI | **P0** | **P** | T-12 |
| **T-14** | Integrar Componentes e Hook no `App.tsx` | UI | **P0** | **M** | T-06 a T-13 |
| **T-15** | Criar Testes Unitários para Conversões de Temperatura | Test | **P1** | **P** | T-02 |
| **T-16** | Criar Testes Unitários para Mapeamento de Weather Codes | Test | **P1** | **P** | T-03 |
| **T-17** | Criar Testes Unitários para Formatação de Datas | Test | **P1** | **P** | T-04 |
| **T-18** | Criar Testes Unitários do Serviço de Dados com Mocks | Test | **P1** | **M** | T-05 |
| **T-19** | Criar Testes Unitários do Componente `UnitToggle` | Test | **P1** | **P** | T-09 |
| **T-20** | Criar Testes Unitários do Componente `SearchBar` | Test | **P1** | **M** | T-10 |
| **T-21** | Criar Testes Unitários dos Componentes de Estado | Test | **P1** | **P** | T-07, T-08 |
| **T-22** | Criar Testes Unitários de Renderização do `App.tsx` | Test | **P1** | **M** | T-14, T-21 |
| **T-23** | Implementar Testes End-to-End com Playwright | Test | **P1** | **G** | T-14 |
| **T-24** | Validação Final de Qualidade, Biome, A11y e Build | Infra / Test | **P2** | **P** | T-22, T-23 |

*Legenda Prioridade:* `P0` = Essencial / Bloqueante MVP, `P1` = Importante / Qualidade & Testes, `P2` = Validação Final / Hardening.  
*Legenda Tamanho:* `P` = Pequeno (< 50 linhas / 1 arquivo), `M` = Médio (50-150 linhas), `G` = Grande (Suíte completa / E2E multi-browser).

---

## Sequência de Entrega em "Fatias Verticais" (Estratégia MVP Rápido)

Para permitir a visualização de progresso rápido e funcional desde as primeiras iterações, sugere-se a divisão do backlog em **4 Fatias Verticais**:

### 🎯 Fatia 1: Núcleo e Clima Inicial (MVP Visível Rápido)
> **Objetivo:** Ter a aplicação abrindo, permitindo buscar uma cidade e renderizando o clima atual na tela em Celsius.
- **Tarefas:** `T-01` $\rightarrow$ `T-02` $\rightarrow$ `T-03` $\rightarrow$ `T-04` $\rightarrow$ `T-05` $\rightarrow$ `T-06` $\rightarrow$ `T-07` $\rightarrow$ `T-10` $\rightarrow$ `T-11` $\rightarrow$ `T-14`
- **Resultado Entregável:** O usuário consegue digitar a cidade, selecionar no dropdown e ver os dados do clima atual em tela.

### 🌤️ Fatia 2: Previsão de 5 Dias e Alternância de Unidades
> **Objetivo:** Completar o painel visual com os cards de 5 dias e a funcionalidade de alternar entre Celsius e Fahrenheit.
- **Tarefas:** `T-09` $\rightarrow$ `T-12` $\rightarrow$ `T-13` (Atualização no `T-14`)
- **Resultado Entregável:** Interface gráfica 100% pronta funcionalmente no happy path.

### 🛡️ Fatia 3: Tratamento de Erros e Resiliência de Interface
> **Objetivo:** Tratar falhas de rede, timeouts de 10s e apresentar o botão de tentar novamente.
- **Tarefas:** `T-08` (Componente `ErrorState` e integração de retry no hook e no `App.tsx`)
- **Resultado Entregável:** UI resiliente que lida com offline, 500 e retries.

### 🧪 Fatia 4: Suíte Completa de Testes e Hardening
> **Objetivo:** Garantir a cobertura automatizada unitária, de componentes, E2E e validação de build/biome.
- **Tarefas:** `T-15` a `T-24`
- **Resultado Entregável:** Aplicação pronta para produção (*Production-Ready*), testada e sem regressões.

---

## Entrega 1: Tipos e Contratos Compartilhados

### T-01: Definir Contratos e Tipos TypeScript Compartilhados
- **Tipo:** Data
- **Descrição:** Criar o arquivo `src/types/weather.ts` contendo as interfaces de domínio `City`, `CurrentWeather`, `ForecastDay`, `WeatherData`, o tipo `Unit` ('celsius' | 'fahrenheit') e o tipo `WeatherStatus` ('idle' | 'loading' | 'success' | 'error').
- **Critérios de Aceite:**
  - `Unit` restrito estritamente a `'celsius' | 'fahrenheit'`.
  - `City` possui exatamente as propriedades `id` (number), `name` (string), `latitude` (number), `longitude` (number), `country` (string) e `state` opcional (string).
  - `CurrentWeather` possui `temperature` (number em °C), `weatherCode` (number), `humidity` (number %), `windSpeed` (number km/h), `pressure` (number hPa) e `precipitation` (number mm).
  - `ForecastDay` possui `date` (string ISO YYYY-MM-DD), `tempMin` (number °C), `tempMax` (number °C), `weatherCode` (number), `windSpeed` (number km/h) e `precipitationProb` (number %).
  - `WeatherData` compõe `city: City`, `current: CurrentWeather` e `forecast: ForecastDay[]` (array de exatamente 5 dias).
  - `pnpm build` ou `tsc --noEmit` executa sem erros com modo `strict: true` ativado.
- **Rastreabilidade Spec:** RF1, RF2, RF3, RF4, RF5
- **Dependências:** Nenhuma
- **Arquivos:** `src/types/weather.ts`

---

## Entrega 2: Funções Puras (Regras de Negócio e Utilitários)

### T-02: Implementar Conversões de Temperatura
- **Tipo:** Data
- **Descrição:** Criar módulo puro `src/lib/temperature.ts` com funções para converter Celsius em Fahrenheit ($°F = °C \times 1.8 + 32$), arredondar valores e derivar a exibição baseada na unidade ativa.
- **Critérios de Aceite:**
  - `celsiusToFahrenheit(25)` retorna `77`.
  - `celsiusToFahrenheit(0)` retorna `32`.
  - `celsiusToFahrenheit(-10)` retorna `14`.
  - `fahrenheitToCelsius(77)` retorna `25`.
  - `formatTemperature(24.6, 'celsius')` retorna `"25°C"`.
  - `formatTemperature(24.6, 'fahrenheit')` retorna `"76°F"`.
  - Nenhuma chamada a APIs externas ou estados reativos é utilizada (função 100% pura).
- **Rastreabilidade Spec:** RF4, RNF1 (AC4.2)
- **Dependências:** T-01
- **Arquivos:** `src/lib/temperature.ts`

### T-03: Implementar Mapeamento de WMO Weather Codes
- **Tipo:** Data
- **Descrição:** Criar módulo puro `src/lib/weatherCodes.ts` que converte códigos numéricos WMO da Open-Meteo em descrições em pt-BR e identificadores de ícones.
- **Critérios de Aceite:**
  - `getWeatherDescription(0)` retorna `"Céu limpo"`.
  - `getWeatherDescription(61)` retorna `"Chuva fraca"`.
  - `getWeatherDescription(95)` retorna `"Trovoada"`.
  - Código não mapeado ou inválido (ex: `999`) retorna o fallback `"Condição desconhecida"`.
  - Retorna identificador/caminho do ícone correspondente a cada condição.
- **Rastreabilidade Spec:** RF2, RF3, RNF6
- **Dependências:** T-01
- **Arquivos:** `src/lib/weatherCodes.ts`

### T-04: Implementar Formatação de Datas e Números
- **Tipo:** Data
- **Descrição:** Criar módulo puro `src/lib/format.ts` para formatar datas em ISO em nomes de dias da semana em pt-BR e métricas climáticas secundárias.
- **Critérios de Aceite:**
  - `formatDayName('2026-08-26')` retorna a representação do dia da semana (ex: `"Quarta-feira"` ou `"Hoje"`).
  - `formatDate('2026-08-26')` retorna `"26/08"`.
  - `formatWindSpeed(15.4)` retorna `"15 km/h"`.
  - `formatHumidity(65)` retorna `"65%"`.
  - `formatPrecipitation(2.5)` retorna `"2.5 mm"`.
- **Rastreabilidade Spec:** RF2, RF3, RNF6
- **Dependências:** T-01
- **Arquivos:** `src/lib/format.ts`

---

## Entrega 3: Camada de Acesso a Dados (Services)

### T-05: Implementar Serviço de Integração HTTP Open-Meteo
- **Tipo:** Data
- **Descrição:** Criar `src/services/weatherService.ts` com métodos `fetchCitySuggestions` (Geocoding API) e `fetchWeatherData` (Forecast API), com suporte a cancelamento de requisição via `AbortController` (timeout de 10s).
- **Critérios de Aceite:**
  - `fetchCitySuggestions('São Paulo')` efetua `GET` em `https://geocoding-api.open-meteo.com/v1/search?name=S%C3%A3o%20Paulo&count=5&language=pt&format=json` e retorna array com até 5 objetos `City`.
  - `fetchWeatherData(-23.5475, -46.6361)` efetua `GET` em `https://api.open-meteo.com/v1/forecast` com `current` e `daily` configurados, retornando objeto compativel com `CurrentWeather` e `ForecastDay[]` (exactamente 5 dias).
  - Se a resposta HTTP for $\ne 200$ ou o sinal de `AbortController` (10s) expirar, lança um `Error` com mensagem amigável em pt-BR.
  - Em respostas parciais, utiliza valores padrão seguros (ex: `precipitation ?? 0`).
- **Rastreabilidade Spec:** RF1, RF2, RF3, RNF4, RNF5 (AC1.1, AC2.1, AC3.1)
- **Dependências:** T-01
- **Arquivos:** `src/services/weatherService.ts`

---

## Entrega 4: Gestão de Estado e Orquestração (Hook)

### T-06: Implementar Custom Hook `useWeather` para Gerenciamento de Estado
- **Tipo:** Data
- **Descrição:** Criar `src/hooks/useWeather.ts` gerenciando a máquina de estados (`idle`, `loading`, `success`, `error`), a cidade ativa, os dados meteorológicos (`weatherData`), a unidade (°C / °F) e as funções de ação (`searchCities`, `selectCity`, `toggleUnit`, `retry`).
- **Critérios de Aceite:**
  - Estado inicial `status` é `'idle'` e `unit` é `'celsius'`.
  - `toggleUnit()` altera `unit` de `'celsius'` para `'fahrenheit'` (e vice-versa) mantendo os mesmos dados em `weatherData` e sem acionar o `fetch`.
  - `selectCity(city)` altera `status` para `'loading'`, chama `weatherService.fetchWeatherData` e altera `status` para `'success'` armazenando o resultado.
  - Em caso de falha no `selectCity`, o `status` muda para `'error'` e `errorMessage` é preenchido.
  - `retry()` chama `selectCity` usando a última cidade selecionada.
- **Rastreabilidade Spec:** RF1, RF4, RF5 (AC4.1, AC4.2, AC5.1, AC5.2, AC5.3)
- **Dependências:** T-01, T-02, T-05
- **Arquivos:** `src/hooks/useWeather.ts`

---

## Entrega 5: Componentes de Interface do Usuário (UI)

### T-07: Criar Componentes de Estado Inicial e Carregamento (EmptyState, LoadingState)
- **Tipo:** UI
- **Descrição:** Criar `src/components/states/EmptyState.tsx` e `src/components/states/LoadingState.tsx` no tema dark glassmorphism.
- **Critérios de Aceite:**
  - `EmptyState.tsx` renderiza mensagem `"Busque por uma cidade para ver o clima"` em container com estilos Tailwind glassmorphism.
  - `LoadingState.tsx` renderiza pelo menos 1 skeleton loader para o clima atual e 5 skeleton cards para a previsão de 5 dias.
  - Componentes contêm atributos acessíveis (ex: `aria-busy="true"` no LoadingState).
- **Rastreabilidade Spec:** RF5, RNF2, RNF3 (AC5.1, AC5.2)
- **Dependências:** T-01
- **Arquivos:** `src/components/states/EmptyState.tsx`, `src/components/states/LoadingState.tsx`

### T-08: Criar Componente de Estado de Erro com Botão Retry (ErrorState)
- **Tipo:** UI
- **Descrição:** Criar `src/components/states/ErrorState.tsx` para apresentar falhas de busca/rede e ação de tentativa nova.
- **Critérios de Aceite:**
  - Renderiza o texto de erro recebido via prop `message` (ou fallback amigável em pt-BR).
  - Renderiza botão com texto `"Tentar novamente"` que aciona o callback `onRetry` via clique ou tecla Enter/Space.
  - Possui `role="alert"` para leitores de tela.
- **Rastreabilidade Spec:** RF5, RNF3, RNF6 (AC5.3)
- **Dependências:** T-01
- **Arquivos:** `src/components/states/ErrorState.tsx`

### T-09: Criar Componente `UnitToggle`
- **Tipo:** UI
- **Descrição:** Criar `src/components/UnitToggle.tsx` para alternância visual de unidade de temperatura (°C / °F) com suporte a acessibilidade.
- **Critérios de Aceite:**
  - Renderiza dois botões interativos identificados com `"°C"` e `"°F"`.
  - Aplica estilo ativo/destacado no botão referente à `unit` recebida via prop.
  - Dispara `onUnitChange` ao clicar no botão inativo.
  - Botões possuem `aria-label="Alternar para Celsius"` e `aria-label="Alternar para Fahrenheit"`.
- **Rastreabilidade Spec:** RF4, RNF3 (AC4.1, AC4.2)
- **Dependências:** T-01, T-02
- **Arquivos:** `src/components/UnitToggle.tsx`

### T-10: Criar Componente `SearchBar` com Autocompletar
- **Tipo:** UI
- **Descrição:** Criar `src/components/SearchBar.tsx` com input de texto, autocompletar, dropdown de até 5 sugestões e navegação por teclado.
- **Critérios de Aceite:**
  - Input possui `type="text"`, placeholder `"Buscar cidade..."` e `aria-label="Buscar cidade por nome"`.
  - Exibe dropdown de sugestões quando a lista recebida via props contiver itens e o input tiver $\ge 2$ caracteres.
  - Cada item do dropdown exibe `"Cidade, Estado - País"` (ou `"Cidade, País"` quando sem estado).
  - Se a lista de sugestões for vazia durante a busca, exibe item desabilitado `"Nenhuma cidade encontrada"`.
  - Tecla `Esc` fecha o dropdown; setas `Cima/Baixo` navegam pelas sugestões e `Enter` seleciona o item.
- **Rastreabilidade Spec:** RF1, RNF2, RNF3 (AC1.1, AC1.2)
- **Dependências:** T-01
- **Arquivos:** `src/components/SearchBar.tsx`

### T-11: Criar Componente de Clima Atual `CurrentWeather`
- **Tipo:** UI
- **Descrição:** Criar `src/components/CurrentWeather.tsx` para exibir a temperatura atual, condição climática com ícone, cidade/país, umidade, vento, pressão e precipitação.
- **Critérios de Aceite:**
  - Renderiza o nome da cidade e do país recebidos do objeto `City`.
  - Converte a temperatura usando `formatTemperature(data.current.temperature, unit)` e a exibe em destaque.
  - Renderiza a descrição da condição meteorológica em pt-BR e o ícone WMO.
  - Renderiza os 4 blocos de métricas secundárias: Umidade (%), Vento (km/h), Pressão (hPa) e Precipitação (mm).
  - Componente é adaptável a viewports mobile (a partir de 320px).
- **Rastreabilidade Spec:** RF2, RF4, RNF2 (AC2.1)
- **Dependências:** T-01, T-02, T-03, T-04
- **Arquivos:** `src/components/CurrentWeather.tsx`

### T-12: Criar Componente `ForecastCard` para Previsão Diária
- **Tipo:** UI
- **Descrição:** Criar `src/components/ForecastCard.tsx` para renderizar o card individual de um dia da previsão.
- **Critérios de Aceite:**
  - Exibe o dia da semana ou data formatada via `formatDayName` / `formatDate`.
  - Renderiza ícone e descrição da condição meteorológica WMO.
  - Exibe a temperatura mínima e máxima formatadas de acordo com a `unit` recebida por prop.
  - Exibe velocidade do vento (km/h) e probabilidade de chuva (%).
- **Rastreabilidade Spec:** RF3, RF4, RNF2 (AC3.1, AC3.2)
- **Dependências:** T-01, T-02, T-03, T-04
- **Arquivos:** `src/components/ForecastCard.tsx`

### T-13: Criar Componente `ForecastList` para Lista de 5 Dias
- **Tipo:** UI
- **Descrição:** Criar `src/components/ForecastList.tsx` para renderizar a coleção dos 5 cards diários.
- **Critérios de Aceite:**
  - Renderiza exatamente 5 elementos `ForecastCard`, um para cada dia da lista `forecast`.
  - Layout utiliza grid/flexbox responsivo com ajuste automático para não estourar em telas pequenas (320px).
  - Título da seção `"Previsão para 5 dias"` presente com tag semântica `<h2>`.
- **Rastreabilidade Spec:** RF3, RNF2, RNF3 (AC3.1)
- **Dependências:** T-12
- **Arquivos:** `src/components/ForecastList.tsx`

---

## Entrega 6: Integração da Aplicação (Layout Final)

### T-14: Integrar Componentes e Hook no `App.tsx`
- **Tipo:** UI
- **Descrição:** Conectar o hook `useWeather` aos componentes de interface no arquivo raiz `src/App.tsx`.
- **Critérios de Aceite:**
  - Renderiza a `SearchBar` e o `UnitToggle` no cabeçalho/topo da aplicação.
  - Se `status === 'idle'`, renderiza `EmptyState`.
  - Se `status === 'loading'`, renderiza `LoadingState`.
  - Se `status === 'error'`, renderiza `ErrorState` passando a função `retry`.
  - Se `status === 'success'`, renderiza `CurrentWeather` e `ForecastList`.
  - Aplica o container principal com tema dark glassmorphism e largura máxima centralizada.
- **Rastreabilidade Spec:** RF1, RF2, RF3, RF4, RF5, RNF2
- **Dependências:** T-06, T-07, T-08, T-09, T-10, T-11, T-13
- **Arquivos:** `src/App.tsx`

---

## Entrega 7: Suíte de Testes (Unitários e E2E)

### T-15: Criar Testes Unitários para Conversões de Temperatura
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/temperature.test.ts` cobrindo todas as funções puras de conversão e formatação de temperatura.
- **Critérios de Aceite:**
  - Valida conversões de valores positivos, negativos, zero e decimais fracionários.
  - Valida o arredondamento correto de valores fracionários (ex: `25.4` $\rightarrow$ `25`, `25.5` $\rightarrow$ `26`).
  - Suite de testes no Vitest executa com 100% de aprovação (`pnpm test`).
- **Rastreabilidade Spec:** RF4, RNF1
- **Dependências:** T-02
- **Arquivos:** `tests/unit/temperature.test.ts`

### T-16: Criar Testes Unitários para Mapeamento de Weather Codes
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/weatherCodes.test.ts` cobrindo o mapeamento de códigos WMO.
- **Critérios de Aceite:**
  - Valida o retorno das descrições em pt-BR para códigos WMO padrão (`0`, `1`, `3`, `45`, `61`, `71`, `95`).
  - Valida o comportamento gracioso do fallback para códigos numéricos inexistentes/negativos.
- **Rastreabilidade Spec:** RF2, RF3, RNF6
- **Dependências:** T-03
- **Arquivos:** `tests/unit/weatherCodes.test.ts`

### T-17: Criar Testes Unitários para Formatação de Datas
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/format.test.ts` garantindo formatação consistente de datas.
- **Critérios de Aceite:**
  - Valida a formatação em pt-BR de datas válidas em ISO.
  - Valida tratamento para strings de data inválidas/vazias sem quebrar com exceções não capturadas.
- **Rastreabilidade Spec:** RF3, RNF4, RNF6
- **Dependências:** T-04
- **Arquivos:** `tests/unit/format.test.ts`

### T-18: Criar Testes Unitários do Serviço de Dados com Mocks de Fetch
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/weatherService.test.ts` para validar o serviço de dados isoladamente.
- **Critérios de Aceite:**
  - Mocka `global.fetch` para simular resposta 200 de Geocoding com 3 cidades e valida o retorno do array `City[]`.
  - Mocka `global.fetch` para simular resposta de erro HTTP 500 e valida se a promessa é rejeitada com mensagem de erro tratada.
  - Mocka resposta com `results: []` e valida o retorno de array vazio sem lançar erro.
  - Simula timeout abortado e valida o lançamento de mensagem `"A requisição demorou muito para responder"`.
- **Rastreabilidade Spec:** RF1, RF5, RNF4
- **Dependências:** T-05
- **Arquivos:** `tests/unit/weatherService.test.ts`

### T-19: Criar Testes Unitários do Componente `UnitToggle`
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/UnitToggle.test.tsx` testando renderização e acessibilidade do seletor.
- **Critérios de Aceite:**
  - Valida se o botão da unidade ativa está destacado com classe/atributo correspondente.
  - Simula evento de clique no botão inativo e valida se a prop `onUnitChange` é chamada com a nova unidade.
- **Rastreabilidade Spec:** RF4, RNF3
- **Dependências:** T-09
- **Arquivos:** `tests/unit/UnitToggle.test.tsx`

### T-20: Criar Testes Unitários do Componente `SearchBar`
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/SearchBar.test.tsx` testando a interatividade do campo de busca.
- **Critérios de Aceite:**
  - Valida digitação no input e chamada da prop de busca após debounce.
  - Valida a renderização da lista de sugestões passada por props.
  - Valida a chamada do callback `onSelectCity` ao clicar em uma sugestão da lista.
- **Rastreabilidade Spec:** RF1, RNF3
- **Dependências:** T-10
- **Arquivos:** `tests/unit/SearchBar.test.tsx`

### T-21: Criar Testes Unitários dos Componentes de Estado da UI (Empty, Loading, Error)
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/StateComponents.test.tsx` testando os componentes `EmptyState`, `LoadingState` e `ErrorState`.
- **Critérios de Aceite:**
  - `EmptyState`: Valida exibição da mensagem inicial e texto orientativo de busca.
  - `LoadingState`: Valida renderização dos skeleton loaders e atributo `aria-busy="true"`.
  - `ErrorState`: Valida mensagem de erro humanizada em pt-BR, `role="alert"` e acionamento do callback `onRetry` no botão "Tentar novamente".
- **Rastreabilidade Spec:** RF5, RNF3, RNF6
- **Dependências:** T-07, T-08
- **Arquivos:** `tests/unit/StateComponents.test.tsx`

### T-22: Criar Testes Unitários de Renderização do `App.tsx`
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/App.test.tsx` testando o ciclo de renderização e troca de estados no App.
- **Critérios de Aceite:**
  - Valida se ao carregar a página inicialmente, a tela `EmptyState` é exibida.
  - Mocka o hook `useWeather` para simular estado `'loading'` e confirma a exibição de `LoadingState`.
  - Mocka o hook para simular estado `'error'` e confirma a exibição de `ErrorState`.
  - Mocka o hook para simular estado `'success'` e confirma a exibição de `CurrentWeather` e `ForecastList`.
- **Rastreabilidade Spec:** RF5, RNF6
- **Dependências:** T-14, T-21
- **Arquivos:** `tests/unit/App.test.tsx`

### T-23: Implementar Testes End-to-End com Playwright (Fluxo Principal e Mobile Viewport)
- **Tipo:** Test
- **Descrição:** Criar suíte de testes E2E em `tests/e2e/weather.spec.ts` cobrindo o fluxo principal do usuário e responsividade mobile.
- **Critérios de Aceite:**
  - Teste 1 (Busca completa): Digitar `"São Paulo"`, clicar na primeira sugestão, assertar que o nome `"São Paulo"` e os cards de 5 dias aparecem na tela.
  - Teste 2 (Troca de unidade): Clicar no botão `"°F"`, assertar que os valores numéricos de temperatura no DOM mudaram para o formato em Fahrenheit sem recarregamento da página.
  - Teste 3 (Fluxo de erro): Simular rota com erro HTTP 500 (usando `page.route`), verificar se `ErrorState` aparece, clicar em `"Tentar novamente"`.
  - Teste 4 (Mobile Viewport): Executar os testes configurando viewport `375x667` e verificar se a página não possui rolagem horizontal (`scrollWidth <= clientWidth`).
- **Rastreabilidade Spec:** RF1, RF2, RF3, RF4, RF5, RNF1, RNF2, RNF4
- **Dependências:** T-14
- **Arquivos:** `tests/e2e/weather.spec.ts`

---

## Entrega 8: Hardening e Qualidade Final

### T-24: Validação Final de Qualidade, Biome Linting, Acessibilidade e Build
- **Tipo:** Infra / Test
- **Descrição:** Executar verificações de acessibilidade, formatação e linting com Biome e garantir build de produção limpo.
- **Critérios de Aceite:**
  - Execução da regra `pnpm lint` retorna zero alertas ou erros no Biome.
  - Execução da regra `pnpm build` compila o código TypeScript em modo strict e gera a pasta `dist/` sem falhas.
  - Execução da regra `pnpm test` roda e aprova 100% dos testes unitários e de integração.
- **Rastreabilidade Spec:** RNF1, RNF2, RNF3, RNF4, RNF5, RNF6
- **Dependências:** T-22, T-23
- **Arquivos:** `biome.json`, `package.json`, todo o repositório

---

## Tabela de Rastreabilidade (Requisitos $\rightarrow$ Tarefas)

| Requisito Funcional / Não-Funcional | Descrição da Especificação | Tarefa(s) Mapeada(s) de Implementação e Teste | Status de Cobertura |
| :--- | :--- | :--- | :--- |
| **RF1** | Busca de cidade por nome com autocompletar (sugestões com estado/país) e desambiguação | T-01, T-05, T-06, T-10, T-14, T-18, T-20, T-23 | Coberto 100% |
| **RF2** | Exibir clima atual (temperatura, condição com ícone, umidade, vento, pressão e precipitação em mm) | T-01, T-03, T-04, T-05, T-06, T-11, T-14, T-16, T-17, T-18, T-23 | Coberto 100% |
| **RF3** | Exibir previsão de 5 dias (hoje + 4), contendo mín/máx, condição, velocidade do vento e probabilidade de chuva | T-01, T-03, T-04, T-05, T-06, T-12, T-13, T-14, T-16, T-17, T-18, T-23 | Coberto 100% |
| **RF4** | Alternar unidade °C / °F recalculando e atualizando valores em memória sem novo request HTTP | T-01, T-02, T-06, T-09, T-14, T-15, T-19, T-23 | Coberto 100% |
| **RF5** | Exibir estados de UI distintos para carregamento (loading), erro com retry e estado inicial (vazio) | T-01, T-05, T-06, T-07, T-08, T-14, T-18, T-21, T-22, T-23 | Coberto 100% |
| **RNF1** | Performance (LCP < 2s, debounce de 300ms, conversão instantânea sem request) | T-02, T-06, T-09, T-15, T-24 | Coberto 100% |
| **RNF2** | Responsividade (mobile-first, adaptável de 320px a desktop) | T-07, T-08, T-09, T-10, T-11, T-12, T-13, T-23, T-24 | Coberto 100% |
| **RNF3** | Acessibilidade (suporte total a teclado, ARIA roles/labels, contraste WCAG AA) | T-09, T-10, T-19, T-20, T-21, T-24 | Coberto 100% |
| **RNF4** | Resiliência (timeout 10s via AbortController, tratamento gracioso de falhas e fallbacks) | T-05, T-06, T-08, T-18, T-23, T-24 | Coberto 100% |
| **RNF5** | Sem chave de API / Fonte de dados pública Open-Meteo e deploy estático | T-05, T-24 | Coberto 100% |
| **RNF6** | Qualidade de código e mensagens de erro amigáveis em pt-BR | T-03, T-05, T-08, T-21, T-24 | Coberto 100% |

> **Análise de Cobertura:** Todos os Requisitos Funcionais (RF1 a RF5) e Não-Funcionais (RNF1 a RNF6) da especificação possuem cobertura total e direta de tarefas de implementação e suítes de testes automatizados (unitários e E2E). NENHUM requisito ficou sem tarefa correspondente.
  - `celsiusToFahrenheit(0)` retorna `32`.
  - `celsiusToFahrenheit(-10)` retorna `14`.
  - `fahrenheitToCelsius(77)` retorna `25`.
  - `formatTemperature(24.6, 'celsius')` retorna `"25°C"`.
  - `formatTemperature(24.6, 'fahrenheit')` retorna `"76°F"`.
  - Nenhuma chamada a APIs externas ou estados reativos é utilizada (função 100% pura).
- **Rastreabilidade Spec:** RF4, RNF1 (AC4.2)
- **Dependências:** T-01
- **Arquivos:** `src/lib/temperature.ts`

### T-03: Criar Testes Unitários para Conversões de Temperatura
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/temperature.test.ts` cobrindo todas as funções puras de conversão e formatação de temperatura.
- **Critérios de Aceite:**
  - Valida conversões de valores positivos, negativos, zero e decimais fracionários.
  - Valida o arredondamento correto de valores fracionários (ex: `25.4` $\rightarrow$ `25`, `25.5` $\rightarrow$ `26`).
  - Suite de testes no Vitest executa com 100% de aprovação (`pnpm test`).
- **Rastreabilidade Spec:** RF4, RNF1
- **Dependências:** T-02
- **Arquivos:** `tests/unit/temperature.test.ts`

### T-04: Implementar Mapeamento de WMO Weather Codes
- **Tipo:** Data
- **Descrição:** Criar módulo puro `src/lib/weatherCodes.ts` que converte códigos numéricos WMO da Open-Meteo em descrições em pt-BR e identificadores de ícones.
- **Critérios de Aceite:**
  - `getWeatherDescription(0)` retorna `"Céu limpo"`.
  - `getWeatherDescription(61)` retorna `"Chuva fraca"`.
  - `getWeatherDescription(95)` retorna `"Trovoada"`.
  - Código não mapeado ou inválido (ex: `999`) retorna o fallback `"Condição desconhecida"`.
  - Retorna identificador/caminho do ícone correspondente a cada condição.
- **Rastreabilidade Spec:** RF2, RF3, RNF6
- **Dependências:** T-01
- **Arquivos:** `src/lib/weatherCodes.ts`

### T-05: Criar Testes Unitários para Mapeamento de Weather Codes
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/weatherCodes.test.ts` cobrindo o mapeamento de códigos WMO.
- **Critérios de Aceite:**
  - Valida o retorno das descrições em pt-BR para códigos WMO padrão (`0`, `1`, `3`, `45`, `61`, `71`, `95`).
  - Valida o comportamento gracioso do fallback para códigos numéricos inexistentes/negativos.
- **Rastreabilidade Spec:** RF2, RF3, RNF6
- **Dependências:** T-04
- **Arquivos:** `tests/unit/weatherCodes.test.ts`

### T-06: Implementar Formatação de Datas e Números
- **Tipo:** Data
- **Descrição:** Criar módulo puro `src/lib/format.ts` para formatar datas em ISO em nomes de dias da semana em pt-BR e métricas climáticas secundárias.
- **Critérios de Aceite:**
  - `formatDayName('2026-08-26')` retorna a representação do dia da semana (ex: `"Quarta-feira"` ou `"Hoje"`).
  - `formatDate('2026-08-26')` retorna `"26/08"`.
  - `formatWindSpeed(15.4)` retorna `"15 km/h"`.
  - `formatHumidity(65)` retorna `"65%"`.
  - `formatPrecipitation(2.5)` retorna `"2.5 mm"`.
- **Rastreabilidade Spec:** RF2, RF3, RNF6
- **Dependências:** T-01
- **Arquivos:** `src/lib/format.ts`

### T-07: Criar Testes Unitários para Formatação de Datas
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/format.test.ts` garantindo formatação consistente de datas.
- **Critérios de Aceite:**
  - Valida a formatação em pt-BR de datas válidas em ISO.
  - Valida tratamento para strings de data inválidas/vazias sem quebrar com exceções não capturadas.
- **Rastreabilidade Spec:** RF3, RNF4, RNF6
- **Dependências:** T-06
- **Arquivos:** `tests/unit/format.test.ts`

---

## Entrega 2: Camada de Acesso a Dados (Services)

### T-08: Implementar Serviço de Integração HTTP Open-Meteo
- **Tipo:** Data
- **Descrição:** Criar `src/services/weatherService.ts` com métodos `fetchCitySuggestions` (Geocoding API) e `fetchWeatherData` (Forecast API), com suporte a cancelamento de requisição via `AbortController` (timeout de 10s).
- **Critérios de Aceite:**
  - `fetchCitySuggestions('São Paulo')` efetua `GET` em `https://geocoding-api.open-meteo.com/v1/search?name=S%C3%A3o%20Paulo&count=5&language=pt&format=json` e retorna array com até 5 objetos `City`.
  - `fetchWeatherData(-23.5475, -46.6361)` efetua `GET` em `https://api.open-meteo.com/v1/forecast` com `current` e `daily` configurados, retornando objeto compativel com `CurrentWeather` e `ForecastDay[]` (exactamente 5 dias).
  - Se a resposta HTTP for $\ne 200$ ou o sinal de `AbortController` (10s) expirar, lança um `Error` com mensagem amigável em pt-BR.
  - Em respostas parciais, utiliza valores padrão seguros (ex: `precipitation ?? 0`).
- **Rastreabilidade Spec:** RF1, RF2, RF3, RNF4, RNF5 (AC1.1, AC2.1, AC3.1)
- **Dependências:** T-01
- **Arquivos:** `src/services/weatherService.ts`

### T-09: Criar Testes Unitários do Serviço de Dados com Mocks de Fetch
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/weatherService.test.ts` para validar o serviço de dados isoladamente.
- **Critérios de Aceite:**
  - Mocka `global.fetch` para simular resposta 200 de Geocoding com 3 cidades e valida o retorno do array `City[]`.
  - Mocka `global.fetch` para simular resposta de erro HTTP 500 e valida se a promessa é rejeitada com mensagem de erro tratada.
  - Mocka resposta com `results: []` e valida o retorno de array vazio sem lançar erro.
  - Simula timeout abortado e valida o lançamento de mensagem `"A requisição demorou muito para responder"`.
- **Rastreabilidade Spec:** RF1, RF5, RNF4
- **Dependências:** T-08
- **Arquivos:** `tests/unit/weatherService.test.ts`

---

## Entrega 3: Gestão de Estado e Orquestração (Hooks)

### T-10: Implementar Custom Hook `useWeather` para Gerenciamento de Estado
- **Tipo:** Data
- **Descrição:** Criar `src/hooks/useWeather.ts` gerenciando a máquina de estados (`idle`, `loading`, `success`, `error`), a cidade ativa, os dados meteorológicos (`weatherData`), a unidade (°C / °F) e as funções de ação (`searchCities`, `selectCity`, `toggleUnit`, `retry`).
- **Critérios de Aceite:**
  - Estado inicial `status` é `'idle'` e `unit` é `'celsius'`.
  - `toggleUnit()` altera `unit` de `'celsius'` para `'fahrenheit'` (e vice-versa) mantendo os mesmos dados em `weatherData` e sem acionar o `fetch`.
  - `selectCity(city)` altera `status` para `'loading'`, chama `weatherService.fetchWeatherData` e altera `status` para `'success'` armazenando o resultado.
  - Em caso de falha no `selectCity`, o `status` muda para `'error'` e `errorMessage` é preenchido.
  - `retry()` chama `selectCity` usando a última cidade selecionada.
- **Rastreabilidade Spec:** RF1, RF4, RF5 (AC4.1, AC4.2, AC5.1, AC5.2, AC5.3)
- **Dependências:** T-01, T-02, T-08
- **Arquivos:** `src/hooks/useWeather.ts`

---

## Entrega 4: Componentes de Interface do Usuário (UI)

### T-11: Criar Componentes de Estado Inicial e Carregamento (EmptyState, LoadingState)
- **Tipo:** UI
- **Descrição:** Criar `src/components/states/EmptyState.tsx` e `src/components/states/LoadingState.tsx` no tema dark glassmorphism.
- **Critérios de Aceite:**
  - `EmptyState.tsx` renderiza mensagem `"Busque por uma cidade para ver o clima"` em container com estilos Tailwind glassmorphism.
  - `LoadingState.tsx` renderiza pelo menos 1 skeleton loader para o clima atual e 5 skeleton cards para a previsão de 5 dias.
  - Componentes contêm atributos acessíveis (ex: `aria-busy="true"` no LoadingState).
- **Rastreabilidade Spec:** RF5, RNF2, RNF3 (AC5.1, AC5.2)
- **Dependências:** T-01
- **Arquivos:** `src/components/states/EmptyState.tsx`, `src/components/states/LoadingState.tsx`

### T-12: Criar Componente de Estado de Erro com Botão Retry (ErrorState)
- **Tipo:** UI
- **Descrição:** Criar `src/components/states/ErrorState.tsx` para apresentar falhas de busca/rede e ação de tentativa nova.
- **Critérios de Aceite:**
  - Renderiza o texto de erro recebido via prop `message` (ou fallback amigável em pt-BR).
  - Renderiza botão com texto `"Tentar novamente"` que aciona o callback `onRetry` via clique ou tecla Enter/Space.
  - Possui `role="alert"` para leitores de tela.
- **Rastreabilidade Spec:** RF5, RNF3, RNF6 (AC5.3)
- **Dependências:** T-01
- **Arquivos:** `src/components/states/ErrorState.tsx`

### T-13: Criar Componente `UnitToggle`
- **Tipo:** UI
- **Descrição:** Criar `src/components/UnitToggle.tsx` para alternância visual de unidade de temperatura (°C / °F) com suporte a acessibilidade.
- **Critérios de Aceite:**
  - Renderiza dois botões interativos identificados com `"°C"` e `"°F"`.
  - Aplica estilo ativo/destacado no botão referente à `unit` recebida via prop.
  - Dispara `onUnitChange` ao clicar no botão inativo.
  - Botões possuem `aria-label="Alternar para Celsius"` e `aria-label="Alternar para Fahrenheit"`.
- **Rastreabilidade Spec:** RF4, RNF3 (AC4.1, AC4.2)
- **Dependências:** T-01, T-02
- **Arquivos:** `src/components/UnitToggle.tsx`

### T-14: Criar Testes Unitários do Componente `UnitToggle`
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/UnitToggle.test.tsx` testando renderização e acessibilidade do seletor.
- **Critérios de Aceite:**
  - Valida se o botão da unidade ativa está destacado com classe/atributo correspondente.
  - Simula evento de clique no botão inativo e valida se a prop `onUnitChange` é chamada com a nova unidade.
- **Rastreabilidade Spec:** RF4, RNF3
- **Dependências:** T-13
- **Arquivos:** `tests/unit/UnitToggle.test.tsx`

### T-15: Criar Componente `SearchBar` com Autocompletar
- **Tipo:** UI
- **Descrição:** Criar `src/components/SearchBar.tsx` com input de texto, autocompletar, dropdown de até 5 sugestões e navegação por teclado.
- **Critérios de Aceite:**
  - Input possui `type="text"`, placeholder `"Buscar cidade..."` e `aria-label="Buscar cidade por nome"`.
  - Exibe dropdown de sugestões quando a lista recebida via props contiver itens e o input tiver $\ge 2$ caracteres.
  - Cada item do dropdown exibe `"Cidade, Estado - País"` (ou `"Cidade, País"` quando sem estado).
  - Se a lista de sugestões for vazia durante a busca, exibe item desabilitado `"Nenhuma cidade encontrada"`.
  - Tecla `Esc` fecha o dropdown; setas `Cima/Baixo` navegam pelas sugestões e `Enter` seleciona o item.
- **Rastreabilidade Spec:** RF1, RNF2, RNF3 (AC1.1, AC1.2)
- **Dependências:** T-01
- **Arquivos:** `src/components/SearchBar.tsx`

### T-16: Criar Testes Unitários do Componente `SearchBar`
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/SearchBar.test.tsx` testando a interatividade do campo de busca.
- **Critérios de Aceite:**
  - Valida digitação no input e chamada da prop de busca após debounce.
  - Valida a renderização da lista de sugestões passada por props.
  - Valida a chamada do callback `onSelectCity` ao clicar em uma sugestão da lista.
- **Rastreabilidade Spec:** RF1, RNF3
- **Dependências:** T-15
- **Arquivos:** `tests/unit/SearchBar.test.tsx`

### T-17: Criar Componente de Clima Atual `CurrentWeather`
- **Tipo:** UI
- **Descrição:** Criar `src/components/CurrentWeather.tsx` para exibir a temperatura atual, condição climática com ícone, cidade/país, umidade, vento, pressão e precipitação.
- **Critérios de Aceite:**
  - Renderiza o nome da cidade e do país recebidos do objeto `City`.
  - Converte a temperatura usando `formatTemperature(data.current.temperature, unit)` e a exibe em destaque.
  - Renderiza a descrição da condição meteorológica em pt-BR e o ícone WMO.
  - Renderiza os 4 blocos de métricas secundárias: Umidade (%), Vento (km/h), Pressão (hPa) e Precipitação (mm).
  - Componente é adaptável a viewports mobile (a partir de 320px).
- **Rastreabilidade Spec:** RF2, RF4, RNF2 (AC2.1)
- **Dependências:** T-01, T-02, T-04, T-06
- **Arquivos:** `src/components/CurrentWeather.tsx`

### T-18: Criar Componente `ForecastCard` para Previsão Diária
- **Tipo:** UI
- **Descrição:** Criar `src/components/ForecastCard.tsx` para renderizar o card individual de um dia da previsão.
- **Critérios de Aceite:**
  - Exibe o dia da semana ou data formatada via `formatDayName` / `formatDate`.
  - Renderiza ícone e descrição da condição meteorológica WMO.
  - Exibe a temperatura mínima e máxima formatadas de acordo com a `unit` recebida por prop.
  - Exibe velocidade do vento (km/h) e probabilidade de chuva (%).
- **Rastreabilidade Spec:** RF3, RF4, RNF2 (AC3.1, AC3.2)
- **Dependências:** T-01, T-02, T-04, T-06
- **Arquivos:** `src/components/ForecastCard.tsx`

### T-19: Criar Componente `ForecastList` para Lista de 5 Dias
- **Tipo:** UI
- **Descrição:** Criar `src/components/ForecastList.tsx` para renderizar a coleção dos 5 cards diários.
- **Critérios de Aceite:**
  - Renderiza exatamente 5 elementos `ForecastCard`, um para cada dia da lista `forecast`.
  - Layout utiliza grid/flexbox responsivo com ajuste automático para não estourar em telas pequenas (320px).
  - Título da seção `"Previsão para 5 dias"` presente com tag semântica `<h2>`.
- **Rastreabilidade Spec:** RF3, RNF2, RNF3 (AC3.1)
- **Dependências:** T-18
- **Arquivos:** `src/components/ForecastList.tsx`

---

## Entrega 5: Integração da Aplicação e Layout Final

### T-20: Integrar Componentes e Hook no `App.tsx`
- **Tipo:** UI
- **Descrição:** Conectar o hook `useWeather` aos componentes de interface no arquivo raiz `src/App.tsx`.
- **Critérios de Aceite:**
  - Renderiza a `SearchBar` e o `UnitToggle` no cabeçalho/topo da aplicação.
  - Se `status === 'idle'`, renderiza `EmptyState`.
  - Se `status === 'loading'`, renderiza `LoadingState`.
  - Se `status === 'error'`, renderiza `ErrorState` passando a função `retry`.
  - Se `status === 'success'`, renderiza `CurrentWeather` e `ForecastList`.
  - Aplica o container principal com tema dark glassmorphism e largura máxima centralizada.
- **Rastreabilidade Spec:** RF1, RF2, RF3, RF4, RF5, RNF2
- **Dependências:** T-10, T-11, T-12, T-13, T-15, T-17, T-19
- **Arquivos:** `src/App.tsx`

### T-21: Criar Testes Unitários de Renderização do `App.tsx`
- **Tipo:** Test
- **Descrição:** Criar `tests/unit/App.test.tsx` testando o ciclo de renderização e troca de estados no App.
- **Critérios de Aceite:**
  - Valida se ao carregar a página inicialmente, a tela `EmptyState` é exibida.
  - Mocka o hook `useWeather` para simular estado `'loading'` e confirma a exibição de `LoadingState`.
  - Mocka o hook para simular estado `'error'` e confirma a exibição de `ErrorState`.
  - Mocka o hook para simular estado `'success'` e confirma a exibição de `CurrentWeather` e `ForecastList`.
- **Rastreabilidade Spec:** RF5, RNF6
- **Dependências:** T-20
- **Arquivos:** `tests/unit/App.test.tsx`

---

## Entrega 6: Testes E2E, Acessibilidade e Hardening

### T-22: Implementar Testes End-to-End com Playwright
- **Tipo:** Test
- **Descrição:** Criar suíte de testes E2E em `tests/e2e/weather.spec.ts` cobrindo os fluxos de ponta a ponta.
- **Critérios de Aceite:**
  - Teste 1 (Busca completa): Digitar `"São Paulo"`, clicar na primeira sugestão, assertar que o nome `"São Paulo"` e os cards de 5 dias aparecem na tela.
  - Teste 2 (Troca de unidade): Clicar no botão `"°F"`, assertar que os valores numéricos de temperatura no DOM mudaram para o formato em Fahrenheit sem recarregamento da página.
  - Teste 3 (Fluxo de erro): Simular rota com erro HTTP 500 (usando `page.route`), verificar se `ErrorState` aparece, clicar em `"Tentar novamente"`.
  - Teste 4 (Mobile Viewport): Executar os testes configurando viewport `375x667` e verificar se a página não possui rolagem horizontal (`scrollWidth <= clientWidth`).
- **Rastreabilidade Spec:** RF1, RF2, RF3, RF4, RF5, RNF1, RNF2, RNF4
- **Dependências:** T-20
- **Arquivos:** `tests/e2e/weather.spec.ts`

### T-23: Validação Final de Qualidade, Biome Linting, Acessibilidade e Build
- **Tipo:** Infra / Test
- **Descrição:** Executar verificações de acessibilidade, formatação e linting com Biome e garantir build de produção limpo.
- **Critérios de Aceite:**
  - Execução da regra `pnpm lint` retorna zero alertas ou erros no Biome.
  - Execução da regra `pnpm build` compila o código TypeScript em modo strict e gera a pasta `dist/` sem falhas.
  - Execução da regra `pnpm test` roda e aprova 100% dos testes unitários e de integração.
- **Rastreabilidade Spec:** RNF1, RNF2, RNF3, RNF4, RNF5, RNF6
- **Dependências:** T-21, T-22
- **Arquivos:** `biome.json`, `package.json`, todo o repositório

