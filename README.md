# Python Automation Center

**Operational Intelligence Platform** para simular automacoes corporativas com Python, tratamento de dados, BI, logs operacionais, relatorios e dashboard de eficiencia.

Desenvolvido por **Matheus Siqueira**  
Portfolio: <https://www.matheussiqueira.dev>

## Objetivo

Demonstrar uma central web interativa que transforma bases administrativas desorganizadas em dados tratados, auditaveis e prontos para tomada de decisao. O projeto foi criado para portfolio profissional e comunica dominio de automacao Python, qualidade de dados, ETL, Business Intelligence, UX e deploy moderno na Vercel.

## Funcionalidades

- Home orientada a produto com CTAs de demonstracao.
- Automation Marketplace com busca e filtros por categoria, status, impacto e complexidade.
- Detalhe de automacao com problema de negocio, KPIs, modo executivo/tecnico, rule engine, fila simulada, pipeline, progresso, timeline e logs.
- Comparacao antes/depois com Data Diff, celulas destacadas, resumo e regras aplicadas.
- Data Quality Score por dimensao, audit trail, risco/compliance e downloads.
- Dashboard executivo com KPIs, graficos Recharts, ranking, alertas, System Health e insights.
- Historico de execucoes com status, score, arquivos e responsaveis ficticios.
- Paginas Architecture e Case Study para explicar valor tecnico e produto.
- Relatorios simulados com preview e downloads.
- Route Handlers para automacoes, execucao, executions, relatorios, downloads e health.
- Scripts Python locais para gerar datasets e arquivos de exemplo.
- Testes para UI, calculos, insights, validadores, rule engine, data quality, endpoint de execucao e health.

## Tecnologias

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Recharts
- lucide-react
- zod
- date-fns
- Python 3 para geracao local de dados
- Vitest e Testing Library

## Estrutura

```txt
app/                 Rotas, layout, APIs, metadata, sitemap e estados
components/          Layout, automacoes, dashboard, relatorios e UI compartilhada
data/                JSONs simulados gerados por Python
lib/                 Tipos, calculos, formatadores, validadores, insights e reports
public/samples/      Arquivos CSV/JSON para downloads simulados
scripts/             Geradores locais de datasets
docs/adr/            Decisoes arquiteturais
tests/               Testes automatizados essenciais
```

## Automacoes disponiveis

1. Limpeza de planilhas administrativas
2. Consolidacao de multiplos arquivos
3. Geracao de relatorio executivo
4. Auditoria de qualidade de dados
5. Rotina financeira e operacional
6. Validacao de cadastros
7. Monitoramento de SLA
8. Padronizacao de relatorios mensais

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Gerar datasets com Python

```bash
python scripts/generate_datasets.py
python scripts/generate_reports.py
```

O script gera arquivos em `data/` e `public/samples/`. Python nao e dependencia de runtime em producao.

## Validacao

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm audit
```

## Deploy na Vercel

1. Importe o repositorio no painel da Vercel.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Output: padrao do Next.js.
5. Configure `NEXT_PUBLIC_SITE_URL` com a URL final do projeto.

## Limitacoes conhecidas

- Dados mockados e ficticios.
- Downloads simulados por arquivos estaticos.
- Execucao de automacao usa timers no client e Route Handlers leves.
- Processamento Python pesado deve ser externo ao runtime da Vercel.
- Observabilidade e health sao simulados, preparados para futura integracao com Vercel Analytics.

## Roadmap

- Upload opcional de CSV pequeno no client.
- Persistencia de historico em banco.
- Integracao com filas/workers para processamento real.
- Autenticacao para ambientes corporativos.
- Exportacao HTML/PDF mais completa.
- Analytics reais, tracing e storage de audit trail.

## Creditos

Desenvolvido por Matheus Siqueira  
https://www.matheussiqueira.dev
