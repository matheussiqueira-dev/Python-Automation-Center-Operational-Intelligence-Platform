# ADR 0002 - Estrategia de dados simulados

## Status

Aceita.

## Contexto

A plataforma deve demonstrar rotinas Python e BI sem expor dados reais ou depender de processamento pesado em producao.

## Decisao

Usar datasets ficticios gerados por `scripts/generate_datasets.py`. Os arquivos finais ficam em `data/` e `public/samples/`, sendo consumidos pela aplicacao como JSON/CSV estaticos.

## Consequencias

- O projeto e reproduzivel localmente.
- A Vercel entrega dados estaticos e APIs leves, sem Python em runtime.
- O dominio de Python aparece no pipeline de preparacao de dados.
- A estrutura permite trocar JSON por banco ou API externa no futuro.
- Limites conhecidos ficam claros: as execucoes sao simuladas e nao processam dados reais.
