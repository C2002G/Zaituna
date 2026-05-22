/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Menu, X, Instagram, Phone, MapPin, Clock, Star, ArrowRight, UtensilsCrossed, Leaf, Coffee, Beer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Tipos para os itens do cardápio para facilitar a manutenção
interface MenuItem {
  nome: string;
  desc: string;
  preco: string;
  tag: string;
  img: string;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitora o scroll para mudar o estilo da navegação
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Dados do cardápio baseados nas informações do usuário
  const menuItens: MenuItem[] = [
    {
      nome: "Shawarma",
      desc: "Lâminas de carne marinadas em especiarias árabes, homus, picles e tomates no pão sírio.",
      preco: "R$ 38",
      tag: "Mais Pedido",
      img: "assets/Fotos/Shawarma/shaw4.jpg"
    },
    {
      nome: "Combos Zaituna",
      desc: "O banquete completo: Kibe, Falafel, Esfihas e as três pastas clássicas.",
      preco: "A partir de R$ 85",
      tag: "Família",
      img: "assets/Fotos/Combos/combo11.jpg"
    },
    {
      nome: "Congelados Artesanais",
      desc: "Kibes e esfihas prontos para assar em casa, mantendo a qualidade do restaurante.",
      preco: "Sob consulta",
      tag: "Para levar",
      img: "assets/Fotos/Congelados/congelado.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-secondary text-brand-primary selection:bg-brand-primary selection:text-brand-secondary font-sans uppercase">
      
      {/* NAVEGAÇÃO */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 ${scrolled ? 'py-3 bg-brand-primary/95 backdrop-blur-md shadow-lg shadow-black/20' : 'py-6 bg-brand-primary'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-brand-secondary">
          <motion.a 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            href="#" 
            className="flex items-center"
          >
            <img src="/assets/Regras/logo.png" alt="Zaituna Logo" className="mt-4 h-16 w-auto md:h-20 scale-250 origin-left" />
          </motion.a>
          
          <ul className="hidden md:flex gap-10 items-center font-bold text-sm uppercase tracking-[0.2em]">
            <li><a href="#menu" className="hover:text-accent-gold transition-colors">Cardápio</a></li>
            <li><a href="#ambiente" className="hover:text-accent-gold transition-colors">O Espaço</a></li>
            <li><a href="#historia" className="hover:text-accent-gold transition-colors">Nossa Origem</a></li>
            <li>
              <a 
                href="https://pedido.anota.ai/loja/zaituna-cozinha-arabe-1?f=msa&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnp1S8RX_t1xHpNLBgl0sdQT-1iXEk43GR9cjhxW-golZAT6GDHmed0C3soGI_aem_piGUaXhVSItd0rNDLaFZyw&utm_id=97760_v0_s00_e0_tv6_a1denngmu0yrgl" 
                className="bg-brand-secondary text-brand-primary px-8 py-3 rounded-full hover:scale-105 transition-transform"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Pedidos
              </a>
            </li>
          </ul>

          <button className="md:hidden text-brand-secondary" onClick={toggleMenu} aria-label="Menu">
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
            <a href="#historia" onClick={toggleMenu}>Origem</a>
            <a href="https://wa.me/555132736766" className="bg-brand-secondary text-brand-primary px-10 py-4 rounded-full text-xl font-bold">WhatsApp</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION - O impacto inicial */}
      <header className="relative pt-40 pb-24 overflow-hidden border-b border-brand-primary/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block border border-brand-primary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-8">
              A Autêntica Cozinha Árabe
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.95] mb-8 tracking-tighter">
              Sabor que <br />
              <span className="italic text-accent-gold">conta história.</span>
            </h1>
            <p className="text-xl text-brand-primary/80 mb-10 max-w-lg font-medium leading-relaxed">
              Temperos artesanais, receitas ancestrais e a hospitalidade que só o Zaituna oferece em Porto Alegre.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="https://wa.me/555132736766" className="group flex items-center gap-3 bg-brand-primary text-brand-secondary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:-translate-y-1 transition-all">
                <Phone size={18} />
                Fazer Pedido
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="mt-16 flex gap-12 items-center opacity-60">
              <div className="flex flex-col">
                <span className="text-3xl font-serif font-bold">4.9</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Avaliação Google</span>
              </div>
              <div className="h-10 w-px bg-brand-primary/20"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-serif font-bold">+10k</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Shawarmas/mês</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-[12px] border-white/20">
              <img 
                src="/assets/Fotos/Combos/combo11.jpg" 
                alt="Zaituna Cozinha Árabe" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decoração Flutuante */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl -z-10"></div>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden md:block"
            >
              <div className="flex gap-1 text-accent-gold mb-2">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="font-bold text-sm leading-tight text-brand-primary">O melhor tempero da cidade!</p>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* SEÇÃO CARDÁPIO DESTAQUES */}
      <section className="py-32 bg-brand-primary text-brand-secondary" id="menu">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-accent-gold font-black uppercase tracking-[0.4em] text-[16px] mb-4 block">Cardápio</span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter">Nossas Delícias</h2>
            </div>
            <p className="md:max-w-xs text-brand-secondary/60 text-sm font-medium leading-relaxed">
              Cada prato é uma viagem sensorial pelas ruas de Beirute e Damasco.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {menuItens.map((item, idx) => (
              <motion.a
                key={idx}
                href="https://pedido.anota.ai/loja/zaituna-cozinha-arabe-1?f=msa&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnp1S8RX_t1xHpNLBgl0sdQT-1iXEk43GR9cjhxW-golZAT6GDHmed0C3soGI_aem_piGUaXhVSItd0rNDLaFZyw&utm_id=97760_v0_s00_e0_tv6_a1denngmu0yrgl" // <- Link específico do Anota AI configurado no seu array
                target="_blank"  // <- Abre em uma nova guia
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8">
                  <img 
                    src={item.img} 
                    alt={item.nome} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6 bg-accent-gold text-brand-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {item.tag}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-2xl font-serif">{item.nome}</h3>
                  <span className="text-accent-gold font-bold font-serif">{item.preco}</span>
                </div>
                <p className="text-sm opacity-60 leading-relaxed mb-6 font-medium">{item.desc}</p>
                <button className="flex items-center gap-2 group-hover:gap-4 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-accent-gold">
                  Ver Detalhes <ArrowRight size={14} />
                </button>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* AMBIENTE / EXPERIÊNCIA (As fotos de Flor e Quadro) */}
      <section className="py-32" id="ambiente">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-4">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                src="assets\Fotos\Horta\flor.jpg" 
                className="rounded-3xl h-80 w-full object-cover mt-12 shadow-xl" 
                alt="Ambiente Zaituna 1" 
              />
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                src="assets\Fotos\Lugar\quadro.jpg" 
                className="rounded-3xl h-80 w-full object-cover shadow-xl" 
                alt="Ambiente Zaituna 2" 
              />
            </div>
            <div>
              <span className="text-accent-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Experiência</span>
              <h2 className="text-5xl font-serif mb-8 leading-[0.95] tracking-tighter">Muito além <br /> da comida.</h2>
              <p className="text-lg opacity-80 mb-10 leading-relaxed font-medium">
                No Zaituna, o ambiente foi pensado para que você se sinta em casa. Das flores na mesa aos quadros que contam nossa história, cada detalhe importa.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-primary text-brand-secondary p-3 rounded-2xl">
                    <UtensilsCrossed size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Cerveja Gelada</h4>
                    <p className="text-xs opacity-60 font-medium">O acompanhamento perfeito para o seu kibe.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-primary text-brand-secondary p-3 rounded-2xl">
                    <Coffee size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Café Árabe</h4>
                    <p className="text-xs opacity-60 font-medium">Finalize sua refeição com tradição.</p>
                  </div>
                </div>
              </div>

              <a href="#" className="inline-flex items-center gap-3 border-b-2 border-brand-primary pb-1 font-black text-xs uppercase tracking-widest hover:opacity-60 transition-opacity">
                Agendar Reservas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-primary text-brand-secondary py-24 border-t border-brand-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
            <img src="/assets/Regras/logo.png" alt="Zaituna Logo" className="mt-4 h-16 w-auto md:h-20 scale-250 origin-left" />
              <p className="max-w-sm text-brand-secondary/60 font-medium leading-[1.8]">
                Sabor árabe autêntico e hospitalidade que atravessa fronteiras. Venha nos visitar ou peça o seu delivery agora mesmo.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-40">Local e Contato</h4>
              <ul className="text-sm space-y-4 font-medium">
                <li className="flex items-center gap-3"><MapPin size={16} /> R. Olinda, 315 - São Geraldo, Porto Alegre - RS</li>
                <li className="flex items-center gap-3">
                  <a href="https://www.instagram.com/zaitunaarabe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-inherit">
                    <Instagram size={16} /> 
                    <span className="normal-case">@zaitunaarabe</span>
                  </a>
                </li>
                <li className="flex items-center gap-3"><Phone size={16} /> (51) 3273-6766</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-brand-secondary/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest opacity-40">
            <p>© 2024 Zaituna Cozinha Árabe.</p>
            <div className="flex gap-8">
              <a href="#">Privacidade</a>
              <a href="#">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <motion.a 
        href="https://wa.me/555132736766"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 z-50 bg-brand-primary text-white p-5 rounded-full shadow-2xl"
      >
        <Phone size={28} />
      </motion.a>

    </div>
  );
}
