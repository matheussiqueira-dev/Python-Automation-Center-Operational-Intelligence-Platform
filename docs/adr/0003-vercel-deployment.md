# ADR 0003 - Deploy na Vercel

## Status

Aceita.

## Contexto

O projeto deve ser Vercel-ready e nao pode depender de tarefas Python longas durante requisicoes.

## Decisao

Executar Python apenas localmente para gerar artefatos versionados. Em producao, usar Next.js, arquivos estaticos e Route Handlers para simulacoes leves, validacoes e respostas estruturadas.

## Consequencias

- O build permanece simples e compativel com Vercel.
- Serverless Functions recebem apenas payloads pequenos.
- Nao ha credenciais ou dados sensiveis no repositorio.
- Futuras integracoes de processamento real devem usar banco, filas, workers ou servicos externos.
