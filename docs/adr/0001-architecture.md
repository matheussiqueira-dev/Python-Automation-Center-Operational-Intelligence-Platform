# ADR 0001 - Arquitetura da aplicacao

## Status

Aceita.

## Contexto

O projeto precisa parecer um produto real de portfolio, com experiencia interativa, rotas publicas, APIs internas leves, dashboard e documentacao.

## Decisao

Usar Next.js com App Router, TypeScript e Tailwind CSS. A UI e composta por paginas server-side e ilhas client-side apenas para interatividade, como filtros, simulacao de execucao, tabelas com abas e graficos.

## Consequencias

- O App Router organiza paginas, layout, metadata, sitemap e Route Handlers no mesmo modelo.
- TypeScript reduz risco em contratos de automacoes, logs, insights e downloads.
- Tailwind acelera a construcao visual sem criar dependencias de UI pesadas.
- Dados mockados mantem a aplicacao rapida, segura e pronta para Vercel.
- Processamento pesado fica separado da interface e pode evoluir para workers externos.
