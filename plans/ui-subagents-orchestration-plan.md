# Plano de Orquestracao de Subagentes — Entrega 03 (UI)

## Objetivo
Implementar toda a entrega de UI com subagentes, respeitando dependencias tecnicas e usando mock de clima enquanto a integracao definitiva com API nao estiver concluida/estabilizada.

## Fontes de verdade
- Spec: `specs/weather-app-spec.md`
- Plano tecnico: `plans/weather-app-plan.md`
- Backlog: `tasks/weather-app-tasks.md`
- Prompts de UI: `workshop/module-06-ui/prompts.md`

## Estrategia de mock-first
1. Manter os componentes desacoplados de fetch.
2. Concentrar dados de exemplo em um fixture de `WeatherData`.
3. Integrar estados da tela (idle/loading/empty/error/success) no `App.tsx` com dados mockados.
4. Trocar para o hook real (`useWeather`) somente quando API estiver pronta/estavel.

## Dependencias (DAG simplificado)
- P6.1 Tipos + fixture -> desbloqueia todas as tarefas de UI.
- P6.2 SearchBar -> independente apos P6.1.
- P6.3 UnitToggle -> independente apos P6.1.
- P6.4 CurrentWeather -> depende de P6.1 e utilitarios ja existentes (temperature/weatherCodes).
- P6.5 ForecastCard + ForecastList -> depende de P6.1 e utilitarios ja existentes (format/temperature/weatherCodes).
- P6.6 Estados (Loading/Error/Empty) -> depende de P6.1.
- P6.7 Integracao no App -> depende de P6.2, P6.3, P6.4, P6.5, P6.6.
- P6.8 Revisao de UI e a11y -> depende de P6.7.

## Ordem de execucao dos subagentes

### Fase A — Fundacao de dados para UI
Subagente: code
Entrada: P6.1
Saida esperada:
- Tipos alinhados para Unit, City, CurrentWeather, ForecastDay, WeatherData.
- Fixture de WeatherData com cidade, clima atual e 5 dias.
- Ajustes minimos de compatibilidade nos consumidores de tipo, se necessario.

Prompt sugerido para runSubagent:
- Implementar P6.1 de workshop/module-06-ui/prompts.md.
- Usar mock de clima para desenvolvimento de UI.
- Nao integrar API nesta fase.
- Garantir build sem erro de tipagem.

Gate de qualidade da fase:
- Typecheck verde.
- App compila.

### Fase B — Componentes atomicos de UI
Subagente: code (execucoes separadas)
Entradas:
- P6.2 SearchBar
- P6.3 UnitToggle
- P6.4 CurrentWeather
- P6.5 ForecastList + ForecastCard
- P6.6 Estados
Saida esperada:
- Todos os componentes implementados com Tailwind dark glassmorphism.
- Acessibilidade minima (labels, roles, aria-pressed, status/alert).

Prompt sugerido para cada rodada:
- Implementar somente a tarefa Pi.j especificada.
- Nao extrapolar escopo.
- Manter props tipadas e sem any.
- Nao acoplar fetch em componentes.

Gate de qualidade da fase:
- Lint sem erros.
- Build sem erros.
- Testes de componentes existentes continuam passando.

### Fase C — Integracao de tela com mock
Subagente: code
Entrada: P6.7
Saida esperada:
- Header com marca, SearchBar e UnitToggle.
- Conteudo alternando corretamente entre idle/loading/empty/error/success.
- Render de CurrentWeather + ForecastList no estado success usando fixture mock.

Prompt sugerido para runSubagent:
- Implementar P6.7 com mock-first.
- Manter unidade (celsius/fahrenheit) apenas como estado de UI.
- Conversao de temperatura somente na renderizacao.

Gate de qualidade da fase:
- Fluxo visual completo navegavel sem API real.
- Responsividade de 320px ate desktop.

### Fase D — Revisao tecnica e endurecimento de UI
Subagentes: review, depois code, depois test
Entrada: P6.8
Saida esperada:
- Lista priorizada de melhorias de a11y e responsividade.
- Correcoes aplicadas para os itens criticos.
- Validacao final automatizada.

Orquestracao:
1) review analisa riscos e lacunas.
2) code aplica correcoes de maior impacto.
3) test valida suite e, se necessario, adiciona/ajusta testes de UI.

Gate de qualidade da fase:
- pnpm lint
- pnpm build
- pnpm test

## Template de orquestracao (copiar e adaptar)
1. Rodar subagente code para tarefa alvo (uma tarefa por vez).
2. Validar diff e aderencia aos criterios de aceite da tarefa.
3. Executar lint/build/test.
4. Se falhar, rerodar code com foco no erro.
5. Ao fim da fase, rodar review para auditoria.

## Politica de rollback e seguranca
- Nunca misturar duas tarefas Pi.j na mesma execucao do subagente code.
- Se uma rodada gerar regressao grande, reverter somente o que foi produzido naquela rodada.
- Nao alterar contratos de dominio sem atualizar todos os consumidores afetados.

## Criterio de conclusao da Entrega 03 (UI)
- P6.1 a P6.8 concluidas.
- UI funcional ponta a ponta em modo mock-first.
- Acessibilidade minima implementada e revisada.
- Lint/build/test verdes.