# Arquitetura frontend

O projeto adota organização por responsabilidade e por feature, mantendo as dependências apontadas para o centro da aplicação.

## Camadas

- `app/`: composição global, providers, router e bootstrap.
- `features/`: casos de uso completos (landing, leads e consentimento), com seus componentes, hooks e serviços.
- `entities/`: regras e tipos de negócio sem dependência de interface.
- `shared/`: UI reutilizável, utilitários e integrações técnicas.
- `routes/`: adaptadores finos do TanStack Router; não deve concentrar regra de negócio.

## Regras de dependência

`routes -> features -> entities`, enquanto `shared` oferece infraestrutura genérica. Entidades não importam React, router, Supabase ou componentes. Providers globais ficam em `app/providers`; estado local continua local quando não há consumidores distantes.

## Evolução incremental

O arquivo legado da landing deve ser extraído seção por seção para `features/landing/sections`, com dados estáticos em `features/landing/content` e envio de formulário em `features/leads`. Cada extração deve preservar a rota funcional e ser validada por lint e build, evitando uma reescrita ampla difícil de revisar.

## Princípios

- responsabilidade única para componentes e hooks;
- interfaces pequenas para integrações externas;
- inversão de dependência nos serviços de domínio;
- componentes de apresentação recebem dados por props;
- Context é reservado a estado transversal, como tema e sessão;
- nomes de domínio prevalecem sobre nomes técnicos genéricos.
