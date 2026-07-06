import React from 'react';

type AdminUiRuntimeErrorBoundary235AState = {
  hasError: boolean;
  message: string;
  stack: string;
};

export class AdminUiRuntimeErrorBoundary235A extends React.Component<React.PropsWithChildren, AdminUiRuntimeErrorBoundary235AState> {
  state: AdminUiRuntimeErrorBoundary235AState = {
    hasError: false,
    message: '',
    stack: '',
  };

  static getDerivedStateFromError(error: unknown): AdminUiRuntimeErrorBoundary235AState {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error && error.stack ? error.stack : '';

    return {
      hasError: true,
      message,
      stack,
    };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('[Admin UI 235A caught render crash]', error, info);
  }

  resetLanguageAndReload = () => {
    try {
      const keys: string[] = [];
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index);
        if (key && /(lang|language|locale|i18n|lng)/i.test(key)) keys.push(key);
      }
      keys.forEach((key) => window.localStorage.removeItem(key));

      const sessionKeys: string[] = [];
      for (let index = 0; index < window.sessionStorage.length; index += 1) {
        const key = window.sessionStorage.key(index);
        if (key && /(lang|language|locale|i18n|lng)/i.test(key)) sessionKeys.push(key);
      }
      sessionKeys.forEach((key) => window.sessionStorage.removeItem(key));

      window.localStorage.setItem('sabi-admin-language', 'ru');
    } finally {
      window.location.reload();
    }
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main style={{
        minHeight: '100vh',
        background: '#080b12',
        color: '#f8fafc',
        padding: 24,
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
      }}>
        <section style={{
          maxWidth: 920,
          margin: '0 auto',
          border: '1px solid rgba(248,113,113,0.35)',
          background: 'rgba(127,29,29,0.22)',
          borderRadius: 24,
          padding: 24,
          boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
        }}>
          <div style={{ fontSize: 13, letterSpacing: 1.4, textTransform: 'uppercase', color: '#fca5a5', fontWeight: 800 }}>
            Admin UI runtime guard 235A
          </div>
          <h1 style={{ margin: '10px 0 8px', fontSize: 28 }}>
            Экран не пустой: поймана ошибка рендера
          </h1>
          <p style={{ margin: '0 0 18px', color: '#fecaca', lineHeight: 1.6 }}>
            Это временная защита после language cleanup. UI больше не должен исчезать в пустой экран.
            Нажмите сброс языка, затем пришлите текст ошибки ниже.
          </p>

          <button
            type="button"
            onClick={this.resetLanguageAndReload}
            style={{
              border: 0,
              borderRadius: 14,
              background: '#f8fafc',
              color: '#111827',
              fontWeight: 800,
              padding: '12px 16px',
              cursor: 'pointer',
              marginBottom: 18,
            }}
          >
            Сбросить язык и перезагрузить
          </button>

          <pre style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            background: 'rgba(15,23,42,0.82)',
            border: '1px solid rgba(148,163,184,0.25)',
            borderRadius: 16,
            padding: 16,
            color: '#e5e7eb',
            maxHeight: 360,
            overflow: 'auto',
          }}>{this.state.message || 'Unknown render error'}{this.state.stack ? '\n\n' + this.state.stack : ''}</pre>
        </section>
      </main>
    );
  }
}
