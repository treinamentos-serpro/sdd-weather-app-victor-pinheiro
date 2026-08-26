# Discovery — Weather App

## Contexto

A empresa solicitou uma aplicação web de previsão do tempo para permitir que
usuários consultem as condições meteorológicas de cidades de seu interesse. A
experiência deve atender tanto ao uso em computadores quanto em dispositivos
móveis, com foco em consulta rápida e leitura clara das informações.

O produto precisa combinar busca de cidades, visualização do clima atual,
previsão para cinco dias e alternância entre as unidades Celsius e Fahrenheit.
Como o briefing não define autenticação, personalização ou integração com
outros produtos, o escopo inicial deve permanecer concentrado na consulta
meteorológica.

## Requisitos Funcionais

- **RF01 — Buscar cidade:** o usuário deve poder informar o nome de uma cidade
  e iniciar uma busca.
- **RF02 — Selecionar cidade:** quando houver mais de um resultado compatível,
  o sistema deve apresentar opções suficientemente identificadas para que o
  usuário escolha a cidade correta, considerando ao menos nome e país ou
  região quando disponíveis.
- **RF03 — Exibir clima atual:** após a seleção de uma cidade, o sistema deve
  exibir as condições atuais, incluindo temperatura e uma descrição ou ícone
  representativo do estado do tempo.
- **RF04 — Exibir previsão:** o sistema deve exibir a previsão dos próximos
  cinco dias, incluindo o dia ou data e temperaturas ou condições relevantes
  para cada dia.
- **RF05 — Alternar unidade:** o usuário deve poder alternar entre Celsius e
  Fahrenheit.
- **RF06 — Atualizar valores:** ao alterar a unidade, os valores meteorológicos
  exibidos devem ser convertidos e atualizados de forma consistente.
- **RF07 — Tratar estados da consulta:** o sistema deve comunicar ao usuário
  os estados de carregamento, resultado vazio e erro de busca ou de serviço,
  apresentando uma orientação para tentar novamente quando aplicável.
- **RF08 — Repetir consulta:** o usuário deve poder realizar uma nova busca
  sem precisar reiniciar a aplicação.

## Requisitos Não-Funcionais

- **RNF01 — Responsividade:** a interface deve funcionar em dispositivos móveis,
  tablets e desktops, mantendo conteúdo legível e controles utilizáveis.
- **RNF02 — Acessibilidade:** a aplicação deve oferecer navegação por teclado,
  foco visível, contraste adequado, rótulos compreensíveis e estrutura
  semântica compatível com tecnologias assistivas.
- **RNF03 — Desempenho:** a busca e a apresentação dos dados devem ocorrer com
  baixa latência dentro das condições normais da rede, com resposta apresentada
  em até 2 segundos no percentil p95 e feedback visual imediato enquanto a
  resposta é aguardada.
- **RNF04 — Disponibilidade e resiliência:** a interface deve permanecer
  utilizável quando a fonte de dados estiver indisponível, com timeout,
  tratamento de falhas e possibilidade de nova tentativa sem quebrar a
  aplicação.
- **RNF05 — Compatibilidade:** o produto deve funcionar nas versões modernas
  dos principais navegadores, definidas como as duas versões estáveis mais
  recentes, e em larguras de tela entre 320 px e 1920 px.
- **RNF06 — Segurança e privacidade:** a aplicação deve evitar exposição de
  dados sensíveis, não solicitar informações pessoais desnecessárias e
  proteger entradas e chamadas à fonte de dados contra uso indevido.
- **RNF07 — Clareza visual:** temperaturas, condições, datas e unidades devem
  ser apresentadas de forma consistente e fácil de comparar.
- **RNF08 — Manutenibilidade:** regras de conversão, tratamento de estados e
  acesso aos dados devem ser organizados de modo testável e independente da
  camada visual.
- **RNF09 — Observabilidade:** falhas de consulta, tempos de resposta e
  indisponibilidade da fonte de dados devem ser registrados para diagnóstico,
  sem incluir dados pessoais desnecessários.
- **RNF10 — Testabilidade:** regras de conversão, integração com a fonte de
  dados e estados de carregamento, erro e vazio devem poder ser validados por
  testes automatizados.
- **RNF11 — Localização:** datas, horários e condições devem respeitar o
  português do Brasil e o fuso horário da cidade consultada.
- **RNF12 — Controle de requisições:** a aplicação deve reduzir chamadas
  redundantes à fonte de dados por meio de debounce na busca e tratamento de
  limites de requisição.

## Riscos

| Tipo | Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|---|
| Técnico | Rate limiting ou custo inesperado da API | Média | Alto | Aplicar debounce, cache e limites de requisição; monitorar cotas e custos. |
| Técnico | Indisponibilidade da Open-Meteo | Média | Alto | Definir timeout, mensagens de erro, retry controlado e monitoramento do serviço. |
| Técnico | Falha ou lentidão da rede do usuário | Alta | Alto | Exibir loading, tratar timeout e permitir nova tentativa; avaliar cache local. |
| Técnico | Respostas incompletas ou incompatíveis da API | Média | Alto | Validar o contrato, tratar campos ausentes e cobrir o parser com testes. |
| Técnico | Dados meteorológicos desatualizados | Média | Médio | Informar o horário da atualização e definir uma política de cache e atualização. |
| Técnico | Conversão ou arredondamento incorreto entre unidades | Média | Médio | Centralizar a regra de conversão e cobri-la com testes de valores-limite. |
| Produto | Resultado incorreto para cidades com o mesmo nome | Alta | Alto | Exibir país, região e coordenadas quando disponíveis; exigir seleção explícita. |
| Produto | Previsão de cinco dias interpretada de forma diferente | Média | Alto | Registrar a definição de hoje mais quatro dias e exibir datas claramente. |
| Produto | Experiência inconsistente entre mobile e desktop | Média | Alto | Validar fluxos prioritários em diferentes larguras e testar em dispositivos reais. |
| Produto | Informações ou ícones pouco compreensíveis | Média | Médio | Usar linguagem simples, descrições textuais e testes de usabilidade. |
| Produto | Diferenças de idioma, fuso horário ou formato de data | Média | Médio | Fixar o locale pt-BR, usar o fuso da cidade e testar datas próximas à meia-noite. |

## Personas e Objetivos

- **Ana, profissional que decide a roupa do dia:** consulta rapidamente o
  clima atual pelo celular antes de sair de casa. Seu objetivo é obter uma
  resposta clara em poucos segundos, com temperatura e condição do tempo.
  **Métrica de sucesso:** visualizar o clima atual em até 2 segundos após a
  consulta.
- **Bruno, viajante que planeja a semana:** usa o desktop ou o celular para
  comparar a previsão de cinco dias de uma cidade que visitará. Seu objetivo é
  identificar variações de temperatura e escolher os dias mais adequados para
  suas atividades. **Métrica de sucesso:** visualizar cinco dias completos e
  identificar máxima e mínima de cada dia sem nova consulta.
- **Carla, usuária internacional:** alterna entre Celsius e Fahrenheit conforme
  o país da cidade consultada. Seu objetivo é interpretar os dados sem fazer
  conversões manuais e sem perder a unidade selecionada durante a consulta.
  **Métrica de sucesso:** alternar a unidade e obter todos os valores
  convertidos corretamente em uma única ação.

## Perguntas em Aberto

As perguntas abaixo estão marcadas como **Resolvida** quando cobertas por uma
decisão deste discovery; as demais permanecem **Pendente** para a
especificação detalhada.

1. **Resolvida — Fonte de dados:** qual serviço será utilizado? Ele oferece geocodificação
  e previsão, exige chave, impõe limites de uso ou tem custo? **Impacto:** uma
  decisão tardia pode exigir refazer a integração, o modelo de dados e o
  orçamento do produto.
2. **Resolvida — Definição de cinco dias:** a previsão inclui hoje ou representa cinco dias
  futuros completos? Será diária ou horária? **Impacto:** a resposta altera a
  consulta à API, o número de componentes e a expectativa do usuário.
3. **Pendente — Dados exibidos:** quais campos são obrigatórios no clima atual e na
  previsão: máxima, mínima, sensação térmica, chuva, vento, umidade e horário
  de atualização? **Impacto:** sem essa decisão, não é possível fechar o layout,
  os contratos de dados nem os critérios de aceite.
4. **Resolvida — Unidade padrão:** Celsius ou Fahrenheit deve ser usado na primeira visita?
  **Impacto:** afeta a experiência inicial, a comunicação com usuários de
  diferentes regiões e os testes de conversão.
5. **Resolvida — Persistência da preferência:** a unidade escolhida deve ser mantida entre
  sessões? Será armazenada apenas no dispositivo ou haverá conta de usuário?
  **Impacto:** pode introduzir requisitos de armazenamento, autenticação,
  privacidade e suporte que não estão previstos no escopo.
6. **Resolvida — Idioma e localização:** qual idioma ou conjunto de idiomas será suportado?
  Como serão tratados fuso horário, nomes de cidades e formatos de data?
  **Impacto:** decisões tardias podem exigir internacionalização estrutural e
  alterar textos, APIs e componentes de data.
7. **Resolvida — Geolocalização:** a aplicação deve solicitar a localização automática do
  dispositivo ou depender apenas da busca explícita? **Impacto:** muda o fluxo
  de entrada, exige permissões e cria implicações adicionais de privacidade.
8. **Pendente — Escopo da busca:** serão aceitos apenas nomes de cidades ou também
  coordenadas, códigos postais e sugestões enquanto o usuário digita?
  **Impacto:** afeta o componente de busca, a estratégia de geocodificação e o
  volume de requisições à API.
9. **Pendente — Falhas e offline:** qual comportamento é esperado sem conexão, após timeout,
  em caso de rate limiting ou quando a cidade não for encontrada? Deve haver
  cache ou exibição do último resultado? **Impacto:** sem essa definição, a
  experiência de erro será inconsistente e a resiliência ficará indefinida.
10. **Pendente — Acessibilidade e compatibilidade:** quais critérios formais, versões de
   navegadores e dispositivos devem ser atendidos? **Impacto:** corrigir
   acessibilidade ou compatibilidade apenas no final pode exigir mudanças
   estruturais e ampliar o custo de testes.
11. **Pendente — Metas operacionais:** quais são os objetivos de desempenho,
   disponibilidade, volume de acessos e limite de custo da fonte de dados?
   **Impacto:** sem metas não há como dimensionar a solução, escolher cache ou
   verificar se o produto atende ao nível de serviço esperado.
12. **Pendente — Evolução do produto:** favoritos, histórico, alertas meteorológicos,
   compartilhamento ou previsão por hora estão previstos para uma fase futura?
   **Impacto:** conhecer a direção evita decisões de arquitetura que bloqueiem
   extensões ou causem retrabalho.

## Decisões

- **Fonte de dados: Open-Meteo, sem API key.** A escolha reduz a complexidade de
  configuração e o risco de expor credenciais no cliente, além de oferecer
  geocodificação e previsão meteorológica para o escopo inicial. **Resolve:** a
  pergunta 1 sobre provedor, chave e capacidade de integração.
- **Cinco dias = hoje mais os quatro dias seguintes.** Essa definição elimina
  a ambiguidade do intervalo e permite uma previsão diária simples de consultar
  e apresentar. **Resolve:** a pergunta 2 sobre o intervalo e a periodicidade
  da previsão.
- **Unidade padrão: Celsius.** É a unidade padrão para o público inicial em
  português do Brasil; o usuário ainda poderá alternar para Fahrenheit.
  **Resolve:** a pergunta 4 sobre a unidade inicial.
- **Sem autenticação e sem persistência de servidor.** O primeiro lançamento
  será uma consulta pública, sem contas ou dados pessoais armazenados no
  backend, reduzindo escopo e responsabilidades de privacidade. **Resolve:** a
  pergunta 5 sobre conta e armazenamento no servidor.
- **Idioma da interface: português do Brasil (pt-BR).** A decisão orienta
  textos, formatos de data e mensagens da experiência inicial. **Resolve:** a
  pergunta 6 sobre idioma e localização da interface.
- **Busca explícita, sem geolocalização automática no primeiro lançamento.** A
  aplicação não solicitará permissão de localização; isso mantém o fluxo
  previsível e reduz dependências de privacidade e dispositivo. **Resolve:** a
  pergunta 7 sobre permissões e localização automática.
- **Previsão diária no primeiro lançamento.** O produto exibirá temperaturas e
  condições por dia, sem previsão horária, mantendo a interface adequada ao
  objetivo de planejamento da semana. **Resolve:** a pergunta 2 sobre
  periodicidade e delimita a pergunta 3 sobre os dados exibidos.

## Suposições

- O produto inicial será uma aplicação web responsiva, sem necessidade de
  instalação nativa.
- O usuário consultará uma cidade por vez e poderá substituí-la por uma nova
  busca.
- A Open-Meteo fornecerá informações atuais, geocodificação e uma previsão
  diária de pelo menos cinco dias sem exigir chave de API.
- O sistema terá acesso à internet no momento da consulta e não dependerá de
  dados meteorológicos offline.
- A unidade escolhida se aplica ao clima atual e à previsão exibida na tela.
- A conversão entre Celsius e Fahrenheit será feita de maneira consistente,
  com arredondamento definido pela especificação técnica.
- Não haverá autenticação, cadastro, pagamentos ou persistência de dados em
  servidor no primeiro lançamento.
- A interface inicial será disponibilizada em português do Brasil.
- O escopo inicial não inclui alertas, notificações, mapas, favoritos,
  histórico ou previsão por hora.
- A localização da cidade será determinada pela busca explícita do usuário,
  sem exigir acesso à localização do dispositivo.

## Pendências para a Especificação

Antes de detalhar arquitetura, contratos e critérios de aceite, devem ser
definidos:

- campos obrigatórios do clima atual e da previsão;
- endpoints, parâmetros, unidades, códigos meteorológicos e tratamento de
  campos ausentes da Open-Meteo;
- comportamento da busca, incluindo autocomplete, acentos, paginação e limite
  de resultados;
- política para offline, cache, dados antigos, timeout, retry e rate limiting;
- se a preferência de unidade será mantida apenas durante a sessão ou também
  localmente no dispositivo;
- metas mensuráveis de desempenho e disponibilidade, incluindo condições de
  rede e dispositivo usadas nos testes;
- padrão de acessibilidade, matriz de navegadores e dispositivos suportados;
- estratégia de observabilidade e destino dos registros de falha e latência.

## Resumo Executivo

O Weather App permitirá consultar rapidamente o clima atual e a previsão de cinco dias para qualquer cidade.
A experiência será responsiva, acessível e estará disponível em português do Brasil para computadores e celulares.
Os usuários poderão alternar entre Celsius e Fahrenheit sem criar conta ou fornecer dados pessoais.
Open-Meteo será a fonte de dados, enquanto estados de carregamento, erro e ausência de resultados orientarão o usuário.
Antes da especificação detalhada, ainda precisam ser fechados os campos exibidos, a política de cache e os critérios operacionais.