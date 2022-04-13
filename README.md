# Dualis-Bot

Der Dualis-Bot ist als Teil einer Prüfungsleistung des Moduls Web-Programmierung eines Wirtschaftsinformatikstudiums an der DHBW Mannheim entstanden.

## Grundlage

Da die DHBW Mannheim das Tool [Dualis](https://dualis.dhbw.de) für die Bekanntgabe der Noten aller Module verwendet und man bei einer solchen Bekanntgabe nicht außerhalb dieser Anwendung kontaktiert wird, wollten wir eine Lösung schaffen, die uns auf einem gewünnschten Kommunikationskanal kontaktiert, wenn neue Noten in das Tool eingetragen wurden. Dies haben wir mithilfe eines Webcrawlers, eines Discord und Telegram Bots sowie einer zur Einrichtung und Konfiguration dienenden, mobiloptimierten Weboberfläche realisiert.

## Nutzung

Alle wesentlichen Grundlagen zur Nutzung unseres Projekts findet ihr [hier](http://dualis-bot.robin-reyer.de). Unter dem angegebenen Link könnt ihr einen Account registrieren über den ihr die gewünschten Kommunikationswege einrichten könnt. Mithilfe der Ergänzung unpersönlicher Nachrichten ohne individueller Noten, kann der Bot auch für Kurs Channel via Telegram und Discord oder einer E-Mail für den Kursverteiler genutzt werden.

## Bug Reporting/Fixing

Die Server für den Dualis-Bot werden über den Abgabetermin heraus zur Verfügung stehen, sodass dieser längerfristig genutzt werden kann. Bitte berücksichtigt, dass es sich um einen Prototypen handelt und Bugs auftreten können. Bei größeren Problemen könnt ihr euch gerne bei uns melden oder eigene Pull Requests erstellen, um euch selbst in diesem Projekt zu verwirklichen.

## Haftungsklausel

Da es sich nur um einen Prototypen handelt, der in einer sehr kurzen Zeitspanne entwickelt wurde übernehmen die Contributer keine Haftung für die kommunizierten Noten.

---

***

## For Developing

### Build / Run Backend and Crawler

from directory /dualis-bot `docker-compose build | docker-compose up`

### Run Backend Tests

`deno test --allow-env --allow-read --importmap=./backend/tests/importmap.json`

### Run Crawler Tests

`cd dualis-crawler | go test -v ./...`

### [Backend-Doku](https://gitlab.com/lumaghg/dualis-bot-backend-doku/-/tree/main)
