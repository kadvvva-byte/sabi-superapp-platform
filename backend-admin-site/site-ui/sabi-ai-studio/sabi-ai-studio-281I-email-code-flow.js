/* SABI_281I_EMAIL_CODE_FLOW_START */
(function () {
  var RU = {
    createNew: "Create новый аккаунт",
    sendCode: "Send код на email",
    codeLabel: "Код из email",
    codePlaceholder: "Введите код из письма",
    codeNote: "Можно использовать любую почту: Yandex, Gmail, Mail.ru или корпоративный email. Код подтверждения приходит на указанный адрес.",
    lockedStatus: "Отправка и проверка email-кода будут включены после подключения реального backend/email provider и Owner approval. Сейчас поле подготовлено без simulated-отправки.",
    qrTitle: "Уже есть приложение Sabi?",
    qrText: "Войдите через QR. Универсальный QR открывает ваш существующий аккаунт Sabi через активную сессию приложения.",
    qrSmallTitle: "Вход через QR Sabi",
    openQr: "Sign in через QR",
    enlargeQr: "Увеличить QR",
    chooseText: "Выберите первый тариф, затем подтвердите email-кодом и создайте новый аккаунт."
  };

  var EN = {
    createNew: "Create new account",
    sendCode: "Send email code",
    codeLabel: "Email code",
    codePlaceholder: "Enter code from email",
    codeNote: "You can use any email provider: Yandex, Gmail, Mail.ru, or corporate email. The verification code is sent to that address.",
    lockedStatus: "Email-code sending and verification will be enabled after real backend/email provider connection and Owner approval. The field is prepared without simulated sending.",
    qrTitle: "Already have the Sabi app?",
    qrText: "Sign in with QR. The universal QR opens your existing Sabi account through your active app session.",
    qrSmallTitle: "Sabi QR sign-in",
    openQr: "Sign in with QR",
    enlargeQr: "Enlarge QR",
    chooseText: "Choose your first plan, then verify your email code and create a new account."
  };

  function norm(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function lang() {
    var bodyLang = document.body && (
      document.body.getAttribute("data-sabi281h-lang") ||
      document.body.getAttribute("data-sabi281g-lang")
    );
    var htmlLang = document.documentElement.getAttribute("lang");
    return bodyLang === "en" || htmlLang === "en" ? "en" : "ru";
  }

  function t() {
    return lang() === "en" ? EN : RU;
  }

  function textNodes(el) {
    var nodes = [];
    if (!el) return nodes;

    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!norm(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        var parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        var tag = String(parent.tagName || "").toLowerCase();
        if (tag === "svg" || tag === "path" || tag === "style" || tag === "script") return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function setControlText(el, value) {
    if (!el) return;
    var nodes = textNodes(el);
    if (nodes.length) {
      nodes[nodes.length - 1].nodeValue = " " + value;
    } else {
      el.textContent = value;
    }
    el.setAttribute("aria-label", value);
  }

  function findControl(patterns) {
    var controls = Array.prototype.slice.call(document.querySelectorAll("button,a,[role='button']"));
    return controls.find(function (el) {
      var text = norm(el.textContent);
      var aria = norm(el.getAttribute("aria-label"));
      var href = norm(el.getAttribute("href"));
      var all = [text, aria, href].join(" ");
      return patterns.some(function (p) { return p.test(all); });
    });
  }

  function ensureEmailCodeField() {
    if (document.querySelector("[data-sabi281i-email-code]")) return;

    var password =
      document.querySelector("[data-real-auth-password]") ||
      document.querySelector("input[type='password']");

    if (!password) return;

    var field =
      password.closest(".sabi149-field") ||
      password.closest(".sabi-v148b-field") ||
      password.closest("label") ||
      password.parentElement;

    if (!field || !field.parentElement) return;

    var wrap = document.createElement("div");
    wrap.className = "sabi281i-code-wrap";
    wrap.setAttribute("data-sabi281i-code-wrap", "true");

    wrap.innerHTML =
      '<label class="sabi281i-code-label">' +
        '<span data-sabi281i-code-label></span>' +
        '<input class="sabi281i-code-input" data-sabi281i-email-code type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="12" />' +
      '</label>' +
      '<button class="sabi281i-send-code" type="button" data-sabi281i-send-code></button>' +
      '<p class="sabi281i-code-note" data-sabi281i-code-note></p>' +
      '<div class="sabi281i-status" data-sabi281i-status></div>';

    field.insertAdjacentElement("afterend", wrap);
  }

  function showStatus(message) {
    var status = document.querySelector("[data-sabi281i-status]");
    if (!status) return;

    status.textContent = message;
    status.classList.add("is-visible");
  }

  function updateCopy() {
    var copy = t();

    var createBtn = findControl([
      /Create\s*Sabi\s*Account/i,
      /Create\s*аккаунт\s*Sabi/i,
      /Create\s*new\s*account/i,
      /Create\s*новый\s*аккаунт/i
    ]);

    if (createBtn) {
      setControlText(createBtn, copy.createNew);
      createBtn.setAttribute("data-sabi281i-create-new-account", "true");
    }

    var sendBtn = document.querySelector("[data-sabi281i-send-code]");
    if (sendBtn) setControlText(sendBtn, copy.sendCode);

    var codeLabel = document.querySelector("[data-sabi281i-code-label]");
    if (codeLabel) codeLabel.textContent = copy.codeLabel;

    var codeInput = document.querySelector("[data-sabi281i-email-code]");
    if (codeInput) {
      codeInput.setAttribute("placeholder", copy.codePlaceholder);
      codeInput.setAttribute("aria-label", copy.codeLabel);
    }

    var codeNote = document.querySelector("[data-sabi281i-code-note]");
    if (codeNote) codeNote.textContent = copy.codeNote;

    var qrOpen = findControl([/Open\s*account/i, /Open\s*аккаунт/i, /Sign\s*in\s*with\s*QR/i, /Sign in\s*через\s*QR/i]);
    if (qrOpen) setControlText(qrOpen, copy.openQr);

    var qrEnlarge = findControl([/Enlarge\s*QR/i, /Увеличить\s*QR/i]);
    if (qrEnlarge) setControlText(qrEnlarge, copy.enlargeQr);

    replaceVisiblePhrase("Universal Sabi account access", copy.qrTitle);
    replaceVisiblePhrase("Доступ к аккаунту Sabi", copy.qrTitle);
    replaceVisiblePhrase("Universal Sabi Account QR", copy.qrSmallTitle);
    replaceVisiblePhrase("Универсальный QR аккаунта Sabi", copy.qrSmallTitle);

    replaceVisiblePhrase(
      "Scan the QR to open your Sabi account. One universal route — your session determines which account opens.",
      copy.qrText
    );
    replaceVisiblePhrase(
      "Отсканируйте QR, чтобы открыть аккаунт Sabi. Один универсальный маршрут открывает аккаунт вашей активной сессии.",
      copy.qrText
    );

    replaceVisiblePhrase(
      "Выберите первый тариф для начала работы. Затем создайте аккаунт Sabi или войдите по email и паролю.",
      copy.chooseText
    );
    replaceVisiblePhrase(
      "Choose a subscription plan to get started. Then create a new Sabi account or sign in using your email and password.",
      copy.chooseText
    );
  }

  function replaceVisiblePhrase(from, to) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.includes(from)) return NodeFilter.FILTER_REJECT;
        var parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        var tag = String(parent.tagName || "").toLowerCase();
        if (tag === "script" || tag === "style") return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      node.nodeValue = node.nodeValue.split(from).join(to);
    });
  }

  function installHandlers() {
    document.addEventListener("click", function (event) {
      var send = event.target.closest("[data-sabi281i-send-code]");
      if (send) {
        event.preventDefault();
        showStatus(t().lockedStatus);
        return;
      }

      var create = event.target.closest("[data-sabi281i-create-new-account]");
      if (create) {
        var codeInput = document.querySelector("[data-sabi281i-email-code]");
        var code = codeInput ? norm(codeInput.value) : "";

        if (!code) {
          event.preventDefault();
          event.stopImmediatePropagation();
          showStatus(lang() === "en"
            ? "Enter the email verification code first. New account creation requires email confirmation."
            : "Сначала введите код подтверждения из email. Создание нового аккаунта требует подтверждения почты."
          );
        }
      }
    }, true);
  }

  function run() {
    ensureEmailCodeField();
    updateCopy();
  }

  function init() {
    run();
    installHandlers();

    var timer = null;
    var observer = new MutationObserver(function () {
      if (timer) return;
      timer = setTimeout(function () {
        timer = null;
        run();
      }, 80);
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    setTimeout(run, 250);
    setTimeout(run, 900);
    setTimeout(run, 1800);
    setTimeout(run, 3000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
/* SABI_281I_EMAIL_CODE_FLOW_END */

