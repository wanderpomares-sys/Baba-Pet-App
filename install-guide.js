/*! install-guide.js — guia didático para instalar o app (PWA) na tela inicial.
 *  Autônomo (sem dependências). PT / EN / ES / FR. Pergunta "Quer instalar?" a cada visita até instalar.
 *  Uso:  <script src="install-guide.js" defer data-name="Nome do app" data-icon="icon-192.png"></script>
 *  Opções (data-*): name, icon, color (#hex do destaque), delay (segundos até perguntar, padrão 20),
 *                   bottom (px acima do rodapé, padrão 80), url (link para copiar, padrão a página atual)
 *  API: InstallGuide.open() abre o guia; InstallGuide.done() marca como instalado.
 */
(function () {
  'use strict';
  if (window.InstallGuide) return;
  var SC = document.currentScript || document.querySelector('script[src*="install-guide"]');
  var D = (SC && SC.dataset) || {};
  var NAME = D.name || document.title || 'App';
  var ICON = D.icon || 'icon-192.png';
  var COLOR = D.color || '#ff7a00';
  var DELAY = (+D.delay || 20) * 1000;
  var BOTTOM = (D.bottom === undefined || D.bottom === '') ? 80 : +D.bottom;
  var KEY = 'ig_done:' + location.host;
  var SKEY = 'ig_snooze:' + location.host;

  var L = {
    pt: {
      title: 'Instale o {n} no seu celular', hi: 'Eu te ensino em poucos passos!', c1: 'Grátis', c2: 'Sem Play Store', c3: 'Ocupa pouco espaço',
      why: 'Não precisa da Play Store nem da App Store: a instalação é direto do navegador. Depois de instalado, o {n} ganha um ícone na tela inicial e abre em tela cheia, como qualquer app.',
      now: 'Instalar agora', or: 'ou siga o passo a passo:', tand: 'Android', tios: 'iPhone', tpc: 'Computador',
      iat: 'Primeiro, abra no navegador', iad: 'Você está dentro de outro app (TikTok, Instagram, Facebook…). Toque nos três pontinhos e escolha “Abrir no navegador”. Depois siga os passos abaixo.',
      copy: 'Copiar o link', copied: 'Link copiado! Cole no navegador.',
      a1: 'Toque nos 3 pontinhos do Chrome (canto de cima, à direita).', a2: 'Escolha “Instalar app” (ou “Adicionar à tela inicial”).', a3: 'Confirme em “Instalar”.',
      i1: 'No Safari, toque no botão Compartilhar (o quadrado com uma seta para cima, fica embaixo).', i2: 'Role a lista e toque em “Adicionar à Tela de Início”.', i3: 'Toque em “Adicionar”, no canto de cima.',
      inote: 'Importante: no iPhone isso funciona no Safari. Se estiver em outro navegador, copie o link e abra no Safari.',
      p1: 'Procure o ícone de instalar na barra de endereço do Chrome ou do Edge (à direita).', p2: 'Clique em “Instalar”.',
      done: 'Pronto! O ícone do {n} aparece na sua tela inicial. Abra por ele.',
      ldots: 'Toque aqui', litem: 'Instalar app', lshare: 'Compartilhar', ladd: 'Adicionar à Tela de Início', lhome: 'Pronto!', linapp: 'Abrir no navegador', linst: 'Instalar',
      bt: 'Quer instalar o {n} no seu celular?', bd: 'Sem Play Store, direto do navegador', bb: 'Sim, me ensina', no: 'Agora não', have: 'Já instalei', ok: 'Fechar',
      thanks: '{n} instalado! Abra pelo ícone da tela inicial.',
      hint: 'Já tem o {n} instalado? Então abra pelo ícone na tela inicial do celular, sem precisar instalar de novo.'
    },
    en: {
      title: 'Install {n} on your phone', hi: "I'll show you in a few easy steps!", c1: 'Free', c2: 'No app store', c3: 'Uses little space',
      why: 'No app store needed: you install it straight from your browser. Once installed, {n} gets an icon on your home screen and opens full screen, like any app.',
      now: 'Install now', or: 'or follow the steps:', tand: 'Android', tios: 'iPhone', tpc: 'Computer',
      iat: 'First, open it in your browser', iad: 'You are inside another app (TikTok, Instagram, Facebook…). Tap the three dots and choose “Open in browser”. Then follow the steps below.',
      copy: 'Copy the link', copied: 'Link copied! Paste it in your browser.',
      a1: 'Tap the 3 dots in Chrome (top right corner).', a2: 'Choose “Install app” (or “Add to Home screen”).', a3: 'Confirm with “Install”.',
      i1: 'In Safari, tap the Share button (the square with an arrow pointing up, at the bottom).', i2: 'Scroll the list and tap “Add to Home Screen”.', i3: 'Tap “Add”, in the top corner.',
      inote: 'Important: on iPhone this works in Safari. If you are in another browser, copy the link and open it in Safari.',
      p1: 'Look for the install icon in the Chrome or Edge address bar (on the right).', p2: 'Click “Install”.',
      done: 'Done! The {n} icon now appears on your home screen. Open the app from it.',
      ldots: 'Tap here', litem: 'Install app', lshare: 'Share', ladd: 'Add to Home Screen', lhome: 'Done!', linapp: 'Open in browser', linst: 'Install',
      bt: 'Want to install {n} on your phone?', bd: 'No app store, straight from your browser', bb: 'Yes, show me', no: 'Not now', have: 'I already installed it', ok: 'Close',
      thanks: '{n} installed! Open it from the home screen icon.',
      hint: 'Already have {n} installed? Just open it from the icon on your home screen. No need to install it again.'
    },
    es: {
      title: 'Instala {n} en tu celular', hi: '¡Te enseño en pocos pasos!', c1: 'Gratis', c2: 'Sin tienda de apps', c3: 'Ocupa poco espacio',
      why: 'No necesitas la Play Store ni la App Store: se instala directo desde el navegador. Una vez instalado, {n} tiene un ícono en la pantalla de inicio y se abre a pantalla completa, como cualquier app.',
      now: 'Instalar ahora', or: 'o sigue los pasos:', tand: 'Android', tios: 'iPhone', tpc: 'Computadora',
      iat: 'Primero, ábrelo en el navegador', iad: 'Estás dentro de otra app (TikTok, Instagram, Facebook…). Toca los tres puntos y elige “Abrir en el navegador”. Luego sigue los pasos de abajo.',
      copy: 'Copiar el enlace', copied: '¡Enlace copiado! Pégalo en el navegador.',
      a1: 'Toca los 3 puntos de Chrome (esquina superior derecha).', a2: 'Elige “Instalar aplicación” (o “Añadir a la pantalla de inicio”).', a3: 'Confirma en “Instalar”.',
      i1: 'En Safari, toca el botón Compartir (el cuadrado con una flecha hacia arriba, abajo).', i2: 'Desplaza la lista y toca “Añadir a pantalla de inicio”.', i3: 'Toca “Añadir”, en la esquina de arriba.',
      inote: 'Importante: en iPhone esto funciona en Safari. Si estás en otro navegador, copia el enlace y ábrelo en Safari.',
      p1: 'Busca el ícono de instalar en la barra de direcciones de Chrome o Edge (a la derecha).', p2: 'Haz clic en “Instalar”.',
      done: '¡Listo! El ícono de {n} aparece en tu pantalla de inicio. Ábrela desde ahí.',
      ldots: 'Toca aquí', litem: 'Instalar aplicación', lshare: 'Compartir', ladd: 'Añadir a pantalla de inicio', lhome: '¡Listo!', linapp: 'Abrir en el navegador', linst: 'Instalar',
      bt: '¿Quieres instalar {n} en tu celular?', bd: 'Sin tienda de apps, directo del navegador', bb: 'Sí, enséñame', no: 'Ahora no', have: 'Ya lo instalé', ok: 'Cerrar',
      thanks: '¡{n} instalado! Ábrelo desde el ícono de la pantalla de inicio.',
      hint: '¿Ya tienes {n} instalado? Ábrelo desde el ícono en la pantalla de inicio, sin instalarlo de nuevo.'
    },
    fr: {
      title: 'Installez {n} sur votre téléphone', hi: 'Je vous montre en quelques étapes !', c1: 'Gratuit', c2: "Sans magasin d'apps", c3: 'Prend peu de place',
      why: "Pas besoin du Play Store ni de l'App Store : l'installation se fait directement depuis le navigateur. Une fois installé, {n} a une icône sur l'écran d'accueil et s'ouvre en plein écran, comme n'importe quelle appli.",
      now: 'Installer maintenant', or: 'ou suivez les étapes :', tand: 'Android', tios: 'iPhone', tpc: 'Ordinateur',
      iat: "D'abord, ouvrez-le dans le navigateur", iad: 'Vous êtes dans une autre appli (TikTok, Instagram, Facebook…). Touchez les trois points et choisissez « Ouvrir dans le navigateur ». Puis suivez les étapes ci-dessous.',
      copy: 'Copier le lien', copied: 'Lien copié ! Collez-le dans le navigateur.',
      a1: 'Touchez les 3 points de Chrome (en haut à droite).', a2: "Choisissez « Installer l'application » (ou « Ajouter à l'écran d'accueil »).", a3: 'Confirmez avec « Installer ».',
      i1: 'Dans Safari, touchez le bouton Partager (le carré avec une flèche vers le haut, en bas).', i2: "Faites défiler la liste et touchez « Sur l'écran d'accueil ».", i3: 'Touchez « Ajouter », en haut.',
      inote: "Important : sur iPhone, cela fonctionne dans Safari. Si vous êtes dans un autre navigateur, copiez le lien et ouvrez-le dans Safari.",
      p1: "Cherchez l'icône d'installation dans la barre d'adresse de Chrome ou Edge (à droite).", p2: 'Cliquez sur « Installer ».',
      done: "Terminé ! L'icône de {n} apparaît sur votre écran d'accueil. Ouvrez l'appli depuis là.",
      ldots: 'Touchez ici', litem: "Installer l'application", lshare: 'Partager', ladd: "Sur l'écran d'accueil", lhome: 'Terminé !', linapp: 'Ouvrir dans le navigateur', linst: 'Installer',
      bt: 'Voulez-vous installer {n} sur votre téléphone ?', bd: "Sans magasin d'apps, depuis le navigateur", bb: 'Oui, montrez-moi', no: 'Pas maintenant', have: "Je l'ai déjà installé", ok: 'Fermer',
      thanks: "{n} installé ! Ouvrez-le depuis l'icône de l'écran d'accueil.",
      hint: "{n} est déjà installé ? Ouvrez-le depuis l'icône de l'écran d'accueil, inutile de le réinstaller."
    }
  };
  function lang() {
    var l = (document.documentElement.lang || navigator.language || 'pt').slice(0, 2).toLowerCase();
    return L[l] ? l : 'pt';
  }
  function t(k) { return (L[lang()][k] || L.pt[k] || '').replace(/\{n\}/g, NAME); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var ST = { dp: null, plat: null, snooze: false, shown: false };
  try { ST.snooze = sessionStorage.getItem(SKEY) === '1'; } catch (e) { }
  function isDone() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function setDone() { try { localStorage.setItem(KEY, '1'); } catch (e) { } }
  var UA = navigator.userAgent || '';
  function standalone() { try { return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; } catch (e) { return false; } }
  function isIOS() { return /iPad|iPhone|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function isAndroid() { return /Android/i.test(UA); }
  function inApp() { return /FBAN|FBAV|FB_IAB|FBIOS|Instagram|TikTok|musical_ly|BytedanceWebview|Snapchat|Line\/|MicroMessenger|Twitter|; wv\)/i.test(UA); }
  function plat() { return ST.plat || (isIOS() ? 'ios' : isAndroid() ? 'and' : 'pc'); }
  function ga(ev, p) { try { if (window.gtag) window.gtag('event', ev, p || {}); } catch (e) { } }

  /* ---------- estilos ---------- */
  var css = '#igbar,#igmod,#igbar *,#igmod *{box-sizing:border-box;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '#igbar{position:fixed;left:8px;right:8px;bottom:calc(' + BOTTOM + 'px + env(safe-area-inset-bottom));max-width:544px;margin:0 auto;z-index:2147482000;display:flex;flex-direction:column;gap:8px;background:#fff;color:#0b1f3a;border:2px solid ' + COLOR + ';border-radius:16px;padding:10px;box-shadow:0 8px 28px rgba(0,0,0,.35);animation:igup .35s ease-out}' +
    '@keyframes igup{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}' +
    '#igbar .ibr{display:flex;align-items:center;gap:10px}#igbar .ibt{display:flex;flex-direction:column;gap:2px;min-width:0}#igbar .ibt b{font-size:15px;line-height:1.2}#igbar .ibt small{font-size:12.5px;color:#556}' +
    '.igimg{width:44px;height:44px;border-radius:11px;flex:none;object-fit:cover;box-shadow:0 2px 6px rgba(0,0,0,.25);animation:igb 1.6s ease-in-out infinite}' +
    '@keyframes igb{50%{transform:translateY(-4px)}}' +
    '#igbar .ibb{display:flex;gap:8px}#igbar button{font:inherit;cursor:pointer;border:0;border-radius:12px;padding:11px 14px;font-weight:700;font-size:14px}' +
    '#igbar .ibtn{background:' + COLOR + ';color:#fff;flex:1}#igbar .ino{background:#eef1f6;color:#0b1f3a}#igbar .ihave{background:none;color:#556;text-decoration:underline;font-weight:500;padding:2px;font-size:12.5px}' +
    '#igmod{position:fixed;inset:0;z-index:2147483000;background:rgba(5,10,25,.72);display:flex;align-items:flex-end;justify-content:center}' +
    '#igmod .ibox{background:#fff;color:#0b1f3a;width:100%;max-width:560px;max-height:92vh;overflow:auto;-webkit-overflow-scrolling:touch;border-radius:22px 22px 0 0;border-top:6px solid ' + COLOR + ';padding:16px 16px calc(18px + env(safe-area-inset-bottom))}' +
    '#igmod .ihd{display:flex;align-items:center;gap:10px;margin-bottom:6px}#igmod .ihd .igimg{width:64px;height:64px;border-radius:16px}' +
    '#igmod .ibub{background:#fff3e6;border:2px solid ' + COLOR + ';border-radius:14px;padding:9px 12px;font-weight:700;font-size:15px;position:relative}' +
    '#igmod h2{margin:8px 0 8px;font-size:21px;line-height:1.2}' +
    '#igmod .ichips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}#igmod .ichips span{background:#e7f8ee;color:#0d6b33;border-radius:999px;padding:5px 10px;font-weight:700;font-size:13px}' +
    '#igmod .iwhy{font-size:14.5px;line-height:1.45;color:#334;margin:0 0 10px}' +
    '#igmod .itabs{display:flex;gap:6px;margin:10px 0}#igmod .itab{flex:1;font:inherit;cursor:pointer;border:2px solid #0b1f3a;background:#fff;color:#0b1f3a;border-radius:12px;padding:9px 4px;font-weight:700;font-size:14px}#igmod .itab.on{background:#0b1f3a;color:#fff}' +
    '#igmod .istep{display:flex;gap:10px;margin:12px 0}#igmod .inum{flex:none;width:30px;height:30px;border-radius:50%;background:' + COLOR + ';color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:2px}' +
    '#igmod .itx{flex:1;min-width:0}#igmod .itx p{margin:2px 0 6px;font-weight:600;font-size:15px;line-height:1.35}' +
    '#igmod .iscene{width:100%;height:auto;background:#f3f6fb;border-radius:12px;display:block}' +
    '#igmod .inote{font-size:13px;color:#556;background:#f3f6fb;border-radius:10px;padding:8px 10px;margin:6px 0}#igmod .inote.c{text-align:center;background:none}' +
    '#igmod .iwarn{border:2px dashed ' + COLOR + ';background:#fff3e6;border-radius:14px;padding:10px;margin:8px 0}#igmod .iwarn p{margin:4px 0 8px;font-size:14px;line-height:1.4}' +
    '#igmod .ibtn,#igmod .igb{display:block;width:100%;font:inherit;cursor:pointer;border:2px solid #0b1f3a;background:#fff;color:#0b1f3a;border-radius:14px;padding:12px;font-weight:800;font-size:15px;margin-top:8px}' +
    '#igmod .ibtn{background:' + COLOR + ';border-color:' + COLOR + ';color:#fff}' +
    '#igmod .igtoast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#0b1f3a;color:#fff;padding:10px 14px;border-radius:12px;font-weight:600;z-index:2147483600}' +
    '.iring{animation:igr 1.3s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes igr{50%{opacity:.35;transform:scale(1.12)}}' +
    '.ihand{animation:igh 1.1s ease-in-out infinite}@keyframes igh{50%{transform:translateY(-7px)}}.ibounce{animation:igb2 1.2s ease-in-out infinite}@keyframes igb2{50%{transform:translateY(-6px)}}';
  var stl = document.createElement('style'); stl.textContent = css; (document.head || document.documentElement).appendChild(stl);

  /* ---------- cenas ---------- */
  function svg(i) { return '<svg class="iscene" viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + i + '</svg>'; }
  function hand(x, y, em) { return '<text class="ihand" x="' + x + '" y="' + y + '" font-size="26" text-anchor="middle">' + (em || '👆') + '</text>'; }
  function lbl(txt, x, y) { return '<text x="' + (x || 150) + '" y="' + (y || 22) + '" text-anchor="middle" font-size="14" font-weight="700" fill="#d96400">' + esc(txt) + '</text>'; }
  var host = location.host;
  var SCN = {
    dots: function (l) { return svg('<rect x="4" y="34" width="292" height="40" rx="10" fill="#e6ecf6"/><rect x="14" y="42" width="196" height="24" rx="12" fill="#fff"/><text x="26" y="58" font-size="12" fill="#445">' + esc(host) + '</text><circle class="iring" cx="268" cy="54" r="17" fill="rgba(255,122,0,.28)"/><g fill="#0b1f3a"><circle cx="268" cy="44" r="2.8"/><circle cx="268" cy="54" r="2.8"/><circle cx="268" cy="64" r="2.8"/></g>' + lbl(l, 170, 20) + hand(268, 112)); },
    item: function (l) { return svg('<rect x="96" y="6" width="198" height="118" rx="12" fill="#fff" stroke="#cfd8e6" stroke-width="2"/><rect x="112" y="18" width="110" height="9" rx="4" fill="#dfe6f1"/><rect x="112" y="40" width="80" height="9" rx="4" fill="#dfe6f1"/><rect class="iring" x="104" y="58" width="182" height="30" rx="8" fill="rgba(255,122,0,.2)" stroke="#ff7a00" stroke-width="2.5"/><text x="195" y="78" text-anchor="middle" font-size="13" font-weight="700" fill="#0b1f3a">' + esc(l) + '</text><rect x="112" y="102" width="96" height="9" rx="4" fill="#dfe6f1"/>' + hand(60, 86, '👉')); },
    share: function (l) { return svg(lbl(l, 150, 22) + '<rect x="4" y="76" width="292" height="50" rx="12" fill="#e6ecf6"/><g fill="none" stroke="#7a8aa6" stroke-width="2.5" stroke-linecap="round"><path d="M34 100l-8 0M30 94l-6 6 6 6"/><path d="M266 94l6 6-6 6M262 100h10"/></g><circle class="iring" cx="150" cy="101" r="19" fill="rgba(255,122,0,.28)"/><g fill="none" stroke="#0a84ff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M150 108V90M143 97l7-8 7 8M140 98v12h20V98"/></g>' + hand(150, 62, '👇')); },
    add: function (l) { return svg('<rect x="10" y="6" width="280" height="118" rx="14" fill="#fff" stroke="#cfd8e6" stroke-width="2"/><rect x="26" y="18" width="140" height="9" rx="4" fill="#dfe6f1"/><rect x="26" y="38" width="100" height="9" rx="4" fill="#dfe6f1"/><rect class="iring" x="20" y="58" width="260" height="34" rx="9" fill="rgba(255,122,0,.2)" stroke="#ff7a00" stroke-width="2.5"/><rect x="30" y="64" width="22" height="22" rx="5" fill="none" stroke="#0b1f3a" stroke-width="2.2"/><path d="M41 69v12M35 75h12" stroke="#0b1f3a" stroke-width="2.2" stroke-linecap="round"/><text x="64" y="80" font-size="13" font-weight="700" fill="#0b1f3a">' + esc(l) + '</text><rect x="26" y="102" width="120" height="9" rx="4" fill="#dfe6f1"/>' + hand(262, 118)); },
    confirm: function (l) { return svg('<rect x="40" y="14" width="220" height="100" rx="16" fill="#fff" stroke="#cfd8e6" stroke-width="2"/><image href="' + esc(ICON) + '" x="56" y="28" width="46" height="46"/><text x="114" y="48" font-size="15" font-weight="800" fill="#0b1f3a">' + esc(NAME.slice(0, 16)) + '</text><text x="114" y="66" font-size="11" fill="#667">' + esc(host) + '</text><rect class="iring" x="150" y="80" width="98" height="28" rx="14" fill="#ff7a00"/><text x="199" y="99" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">' + esc(l) + '</text>' + hand(232, 126)); },
    home: function (l) { var g = ''; for (var i = 0; i < 8; i++) { var x = 28 + (i % 4) * 66, y = 20 + Math.floor(i / 4) * 54; if (i !== 5) g += '<rect x="' + x + '" y="' + y + '" width="42" height="42" rx="10" fill="#3a5384"/>'; } return svg('<rect x="8" y="4" width="284" height="122" rx="14" fill="#16335f"/>' + g + '<image class="ibounce" href="' + esc(ICON) + '" x="160" y="74" width="46" height="46"/>' + lbl(l, 150, 18).replace('#d96400', '#ffd36a')); },
    inapp: function (l) { return svg('<rect x="4" y="6" width="292" height="30" rx="8" fill="#e6ecf6"/><circle class="iring" cx="276" cy="21" r="15" fill="rgba(255,122,0,.28)"/><g fill="#0b1f3a"><circle cx="268" cy="21" r="2.6"/><circle cx="276" cy="21" r="2.6"/><circle cx="284" cy="21" r="2.6"/></g><rect x="96" y="44" width="198" height="76" rx="12" fill="#fff" stroke="#cfd8e6" stroke-width="2"/><rect x="112" y="54" width="90" height="8" rx="4" fill="#dfe6f1"/><rect class="iring" x="104" y="72" width="182" height="30" rx="8" fill="rgba(255,122,0,.2)" stroke="#ff7a00" stroke-width="2.5"/><text x="195" y="92" text-anchor="middle" font-size="13" font-weight="700" fill="#0b1f3a">' + esc(l) + '</text>' + hand(60, 96, '👉')); },
    pc: function (l) { return svg('<rect x="10" y="22" width="280" height="42" rx="12" fill="#e6ecf6"/><rect x="24" y="31" width="190" height="24" rx="12" fill="#fff"/><text x="38" y="47" font-size="12" fill="#445">' + esc(host) + '</text><circle class="iring" cx="246" cy="43" r="17" fill="rgba(255,122,0,.28)"/><g fill="none" stroke="#0b1f3a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="236" y="34" width="20" height="14" rx="2"/><path d="M246 38v8M242 43l4 4 4-4"/></g>' + lbl(l, 170, 18) + hand(246, 100)); }
  };
  function step(n, txt, sc) { return '<div class="istep"><div class="inum">' + n + '</div><div class="itx"><p>' + esc(txt) + '</p>' + sc + '</div></div>'; }
  function body(p) {
    if (p === 'ios') return step(1, t('i1'), SCN.share(t('lshare'))) + step(2, t('i2'), SCN.add(t('ladd'))) + step(3, t('i3'), SCN.confirm(t('linst'))) + step(4, t('done'), SCN.home(t('lhome'))) + '<p class="inote">' + esc(t('inote')) + '</p>';
    if (p === 'pc') return step(1, t('p1'), SCN.pc(t('linst'))) + step(2, t('p2'), SCN.confirm(t('linst'))) + step(3, t('done'), SCN.home(t('lhome')));
    return step(1, t('a1'), SCN.dots(t('ldots'))) + step(2, t('a2'), SCN.item(t('litem'))) + step(3, t('a3'), SCN.confirm(t('linst'))) + step(4, t('done'), SCN.home(t('lhome')));
  }

  /* ---------- UI ---------- */
  function img() { return '<img class="igimg" src="' + esc(ICON) + '" alt="">'; }
  function toast(m) { var e = document.createElement('div'); e.className = 'igtoast'; e.textContent = m; document.body.appendChild(e); setTimeout(function () { e.remove(); }, 2600); }
  function barHide() { var b = document.getElementById('igbar'); if (b) b.remove(); }
  function modHide() { var m = document.getElementById('igmod'); if (m) m.remove(); }
  function barShow() {
    if (document.getElementById('igbar')) return;
    var b = document.createElement('div'); b.id = 'igbar';
    b.innerHTML = '<div class="ibr">' + img() + '<div class="ibt"><b>' + esc(t('bt')) + '</b><small>' + esc(t('bd')) + '</small></div></div><div class="ibb"><button class="ibtn" data-ig="open">📲 ' + esc(t('bb')) + '</button><button class="ino" data-ig="no">' + esc(t('no')) + '</button></div><button class="ihave" data-ig="have">' + esc(t('have')) + '</button>';
    document.body.appendChild(b); ga('install_banner_show');
  }
  function openModal() {
    modHide(); barHide();
    var p = plat();
    var tabs = [['and', 'tand'], ['ios', 'tios'], ['pc', 'tpc']].map(function (a) { return '<button class="itab' + (p === a[0] ? ' on' : '') + '" data-ig="plat" data-p="' + a[0] + '">' + esc(t(a[1])) + '</button>'; }).join('');
    var warn = inApp() ? '<div class="iwarn"><b>⚠️ ' + esc(t('iat')) + '</b><p>' + esc(t('iad')) + '</p>' + SCN.inapp(t('linapp')) + '<button class="igb" data-ig="copy">🔗 ' + esc(t('copy')) + '</button></div>' : '';
    var now = (ST.dp && p === 'and') ? '<button class="ibtn" data-ig="go">📲 ' + esc(t('now')) + '</button><p class="inote c">' + esc(t('or')) + '</p>' : '';
    var m = document.createElement('div'); m.id = 'igmod';
    m.innerHTML = '<div class="ibox"><div class="ihd">' + img() + '<div class="ibub">' + esc(t('hi')) + '</div></div><h2>📲 ' + esc(t('title')) + '</h2><div class="ichips"><span>✅ ' + esc(t('c1')) + '</span><span>✅ ' + esc(t('c2')) + '</span><span>✅ ' + esc(t('c3')) + '</span></div><p class="iwhy">' + esc(t('why')) + '</p><p class="inote">💡 ' + esc(t('hint')) + '</p><button class="igb" data-ig="have">✅ ' + esc(t('have')) + '</button>' + warn + now + '<div class="itabs">' + tabs + '</div><div id="igbody">' + body(p) + '</div><button class="igb" data-ig="close">' + esc(t('ok')) + '</button></div>';
    document.body.appendChild(m); ga('install_guide_open', { plat: p, inapp: inApp() ? 1 : 0 });
  }
  function nativePrompt(after) {
    var dp = ST.dp; if (!dp) return false; ST.dp = null;
    try { dp.prompt(); dp.userChoice.then(function (r) { ga('install_prompt', { outcome: r && r.outcome }); if (r && r.outcome === 'accepted') { setDone(); modHide(); } else if (after) after(); }).catch(function () { if (after) after(); }); return true; } catch (e) { return false; }
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-ig]'); if (!el) return;
    var a = el.getAttribute('data-ig');
    if (a === 'open') { barHide(); ga('install_banner_yes'); if (!(ST.dp && !isIOS() && nativePrompt(openModal))) openModal(); }
    else if (a === 'no') { barHide(); ST.snooze = true; try { sessionStorage.setItem(SKEY, '1'); } catch (x) { } ga('install_banner_no'); }
    else if (a === 'have') { barHide(); modHide(); setDone(); ga('install_have'); }
    else if (a === 'plat') { ST.plat = el.getAttribute('data-p'); var ts = document.querySelectorAll('#igmod .itab'); for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('on', ts[i].getAttribute('data-p') === ST.plat); var bd = document.getElementById('igbody'); if (bd) bd.innerHTML = body(ST.plat); }
    else if (a === 'go') nativePrompt(null);
    else if (a === 'copy') { var u = D.url || location.href.split('#')[0]; try { navigator.clipboard.writeText(u).then(function () { toast(t('copied')); }, function () { }); } catch (x) { } }
    else if (a === 'close') { modHide(); ST.snooze = true; }
  }, true);

  /* Evita insistir com quem já instalou:
     - aberto como app (standalone) => instalado;
     - Chrome informa apps relacionados instalados (manifest.related_applications) => instalado;
     - Android/PC: o navegador só oferece instalar (beforeinstallprompt) quando o app NÃO está instalado.
       Sem esse evento, não perguntamos (já instalado ou não instalável aqui);
     - iPhone não permite detectar: pergunta, mas com "Já instalei" e dica de abrir pelo ícone. */
  var checked = false;
  function checkRelated() {
    if (checked) return; checked = true;
    try { if (navigator.getInstalledRelatedApps) navigator.getInstalledRelatedApps().then(function (a) { if (a && a.length) { setDone(); barHide(); } }).catch(function () { }); } catch (e) { }
  }
  function canAsk() {
    if (isIOS()) return true;
    if (inApp()) return true;                 // aqui só dá para orientar a abrir no navegador
    if (/Firefox|FxiOS/i.test(UA) && isAndroid()) return true;
    return !!ST.dp;                           // Chrome/Edge/Samsung: só se o navegador oferece instalar
  }
  function tick() {
    try {
      if (standalone()) { setDone(); barHide(); return; }
      if (isDone() || ST.snooze) return;
      if (document.getElementById('igbar') || document.getElementById('igmod')) return;
      var ae = document.activeElement; if (ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName)) return;
      if (document.hidden) return;
      checkRelated();
      if (!canAsk()) return;
      barShow();
    } catch (e) { }
  }
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); ST.dp = e; });
  window.addEventListener('appinstalled', function () { setDone(); barHide(); modHide(); ST.dp = null; ga('install_done'); toast(t('thanks')); });
  function start() { if (standalone()) { setDone(); return; } setTimeout(tick, DELAY); setInterval(tick, 20000); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.InstallGuide = { open: openModal, done: function () { setDone(); barHide(); modHide(); }, show: barShow };
})();
