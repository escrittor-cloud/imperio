# Super Stream / Vlog – Império do Streaming

Estrutura **vazia e editável** (sem dados do Flash). Serve para qualquer personagem ou série.

## O que mudou (conforme suas marcações)

| Marcação | Ajuste |
|----------|--------|
| **Amarelo** | É o **poster** (só imagem). Não é player. |
| **Vermelho** | Botão **Assistir** removido (já há botões no topo). |
| **Verde** | Botão **Favoritar** removido. |
| **Preto** | Número do episódio + título + descrição na lista. |
| Player | Abre **só ao clicar** no episódio/vídeo (modal). |
| Galeria | Mesma lógica: clique abre imagem ampliada. |
| Conteúdo | Tudo placeholder `[Título]`, `[Descrição]` — editável no Admin. |
| Responsivo | Layout adapta em mobile (temporadas em linha, poster centralizado). |

## Arquivos

```
super-stream/
├── vlog.html          → página de vídeos (poster + temporadas + episódios)
├── galeria.html       → galeria de imagens
├── admin/form.html    → formulário: Título, Tags, toolbar, descrição, URLs
├── css/style.css
├── js/main.js
├── Videos/            → pasta para vídeos no GitHub
└── Imagens/           → pasta para imagens no GitHub
```

## Header padrão

Home · Facebook · WhatsApp · Testar Agora · Vídeos · Galeria

## Admin – formulário de vídeo

- **Título** *
- Temporada / Número do episódio
- **Tags** (Enter para adicionar)
- **Barra de formatação** (N, I, S, listas, link)
- **Área de descrição** (contenteditable)
- URL do vídeo (raw GitHub `Videos/`)
- URL da thumbnail
- Upload local (referência; o ideal é subir no GitHub)
- Bloco extra: **Configuração da Série** (título, ano, gêneros, sinopse, poster)

Salva em Firestore: `config/vlog` e `config/galeria`.

## Como usar

1. Copie a pasta `super-stream/` para a raiz do hosting (ou ajuste os links `../index.html`).
2. No site principal (`index.html`), aponte os botões **Vídeos** e **Galeria** para:
   - `super-stream/vlog.html`
   - `super-stream/galeria.html`
3. Suba mídia no GitHub:
   - `Videos/ep01.mp4`
   - `Imagens/poster.jpg`
4. No Admin (`super-stream/admin/form.html`):
   - Configure a série (título, poster…)
   - Adicione episódios com URL raw
5. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

## Firestore

- `config/vlog` → `{ series: { title, year, genres, synopsis, poster, seasons: [...] } }`
- `config/galeria` → `{ title, description, images: [{ num, title, desc, url }] }`
