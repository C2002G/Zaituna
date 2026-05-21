# Zaituna - Cozinha Árabe
## Guia Completo do Projeto

---

## 🚀 Como Rodar o Sistema

### Pré-requisitos
- Node.js (versão 18 ou superior)
- pnpm (gerenciador de pacotes)

### Instalação e Execução

1. **Instalar dependências:**
```bash
pnpm install
```

2. **Rodar em modo desenvolvimento:**
```bash
pnpm dev
```
O servidor iniciará em `http://localhost:3000`

3. **Build para produção:**
```bash
pnpm build
```

4. **Preview do build de produção:**
```bash
pnpm preview
```

### Scripts Disponíveis
- `pnpm dev` - Inicia servidor de desenvolvimento (porta 3000)
- `pnpm build` - Cria build de produção
- `pnpm preview` - Preview do build de produção
- `pnpm lint` - Verificação de tipos TypeScript
- `pnpm clean` - Limpa arquivos de build

---

## 📊 Análise da Landing Page Atual

### Stack Tecnológica
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4
- **Animações:** Motion (Framer Motion)
- **Ícones:** Lucide React
- **Gerenciador:** pnpm

### Estrutura do Projeto
```
Zaituna/
├── assets/
│   ├── Fotos/          # Imagens locais organizadas por categoria
│   │   ├── Shawarma/   # 4 imagens de shawarma
│   │   ├── Combos/     # 16 imagens de combos
│   │   ├── Cerveja/    # 1 imagem de cerveja
│   │   ├── Congelados/ # 1 imagem de congelados
│   │   ├── Horta/      # (vazio)
│   │   └── Lugar/      # (vazio)
│   └── Regras/
│       └── logo.png    # Logo do restaurante
├── src/
│   ├── App.tsx         # Componente principal (landing page)
│   ├── main.tsx        # Entry point
│   └── index.css       # Estilos globais e tema Tailwind
├── index.html          # HTML template
├── package.json        # Dependências e scripts
└── vite.config.ts      # Configuração do Vite
```

### Seções Atuais
1. **Navegação** - Menu responsivo com links para seções
2. **Hero Section** - Impacto inicial com CTA para WhatsApp
3. **Cardápio Destaques** - 3 pratos principais (Shawarma, Combos, Congelados)
4. **Ambiente/Experiência** - Fotos do espaço e descrição
5. **Footer** - Informações de contato e redes sociais
6. **WhatsApp Float** - Botão flutuante para pedidos

---

## 📞 Contato e Suporte

Para dúvidas sobre o projeto ou implementação das melhorias sugeridas, consulte a documentação oficial das tecnologias utilizadas:
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Motion (Framer Motion)](https://motion.dev)

---

**Última atualização:** Maio 2026
**Versão do projeto:** 0.0.0
