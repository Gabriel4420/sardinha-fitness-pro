# Estratégia para evitar a pausa do Supabase

Projetos no plano Free podem ser pausados quando apresentam pouca atividade ao
longo de sete dias. Este repositório executa uma consulta de leitura pequena na
tabela pública `products` a cada seis horas por meio do GitHub Actions.

## Configuração

Em **GitHub > Settings > Secrets and variables > Actions**, crie:

- `SUPABASE_URL`: a URL do projeto, como `https://xxxx.supabase.co`;
- `SUPABASE_PUBLISHABLE_KEY`: a chave publicável usada em
  `VITE_SUPABASE_PUBLISHABLE_KEY` (não use a `service_role`).

Depois, abra **Actions > Supabase keep-alive > Run workflow**. A execução deve
terminar com sucesso. As execuções agendadas começam após o workflow chegar à
branch padrão.

## Por que esta abordagem

- realiza uma consulta real ao Postgres, que conta como atividade do banco;
- usa apenas leitura permitida pela RLS e uma chave que já é pública no site;
- não insere registros falsos nem depende de visitantes;
- repete tentativas em falhas transitórias e deixa a falha visível no Actions.

## Operação e limites

Confira mensalmente se o workflow continua habilitado e consulte os e-mails da
conta proprietária do Supabase. Se o GitHub desabilitar workflows agendados por
inatividade do repositório, reative-o em **Actions** ou configure um monitor
externo (por exemplo, Better Stack ou UptimeRobot) para consultar o mesmo
endpoint.

Essa automação reduz o risco no plano Free, mas não é uma garantia contratual.
Para um projeto de produção que não pode ficar indisponível, use o plano Pro:
projetos pagos não estão sujeitos à pausa automática por inatividade.

Referência oficial:
https://supabase.com/docs/guides/platform/free-project-pausing
