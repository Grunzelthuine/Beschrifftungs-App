# Verteiler-Beschriftung

Web-App (PWA) zum Erstellen von Beschriftungsstreifen für Elektro-Verteiler direkt auf der Baustelle – läuft offline auf dem Handy, ohne Server und ohne Bibliotheken.

## Funktionen

- Reihen mit beliebiger TE-Zahl, Bauteile aus einer erweiterbaren Liste oder frei angelegt
- Automatische Nummerierung: FI = `F1`, Sicherungen `F1.1`, `F1.2` … (umschaltbar auf `1F1`, `1F2` …)
- Geräte mit Kennbuchstaben (`C1 Schaltaktor`, `D4 Dimmaktor` …)
- Räume per Auswahlliste oder Freitext, bis zu 3 Zeilen je Feld, Schrift passt sich automatisch an
- Vorlagen für wiederkehrende Reihen / FI-Gruppen
- **PDF-Export** in Originalmaßen: 1 TE = 17,6 mm, Feldhöhe 21,5 mm, mit Schnittmarken (A4 quer/hoch, A3 quer)
- **Geräte-Export** (Brother P-touch): PNG je Reihe, 18 mm hoch, wählbare Auflösung, „Teilen“ in die Drucker-App
- **Foto → Reihen:** Verteilerfoto hochladen, Reihen und Bauteile (mit TE-Breiten) werden per Claude-API vorgeschlagen; benötigt eigenen Anthropic-API-Schlüssel, der nur lokal im Browser gespeichert wird. Das Ergebnis muss geprüft werden.
- Datensicherung als JSON (Verteiler, Bauteilliste, Räume, Vorlagen) mit Zusammenführen beim Einlesen
- Update-Anzeige: Hinweis auf neue Version mit Bestätigung, manuelle Prüfung unter „Mehr“

## Maße

| Größe | Wert |
|---|---|
| 1 TE | 17,6 mm |
| Feldhöhe PDF | 21,5 mm |
| Feldhöhe Beschriftungsgerät | 18 mm |

Beim Drucken des PDFs unbedingt **„Tatsächliche Größe“ / 100 %** wählen.

## Veröffentlichen mit GitHub Pages

1. Neues Repository auf GitHub anlegen (z. B. `Verteilerbeschriftung`), leer, ohne README.
2. Im Ordner dieses Projekts:

   ```bash
   git init
   git add .
   git commit -m "Erste Version"
   git branch -M main
   git remote add origin https://github.com/Grunzelthuine/Verteilerbeschriftung.git
   git push -u origin main
   ```

3. Auf GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`** speichern.
4. Nach ca. einer Minute erreichbar unter `https://grunzelthuine.github.io/Verteilerbeschriftung/`.
5. Auf dem iPhone in Safari öffnen → **Teilen → Zum Home-Bildschirm**.

## Neue Version ausrollen

1. Änderungen in `index.html` vornehmen.
2. `APP_VERSION` in `index.html` **und** `version.json` auf dieselbe neue Nummer setzen (z. B. `1.0.1`).
3. Committen und pushen.

Die App prüft beim Start und beim Zurückkehren in die App, ob `version.json` eine neuere Version meldet, und zeigt dann „Neue Version verfügbar – Jetzt aktualisieren“. Manuell geht es unter **Mehr → Nach Update suchen**. Das Update löscht nur den App-Cache; Verteiler, Bauteile und Vorlagen bleiben erhalten.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | komplette App (HTML, CSS, JS) |
| `sw.js` | Service Worker (Offline-Cache) |
| `version.json` | aktuelle Versionsnummer für die Update-Prüfung |
| `manifest.webmanifest` | PWA-Angaben |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Icons |
| `.nojekyll` | GitHub Pages liefert Dateien unverändert aus |

## Hinweise

- Daten liegen lokal im Browser des Geräts (localStorage) – regelmäßig über „Export → Datensicherung“ sichern.
- Ein Direktdruck per Bluetooth wird nicht unterstützt; der Export erfolgt als PNG zum Teilen in die Brother-App.
