(() => {
  'use strict';
  const TEXT_SIGS = [
    'sabi ai studio access',
    'continue with google',
    'sabi password',
    'authorization',
    'authentication',
    'create account',
    'sign in',
    'log in',
    'login',
    'register',
    'account',
    '\u0412\u043e\u0439\u0442\u0438',
    '\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f'
  ];
  const ATTR_RE = /(auth|account|profile|login|signin|sign-in|signup|sign-up|register|firebase|google-auth)/i;
  const textOf = (el) => (el && el.textContent ? el.textContent.replace(/\s+/g, ' ').trim() : '');
  const hasTextSig = (el) => {
    const t = textOf(el).toLowerCase();
    if (!t) return false;
    return TEXT_SIGS.some(s => t.includes(s.toLowerCase()));
  };
  const attrHit = (el) => {
    if (!el || !el.attributes) return false;
    for (const a of el.attributes) {
      if (ATTR_RE.test(a.name) || ATTR_RE.test(String(a.value || ''))) return true;
    }
    return false;
  };
  const safeRemove = (el) => {
    if (!el || !el.parentNode) return;
    const tag = (el.tagName || '').toUpperCase();
    const id = (el.id || '').toLowerCase();
    if (id === 'chatEditor' || id === 'messageList' || id === 'chatTitle') return;
    if (tag === 'HTML' || tag === 'BODY' || tag === 'MAIN') return;
    el.remove();
  };
  const nearestRemovable = (el) => {
    if (!el) return null;
    return el.closest('dialog, aside button, nav button, nav a, header button, header a, .modal, .overlay, .auth-modal, .auth-panel, .account-menu, .profile-menu, [role="dialog"], button, a, li') || el;
  };
  const clean = () => {
    const all = Array.from(document.querySelectorAll('*'));
    for (const el of all) {
      const tag = (el.tagName || '').toUpperCase();
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK' || tag === 'HTML' || tag === 'BODY') continue;
      if (attrHit(el)) safeRemove(nearestRemovable(el));
    }
    for (const el of Array.from(document.querySelectorAll('button,a,li,[role="dialog"],dialog,.modal,.overlay,section,div'))) {
      const txt = textOf(el);
      const lower = txt.toLowerCase();
      const isBigAuth = lower.includes('sabi ai studio access') || (lower.includes('continue with google') && lower.includes('trial')) || (lower.includes('sabi password') && lower.includes('create account'));
      const isAuthControl = hasTextSig(el) && (el.matches('button,a,li,[role="dialog"],dialog') || txt.length < 120 || isBigAuth);
      if (isBigAuth) safeRemove(el.closest('[role="dialog"],dialog,.modal,.overlay,section,div') || el);
      else if (isAuthControl) safeRemove(nearestRemovable(el));
    }
    for (const el of Array.from(document.querySelectorAll('button,a,div,span'))) {
      const txt = textOf(el);
      if (txt === 'D') {
        const container = el.closest('button,a,li,.account-menu,.profile-menu,.auth-panel,.user-card,div');
        safeRemove(container || el);
      }
    }
  };
  clean();
  const mo = new MutationObserver(clean);
  mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
  window.SABI_NO_AUTH_CLEANUP_006 = { active: true, clean };
})();

