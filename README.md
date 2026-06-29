# Tarsel — Site Institucional

Site institucional da **Tarsel** (software de análise de tráfego e segurança para ISPs).

Projeto separado da ferramenta de consulta de provedores ([Tarsel-Consultas](https://github.com/joao-pedro04/Tarsel-Consultas)).

## Estrutura

```
Tarsel-Website/
├── index.html      # Página inicial
├── css/styles.css  # Estilos
├── js/main.js      # Interatividade
└── assets/         # Logo e imagens
```

## Visualizar localmente

```bash
cd Tarsel-Website
python3 -m http.server 8080
```

Abra [http://127.0.0.1:8080](http://127.0.0.1:8080) no navegador.

## Deploy

Site estático — pode ser publicado em Cloudflare Pages, Netlify, GitHub Pages ou qualquer host de arquivos estáticos.

## Páginas planejadas

- [x] Home
- [ ] Sobre nós
- [ ] Missão
- [ ] Contato
- [ ] Produtos / Soluções
