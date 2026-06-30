# Tarsel — Site Institucional

Site institucional da **Tarsel** (software de análise de tráfego e segurança para provedores).


## Estrutura

```
tarsel-site/
├── index.html          # Home
├── sobre.html          # Sobre nós
├── produtos.html       # Produtos e soluções
├── contato.html        # Formulário de contato
├── css/styles.css      # Estilos
├── js/main.js          # Menu, stats, carrossel, formulário
└── assets/
    ├── logo-transparent.png
    ├── map-world.svg   # Mapa de presença (América Latina)
    └── clients/        # Logos do carrossel
```

## Visualizar localmente

```bash
cd tarsel-site
python3 -m http.server 8080
```

Abra [http://localhost:8080](http://localhost:8080) no navegador.

## Stack

HTML, CSS e JavaScript puro — sem build, sem dependências.

## Pendências (MVP)

- Substituir logos fictícios dos clientes por logos reais
- Email e textos finais no formulário de contato
- Páginas legais (LGPD, termos, privacidade)
- Backend ou serviço externo para envio do formulário
