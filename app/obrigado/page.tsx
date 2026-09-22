import type { Metadata } from "next";
import Link from "next/link";
import { Download, KeyRound, Mail, Sparkles } from "lucide-react";
import "./obrigado.css";

const MEMBERS_LOGIN_URL = "https://dashboard.kiwify.com.br/login";

export const metadata: Metadata = {
  title: "Compra confirmada | Guias Místicos",
  description: "Obrigado pela compra! Veja como acessar seus 2 guias digitais.",
  robots: { index: false, follow: false },
};

const steps = [
  { icon: Mail, title: "Abra seu e-mail", text: "A Kiwify envia uma mensagem para o e-mail usado na compra com os dados de acesso aos seus guias." },
  { icon: KeyRound, title: "Entre na área de membros", text: "Use o login e a senha recebidos. Se preferir, clique em \"Esqueceu a senha?\" para criar uma nova." },
  { icon: Download, title: "Baixe os 2 livros", text: "Os PDFs do Guia Místico das Ervas e de A Sabedoria dos Cristais ficam disponíveis para baixar e ler no celular, tablet ou computador." },
];

export default function ThankYou() {
  return (
    <main className="thanks">
      <section className="thanks-hero">
        <div className="thanks-copy">
          <div className="eyebrow"><Sparkles size={14} aria-hidden="true" />Compra confirmada</div>
          <h1>Obrigado! <em>Seus guias já são seus.</em></h1>
          <p className="thanks-lead">Sua jornada pelo universo dos cristais e das ervas começa agora. Siga os passos abaixo para acessar os dois livros digitais.</p>
          <a className="cta" href={MEMBERS_LOGIN_URL} target="_blank" rel="noopener noreferrer"><span>ACESSAR MEUS GUIAS</span><span aria-hidden="true">→</span></a>
        </div>
        <div className="thanks-visual">
          <img src="/assets/hero-books.webp" alt="Os dois guias digitais ilustrados" width="1024" height="1280" />
        </div>
      </section>

      <section className="section thanks-steps">
        <div className="section-heading">
          <div className="eyebrow"><Sparkles size={14} aria-hidden="true" />Como acessar</div>
          <h2>Em 3 passos simples</h2>
        </div>
        <ol className="thanks-grid">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="thanks-step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={26} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section thanks-help">
        <div className="thanks-help-card">
          <h2>Não encontrou o e-mail?</h2>
          <ul>
            <li>Confira as pastas <strong>Spam</strong>, <strong>Lixo eletrônico</strong> e <strong>Promoções</strong>.</li>
            <li>Procure por mensagens da <strong>Kiwify</strong> enviadas ao e-mail informado na compra.</li>
            <li>Pagou com <strong>boleto</strong>? O acesso é liberado após a compensação, que pode levar até 3 dias úteis.</li>
            <li>Ainda sem acesso? Entre na <a href={MEMBERS_LOGIN_URL} target="_blank" rel="noopener noreferrer">área de membros da Kiwify</a> e use &quot;Esqueceu a senha?&quot; com o e-mail da compra.</li>
          </ul>
        </div>
      </section>

      <footer className="thanks-footer">
        <p>✦ Que estes guias iluminem seu caminho ✦</p>
        <Link href="/">Voltar para a página inicial</Link>
      </footer>
    </main>
  );
}
