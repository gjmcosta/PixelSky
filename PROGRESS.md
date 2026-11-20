# PixelSky — Progresso do Projeto

Cliente web local-first e PWA *photo-first* para **Pixelfed** (Fediverso) e **Bluesky / Flashes** (AT Protocol).

## Princípios
- Python 3 standard library apenas (zero dependências externas / sem `pip install`).
- Local-first & seguro (`0600` em `config.json` / `user_data.json`, CSRF, SSRF, CSP).
- Porta por omissão: **8788** (sem colisão com MastoSky na 8000).
- Frontend criado de raiz, leve e *photo-first* (bilingue PT-PT / EN).
- Testes automatizados (`unittest` + `js_lint.py`).

---

## Fases

- [x] **Fase 0 — Base, Limpeza & Infraestrutura**
  - [x] Limpar estrutura inicial, remover pasta `Users/` residual e preparar `PROGRESS.md`, `.gitignore`, `.dockerignore`, `config.example.json`.
  - [x] Adaptar `Dockerfile`, `docker-compose.yml` (CasaOS) e `manifest.json` para `PixelSky` na porta `8788`.
  - [x] Gerar ícones PWA base em `brand/` (`favicon.svg`, `app-icon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`).
  - [x] Adaptar `app.py` para `PixelSky` (porta `8788`, `PIXELSKY_*`, remover DMs/Chat, renomear/adaptar `Masto` → `Pixelfed`, filtro `media_only` por omissão no Bluesky, `aspectRatio`/`width`/`height`/`blurhash`).
  - [x] Limpar e adaptar `tests/test_app.py` ao backend do PixelSky e validar `unittest`.
  - [x] Inicializar repositório Git local (pronto para criar/push no GitHub).

- [ ] **Fase 1 — Shell PWA, Bilingue (PT-PT/EN) & Autenticação**
  - [ ] `index.html`, `app.css`, `app.js` de raiz com layout *photo-first* (barra inferior mobile + rail lateral desktop).
  - [ ] Ecrã de configuração/ligação para **Pixelfed** (sugestão `https://pixelfed.de`, qualquer instância) e **Bluesky** (handle + App Password), além de opções de IA (Gemini / Ollama / OpenAI-compatible).
  - [ ] Alternância imediata PT-PT / EN e tema escuro/claro.

- [ ] **Fase 2 — Feed Photo-First, Carrossel & Lightbox**
  - [ ] Cartões de feed centrados na fotografia (carrossel horizontal com indicadores/setas, vídeo HLS/MP4, aspect-ratio preservado, alt-text badge).
  - [ ] Toggle rápido **Só Media** (ativo por omissão no Bluesky) vs **Tudo**.
  - [ ] Lightbox em ecrã inteiro com navegação, zoom/detalhes e descarga de vídeo/imagem.
  - [ ] Interações: Gosto, Boost/Repost, Guardar (local + bookmarks Pixelfed), Comentários/Thread.

- [ ] **Fase 3 — Perfis & Explorar em Grelha 3 Colunas**
  - [ ] Grelha 3 colunas (estilo Instagram/Flashes) nos perfis de utilizador e no separador Explorar.
  - [ ] Pesquisa unificada (contas, hashtags, publicações visuais) e feeds personalizados do Bluesky / listas.

- [ ] **Fase 4 — Compositor Photo-First, Alt-Text IA & Publicação Cruzada**
  - [ ] Compositor centrado nas fotos/álbuns (até 4 fotos no Bluesky / múltiplas no Pixelfed), reordenação, recorte/preview.
  - [ ] Geração automática/assistida de Alt-Text com IA (PT-PT / EN).
  - [ ] Publicação cruzada simultânea Pixelfed + Bluesky, rascunhos e agendamento.

- [ ] **Fase 5 — Notificações, Guardados, LAN/Tailscale & Polimento**
  - [ ] Notificações visuais (gostos, comentários, novos seguidores, boosts).
  - [ ] Modal Telemóvel / LAN / Tailscale com QR Code e instruções PWA.
  - [ ] Validação completa Docker / CasaOS e suíte de testes (`unittest` + `js_lint.py`).
