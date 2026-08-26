
### 📋 Tarefa T-01: Definir Contratos e Tipos TypeScript Compartilhados

#### Contexto do Projeto
Estamos desenvolvendo o **Weather App** utilizando Spec-Driven Development (SDD). Esta é a primeira tarefa da camada de dados/contratos e servirá de fundação para todas as funções puras, serviços HTTP, hooks de estado e componentes de UI.

#### Objetivo
Criar o arquivo `src/types/weather.ts` definindo os tipos e interfaces TypeScript necessários para representar os dados meteorológicos obtidos via API Open-Meteo e os estados internos da aplicação.

#### Arquivos Envolvidos
- `src/types/weather.ts` (Criar novo arquivo)

#### Especificações Técnicas e Interfaces A Criar:

1. **`Unit`**:
   - `export type Unit = 'celsius' | 'fahrenheit';`
   
2. **`City`**:
   - `id`: `number` (ID único retornado pelo Geocoding)
   - `name`: `string` (Nome da cidade)
   - `latitude`: `number` (Coordenada de latitude)
   - `longitude`: `number` (Coordenada de longitude)
   - `country`: `string` (Nome do país)
   - `state?`: `string` (Estado/Região/Província `admin1`, se disponível)

3. **`CurrentWeather`**:
   - `temperature`: `number` (Temperatura atual sempre em °C)
   - `weatherCode`: `number` (Código de condição WMO)
   - `humidity`: `number` (Umidade relativa em %)
   - `windSpeed`: `number` (Velocidade do vento em km/h)
   - `pressure`: `number` (Pressão atmosférica em hPa)
   - `precipitation`: `number` (Precipitação acumulada em mm)

4. **`ForecastDay`**:
   - `date`: `string` (Data no formato ISO `YYYY-MM-DD`)
   - `tempMin`: `number` (Temperatura mínima do dia em °C)
   - `tempMax`: `number` (Temperatura máxima do dia em °C)
   - `weatherCode`: `number` (Código de condição WMO)
   - `windSpeed`: `number` (Velocidade do vento estimada em km/h)
   - `precipitationProb`: `number` (Probabilidade de chuva em %)

5. **`WeatherData`**:
   - `city`: `City`
   - `current`: `CurrentWeather`
   - `forecast`: `ForecastDay[]` (Array de exatamente 5 dias)

6. **`WeatherStatus`**:
   - `export type WeatherStatus = 'idle' | 'loading' | 'success' | 'error';`

#### Critérios de Aceite
- [ ] O arquivo `src/types/weather.ts` deve ser exportado corretamente sem erros.
- [ ] Todas as interfaces e tipos devem conter comentários curtos (JSDoc/TSDoc) explicando a finalidade de cada propriedade.
- [ ] O código deve respeitar a configuração `strict: true` do TypeScript.
- [ ] Executar o comando `pnpm build` ou `npx tsc --noEmit` deve passar com 0 erros de compilação.