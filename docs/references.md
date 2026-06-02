# Referencias

## Produto e arquitetura

- Next.js App Router para rotas, layouts e Route Handlers.
- Vercel como destino de deploy serverless e CDN.
- Python local para gerar datasets simulados antes do deploy.
- Recharts para graficos de dashboard.
- zod para validacao de payloads das APIs internas.
- Health endpoint e System Health Panel para observabilidade simulada.
- Rule Engine, Data Diff, Audit Trail e Risk Panel para demonstracao de governanca.

## Premissas de dados

- Todos os dados sao ficticios.
- CPFs e nomes sao exemplos simulados.
- Valores financeiros representam economia operacional hipotetica.
- Arquivos em `public/samples/` existem para demonstracao de download.

## Riscos controlados

- Sem credenciais no repositorio.
- Sem processamento Python longo no runtime da Vercel.
- Sem upload pesado como funcionalidade principal.
- APIs retornam payloads estruturados e tratam erros sem stack trace.
- Observabilidade preparada para integrar Vercel Analytics sem chaves reais no repositorio.
