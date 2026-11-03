// Service worker mínimo: permite instalar como app. Não guarda nada em cache,
// por isso as atualizações carregadas no GitHub aparecem sempre.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
