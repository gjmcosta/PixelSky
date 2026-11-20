/* PixelSky Frontend — Photo-First Client for Pixelfed & Bluesky / Flashes */

const I18N = {
  pt: {
    nav_feed: "Feed",
    nav_explore: "Explorar",
    nav_publish: "Publicar",
    nav_notifications: "Atividade",
    nav_saved: "Guardados",
    nav_profile: "Perfil",
    nav_mobile: "Telemóvel / QR",
    filter_all: "Todas",
    filter_media_only: "Só Media",
    filter_all_posts: "Tudo",
    welcome_title: "Bem-vindo ao PixelSky",
    welcome_sub: "A tua galeria local-first para Pixelfed (Fediverso) e Bluesky / Flashes.",
    status_connected: "Ligado ✓",
    status_disconnected: "Não ligado",
    pf_oauth_desc: "Liga a tua conta com OAuth 2.0 automático no navegador (sugestão: pixelfed.de).",
    pf_instance_label: "Instância Pixelfed",
    pf_connect_btn: "Ligar com Pixelfed",
    bsky_auth_desc: "Usa o teu handle e uma App Password criada nas definições do Bluesky.",
    bsky_connect_btn: "Guardar & Ligar Bluesky",
    search_placeholder: "Pesquisar fotógrafos, #hashtags ou publicações…",
    search_btn: "Pesquisar",
    clear_btn: "Limpar",
    catchup_title: "✨ Resumo IA das últimas horas",
    loading: "A revelar fotografias…",
    load_more: "Carregar mais fotografias",
    comments_title: "Comentários & Conversa",
    reply_placeholder: "Escreve um comentário…",
    reply_btn: "Responder",
    composer_title: "Nova Publicação Fotográfica",
    dropzone_text: "Arrasta fotografias ou clica para escolher (EXIF/GPS limpo automaticamente)",
    crop_label: "Enquadramento:",
    caption_placeholder: "Escreve uma legenda, história ou #hashtags…",
    cw_placeholder: "Aviso de conteúdo / Spoiler (opcional)",
    save_draft_btn: "Guardar Rascunho",
    publish_btn: "Publicar",
    settings_title: "Contas, IA & Preferências",
    accounts_heading: "Contas Ligadas",
    disconnect_btn: "Desligar",
    ai_heading: "Alt-Text IA & Tradução",
    ai_provider_label: "Fornecedor IA",
    ai_key_label: "Chave API (Gemini / OpenAI)",
    muted_heading: "Palavras & Hashtags Silenciadas",
    save_settings_btn: "Guardar Definições",
    lan_title: "Aceder no Telemóvel / iPad (LAN & Tailscale)",
    empty_feed: "Ainda não há fotografias para mostrar.",
    cw_show_btn: "Mostrar fotografia",
    translate_btn: "Traduzir legenda",
    alt_gen_btn: "✨ Alt IA",
    alt_placeholder: "Texto alternativo (descrição para acessibilidade)…",
    oauth_ok: "Conta Pixelfed ligada com sucesso via OAuth 2.0!",
    saved_toast: "Guardado na tua coleção",
    unsaved_toast: "Removido dos guardados",
    published_toast: "Fotografia publicada com sucesso!",
    scheduled_toast: "Publicação agendada!"
  },
  en: {
    nav_feed: "Feed",
    nav_explore: "Explore",
    nav_publish: "Publish",
    nav_notifications: "Activity",
    nav_saved: "Saved",
    nav_profile: "Profile",
    nav_mobile: "Mobile / QR",
    filter_all: "All",
    filter_media_only: "Media Only",
    filter_all_posts: "Everything",
    welcome_title: "Welcome to PixelSky",
    welcome_sub: "Your local-first photo gallery for Pixelfed (Fediverse) and Bluesky / Flashes.",
    status_connected: "Connected ✓",
    status_disconnected: "Disconnected",
    pf_oauth_desc: "Connect your account via automatic browser OAuth 2.0 (suggested: pixelfed.de).",
    pf_instance_label: "Pixelfed Instance",
    pf_connect_btn: "Connect with Pixelfed",
    bsky_auth_desc: "Use your handle and an App Password created in Bluesky settings.",
    bsky_connect_btn: "Save & Connect Bluesky",
    search_placeholder: "Search photographers, #hashtags, or posts…",
    search_btn: "Search",
    clear_btn: "Clear",
    catchup_title: "✨ AI Catch-up Summary",
    loading: "Developing photos…",
    load_more: "Load more photos",
    comments_title: "Comments & Thread",
    reply_placeholder: "Write a comment…",
    reply_btn: "Reply",
    composer_title: "New Photo Post",
    dropzone_text: "Drag photos or click to choose (EXIF/GPS stripped automatically)",
    crop_label: "Aspect:",
    caption_placeholder: "Write a caption, story, or #hashtags…",
    cw_placeholder: "Content warning / Spoiler (optional)",
    save_draft_btn: "Save Draft",
    publish_btn: "Publish",
    settings_title: "Accounts, AI & Preferences",
    accounts_heading: "Connected Accounts",
    disconnect_btn: "Disconnect",
    ai_heading: "AI Alt-Text & Translation",
    ai_provider_label: "AI Provider",
    ai_key_label: "API Key (Gemini / OpenAI)",
    muted_heading: "Muted Words & Hashtags",
    save_settings_btn: "Save Settings",
    lan_title: "Open on Phone / iPad (LAN & Tailscale)",
    empty_feed: "No photos to display yet.",
    cw_show_btn: "Reveal photo",
    translate_btn: "Translate caption",
    alt_gen_btn: "✨ AI Alt",
    alt_placeholder: "Alt text (accessibility description)…",
    oauth_ok: "Pixelfed account connected via OAuth 2.0!",
    saved_toast: "Saved to your collection",
    unsaved_toast: "Removed from saved",
    published_toast: "Photo published!",
    scheduled_toast: "Post scheduled!"
  }
};

const state = {
  lang: localStorage.getItem("pixelsky_lang") || "pt",
  theme: localStorage.getItem("pixelsky_theme") || "dark",
  view: "feed",
  networkFilter: "all",
  mediaOnly: true,
  customFeedId: null,
  customFeedNet: null,
  status: { configured: false, networks: [], bluesky: {}, pixelfed: {}, ai: {} },
  userData: { saved_posts: [], drafts: [], muted_words: [], preferences: {} },
  items: [],
  cursors: {},
  activeProfileActor: null,
  activeProfileNet: null,
  activeThreadItem: null,
  lightboxMedia: [],
  lightboxIndex: 0,
  composerFiles: [],
  composerCrop: "original"
};

function t(key) {
  const dict = I18N[state.lang] || I18N.pt;
  return dict[key] || I18N.pt[key] || key;
}

function getCsrfToken() {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") || "" : "";
}

async function apiGet(path) {
  const res = await fetch(path, {
    headers: { "X-CSRF-Token": getCsrfToken() }
  });
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": getCsrfToken()
    },
    body: JSON.stringify(body || {})
  });
  return res.json();
}

function showToast(msg) {
  const box = document.getElementById("toastBox");
  if (!box) return;
  box.textContent = msg;
  box.classList.remove("hidden");
  clearTimeout(box._timer);
  box._timer = setTimeout(() => box.classList.add("hidden"), 3400);
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatRelativeTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const diffSec = Math.max(1, Math.floor((Date.now() - d.getTime()) / 1000));
  if (diffSec < 60) return `${diffSec}s`;
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h`;
  return `${Math.floor(diffSec / 86400)}d`;
}

function applyThemeAndLang() {
  document.documentElement.setAttribute("data-theme", state.theme);
  document.documentElement.setAttribute("lang", state.lang);
  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) langBtn.textContent = state.lang.toUpperCase();
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) themeBtn.textContent = state.theme === "dark" ? "☾" : "☀";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    el.textContent = t(k);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const k = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(k));
  });
  updateMediaOnlyBtnLabel();
}

function updateMediaOnlyBtnLabel() {
  const btn = document.getElementById("mediaOnlyToggle");
  if (!btn) return;
  btn.classList.toggle("active", state.mediaOnly);
  const labelSpan = btn.querySelector("[data-i18n]");
  if (labelSpan) {
    labelSpan.textContent = state.mediaOnly ? t("filter_media_only") : t("filter_all_posts");
  }
}

function isMutedItem(item) {
  const words = state.userData.muted_words || [];
  if (!words.length) return false;
  const hay = `${item.text || ""} ${item.cw || ""} ${item.name || ""}`.toLowerCase();
  return words.some((w) => w && hay.includes(w.toLowerCase()));
}

function isSavedItem(item) {
  const id = (item.ref && (item.ref.uri || item.ref.id)) || item.url;
  return (state.userData.saved_posts || []).some(
    (s) => ((s.ref && (s.ref.uri || s.ref.id)) || s.url) === id
  ) || Boolean(item.bookmarked);
}

/* OAuth 2.0 Pixelfed & Bluesky Auth */
async function startPixelfedOAuth(instanceInputId) {
  const inp = document.getElementById(instanceInputId);
  const instance = (inp && inp.value.trim()) || "https://pixelfed.de";
  try {
    const res = await apiPost("/api/pixelfed/oauth/start", {
      instance,
      origin: window.location.origin
    });
    if (res && res.ok && res.authorize_url) {
      window.location.href = res.authorize_url;
    } else {
      showToast((res && res.error) || "Erro ao iniciar OAuth Pixelfed");
    }
  } catch (err) {
    showToast("Erro OAuth: " + err.message);
  }
}

async function connectBlueskyFromInputs(handleId, passId) {
  const handle = (document.getElementById(handleId)?.value || "").trim();
  const app_password = (document.getElementById(passId)?.value || "").trim();
  if (!handle || !app_password) {
    showToast("Preenche o Handle e a App Password do Bluesky.");
    return;
  }
  const res = await apiPost("/api/setup", {
    bluesky: { handle, app_password },
    allow_empty: true
  });
  if (res && res.ok) {
    showToast("Bluesky ligado!");
    await refreshStatusAndLoad();
  } else {
    showToast((res && res.error) || "Erro ao ligar Bluesky.");
  }
}

async function refreshStatusAndLoad() {
  try {
    const [st, ud] = await Promise.all([apiGet("/api/status"), apiGet("/api/user_data")]);
    state.status = st || { configured: false, networks: [] };
    if (ud && ud.data) state.userData = ud.data;
  } catch (_) {}

  renderStatusIndicators();
  const onboard = document.getElementById("onboardingSection");
  if (onboard) {
    onboard.classList.toggle("hidden", Boolean(state.status.configured));
  }
  if (state.status.configured) {
    loadCustomFeedsBar();
    await loadCurrentView(false);
  }
}

function renderStatusIndicators() {
  const dots = document.getElementById("networkStatusDots");
  if (dots) {
    dots.innerHTML = "";
    if (state.status.pixelfed?.configured) {
      dots.innerHTML += '<span class="net-dot dot-pixelfed" title="Pixelfed ligado"></span>';
    }
    if (state.status.bluesky?.configured) {
      dots.innerHTML += '<span class="net-dot dot-bluesky" title="Bluesky ligado"></span>';
    }
  }
  const pfTag = document.getElementById("pfStatusTag");
  if (pfTag) {
    const ok = Boolean(state.status.pixelfed?.configured);
    pfTag.textContent = ok ? `${t("status_connected")} (${state.status.pixelfed.instance})` : t("status_disconnected");
    pfTag.classList.toggle("connected", ok);
  }
  const bskyTag = document.getElementById("bskyStatusTag");
  if (bskyTag) {
    const ok = Boolean(state.status.bluesky?.configured);
    bskyTag.textContent = ok ? `${t("status_connected")} (@${state.status.bluesky.handle})` : t("status_disconnected");
    bskyTag.classList.toggle("connected", ok);
  }
  const pfInst = state.status.pixelfed?.instance || state.status.pixelfed?.default_instance || "https://pixelfed.de";
  const pfIn1 = document.getElementById("pfInstanceInput");
  const pfIn2 = document.getElementById("settingsPfInstance");
  if (pfIn1 && !pfIn1.value) pfIn1.value = pfInst;
  if (pfIn2) pfIn2.value = pfInst;
  const discBtn = document.getElementById("settingsPfDisconnectBtn");
  if (discBtn) discBtn.classList.toggle("hidden", !state.status.pixelfed?.configured);
}

async function loadCustomFeedsBar() {
  const bar = document.getElementById("customFeedsBar");
  if (!bar) return;
  try {
    const res = await apiGet("/api/lists");
    const items = (res && res.items) || [];
    if (!items.length) {
      bar.classList.add("hidden");
      return;
    }
    bar.classList.remove("hidden");
    bar.innerHTML = items.map((f) => `
      <button type="button" class="chip-btn ${state.customFeedId === f.id ? "active" : ""}" data-feed-id="${escapeHtml(f.id)}" data-feed-net="${escapeHtml(f.network)}">
        <span class="net-dot ${f.network === "pixelfed" ? "dot-pixelfed" : "dot-bluesky"}"></span>
        ${escapeHtml(f.name)}
      </button>
    `).join("");
    bar.querySelectorAll("[data-feed-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const fid = btn.getAttribute("data-feed-id");
        const fnet = btn.getAttribute("data-feed-net");
        if (state.customFeedId === fid) {
          state.customFeedId = null;
          state.customFeedNet = null;
        } else {
          state.customFeedId = fid;
          state.customFeedNet = fnet;
        }
        loadCustomFeedsBar();
        loadCurrentView(false);
      });
    });
  } catch (_) {}
}

/* Main View Loader */
async function loadCurrentView(append) {
  const loading = document.getElementById("feedLoading");
  const empty = document.getElementById("feedEmpty");
  const stream = document.getElementById("feedStream");
  const grid = document.getElementById("photoGrid");
  const stage = document.querySelector(".main-stage");
  const exploreBar = document.getElementById("exploreToolbar");
  const profBanner = document.getElementById("profileHeaderSection");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (!append) {
    state.items = [];
    state.cursors = {};
    if (stream) stream.innerHTML = "";
    if (grid) grid.innerHTML = "";
  }

  const isGridView = state.view === "explore" || state.view === "profile";
  if (stage) stage.classList.toggle("wide-grid", isGridView);
  if (stream) stream.classList.toggle("hidden", isGridView);
  if (grid) grid.classList.toggle("hidden", !isGridView);
  if (exploreBar) exploreBar.classList.toggle("hidden", state.view !== "explore");
  if (profBanner) profBanner.classList.toggle("hidden", state.view !== "profile");

  if (state.view === "saved") {
    let saved = (state.userData.saved_posts || []).slice();
    if (state.status.pixelfed?.configured) {
      try {
        const bRes = await apiGet("/api/bookmarks");
        if (bRes && Array.isArray(bRes.items)) {
          const seen = new Set(saved.map((x) => (x.ref && (x.ref.uri || x.ref.id)) || x.url));
          bRes.items.forEach((it) => {
            const k = (it.ref && (it.ref.uri || it.ref.id)) || it.url;
            if (k && !seen.has(k)) saved.push(it);
          });
        }
      } catch (_) {}
    }
    state.items = saved;
    renderItems();
    if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
    return;
  }

  if (loading && !append) loading.classList.remove("hidden");
  if (empty) empty.classList.add("hidden");

  try {
    let url = "/api/timeline";
    const qs = new URLSearchParams();
    qs.set("media_only", state.mediaOnly ? "1" : "0");
    if (state.networkFilter !== "all") {
      qs.set("network", state.networkFilter);
    }
    if (append) {
      if (state.cursors.bluesky) qs.set("cursor_bluesky", state.cursors.bluesky);
      if (state.cursors.pixelfed) qs.set("cursor_pixelfed", state.cursors.pixelfed);
    }

    if (state.view === "feed" && state.customFeedId) {
      url = `/api/list_feed?network=${encodeURIComponent(state.customFeedNet)}&id=${encodeURIComponent(state.customFeedId)}&media_only=${state.mediaOnly ? "1" : "0"}`;
      if (append && state.cursors.custom) url += `&cursor=${encodeURIComponent(state.cursors.custom)}`;
    } else if (state.view === "explore") {
      url = `/api/explore?${qs.toString()}`;
    } else if (state.view === "notifications") {
      url = `/api/notifications?${qs.toString()}`;
    } else if (state.view === "profile") {
      await renderProfileBanner();
      if (state.activeProfileActor && state.activeProfileNet) {
        url = `/api/user_feed?network=${encodeURIComponent(state.activeProfileNet)}&actor=${encodeURIComponent(state.activeProfileActor)}&media_only=${state.mediaOnly ? "1" : "0"}`;
        if (append && state.cursors.user) url += `&cursor=${encodeURIComponent(state.cursors.user)}`;
      } else {
        url = `/api/profile/feed?${qs.toString()}`;
      }
    } else {
      url = `/api/timeline?${qs.toString()}`;
    }

    const data = await apiGet(url);
    const newItems = (data && data.items) || [];
    state.items = append ? state.items.concat(newItems) : newItems;

    if (data && data.cursors) {
      state.cursors = data.cursors;
    } else if (data && data.cursor) {
      state.cursors = { custom: data.cursor, user: data.cursor };
    } else {
      state.cursors = {};
    }

    renderItems();
    const hasMore = Boolean(state.cursors.bluesky || state.cursors.pixelfed || state.cursors.custom || state.cursors.user);
    if (loadMoreBtn) loadMoreBtn.classList.toggle("hidden", !hasMore);
  } catch (err) {
    showToast("Erro ao carregar feed: " + err.message);
  } finally {
    if (loading) loading.classList.add("hidden");
  }
}

async function renderProfileBanner() {
  const banner = document.getElementById("profileHeaderSection");
  if (!banner) return;
  try {
    if (state.activeProfileActor && state.activeProfileNet) {
      const res = await apiGet(`/api/user_profile?network=${encodeURIComponent(state.activeProfileNet)}&actor=${encodeURIComponent(state.activeProfileActor)}`);
      const p = res && res.profile;
      if (!p) return;
      banner.innerHTML = buildProfileCardHtml(p, true);
      bindProfileFollowBtn(banner, p);
    } else {
      const res = await apiGet("/api/profile");
      const profs = Object.values((res && res.profiles) || {});
      if (!profs.length) return;
      banner.innerHTML = profs.map((p) => buildProfileCardHtml(p, false)).join('<hr style="border-color:var(--border);margin:14px 0">');
    }
  } catch (_) {}
}

function buildProfileCardHtml(p, showBack) {
  return `
    <div class="profile-top">
      ${showBack ? '<button type="button" class="icon-btn" id="backOwnProfileBtn">←</button>' : ""}
      <img class="profile-avatar-lg" src="${escapeHtml(p.avatar || "/brand/favicon.svg")}" alt="">
      <div style="flex:1">
        <div class="author-name">${p.name_html || escapeHtml(p.name)} <span class="net-badge ${p.network === "pixelfed" ? "badge-pixelfed" : "badge-bluesky"}">${escapeHtml(p.network)}</span></div>
        <div class="author-handle">${escapeHtml(p.handle)}</div>
        <div class="profile-stats">
          <span><strong>${p.posts_count || 0}</strong> posts</span>
          <span><strong>${p.followers || 0}</strong> followers</span>
          <span><strong>${p.following || 0}</strong> following</span>
        </div>
      </div>
      ${!p.is_self && showBack ? `<button type="button" class="btn ${p.is_following ? "btn-ghost" : "btn-primary"}" id="profileFollowActionBtn">${p.is_following ? "A seguir" : "Seguir"}</button>` : ""}
    </div>
    <div class="card-caption">${p.bio || ""}</div>
  `;
}

function bindProfileFollowBtn(container, p) {
  const backBtn = container.querySelector("#backOwnProfileBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      state.activeProfileActor = null;
      state.activeProfileNet = null;
      loadCurrentView(false);
    });
  }
  const fBtn = container.querySelector("#profileFollowActionBtn");
  if (fBtn) {
    fBtn.addEventListener("click", async () => {
      const action = p.is_following ? "unfollow" : "follow";
      const res = await apiPost("/api/follow", {
        network: p.network,
        action,
        actor: p.actor_id || p.handle,
        follow_uri: p.follow_uri
      });
      if (res && res.ok) {
        p.is_following = res.following;
        p.follow_uri = res.follow_uri || null;
        fBtn.textContent = p.is_following ? "A seguir" : "Seguir";
      }
    });
  }
}

/* Render Feed Cards or 3-Column Photo Grid */
function renderItems() {
  const stream = document.getElementById("feedStream");
  const grid = document.getElementById("photoGrid");
  const empty = document.getElementById("feedEmpty");
  const visible = state.items.filter((it) => !isMutedItem(it));

  if (!visible.length) {
    if (stream) stream.innerHTML = "";
    if (grid) grid.innerHTML = "";
    if (empty) {
      empty.textContent = t("empty_feed");
      empty.classList.remove("hidden");
    }
    return;
  }
  if (empty) empty.classList.add("hidden");

  if (state.view === "explore" || state.view === "profile") {
    const mediaItems = visible.filter((it) => (it.media || []).some((m) => m.type === "image" || m.type === "video" || m.type === "gifv"));
    grid.innerHTML = mediaItems.map((it, idx) => {
      const m = it.media[0];
      const thumb = m.thumb || m.url;
      const multi = it.media.length > 1 ? `<span class="badge-multi">❐ ${it.media.length}</span>` : "";
      return `
        <div class="grid-tile" data-idx="${idx}">
          <img src="${escapeHtml(thumb)}" alt="${escapeHtml(m.alt || it.text || "")}" loading="lazy">
          <div class="grid-tile-badges">
            ${multi}
            <span class="grid-tile-net ${it.network === "pixelfed" ? "dot-pixelfed" : "dot-bluesky"}"></span>
          </div>
        </div>
      `;
    }).join("");
    grid.querySelectorAll(".grid-tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        const it = mediaItems[Number(tile.getAttribute("data-idx"))];
        if (it) openThreadDrawer(it);
      });
    });
    return;
  }

  stream.innerHTML = visible.map((it, idx) => buildFeedCardHtml(it, idx)).join("");
  bindFeedCardEvents(stream, visible);
}

function buildFeedCardHtml(it, idx) {
  const mediaList = (it.media || []).filter((m) => m.type === "image" || m.type === "video" || m.type === "gifv");
  const hasCw = Boolean(it.cw);
  const saved = isSavedItem(it);
  const netClass = it.network === "pixelfed" ? "badge-pixelfed" : "badge-bluesky";
  const netLabel = it.network === "pixelfed" ? "Pixelfed" : "Bluesky";

  let mediaHtml = "";
  if (mediaList.length) {
    const slides = mediaList.map((m, mIdx) => {
      const isVid = m.type === "video" || m.type === "gifv";
      const el = isVid
        ? `<video src="${escapeHtml(m.url)}" poster="${escapeHtml(m.thumb || "")}" controls playsinline preload="metadata"></video>`
        : `<img src="${escapeHtml(m.url)}" alt="${escapeHtml(m.alt || "")}" loading="lazy">`;
      const altBadge = m.alt ? `<button type="button" class="alt-badge" data-alt="${escapeHtml(m.alt)}">ALT</button>` : "";
      return `
        <div class="carousel-slide" data-slide="${mIdx}">
          ${el}
          ${altBadge}
          <button type="button" class="expand-photo-btn" data-media-idx="${mIdx}" title="Lightbox">⤢</button>
        </div>
      `;
    }).join("");

    const counter = mediaList.length > 1 ? `<span class="carousel-counter">1 / ${mediaList.length}</span>` : "";
    const cwOverlay = hasCw ? `
      <div class="cw-overlay">
        <strong>⚠ ${escapeHtml(it.cw)}</strong>
        <button type="button" class="btn btn-ghost cw-reveal-btn">${escapeHtml(t("cw_show_btn"))}</button>
      </div>
    ` : "";

    mediaHtml = `
      <div class="media-stage ${hasCw ? "cw-blur" : ""}">
        ${counter}
        ${cwOverlay}
        <div class="heart-burst">♥</div>
        <div class="carousel-track">${slides}</div>
      </div>
    `;
  }

  return `
    <article class="photo-card" data-card-idx="${idx}">
      <header class="card-header">
        <div class="author-block" data-actor="${escapeHtml(it.author_handle || it.author_id || "")}" data-net="${escapeHtml(it.network)}">
          <img class="author-avatar" src="${escapeHtml(it.avatar || "/brand/favicon.svg")}" alt="" loading="lazy">
          <div>
            <div class="author-name">${it.name_html || escapeHtml(it.name || it.handle)}</div>
            <div class="author-handle">${escapeHtml(it.handle || "")}</div>
          </div>
        </div>
        <div class="card-meta-right">
          <span class="net-badge ${netClass}">${netLabel}</span>
          <span>${formatRelativeTime(it.time)}</span>
        </div>
      </header>
      ${mediaHtml}
      <div class="card-actions">
        <div class="actions-left">
          <button type="button" class="act-btn act-like ${it.liked ? "liked" : ""}">
            <span>♥</span> <span class="cnt">${it.likes || 0}</span>
          </button>
          <button type="button" class="act-btn act-comment">
            <span>💬</span> <span class="cnt">${it.replies || 0}</span>
          </button>
          <button type="button" class="act-btn act-boost ${it.boosted ? "boosted" : ""}">
            <span>↻</span> <span class="cnt">${it.boosts || 0}</span>
          </button>
        </div>
        <div class="actions-right">
          <button type="button" class="act-btn act-save ${saved ? "saved" : ""}" title="Guardar">
            <span>${saved ? "★" : "☆"}</span>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-caption">${it.html || escapeHtml(it.text || "")}</div>
        ${it.text ? `<button type="button" class="translate-link">${escapeHtml(t("translate_btn"))}</button>` : ""}
      </div>
    </article>
  `;
}

function bindFeedCardEvents(container, items) {
  container.querySelectorAll(".photo-card").forEach((card) => {
    const it = items[Number(card.getAttribute("data-card-idx"))];
    if (!it) return;

    const authorEl = card.querySelector(".author-block");
    if (authorEl) {
      authorEl.addEventListener("click", () => {
        state.activeProfileActor = authorEl.getAttribute("data-actor");
        state.activeProfileNet = authorEl.getAttribute("data-net");
        switchView("profile");
      });
    }

    const cwBtn = card.querySelector(".cw-reveal-btn");
    if (cwBtn) {
      cwBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const stage = card.querySelector(".media-stage");
        if (stage) stage.classList.remove("cw-blur");
        cwBtn.parentElement.remove();
      });
    }

    const track = card.querySelector(".carousel-track");
    const counter = card.querySelector(".carousel-counter");
    if (track && counter) {
      track.addEventListener("scroll", () => {
        const idx = Math.round(track.scrollLeft / Math.max(1, track.clientWidth)) + 1;
        counter.textContent = `${idx} / ${it.media.length}`;
      });
    }

    /* Double-tap / double-click on photo to Like with heart burst */
    const stage = card.querySelector(".media-stage");
    if (stage) {
      let lastTap = 0;
      stage.addEventListener("click", (e) => {
        if (e.target.closest("button") || e.target.tagName === "VIDEO") return;
        const now = Date.now();
        if (now - lastTap < 320) {
          const burst = stage.querySelector(".heart-burst");
          if (burst) {
            burst.classList.add("show");
            setTimeout(() => burst.classList.remove("show"), 650);
          }
          if (!it.liked) togglePostAction(it, card, "like");
        }
        lastTap = now;
      });
    }

    card.querySelectorAll(".alt-badge").forEach((b) => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        showToast("ALT: " + b.getAttribute("data-alt"));
      });
    });

    card.querySelectorAll(".expand-photo-btn").forEach((b) => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox(it.media || [], Number(b.getAttribute("data-media-idx")) || 0);
      });
    });

    const likeBtn = card.querySelector(".act-like");
    if (likeBtn) likeBtn.addEventListener("click", () => togglePostAction(it, card, "like"));

    const boostBtn = card.querySelector(".act-boost");
    if (boostBtn) boostBtn.addEventListener("click", () => togglePostAction(it, card, "boost"));

    const commentBtn = card.querySelector(".act-comment");
    if (commentBtn) commentBtn.addEventListener("click", () => openThreadDrawer(it));

    const saveBtn = card.querySelector(".act-save");
    if (saveBtn) saveBtn.addEventListener("click", () => toggleSavePost(it, saveBtn));

    const trBtn = card.querySelector(".translate-link");
    if (trBtn) {
      trBtn.addEventListener("click", async () => {
        trBtn.textContent = "…";
        const res = await apiPost("/api/translate", { text: it.text, target_lang: state.lang });
        if (res && res.ok && res.translated) {
          const cap = card.querySelector(".card-caption");
          if (cap) cap.innerHTML += `<div style="margin-top:6px;padding-top:6px;border-top:1px solid var(--border);color:var(--text-muted)">🌐 ${escapeHtml(res.translated)}</div>`;
          trBtn.remove();
        } else {
          showToast((res && res.error) || "Configura a IA nas Definições para traduzir.");
          trBtn.textContent = t("translate_btn");
        }
      });
    }
  });
}

async function togglePostAction(it, card, kind) {
  const isLike = kind === "like";
  const active = isLike ? it.liked : it.boosted;
  const action = isLike ? (active ? "unlike" : "like") : (active ? "unboost" : "boost");
  const res = await apiPost("/api/act", { network: it.network, action, ref: it.ref });
  if (res && res.ok) {
    if (isLike) {
      it.liked = !active;
      it.likes = Math.max(0, (it.likes || 0) + (it.liked ? 1 : -1));
      if (res.ref) it.ref = res.ref;
      const btn = card.querySelector(".act-like");
      if (btn) {
        btn.classList.toggle("liked", it.liked);
        btn.querySelector(".cnt").textContent = it.likes;
      }
    } else {
      it.boosted = !active;
      it.boosts = Math.max(0, (it.boosts || 0) + (it.boosted ? 1 : -1));
      if (res.ref) it.ref = res.ref;
      const btn = card.querySelector(".act-boost");
      if (btn) {
        btn.classList.toggle("boosted", it.boosted);
        btn.querySelector(".cnt").textContent = it.boosts;
      }
    }
  }
}

async function toggleSavePost(it, btn) {
  const id = (it.ref && (it.ref.uri || it.ref.id)) || it.url;
  const list = (state.userData.saved_posts || []).slice();
  const idx = list.findIndex((s) => ((s.ref && (s.ref.uri || s.ref.id)) || s.url) === id);
  let nowSaved = false;
  if (idx >= 0) {
    list.splice(idx, 1);
    it.bookmarked = false;
  } else {
    list.unshift(it);
    it.bookmarked = true;
    nowSaved = true;
  }
  state.userData.saved_posts = list;
  btn.classList.toggle("saved", nowSaved);
  btn.querySelector("span").textContent = nowSaved ? "★" : "☆";
  await apiPost("/api/user_data", { saved_posts: list });
  if (it.network === "pixelfed" && it.ref && it.ref.id) {
    apiPost("/api/act", { network: "pixelfed", action: nowSaved ? "bookmark" : "unbookmark", ref: it.ref }).catch(() => {});
  }
  showToast(nowSaved ? t("saved_toast") : t("unsaved_toast"));
}

/* Lightbox */
function openLightbox(mediaList, index) {
  const imgs = mediaList.filter((m) => m.type === "image");
  if (!imgs.length) return;
  state.lightboxMedia = imgs;
  state.lightboxIndex = Math.min(Math.max(0, index), imgs.length - 1);
  updateLightboxSlide();
  document.getElementById("lightboxModal")?.classList.remove("hidden");
}

function updateLightboxSlide() {
  const m = state.lightboxMedia[state.lightboxIndex];
  if (!m) return;
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  if (img) {
    img.src = m.url;
    img.alt = m.alt || "";
  }
  if (cap) cap.textContent = m.alt || "";
  document.getElementById("lightboxPrevBtn")?.classList.toggle("hidden", state.lightboxIndex <= 0);
  document.getElementById("lightboxNextBtn")?.classList.toggle("hidden", state.lightboxIndex >= state.lightboxMedia.length - 1);
}

/* Comments & Thread Drawer */
async function openThreadDrawer(it) {
  state.activeThreadItem = it;
  const modal = document.getElementById("threadModal");
  const body = document.getElementById("threadBody");
  if (!modal || !body) return;
  modal.classList.remove("hidden");
  body.innerHTML = `<div class="loading-state"><div class="spinner"></div></div>`;

  try {
    const res = await apiPost("/api/thread", { network: it.network, ref: it.ref });
    const focus = (res && res.focus) || it;
    const replies = (res && res.replies) || [];
    const thumb = (focus.media && focus.media[0] && (focus.media[0].url || focus.media[0].thumb)) || "";
    body.innerHTML = `
      <div class="comment-item">
        <div class="author-name">${escapeHtml(focus.name)} <span class="author-handle">${escapeHtml(focus.handle)}</span></div>
        ${thumb ? `<img src="${escapeHtml(thumb)}" alt="" style="width:100%;max-height:320px;object-fit:contain;border-radius:10px;margin:8px 0">` : ""}
        <div class="card-caption">${focus.html || escapeHtml(focus.text || "")}</div>
      </div>
      ${replies.map((r) => `
        <div class="comment-item">
          <div class="author-name">${escapeHtml(r.name)} <span class="author-handle">${escapeHtml(r.handle)}</span></div>
          <div class="card-caption">${r.html || escapeHtml(r.text || "")}</div>
        </div>
      `).join("")}
    `;
  } catch (err) {
    body.innerHTML = `<p>${escapeHtml(err.message)}</p>`;
  }
}

/* Photo-First Composer: Canvas Crop + Automatic EXIF/GPS Stripping + AI Alt-Text */
async function processImageThroughCanvas(file, cropMode) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      let targetRatio = null;
      if (cropMode === "1:1") targetRatio = 1;
      else if (cropMode === "4:5") targetRatio = 4 / 5;
      else if (cropMode === "16:9") targetRatio = 16 / 9;

      if (targetRatio) {
        const cur = sw / sh;
        if (cur > targetRatio) {
          sw = Math.round(sh * targetRatio);
          sx = Math.round((img.naturalWidth - sw) / 2);
        } else {
          sh = Math.round(sw / targetRatio);
          sy = Math.round((img.naturalHeight - sh) / 2);
        }
      }
      const maxDim = 2048;
      let dw = sw, dh = sh;
      if (dw > maxDim || dh > maxDim) {
        const scale = maxDim / Math.max(dw, dh);
        dw = Math.round(dw * scale);
        dh = Math.round(dh * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = dw;
      canvas.height = dh;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      resolve({
        dataUrl,
        base64: dataUrl.split(",")[1],
        mime: "image/jpeg",
        width: dw,
        height: dh,
        alt: ""
      });
    };
    img.onerror = reject;
    img.src = url;
  });
}

function getComposerMaxPhotos() {
  const bskyChecked = document.getElementById("targetBluesky")?.checked;
  return bskyChecked ? 4 : 10;
}

function updateComposerLimitHint() {
  const max = getComposerMaxPhotos();
  const hint = document.getElementById("photoLimitHint");
  if (hint) {
    hint.textContent = max === 4 ? "Máx. 4 fotos (Bluesky ativo)" : "Máx. 10 fotos (Pixelfed)";
  }
}

async function handleComposerFiles(fileList) {
  const max = getComposerMaxPhotos();
  for (const file of Array.from(fileList || [])) {
    if (state.composerFiles.length >= max) break;
    if (file.type.startsWith("image/")) {
      const processed = await processImageThroughCanvas(file, state.composerCrop);
      state.composerFiles.push(processed);
    }
  }
  renderComposerMediaList();
}

function renderComposerMediaList() {
  const wrap = document.getElementById("composerMediaList");
  if (!wrap) return;
  wrap.innerHTML = state.composerFiles.map((item, idx) => `
    <div class="composer-media-item" data-idx="${idx}">
      <img src="${item.dataUrl}" alt="">
      <input type="text" class="text-input alt-input" value="${escapeHtml(item.alt)}" placeholder="${escapeHtml(t("alt_placeholder"))}">
      <div style="display:flex;flex-direction:column;gap:6px">
        <button type="button" class="chip-btn gen-alt-btn">${escapeHtml(t("alt_gen_btn"))}</button>
        <button type="button" class="chip-btn remove-img-btn">✕</button>
      </div>
    </div>
  `).join("");

  wrap.querySelectorAll(".composer-media-item").forEach((row) => {
    const idx = Number(row.getAttribute("data-idx"));
    const altIn = row.querySelector(".alt-input");
    altIn?.addEventListener("input", () => {
      state.composerFiles[idx].alt = altIn.value;
    });
    row.querySelector(".remove-img-btn")?.addEventListener("click", () => {
      state.composerFiles.splice(idx, 1);
      renderComposerMediaList();
    });
    row.querySelector(".gen-alt-btn")?.addEventListener("click", async (e) => {
      const btn = e.currentTarget;
      btn.textContent = "…";
      const res = await apiPost("/api/generate_alt", {
        image: state.composerFiles[idx].base64,
        lang: state.lang === "en" ? "en" : "pt-pt"
      });
      btn.textContent = t("alt_gen_btn");
      if (res && res.ok && res.alt) {
        state.composerFiles[idx].alt = res.alt;
        if (altIn) altIn.value = res.alt;
      } else {
        showToast((res && res.error) || "Configura a IA nas Definições para gerar Alt-Text.");
      }
    });
  });
}

function switchView(viewName) {
  state.view = viewName;
  document.querySelectorAll(".nav-btn[data-view]").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-view") === viewName);
  });
  if (viewName === "profile" && !state.activeProfileActor) {
    state.activeProfileNet = null;
  }
  loadCurrentView(false);
}

/* Initialization & Event Listeners */
document.addEventListener("DOMContentLoaded", async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }

  applyThemeAndLang();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("oauth") === "pixelfed_ok") {
    showToast(t("oauth_ok"));
    window.history.replaceState({}, "", "/");
  } else if (urlParams.get("oauth_error")) {
    showToast("Erro OAuth Pixelfed: " + urlParams.get("oauth_error"));
    window.history.replaceState({}, "", "/");
  }

  document.getElementById("langToggleBtn")?.addEventListener("click", () => {
    state.lang = state.lang === "pt" ? "en" : "pt";
    localStorage.setItem("pixelsky_lang", state.lang);
    applyThemeAndLang();
    renderStatusIndicators();
  });

  document.getElementById("themeToggleBtn")?.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("pixelsky_theme", state.theme);
    applyThemeAndLang();
  });

  document.querySelectorAll(".nav-btn[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeProfileActor = null;
      state.activeProfileNet = null;
      switchView(btn.getAttribute("data-view"));
    });
  });

  document.querySelectorAll("#networkFilterPills .pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#networkFilterPills .pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      state.networkFilter = pill.getAttribute("data-net") || "all";
      state.customFeedId = null;
      loadCurrentView(false);
    });
  });

  document.getElementById("mediaOnlyToggle")?.addEventListener("click", () => {
    state.mediaOnly = !state.mediaOnly;
    updateMediaOnlyBtnLabel();
    loadCurrentView(false);
  });

  document.getElementById("refreshFeedBtn")?.addEventListener("click", () => loadCurrentView(false));
  document.getElementById("loadMoreBtn")?.addEventListener("click", () => loadCurrentView(true));

  /* OAuth & Bluesky Connect Buttons */
  document.getElementById("pfOAuthConnectBtn")?.addEventListener("click", () => startPixelfedOAuth("pfInstanceInput"));
  document.getElementById("settingsPfOAuthBtn")?.addEventListener("click", () => startPixelfedOAuth("settingsPfInstance"));
  document.getElementById("bskyConnectBtn")?.addEventListener("click", () => connectBlueskyFromInputs("bskyHandleInput", "bskyPassInput"));

  /* Catch-up AI Summary */
  document.getElementById("catchupBtn")?.addEventListener("click", async () => {
    const sec = document.getElementById("catchupSection");
    const body = document.getElementById("catchupBody");
    if (!sec || !body) return;
    sec.classList.remove("hidden");
    body.textContent = "A gerar resumo IA…";
    const res = await apiPost("/api/catchup_summary", {
      posts: state.items.slice(0, 30),
      hours: 12,
      lang: state.lang === "en" ? "en" : "pt-pt"
    });
    body.textContent = (res && res.ok && res.summary) ? res.summary : ((res && res.error) || "Configura a IA nas Definições.");
  });
  document.getElementById("closeCatchupBtn")?.addEventListener("click", () => {
    document.getElementById("catchupSection")?.classList.add("hidden");
  });

  /* Explore Search */
  document.getElementById("searchForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = (document.getElementById("searchInput")?.value || "").trim();
    if (!q) return;
    document.getElementById("clearSearchBtn")?.classList.remove("hidden");
    const res = await apiGet(`/api/search?q=${encodeURIComponent(q)}`);
    const actorsBox = document.getElementById("searchResultsActors");
    if (actorsBox) {
      const actors = (res && res.actors) || [];
      actorsBox.classList.toggle("hidden", !actors.length);
      actorsBox.innerHTML = actors.map((a) => `
        <div class="actor-chip" data-actor="${escapeHtml(a.raw_handle || a.handle)}" data-net="${escapeHtml(a.network)}">
          <img src="${escapeHtml(a.avatar || "/brand/favicon.svg")}" alt="" width="28" height="28" style="border-radius:50%">
          <span>${escapeHtml(a.name || a.handle)}</span>
        </div>
      `).join("");
      actorsBox.querySelectorAll(".actor-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          state.activeProfileActor = chip.getAttribute("data-actor");
          state.activeProfileNet = chip.getAttribute("data-net");
          switchView("profile");
        });
      });
    }
    state.items = (res && res.posts) || [];
    renderItems();
  });

  document.getElementById("clearSearchBtn")?.addEventListener("click", () => {
    const inp = document.getElementById("searchInput");
    if (inp) inp.value = "";
    document.getElementById("clearSearchBtn")?.classList.add("hidden");
    document.getElementById("searchResultsActors")?.classList.add("hidden");
    loadCurrentView(false);
  });

  /* Lightbox events */
  document.getElementById("lightboxCloseBtn")?.addEventListener("click", () => {
    document.getElementById("lightboxModal")?.classList.add("hidden");
  });
  document.getElementById("lightboxPrevBtn")?.addEventListener("click", () => {
    if (state.lightboxIndex > 0) {
      state.lightboxIndex--;
      updateLightboxSlide();
    }
  });
  document.getElementById("lightboxNextBtn")?.addEventListener("click", () => {
    if (state.lightboxIndex < state.lightboxMedia.length - 1) {
      state.lightboxIndex++;
      updateLightboxSlide();
    }
  });

  /* Thread Drawer Reply */
  document.getElementById("closeThreadBtn")?.addEventListener("click", () => {
    document.getElementById("threadModal")?.classList.add("hidden");
  });
  document.getElementById("quickReplyForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inp = document.getElementById("quickReplyInput");
    const text = (inp && inp.value.trim()) || "";
    if (!text || !state.activeThreadItem) return;
    const res = await apiPost("/api/post", {
      text,
      targets: [state.activeThreadItem.network],
      reply: { network: state.activeThreadItem.network, ref: state.activeThreadItem.ref }
    });
    if (res && !res.error) {
      inp.value = "";
      openThreadDrawer(state.activeThreadItem);
    } else {
      showToast((res && res.error) || "Erro ao responder");
    }
  });

  /* Composer events */
  document.getElementById("navComposeBtn")?.addEventListener("click", () => {
    updateComposerLimitHint();
    document.getElementById("composerModal")?.classList.remove("hidden");
  });
  document.getElementById("closeComposerBtn")?.addEventListener("click", () => {
    document.getElementById("composerModal")?.classList.add("hidden");
  });
  document.getElementById("targetBluesky")?.addEventListener("change", updateComposerLimitHint);
  document.getElementById("targetPixelfed")?.addEventListener("change", updateComposerLimitHint);

  const fileInput = document.getElementById("composerFileInput");
  document.getElementById("composerDropzone")?.addEventListener("click", (e) => {
    if (e.target.closest("[data-crop]")) return;
    fileInput?.click();
  });
  fileInput?.addEventListener("change", (e) => handleComposerFiles(e.target.files));

  document.querySelectorAll("[data-crop]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll("[data-crop]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.composerCrop = btn.getAttribute("data-crop") || "original";
    });
  });

  document.getElementById("saveDraftBtn")?.addEventListener("click", async () => {
    const text = document.getElementById("composerCaption")?.value || "";
    const drafts = (state.userData.drafts || []).slice();
    drafts.unshift({ id: String(Date.now()), text, created_at: Date.now() });
    state.userData.drafts = drafts;
    await apiPost("/api/user_data", { drafts });
    showToast("Rascunho guardado!");
  });

  document.getElementById("publishPostBtn")?.addEventListener("click", async () => {
    const targets = [];
    if (document.getElementById("targetPixelfed")?.checked && state.status.pixelfed?.configured) targets.push("pixelfed");
    if (document.getElementById("targetBluesky")?.checked && state.status.bluesky?.configured) targets.push("bluesky");
    if (!targets.length) {
      showToast("Seleciona pelo menos uma rede configurada.");
      return;
    }
    const text = (document.getElementById("composerCaption")?.value || "").trim();
    const spoiler = (document.getElementById("composerCw")?.value || "").trim();
    const schedVal = document.getElementById("composerSchedule")?.value || "";
    const images = state.composerFiles.map((f) => ({
      data: f.base64,
      mime: f.mime,
      alt: f.alt || ""
    }));
    const payload = { targets, text, spoiler, images };

    if (schedVal) {
      const ts = Math.floor(new Date(schedVal).getTime() / 1000);
      const sRes = await apiPost("/api/scheduled", { scheduled_at: ts, payload });
      if (sRes && sRes.ok) {
        showToast(t("scheduled_toast"));
        document.getElementById("composerModal")?.classList.add("hidden");
      } else {
        showToast((sRes && sRes.error) || "Erro ao agendar.");
      }
      return;
    }

    const res = await apiPost("/api/post", payload);
    if (res && !res.error) {
      showToast(t("published_toast"));
      state.composerFiles = [];
      renderComposerMediaList();
      document.getElementById("composerCaption").value = "";
      document.getElementById("composerModal")?.classList.add("hidden");
      loadCurrentView(false);
    } else {
      showToast((res && res.error) || "Erro ao publicar.");
    }
  });

  /* Settings Modal */
  const openSettings = () => {
    document.getElementById("settingsBskyHandle").value = state.status.bluesky?.handle || "";
    document.getElementById("settingsAiProvider").value = state.status.ai?.provider || "none";
    document.getElementById("settingsMutedWords").value = (state.userData.muted_words || []).join(", ");
    document.getElementById("settingsModal")?.classList.remove("hidden");
  };
  document.getElementById("openSettingsBtn")?.addEventListener("click", openSettings);
  document.getElementById("mobileSettingsBtn")?.addEventListener("click", openSettings);
  document.getElementById("closeSettingsBtn")?.addEventListener("click", () => {
    document.getElementById("settingsModal")?.classList.add("hidden");
  });

  document.getElementById("settingsPfDisconnectBtn")?.addEventListener("click", async () => {
    await apiPost("/api/setup", { pixelfed: { instance: "", token: "" }, allow_empty: true });
    await refreshStatusAndLoad();
  });

  document.getElementById("saveSettingsBtn")?.addEventListener("click", async () => {
    const bHandle = (document.getElementById("settingsBskyHandle")?.value || "").trim();
    const bPass = (document.getElementById("settingsBskyPass")?.value || "").trim();
    const provider = document.getElementById("settingsAiProvider")?.value || "none";
    const key = (document.getElementById("settingsAiKey")?.value || "").trim();
    const mutedRaw = document.getElementById("settingsMutedWords")?.value || "";
    const muted_words = mutedRaw.split(",").map((w) => w.trim()).filter(Boolean);

    const setupPayload = {
      allow_empty: true,
      ai: {
        provider,
        gemini_key: provider === "gemini" ? key : "",
        openai_key: provider === "openai" ? key : ""
      }
    };
    if (bHandle && bPass) {
      setupPayload.bluesky = { handle: bHandle, app_password: bPass };
    }
    await Promise.all([
      apiPost("/api/setup", setupPayload),
      apiPost("/api/user_data", { muted_words })
    ]);
    document.getElementById("settingsModal")?.classList.add("hidden");
    showToast("Definições guardadas!");
    await refreshStatusAndLoad();
  });

  /* Mobile / LAN / Tailscale Modal */
  document.getElementById("openLanModalBtn")?.addEventListener("click", async () => {
    const modal = document.getElementById("lanModal");
    const body = document.getElementById("lanModalBody");
    if (!modal || !body) return;
    modal.classList.remove("hidden");
    const info = await apiGet("/api/lan");
    body.innerHTML = `
      <p><strong>Wi-Fi / LAN:</strong> <a href="${escapeHtml(info.url)}" target="_blank">${escapeHtml(info.url)}</a></p>
      <div style="max-width:200px;margin:10px auto">${info.qr_svg || ""}</div>
      ${info.tailscale_url ? `<p><strong>Tailscale:</strong> <a href="${escapeHtml(info.tailscale_url)}" target="_blank">${escapeHtml(info.tailscale_url)}</a></p><div style="max-width:200px;margin:10px auto">${info.tailscale_qr_svg || ""}</div>` : ""}
    `;
  });
  document.getElementById("closeLanBtn")?.addEventListener("click", () => {
    document.getElementById("lanModal")?.classList.add("hidden");
  });

  await refreshStatusAndLoad();
});
