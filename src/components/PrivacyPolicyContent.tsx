import { Link } from "@tanstack/react-router";

export function PrivacyPolicyContent({ email }: { email: string }) {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
      <section aria-labelledby="pp-1">
        <h3 id="pp-1" className="mb-1 font-display text-base font-semibold text-foreground">
          1. Quem somos
        </h3>
        <p>
          Este site é mantido por{" "}
          <strong className="text-foreground">Antônio Sardinha — Consultor Fitness</strong>,
          responsável pelo tratamento dos dados pessoais aqui coletados, em conformidade com a{" "}
          <strong className="text-foreground">
            Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)
          </strong>
          . Para qualquer solicitação relacionada aos seus dados, entre em contato pelo e-mail{" "}
          <a
            href={`mailto:${email}`}
            className="text-primary underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            {email}
          </a>
          .
        </p>
      </section>
      <section aria-labelledby="pp-2">
        <h3 id="pp-2" className="mb-1 font-display text-base font-semibold text-foreground">
          2. Dados que coletamos
        </h3>
        <p>
          Coletamos apenas os dados que você nos fornece voluntariamente ao preencher nosso
          formulário de contato, como{" "}
          <strong className="text-foreground">
            nome, e-mail e a descrição do seu objetivo/projeto
          </strong>
          . Também podemos coletar dados técnicos de navegação (páginas visitadas, tipo de
          dispositivo, navegador e origem de acesso) por meio de cookies opcionais.
        </p>
      </section>
      <section aria-labelledby="pp-3">
        <h3 id="pp-3" className="mb-1 font-display text-base font-semibold text-foreground">
          3. Finalidade do uso
        </h3>
        <p>Utilizamos seus dados exclusivamente para:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Responder à sua solicitação de contato e enviar orçamentos.</li>
          <li>Encaminhar informações sobre equipamentos, condições comerciais e prazos.</li>
          <li>Melhorar a experiência de navegação e a qualidade do site.</li>
        </ul>
        <p className="mt-2">
          Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins comerciais.
        </p>
      </section>
      <section aria-labelledby="pp-4">
        <h3 id="pp-4" className="mb-1 font-display text-base font-semibold text-foreground">
          4. Cookies utilizados
        </h3>
        <ul className="mt-1 list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Necessários:</strong> essenciais para o
            funcionamento do site, como salvar suas preferências de consentimento. Não podem ser
            desativados.
          </li>
          <li>
            <strong className="text-foreground">Analytics:</strong> nos ajudam a entender como o
            site é usado, de forma agregada e anônima. Requerem seu consentimento.
          </li>
          <li>
            <strong className="text-foreground">Marketing:</strong> permitem personalizar campanhas
            e mensurar resultados. Requerem seu consentimento.
          </li>
        </ul>
      </section>
      <section aria-labelledby="pp-5">
        <h3 id="pp-5" className="mb-1 font-display text-base font-semibold text-foreground">
          5. Seus direitos (LGPD)
        </h3>
        <p>
          Você pode, a qualquer momento, solicitar a confirmação do tratamento, acesso, correção,
          anonimização, portabilidade, eliminação ou revogação do consentimento dos seus dados
          pessoais. Basta enviar um e-mail para{" "}
          <a
            href={`mailto:${email}`}
            className="text-primary underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            {email}
          </a>
          .
        </p>
      </section>
      <section aria-labelledby="pp-6">
        <h3 id="pp-6" className="mb-1 font-display text-base font-semibold text-foreground">
          6. Envio do formulário
        </h3>
        <p>
          Os dados enviados pelo formulário de contato são transmitidos por meio do serviço
          FormSubmit para entrega do e-mail ao nosso endereço. Não armazenamos essas informações em
          banco de dados próprio.
        </p>
      </section>
      <section aria-labelledby="pp-7">
        <h3 id="pp-7" className="mb-1 font-display text-base font-semibold text-foreground">
          7. Alterações
        </h3>
        <p>
          Esta política pode ser atualizada periodicamente. Recomendamos revisá-la sempre que
          utilizar o site.
        </p>
      </section>
      <p className="pt-2 text-xs">
        <Link
          to="/"
          className="text-primary underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          ← Voltar para a página inicial
        </Link>
      </p>
    </div>
  );
}