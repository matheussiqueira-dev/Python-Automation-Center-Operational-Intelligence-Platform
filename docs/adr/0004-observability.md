# ADR 0004 - Observabilidade

## Status

Aceita.

## Contexto

O projeto precisa comunicar maturidade operacional sem depender de infraestrutura real, credenciais ou telemetria externa no MVP.

## Decisao

Criar observabilidade simulada com `GET /api/health`, painel `SystemHealthPanel`, logs operacionais, audit trail, metricas de sucesso, tempo medio de resposta e erros por categoria.

## Consequencias

- A aplicacao demonstra preocupacao com monitoramento e confiabilidade.
- Nenhuma chave real e exposta.
- Os dados sao controlados e versionados.
- A estrutura pode evoluir para Vercel Analytics, logs persistentes, tracing e alertas reais.
