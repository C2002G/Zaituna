/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { Menu, X, Instagram, Phone, MapPin, Star, ArrowRight, Leaf, BottleWine } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

interface MenuItem {
  nome: string;
  desc: string;
  preco: string;
  tag: string;
  img: string;
}

interface GalleryItem {
  src: string;
  alt: string;
}

// TROCAR FOTOS: escolha aqui os arquivos em assets/teste2 usados no site.
// Os blocos visuais usam proporções fixas e object-cover, que preenche a área e pode cortar as bordas.
const fotos = {
  shawarma: new URL('../assets/teste2/shaw2.jpg', import.meta.url).href,
  combo: new URL('../assets/teste2/combo11.jpg', import.meta.url).href,
  congelados: new URL('../assets/teste2/congelado.jpg', import.meta.url).href,
  quadro: new URL('../assets/teste2/quadro.jpg', import.meta.url).href,
  flor: new URL('../assets/teste2/flor.jpg', import.meta.url).href,
  cerveja: new URL('../assets/teste2/cerveja.jpg', import.meta.url).href,
};

/**
 * Detecta se dá pra tocar vídeo de fundo sem pesar:
 * só em telas >=768px e fora de conexão lenta / modo economia de dados.
 * Em qualquer outro caso, cai pra imagem estática (poster).
 */
function useAllowVideo() {
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const conn = (navigator as any).connection;
    const isSlow = !!conn && (conn.saveData || /2g/.test(conn.effectiveType || ''));
    const evaluate = () => setAllow(mq.matches && !isSlow);

    evaluate();
    mq.addEventListener('change', evaluate);
    return () => mq.removeEventListener('change', evaluate);
  }, []);

  return allow;
}

/** Fundo de cena: tenta vídeo (se liberado), cai pra foto se falhar ou for mobile/conexão fraca. */
function CinematicMedia({
  videoSrc,
  poster,
  alt,
  allowVideo,
}: {
  videoSrc?: string;
  poster: string;
  alt: string;
  allowVideo: boolean;
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = allowVideo && !!videoSrc && !videoFailed;

  return (
    <div className="scene__media">
      {showVideo ? (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          src={poster}
          alt={alt}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

/** Título com reveal linha a linha, tipo teaser de trailer — um único gesto de entrada, sem floreio extra. */
function RevealTitle({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navState, setNavState] = useState<'top' | 'up' | 'down'>('top');
  const [activeSection, setActiveSection] = useState('hero');
  const lastY = useRef(0);
  const allowVideo = useAllowVideo();
  const heroRef = useRef<HTMLDivElement>(null);
  const historiaRef = useRef<HTMLDivElement>(null);

  const sectionIds = ['hero', 'menu', 'ambiente', 'historia'];

  // Nav: recolhe pro logo ao rolar pra baixo, volta cheio ao rolar pra cima ou no topo.
  // rAF-throttled — não gera um setState por pixel de scroll.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80) {
          setNavState('top');
        } else {
          setNavState(y > lastY.current ? 'down' : 'up');
        }
        lastY.current = y;
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trilha de progresso lateral — marca a cena visível no momento.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Parallax leve no fundo do hero e da seção de origem (transform puro, GPU).
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroMediaY = useTransform(heroProgress, [0, 1], [0, 40]);

  const { scrollYProgress: historiaProgress } = useScroll({
    target: historiaRef,
    offset: ['start end', 'end start'],
  });
  const historiaMediaY = useTransform(historiaProgress, [0, 1], [-60, 60]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItens: MenuItem[] = [
    {
      nome: 'Shawarma',
      desc: 'Lâminas de carne marinadas em especiarias árabes, homus, picles e tomates no pão sírio.',
      preco: 'R$ 38',
      tag: 'Mais Pedido',
      img: fotos.shawarma,
    },
    {
      nome: 'Combos Zaituna',
      desc: 'O banquete completo: Kibe, Falafel, Esfihas e as três pastas clássicas.',
      preco: 'A partir de R$ 85',
      tag: 'Família',
      img: fotos.combo,
    },
    {
      nome: 'Congelados Artesanais',
      desc: 'Kibes e esfihas prontos para assar em casa, mantendo a qualidade do restaurante.',
      preco: 'Sob consulta',
      tag: 'Para levar',
      img: fotos.congelados,
    },
  ];

  const galeria: GalleryItem[] = [
    { src: fotos.quadro, alt: 'Quadro na parede do salão Zaituna' },
    { src: fotos.flor, alt: 'Horta natural do Zaituna' },
    { src: fotos.combo, alt: 'Combo Zaituna servido' },
    { src: fotos.cerveja, alt: 'Cerveja libanesa gelada' },
    { src: fotos.congelados, alt: 'Congelados artesanais Zaituna' },
  ];

  const pedidoUrl =
    'https://pedido.anota.ai/loja/zaituna-cozinha-arabe-1?f=msa&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnp1S8RX_t1xHpNLBgl0sdQT-1iXEk43GR9cjhxW-golZAT6GDHmed0C3soGI_aem_piGUaXhVSItd0rNDLaFZyw&utm_id=97760_v0_s00_e0_tv6_a1denngmu0yrgl';

  return (
    <div className="min-h-screen bg-brand-secondary text-brand-primary selection:bg-brand-primary selection:text-brand-secondary font-sans uppercase">
      {/* NAVEGAÇÃO */}
      <nav className={`nav-shell ${navState === 'down' ? 'nav--down' : navState === 'up' ? 'nav--up' : 'nav--top'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center text-brand-secondary">
          <a href="#hero" className="flex items-center">
            <img
              src="/assets/Regras/logo.png"
              alt="Zaituna Logo"
              className="h-14 w-auto md:h-16 origin-left"
            />
          </a>

          <ul className="nav-links hidden md:flex gap-10 items-center font-bold text-sm tracking-[0.2em]">
            <li><a href="#menu" className="hover:text-accent-gold transition-colors">Cardápio</a></li>
            <li><a href="#ambiente" className="hover:text-accent-gold transition-colors">O Espaço</a></li>
            <li><a href="#historia" className="hover:text-accent-gold transition-colors">Nossa Origem</a></li>
            <li>
              <a
                href={pedidoUrl}
                className="bg-brand-secondary text-brand-primary px-8 py-3 rounded-full hover:scale-105 transition-transform inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedidos
              </a>
            </li>
          </ul>

          <button className="md:hidden text-brand-secondary" onClick={toggleMenu} aria-label="Abrir menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-brand-primary text-brand-secondary z-40 md:hidden flex flex-col items-center justify-center gap-10 text-3xl font-serif"
          >
            <a href="#menu" onClick={toggleMenu}>Cardápio</a>
            <a href="#ambiente" onClick={toggleMenu}>O Espaço</a>
            <a href="#historia" onClick={toggleMenu}>Nossa Origem</a>
            <a href="https://wa.me/555132736766" className="bg-brand-secondary text-brand-primary px-10 py-4 rounded-full text-xl font-bold">
              WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRILHA DE PROGRESSO — só desktop, custo zero no mobile */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
        {sectionIds.map((id) => (
          <a key={id} href={`#${id}`} aria-label={id} className={`rail-dot ${activeSection === id ? 'rail-dot--active' : ''}`} />
        ))}
      </div>

      {/* HERO — fundo claro com fotos "fundidas" no fundo (ref: delice.ca), sem scrim escuro */}
      <header id="hero" ref={heroRef} className="scene bg-brand-secondary">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-32 lg:py-0">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="inline-block border border-brand-primary/20 text-brand-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.3em] mb-8"
            >
              A Autêntica Cozinha Árabe
            </motion.span>

            <RevealTitle
              lines={['Sabor que', 'conta história.']}
              className="text-brand-primary text-6xl md:text-8xl font-serif leading-[0.95] mb-8 tracking-tighter"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="text-brand-primary/70 text-xl mb-10 max-w-lg font-medium leading-relaxed normal-case"
            >
              Temperos artesanais, receitas ancestrais e a hospitalidade que só o Zaituna oferece em Porto Alegre.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="flex flex-wrap gap-5"
            >
              <a
                href="https://wa.me/555132736766"
                className="group flex items-center gap-3 bg-brand-primary text-brand-secondary px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <Phone size={18} />
                Fazer Pedido
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex gap-10 items-center text-brand-primary/60 ml-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-bold text-brand-primary normal-case">4.9</span>
                  <span className="text-[10px] font-black tracking-widest">Avaliação Google</span>
                </div>
                <div className="h-8 w-px bg-brand-primary/15" />
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-bold text-brand-primary normal-case">+10k</span>
                  <span className="text-[10px] font-black tracking-widest">Shawarmas/mês</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colagem de fotos fundidas no fundo — sem retângulo duro, a borda dissolve na cor da página */}
          <motion.div style={{ y: heroMediaY }} className="relative h-[420px] lg:h-[560px] hidden sm:block">
            <div className="absolute inset-0 rounded-full bg-accent-gold/15 blur-3xl scale-90" />

            <motion.img
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              src={fotos.combo}
              alt="Combo servido do Zaituna"
              loading="eager"
              decoding="async"
              className="blend-photo absolute inset-0 w-full h-full object-cover"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              src={fotos.shawarma}
              alt="Shawarma do Zaituna"
              loading="eager"
              decoding="async"
              className="blend-photo--soft absolute w-[55%] h-[55%] object-cover right-0 bottom-0 translate-x-[8%] translate-y-[6%]"
            />
          </motion.div>
        </div>
      </header>

      {/* CARDÁPIO */}
      <section className="py-32 bg-brand-primary text-brand-secondary" id="menu">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-accent-gold font-black tracking-[0.4em] text-[16px] mb-4 block">Cardápio</span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter">Nossas Delícias</h2>
            </div>
            <p className="md:max-w-xs text-brand-secondary/60 text-sm font-medium leading-relaxed normal-case">
              Cada prato é uma viagem sensorial pelas ruas de Beirute e Damasco.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {menuItens.map((item, idx) => (
              <motion.a
                key={idx}
                href={pedidoUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative border border-brand-secondary/10 rounded-[2.5rem] p-3 hover:border-accent-gold/40 transition-colors"
              >
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-8 relative">
                  <img
                    src={item.img}
                    alt={item.nome}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-accent-gold text-brand-primary px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest">
                    {item.tag}
                  </div>
                </div>
                <div className="px-3">
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-2xl font-serif normal-case">{item.nome}</h3>
                    <span className="text-accent-gold font-bold font-serif normal-case">{item.preco}</span>
                  </div>
                  <p className="text-sm opacity-60 leading-relaxed mb-6 font-medium normal-case">{item.desc}</p>
                  <span className="flex items-center gap-2 group-hover:gap-4 transition-all text-[10px] font-black tracking-[0.2em] text-accent-gold">
                    Ver Detalhes <ArrowRight size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* O ESPAÇO — experiência + galeria horizontal nativa */}
      <section className="py-32" id="ambiente">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <span className="text-accent-gold font-black tracking-[0.4em] text-[16px] mb-4 block">Experiência</span>
              <h2 className="text-5xl font-serif mb-8 leading-[0.95] tracking-tighter">
                Muito além <br /> da comida.
              </h2>
              <p className="text-lg opacity-80 mb-10 leading-relaxed font-medium normal-case">
                No Zaituna, o ambiente e a produção foram pensados para que você tenha uma experiência única. Das
                flores na mesa aos quadros que contam nossa história, cada detalhe importa.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-primary text-brand-secondary p-3 rounded-2xl">
                    <BottleWine size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 tracking-wider">Cerveja Libanesa</h4>
                    <p className="text-xs opacity-60 font-medium normal-case">O acompanhamento perfeito para o seu kibe.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-primary text-brand-secondary p-3 rounded-2xl">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 tracking-wider">Horta Natural</h4>
                    <p className="text-xs opacity-60 font-medium normal-case">Produtos naturais colhidos frescos da nossa horta.</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-[10px] border-brand-primary/10">
                <img
                  src={fotos.quadro}
                  alt="Salão do restaurante Zaituna"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl -z-10" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden md:block"
              >
                <div className="flex gap-1 text-accent-gold mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="font-bold text-sm leading-tight text-brand-primary normal-case">
                  O melhor tempero da cidade!
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Galeria — scroll horizontal nativo, sem JS extra, leve no celular */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
            {galeria.map((foto, i) => (
              <div
                key={i}
                className="min-w-[260px] md:min-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shrink-0 snap-start"
              >
                <img
                  src={foto.src}
                  alt={foto.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSSA ORIGEM — cena cinematográfica (seção nova, corrige link #historia que não existia) */}
      <section id="historia" ref={historiaRef} className="scene">
        <motion.div style={{ y: historiaMediaY }} className="absolute inset-0 -z-10 scale-110">
          <CinematicMedia
            /* Coloque um .mp4 curto em /public/assets/Videos/origem-loop.mp4 para ativar o vídeo de fundo */
            videoSrc="/assets/Videos/origem-loop.mp4"
            poster={fotos.flor}
            alt="Horta e ingredientes frescos usados no Zaituna"
            allowVideo={allowVideo}
          />
        </motion.div>
        <div className="scene__scrim" />
        <div className="scene__grain" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-accent-gold font-black tracking-[0.4em] text-[16px] mb-4 block"
            >
              Nossa Origem
            </motion.span>

            <RevealTitle
              lines={['Uma receita', 'passada à mão.']}
              className="text-brand-secondary text-5xl md:text-6xl font-serif mb-8 leading-[0.95] tracking-tighter"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-brand-secondary/80 text-lg leading-relaxed font-medium normal-case"
            >
              O Zaituna nasceu no bairro São Geraldo com uma ideia simples: cozinhar como se cozinha em casa, com
              tempero de família e ingredientes colhidos frescos. Cada prato que sai da nossa cozinha carrega essa
              origem — do azeite à horta ao lado da mesa.
            </motion.p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-primary text-brand-secondary py-24 border-t border-brand-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <img src="/assets/Regras/logo.png" alt="Zaituna Logo" className="mb-6 h-16 w-auto md:h-20 origin-left" />
              <p className="max-w-sm text-brand-secondary/60 font-medium leading-[1.8] normal-case">
                Sabor árabe autêntico e hospitalidade que atravessa fronteiras. Venha nos visitar ou peça o seu
                delivery agora mesmo.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black tracking-[0.3em] mb-8 opacity-40">Local e Contato</h4>
              <ul className="text-sm space-y-4 font-medium normal-case">
                <li className="flex items-center gap-3"><MapPin size={16} /> R. Olinda, 315 - São Geraldo, Porto Alegre - RS</li>
                <li className="flex items-center gap-3">
                  <a href="https://www.instagram.com/zaitunaarabe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-inherit">
                    <Instagram size={16} />
                    <span>@zaitunaarabe</span>
                  </a>
                </li>
                <li className="flex items-center gap-3"><Phone size={16} /> (51) 3273-6766</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-brand-secondary/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black tracking-widest opacity-40">
            <p>© 2024 Zaituna Cozinha Árabe.</p>
            <div className="flex gap-8">
              <a href="#">Privacidade</a>
              <a href="#">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <motion.a
        href="https://wa.me/555132736766"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 z-50 bg-accent-gold text-brand-primary p-5 rounded-full shadow-2xl"
        aria-label="Falar no WhatsApp"
      >
        <Phone size={28} />
      </motion.a>
    </div>
  );
}