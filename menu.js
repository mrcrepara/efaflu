/* =====================================================================
   EFAFLU · Menu lateral partilhado
   Cada página só precisa de:  <script src="menu.js"></script>
   (no fim do <body>, depois dos scripts da própria página).
   Para acrescentar uma página nova ao menu, basta juntar uma linha em ITENS.
   ===================================================================== */
(function () {
  "use strict";
  if (window.__efaMenu) return; window.__efaMenu = true;

  // ---- Quem é quem ----------------------------------------------------
  const DONO = "ratonline1976@gmail.com";
  const ARMAZEM = ["armazem@efaflu.pt"];

  // ---- Itens do menu --------------------------------------------------
  // perfis: d = dono, c = chefia (só consulta), a = armazém, k = colaborador
  const ITENS = [
    { href: "index.html", ic: "🏠", t: "Início", p: "dc" },
    { grupo: "Pessoas" },
    { href: "assiduidade.html#dash", ic: "👥", t: "Assiduidade", p: "dc" },
    { href: "assiduidade.html#folha", ic: "🗓️", t: "Folha do dia", p: "d" },
    { href: "assiduidade.html#plan", ic: "📅", t: "Sábados / planeamento", p: "dc" },
    { href: "assiduidade.html#mapa", ic: "🏖️", t: "Mapa de férias", p: "dc" },
    { href: "assiduidade.html#pes", ic: "🦺", t: "Formações e EPIs", p: "dc" },
    { href: "assiduidade.html#eu", ic: "🙋", t: "As minhas férias", p: "k" },
    { grupo: "Produção" },
    { href: "assiduidade.html#maq", ic: "🚜", t: "Máquinas e avarias", p: "dc" },
    { href: "cnc-custos.html", ic: "⚙️", t: "CNC · Tempos e custos", p: "dc" },
    { grupo: "Armazém" },
    { href: "stock.html#resumo", ic: "📊", t: "Resumo do stock", p: "dc" },
    { href: "stock.html#leitura", ic: "🔫", t: "Leitura (pistola)", p: "da" },
    { href: "stock.html#encomendar", ic: "🛒", t: "A encomendar", p: "dca" },
    { href: "stock.html#stock", ic: "📦", t: "Stock atual", p: "dca" },
    { href: "pedidos.html#compras", ic: "📝", t: "Pedidos de ferramentas", p: "dca" },
    { href: "pedidos.html#afiar", ic: "🔧", t: "Afiação (subcontrato)", p: "dca" },
  ];
  const NOME_PERFIL = { d: "Team Leader", c: "Chefia · só consulta", a: "Armazém", k: "Colaborador" };

  // ---- Estilos ----------------------------------------------------------
  const css = `
  .efa-side{position:fixed;top:0;bottom:0;left:0;width:248px;z-index:800;background:#1d2433;color:#e8ecf2;
    display:flex;flex-direction:column;font:14px/1.35 "Segoe UI",system-ui,-apple-system,sans-serif;
    transform:translateX(-100%);transition:transform .22s ease;box-shadow:0 0 0 1px rgba(0,0,0,.08)}
  .efa-side *{box-sizing:border-box}
  .efa-brand{display:flex;align-items:center;gap:10px;padding:16px 16px 14px;border-bottom:1px solid rgba(255,255,255,.08);text-decoration:none;color:inherit}
  .efa-brand img{width:36px;height:36px;border-radius:8px;flex:none}
  .efa-brand b{display:block;font-size:15px;letter-spacing:.02em}
  .efa-brand small{display:block;font-size:11.5px;color:#9aa6b8}
  .efa-nav{flex:1;overflow-y:auto;padding:8px 10px 12px}
  .efa-g{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8592a6;padding:14px 10px 6px}
  .efa-i{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;color:#d7dde7;text-decoration:none;margin:1px 0}
  .efa-i span.ic{width:22px;text-align:center;flex:none}
  .efa-i:hover{background:rgba(255,255,255,.07);color:#fff}
  .efa-i.on{background:#b82d36;color:#fff;font-weight:600}
  .efa-i:focus-visible{outline:2px solid #f3c9cc;outline-offset:1px}
  .efa-foot{border-top:1px solid rgba(255,255,255,.08);padding:12px 16px;display:flex;align-items:center;gap:10px}
  .efa-foot .who{flex:1;min-width:0}
  .efa-foot .who b{display:block;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .efa-foot .who small{display:block;font-size:11.5px;color:#9aa6b8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .efa-foot button{background:transparent;color:#e8ecf2;border:1px solid rgba(255,255,255,.25);border-radius:6px;padding:6px 10px;font-weight:600;font-size:12px;font-family:inherit;cursor:pointer}
  .efa-foot button:hover{border-color:#fff}
  .efa-top{display:none;align-items:center;gap:10px;background:#1d2433;color:#fff;padding:8px max(12px,env(safe-area-inset-right,0px)) 8px max(12px,env(safe-area-inset-left,0px));
    font:600 15px "Segoe UI",system-ui,sans-serif;position:sticky;top:0;z-index:790}
  .efa-top button{background:transparent;border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:7px;font-size:18px;line-height:1;padding:6px 10px;cursor:pointer}
  .efa-top img{width:26px;height:26px;border-radius:6px}
  .efa-top .pg{font-weight:400;color:#c3cad6;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .efa-veil{position:fixed;inset:0;background:rgba(10,14,22,.45);z-index:799;display:none}
  html.efa-menu .efa-top{display:flex}
  html.efa-open .efa-side{transform:none}
  html.efa-open .efa-veil{display:block}
  @media (min-width:1000px){
    html.efa-menu body{padding-left:248px}
    html.efa-menu .efa-side{transform:none}
    html.efa-menu .efa-top,html.efa-menu .efa-veil{display:none}
  }
  @media (prefers-reduced-motion:reduce){.efa-side{transition:none}}
  @media print{.efa-side,.efa-top,.efa-veil{display:none!important} html.efa-menu body{padding-left:0!important}}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // ---- Estrutura --------------------------------------------------------
  const side = document.createElement("aside");
  side.className = "efa-side"; side.setAttribute("aria-label", "Menu principal");
  side.innerHTML = `
    <a class="efa-brand" href="index.html"><img src="icon-192.png" alt=""><span><b>EFAFLU</b><small>Parque de Máquinas</small></span></a>
    <nav class="efa-nav"></nav>
    <div class="efa-foot"><div class="who"><b id="efaWho">—</b><small id="efaRole"></small></div><button type="button" id="efaOut">Sair</button></div>`;
  const top = document.createElement("div");
  top.className = "efa-top";
  top.innerHTML = `<button type="button" aria-label="Abrir menu" id="efaBurger">☰</button><img src="icon-192.png" alt=""><span>EFAFLU</span><span class="pg" id="efaPg"></span>`;
  const veil = document.createElement("div"); veil.className = "efa-veil";
  document.body.prepend(top); document.body.appendChild(veil); document.body.appendChild(side);

  const nav = side.querySelector(".efa-nav");
  const fecha = () => document.documentElement.classList.remove("efa-open");
  top.querySelector("#efaBurger").onclick = () => document.documentElement.classList.add("efa-open");
  veil.onclick = fecha;
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecha(); });

  const pagina = () => (location.pathname.split("/").pop() || "index.html");
  function desenhar(perfil) {
    nav.innerHTML = "";
    let grupoPendente = null;
    ITENS.forEach((it) => {
      if (it.grupo) { grupoPendente = it.grupo; return; }
      if (perfil && !it.p.includes(perfil)) return;
      if (grupoPendente) { const g = document.createElement("div"); g.className = "efa-g"; g.textContent = grupoPendente; nav.appendChild(g); grupoPendente = null; }
      const a = document.createElement("a");
      a.className = "efa-i"; a.href = it.href; a.dataset.href = it.href;
      a.innerHTML = `<span class="ic">${it.ic}</span><span></span>`;
      a.lastChild.textContent = it.t;
      a.addEventListener("click", () => {
        fecha();
        // mesma página, outro separador: avisar a página
        const [f, h] = it.href.split("#");
        if (f === pagina() && h) setTimeout(() => window.dispatchEvent(new HashChangeEvent("hashchange")), 0);
      });
      nav.appendChild(a);
    });
    marcar();
  }
  function marcar() {
    const pg = pagina(), h = location.hash.slice(1);
    const links = Array.from(nav.querySelectorAll(".efa-i"));
    let alvo = links.find((a) => { const [f, hh] = a.dataset.href.split("#"); return f === pg && hh && hh === h; })
      || links.find((a) => a.dataset.href.split("#")[0] === pg);
    links.forEach((a) => a.classList.toggle("on", a === alvo));
    if (alvo) { alvo.setAttribute("aria-current", "page"); top.querySelector("#efaPg").textContent = "· " + alvo.lastChild.textContent; }
  }
  window.addEventListener("hashchange", marcar);
  window.addEventListener("efa:nav", marcar);
  window.efaMenuMarcar = marcar;
  desenhar(null);

  // ---- Sessão e perfil (mesmo Firebase das páginas) ----------------------
  let tentativas = 0;
  (function esperar() {
    if (window.firebase && firebase.apps && firebase.apps.length) return ligar();
    if (++tentativas < 60) setTimeout(esperar, 200);
  })();
  function ligar() {
    const auth = firebase.auth();
    side.querySelector("#efaOut").onclick = () => auth.signOut();
    auth.onAuthStateChanged(async (u) => {
      const html = document.documentElement;
      if (!u || u.isAnonymous) { html.classList.remove("efa-menu", "efa-open"); return; }
      const email = (u.email || "").toLowerCase();
      side.querySelector("#efaWho").textContent = email;
      let perfil = email === DONO ? "d" : ARMAZEM.includes(email) ? "a" : null;
      if (!perfil) {
        try {
          const d = await firebase.firestore().collection("assid_config").doc("acessos").get();
          const ac = d.exists ? d.data() : {};
          const low = (a) => (a || []).map((x) => String(x).toLowerCase());
          if ((ac.dono || "").toLowerCase() === email) perfil = "d";
          else if (ac.colaboradores && ac.colaboradores[email]) perfil = "k";
          else if (low(ac.consulta).includes(email)) perfil = "c";
        } catch (e) { /* sem acesso: fica sem perfil */ }
      }
      perfil = perfil || "c";
      side.querySelector("#efaRole").textContent = NOME_PERFIL[perfil];
      window.efaPerfil = perfil;
      desenhar(perfil);
      html.classList.add("efa-menu");
      window.dispatchEvent(new CustomEvent("efa:perfil", { detail: perfil }));
    });
  }
})();
