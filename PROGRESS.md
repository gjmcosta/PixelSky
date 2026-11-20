# PixelSky — Especificação & Progresso do Projeto

Cliente web local-first e PWA *photo-first* para **Pixelfed** (Fediverso) e **Bluesky / Flashes** (AT Protocol).

## Princípios & Decisões de Design (`/grill-me`)
1. **Zero dependências externas**: Python 3 standard library apenas; porta **`8788`**; segurança `0600`, CSRF, SSRF e CSP.
2. **Estética & Layout**:
   - Galeria **"Darkroom" minimalista** (com tema escuro de alto contraste fotográfico e tema claro opcional).
   - Coluna central única no feed (`600–680px`) com **rail lateral em desktop** e **barra inferior no telemóvel** (estilo Glass / Flashes / Instagram Web).
3. **Fotografias & Carrossel no Feed**:
   - Respeitar a **proporção original sem cortar** (de panorâmica a vertical até `4:5`; fotos mais altas ajustam-se com fundo subtil e abrem completas no **Lightbox**).
   - Carrossel horizontal suave para álbuns, vídeo HLS/MP4, badge `ALT` e **blur em fotos com Aviso de Conteúdo (CW/Spoiler)**.
4. **Navegação & Filtros do Feed**:
   - Feed cronológico unificado por omissão com pills no topo (`Todas | Pixelfed | Bluesky` + atalhos para Custom Feeds visuais do Bluesky).
   - Toggle rápido **Só Media** (ativo por omissão no Bluesky) vs **Tudo**.
   - Resumo IA **"Catch-up"** das últimas horas e filtro de **palavras/hashtags silenciadas**.
5. **Autenticação**:
   - **Pixelfed**: Fluxo **OAuth 2.0 automático no navegador** (`/api/pixelfed/oauth/start` + `/api/pixelfed/oauth/callback`, com `https://pixelfed.de` sugerido por omissão, funcionando com qualquer instância).
   - **Bluesky**: Handle + App Password.
6. **Compositor Photo-First & Publicação Cruzada**:
   - Até **4 fotos** quando o Bluesky está selecionado (até **10 fotos** quando é só Pixelfed) ou 1 vídeo.
   - Reordenação de fotos, **recorte opcional** (`Original`, `1:1`, `4:5`, `16:9`) e **limpeza automática de EXIF/GPS** via Canvas no browser.
   - **Alt-Text IA** por fotografia, **Rascunhos** e **Agendamento de publicações**.
7. **Interações, Comentários & Guardados**:
   - **Duplo-toque na foto para Gosto** (com animação de coração) + botão para abrir o Lightbox.
   - **Gaveta/modal de comentários** e thread com resposta inline e **tradução inline** de legendas/comentários.
   - **Guardados** locais (`user_data.json`) sincronizados com os **Bookmarks nativos do Pixelfed** (`/api/v1/statuses/:id/bookmark` / `unbookmark` e `/api/v1/bookmarks`).

---

## Fases de Implementação

- [x] **Fase 0 — Base, Limpeza & Infraestrutura**
  - [x] Limpar estrutura inicial, preparar `PROGRESS.md`, `.gitignore`, `.dockerignore`, `config.example.json`.
  - [x] Adaptar `Dockerfile`, `docker-compose.yml` (CasaOS) e `manifest.json` para `PixelSky` na porta `8788`.
  - [x] Gerar ícones PWA base em `brand/`.
  - [x] Adaptar `app.py` (porta `8788`, `PIXELSKY_*`, remover DMs/Chat, `Pixelfed`, filtro `media_only` por omissão no Bluesky, `aspectRatio`/`width`/`height`/`blurhash`).
  - [x] Limpar e adaptar `tests/test_app.py` e inicializar repositório Git (`https://github.com/gjmcosta/PixelSky`).

- [x] **Fase 1 — Shell PWA, OAuth 2.0 Pixelfed, Auth Bluesky & Bilingue (PT-PT/EN)**
  - [x] Adicionar endpoints OAuth 2.0 do Pixelfed em `app.py` (`/api/pixelfed/oauth/start`, `/api/pixelfed/oauth/callback`) e suporte a `bookmark`/`unbookmark` nativo no Pixelfed.
  - [x] Criar `index.html`, `app.css` e `app.js` de raiz com design "Darkroom", rail lateral desktop + barra inferior mobile, i18n PT-PT/EN e tema escuro/claro.
  - [x] Modal/ecrã de ligação com login OAuth 2.0 automático para Pixelfed (`pixelfed.de` por omissão), Bluesky (handle + App Password) e configuração de IA.

- [ ] **Fase 2 — Feed Photo-First, Carrossel, Lightbox, Comentários & Catch-up**
  - [ ] Cartões fotográficos (proporção original até 4:5, carrossel multi-foto, vídeo HLS/MP4, badge ALT, CW/Spoiler com blur, tradução inline).
  - [ ] Duplo-toque na foto para Gosto com animação + barra de ações (Gosto, Boost/Repost, Comentários, Guardar sincronizado com Pixelfed, Partilhar/Descarregar).
  - [ ] Lightbox de ecrã inteiro com zoom/navegação e gaveta/modal de Comentários & Thread sem perder a posição no feed.
  - [ ] Pills `Todas | Pixelfed | Bluesky` + Custom Feeds, toggle `Só Media / Tudo` e Resumo IA "Catch-up".

- [ ] **Fase 3 — Perfis & Explorar em Grelha 3 Colunas**
  - [ ] Grelha fotográfica de 3 colunas nos perfis de utilizador (próprio e de terceiros, seguir/deixar de seguir) e no separador Explorar.
  - [ ] Pesquisa unificada (contas, hashtags, publicações visuais).

- [ ] **Fase 4 — Compositor Photo-First, Recorte/EXIF, Alt-Text IA, Rascunhos & Agendamento**
  - [ ] Compositor visual: até 4 fotos (cross-post Bluesky) ou 10 fotos (só Pixelfed), reordenação, recorte (`Original`, `1:1`, `4:5`, `16:9`) e limpeza de EXIF/GPS via Canvas.
  - [ ] Geração de Alt-Text IA por foto, CW/Spoiler, visibilidade, rascunhos e agendamento de publicações.

- [ ] **Fase 5 — Notificações, Guardados, Palavras Silenciadas, LAN/Tailscale & Polimento Final**
  - [ ] Separadores de Notificações e Guardados (locais + sincronização Pixelfed Bookmarks) e gestão de palavras/hashtags silenciadas.
  - [ ] Modal Telemóvel / LAN / Tailscale com QR Code e instruções PWA.
  - [ ] Suíte completa de testes (`unittest` + `js_lint.py`) e commit/push final.
