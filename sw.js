// Cache-Name kommt aus der Version im Registrierungs-Link (sw.js?v=...), damit nur index.html gepflegt werden muss
const V='vb-'+(new URL(self.location).searchParams.get('v')||'0');
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
// Dateien mit eindeutiger URL holen (umgeht Browser-/CDN-Cache) und unter der normalen URL ablegen
self.addEventListener('install',e=>{e.waitUntil((async()=>{
  const c=await caches.open(V);
  await Promise.all(FILES.map(async f=>{
    const u=new URL(f,self.location); u.search='?_='+encodeURIComponent(V);
    const r=await fetch(u,{cache:'reload'}); if(!r.ok) throw new Error('load '+f);
    await c.put(new URL(f,self.location).href,r);
  }));
  await self.skipWaiting();
})());});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  if(new URL(e.request.url).pathname.endsWith('version.json')) return;   // Versionsprüfung immer aus dem Netz
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
