"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Check, Eye, Gem, Leaf, Search, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CHECKOUT_URL = "https://pay.kiwify.com.br/glzvrYc";
const crystalPages = [3, 4, 5, 7, 9];
const herbPages = [2, 4, 6, 9, 11];
const faqs = [
  ["É um livro físico?", "Não. Os dois livros são produtos digitais em PDF. Os livros mostrados nas imagens são mockups utilizados para representar visualmente os materiais."],
  ["Quantos livros vou receber?", "Você receberá os dois guias digitais apresentados nesta página."],
  ["Quantos conteúdos existem?", "São 30 cristais + 30 ervas, totalizando 60 conteúdos ilustrados."],
  ["Posso acessar pelo celular?", "Sim. O material pode ser visualizado em celular, tablet ou computador."],
  ["O pagamento é mensal?", "Não. O valor de R$ 10,90 é pagamento único."],
  ["Como recebo o material?", "O acesso ao produto será disponibilizado através da estrutura de entrega configurada na Kiwify após a confirmação da compra."],
];

function trackCheckout() {
  // TRACKING PLACEHOLDERS: connect Meta Pixel, GA4, Google Ads and TikTok Pixel here.
  const win = window as Window & { fbq?: (...args: unknown[]) => void; ttq?: { track?: (...args: unknown[]) => void }; dataLayer?: Record<string, unknown>[] };
  win.fbq?.("track", "InitiateCheckout");
  win.ttq?.track?.("InitiateCheckout");
  win.dataLayer?.push({ event: "InitiateCheckout", value: 10.9, currency: "BRL" });
}

function CTA({ label = "QUERO OS 2 GUIAS POR R$ 10,90", gold = false }: { label?: string; gold?: boolean }) {
  return <a className={`cta ${gold ? "cta-gold" : ""}`} href={CHECKOUT_URL} onClick={trackCheckout}><span>{label}</span><span aria-hidden="true">→</span></a>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow"><Sparkles size={14} aria-hidden="true" />{children}</div>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return <div className="section-heading reveal">{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function PageGallery({ kind, pages }: { kind: "cristal" | "erva"; pages: number[] }) {
  return <div className="page-gallery reveal" aria-label={`Prévia de páginas do guia de ${kind === "cristal" ? "cristais" : "ervas"}`}>{pages.map((page, index) => <img key={page} src={`/assets/${kind}-${page}.jpg`} alt={`Página interna ${index + 1} do guia de ${kind === "cristal" ? "cristais" : "ervas"}`} loading="lazy" width="804" height="1137" />)}</div>;
}

function FeaturePills({ items }: { items: string[] }) {
  return <div className="pills">{items.map((item) => <span key={item}><Check size={15} />{item}</span>)}</div>;
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [count, setCount] = useState({ crystals: 0, herbs: 0, total: 0 });

  useEffect(() => {
    // TRACKING PLACEHOLDERS: fire ViewContent for connected pixels/analytics here.
    const win = window as Window & { fbq?: (...args: unknown[]) => void; ttq?: { track?: (...args: unknown[]) => void }; dataLayer?: Record<string, unknown>[] };
    win.fbq?.("track", "ViewContent"); win.ttq?.track?.("ViewContent"); win.dataLayer?.push({ event: "ViewContent", content_name: "Combo Guias Místicos" });
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
    const heroObserver = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), { threshold: 0.08 });
    if (heroRef.current) heroObserver.observe(heroRef.current);
    let frame = 0;
    const countObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 900, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount({ crystals: Math.round(30 * eased), herbs: Math.round(30 * eased), total: Math.round(60 * eased) });
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      countObserver.disconnect();
    }, { threshold: 0.35 });
    if (countRef.current) countObserver.observe(countRef.current);
    return () => { revealObserver.disconnect(); heroObserver.disconnect(); countObserver.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return <main>
    <section className="hero" ref={heroRef}>
      <div className="hero-copy">
        <Eyebrow>OFERTA DIGITAL • 2 GUIAS COMPLETOS</Eyebrow>
        <h1>DESCUBRA O UNIVERSO DOS <em>CRISTAIS E DAS ERVAS</em></h1>
        <p className="hero-lead">Dois guias ilustrados com 60 cristais e ervas, reunindo propriedades, usos, identificação e correspondências místicas de forma simples e visual.</p>
        <div className="quick-facts"><span>✦ 30 cristais</span><span>✦ 30 ervas</span><span>✦ 2 livros digitais</span></div>
        <div className="mobile-hero-image"><img src="/assets/hero-books.webp" alt="Mockup dos livros A Sabedoria dos Cristais e Guia Místico das Ervas" width="1024" height="1280" fetchPriority="high" /></div>
        <div className="price-block"><small>LEVE OS 2 GUIAS POR</small><strong>R$ 10,90</strong><span>PAGAMENTO ÚNICO</span></div>
        <CTA label="QUERO RECEBER OS 2 GUIAS" />
        <div className="safe"><ShieldCheck size={18} /> Compra segura através da Kiwify</div>
        <p className="microcopy">Acesso digital após a confirmação do pagamento.</p>
      </div>
      <div className="hero-visual"><div className="image-halo" aria-hidden="true" /><img src="/assets/hero-books.webp" alt="Mockup dos dois livros digitais em capa dura" width="1024" height="1280" fetchPriority="high" /><span className="floating-note note-one">60 conteúdos</span><span className="floating-note note-two">PDF ilustrado</span></div>
    </section>

    <section className="desire section">
      <SectionHeading eyebrow="CONHECIMENTO À MÃO" title="UM GUIA PARA CONSULTAR SEMPRE QUE QUISER" text="Se você está começando agora ou já gosta desse universo, os dois livros transformam informações espalhadas em um material visual, simples e fácil de consultar." />
      <div className="benefit-grid">{[[Eye, "CONHEÇA", "Entenda as principais características de cada cristal e erva."], [Search, "IDENTIFIQUE", "Veja detalhes que ajudam a reconhecer cada elemento."], [BookOpen, "UTILIZE", "Descubra usos tradicionais e correspondências místicas."]].map(([Icon, title, copy], index) => { const BenefitIcon = Icon as typeof Eye; return <article className="benefit reveal" key={title as string} style={{ transitionDelay: `${index * 80}ms` }}><BenefitIcon size={25} /><span>0{index + 1}</span><h3>{title as string}</h3><p>{copy as string}</p></article>; })}</div>
    </section>

    <section className="book-section crystal-section section">
      <div className="book-intro reveal"><div className="book-cover-wrap"><img src="/assets/capa-cristais.webp" alt="Capa de A Sabedoria dos Cristais" loading="lazy" /><span>30 CRISTAIS</span></div><div><Eyebrow>GUIA ILUSTRADO Nº 1</Eyebrow><h2>A SABEDORIA<br />DOS CRISTAIS</h2><p className="subtitle">30 cristais apresentados de forma visual e organizada.</p><FeaturePills items={["Características", "Para que serve", "Propriedades místicas", "Como usar", "Como identificar", "Signos associados"]} /><p>De ametista e quartzo rosa até obsidiana, citrino, turmalina negra e muitos outros. Um material feito para consultar rapidamente sempre que quiser conhecer melhor um cristal.</p><CTA label="QUERO O GUIA + O LIVRO DAS ERVAS" /></div></div>
      <PageGallery kind="cristal" pages={crystalPages} />
    </section>

    <section className="book-section herb-section section">
      <div className="book-intro reverse reveal"><div className="book-cover-wrap"><img src="/assets/capa-ervas.webp" alt="Capa do Guia Místico das Ervas" loading="lazy" /><span>30 ERVAS</span></div><div><Eyebrow>GUIA ILUSTRADO Nº 2</Eyebrow><h2>GUIA MÍSTICO<br />DAS ERVAS</h2><p className="subtitle">30 ervas e suas propriedades tradicionais reunidas em um único guia.</p><FeaturePills items={["Características", "Usos tradicionais", "Como identificar", "Propriedades místicas", "Como utilizar", "Correspondências"]} /><p>Um herbário visual para conhecer melhor ervas presentes em tradições populares, espiritualidade e práticas de bem-estar: alecrim, arruda, camomila, canela, lavanda, manjericão, sálvia e muitas outras.</p><p className="notice">As informações de saúde presentes no material têm finalidade educativa e histórica e não substituem orientação médica ou profissional.</p></div></div>
      <PageGallery kind="erva" pages={herbPages} /><div className="center-cta"><CTA /></div>
    </section>

    <section className="volume section">
      <SectionHeading eyebrow="CONTEÚDO DE VERDADE" title="60 CONTEÚDOS ILUSTRADOS EM UM ÚNICO COMBO" />
      <div className="desk-spread reveal">{["cristal-7.jpg", "erva-4.jpg", "cristal-4.jpg", "erva-6.jpg", "cristal-5.jpg", "erva-11.jpg", "cristal-9.jpg"].map((src, i) => <img key={src} src={`/assets/${src}`} alt="Página ilustrada do combo" loading="lazy" style={{ "--i": i } as React.CSSProperties} />)}</div>
      <div className="equation reveal" ref={countRef}><div><strong>{count.crystals}</strong><span>CRISTAIS</span></div><b>+</b><div><strong>{count.herbs}</strong><span>ERVAS</span></div><b>=</b><div><strong>{count.total}</strong><span>CONTEÚDOS</span></div></div>
    </section>

    <section className="receive section"><SectionHeading eyebrow="OFERTA COMPLETA" title="AO ADQUIRIR HOJE VOCÊ RECEBE" /><div className="offer-card reveal"><div className="offer-items"><div><Gem /><p><strong>A SABEDORIA DOS CRISTAIS</strong><span>30 cristais ilustrados</span></p></div><span className="plus">+</span><div><Leaf /><p><strong>GUIA MÍSTICO DAS ERVAS</strong><span>30 ervas ilustradas</span></p></div><span className="plus">+</span><div><Smartphone /><p><strong>ACESSO DIGITAL</strong><span>No celular, tablet ou computador</span></p></div></div><div className="offer-price"><small>TUDO ISSO POR APENAS</small><strong>R$ 10,90</strong><span>PAGAMENTO ÚNICO</span><CTA label="QUERO OS DOIS LIVROS" /></div></div></section>

    <section className="comparison section"><div className="comparison-card reveal"><div><Eyebrow>VALOR ACESSÍVEL</Eyebrow><h2>MENOS QUE O PREÇO DE UM CAFÉ E UM LANCHE</h2><ul><li><Check />2 livros completos</li><li><Check />60 conteúdos ilustrados</li><li><Check />Material para consultar sempre</li><li><Check />Pagamento único</li></ul></div><div className="comparison-price"><span>2 GUIAS DIGITAIS</span><strong>R$ 10,90</strong><CTA /></div></div></section>

    <section className="audience section"><SectionHeading eyebrow="FEITO PARA VOCÊ" title="ESSE COMBO É PARA VOCÊ QUE..." /><div className="audience-grid">{["gosta de cristais e pedras", "se interessa por ervas e natureza", "está começando no universo esotérico", "gosta de espiritualidade e práticas tradicionais", "quer informações organizadas em um só lugar", "prefere aprender através de materiais visuais"].map((item, i) => <div className="audience-card reveal" key={item}><span>{String(i + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div></section>

    <section className="devices section"><div className="device-copy reveal"><Eyebrow>PRODUTO 100% DIGITAL</Eyebrow><h2>CONSULTE ONDE QUISER</h2><p>Abra no celular, tablet ou computador e consulte sempre que precisar.</p><div className="device-facts"><span><Check />Celular</span><span><Check />Tablet</span><span><Check />Computador</span></div><CTA /></div><div className="device-image reveal"><img src="/assets/devices.webp" alt="Tablet com página de lavanda e celular com página de ametista" loading="lazy" width="1536" height="864" /></div></section>

    <section className="steps section"><SectionHeading eyebrow="SIMPLES E SEGURO" title="COMO FUNCIONA" /><div className="steps-grid">{["Clique em “Quero os 2 Guias”", "Finalize sua compra com segurança através da Kiwify", "Após a confirmação do pagamento, acesse seu produto digital"].map((step, i) => <article className="step reveal" key={step}><strong>0{i + 1}</strong><p>{step}</p></article>)}</div><div className="center-cta"><CTA /></div></section>

    <section className="faq section"><SectionHeading eyebrow="DÚVIDAS FREQUENTES" title="ANTES DE GARANTIR SEUS GUIAS" /><Accordion type="single" collapsible className="faq-list reveal">{faqs.map(([question, answer], i) => <AccordionItem value={`faq-${i}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></section>

    <section className="final-cta section"><div className="final-copy reveal"><Eyebrow>SEU NOVO MATERIAL DE CONSULTA</Eyebrow><h2>60 CRISTAIS E ERVAS.<br />2 GUIAS.<br /><em>APENAS R$ 10,90.</em></h2><p>Tenha uma biblioteca visual para explorar o universo das ervas e dos cristais sempre que quiser.</p><div className="final-price">R$ 10,90</div><CTA label="QUERO RECEBER OS 2 GUIAS" gold /><small>Pagamento único • Produto digital • Checkout seguro</small></div><div className="final-image reveal"><img src="/assets/hero-books.webp" alt="Os dois guias ilustrados do combo" loading="lazy" /></div></section>
    <footer><span>✦</span><p>Guias Místicos • Produto digital em PDF</p><p>© 2026 • Todos os direitos reservados</p></footer>
    <div className={`sticky-buy ${stickyVisible ? "show" : ""}`} aria-hidden={!stickyVisible}><div><span>2 LIVROS</span><strong>R$ 10,90</strong></div><a href={CHECKOUT_URL} onClick={trackCheckout}>QUERO AGORA</a></div>
  </main>;
}
