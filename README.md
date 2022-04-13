<img src="https://dualis-crawler.s3.eu-central-1.amazonaws.com/Logo.png" align="right" height="200"/>

# Dualis-Bot
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![GitHub Issues](https://img.shields.io/github/issues/anfederico/clairvoyant.svg)](https://github.com/dualis-bot/dualis-bot/issues)

Der Dualis-Bot ist als Teil einer Prüfungsleistung des Moduls Web-Programmierung innerhalb eines Wirtschaftsinformatikstudiums (WWI20SEA) an der DHBW Mannheim von der Gang of Fork entwickelt worden.

## Grundlage

Da die DHBW Mannheim das Tool [Dualis](https://dualis.dhbw.de) für die Bekanntgabe der Noten aller Module verwendet und man bei einer solchen Bekanntgabe nicht außerhalb dieser Anwendung kontaktiert wird, wollten wir eine Lösung schaffen, die uns auf einem gewünschten Kommunikationskanal kontaktiert, wenn neue Noten in das Tool eingetragen wurden. Dies haben wir mithilfe eines Webcrawlers, eines Discord und Telegram Bots sowie einer zur Einrichtung und Konfiguration dienenden, mobiloptimierten Weboberfläche realisiert.

## Nutzung

Alle wesentlichen Grundlagen zur Nutzung unseres Projekts findet ihr [hier](http://dualis-bot.robin-reyer.de) als verschlüsselte Verbindung. Unter dem angegebenen Link könnt ihr einen Account registrieren über den ihr die gewünschten Kommunikationswege einrichten könnt. Mithilfe der Ergänzung unpersönlicher Nachrichten ohne individueller Noten, kann der Bot auch für Kurs Channel via Telegram und Discord oder einer E-Mail für den Kursverteiler genutzt werden.

## Bug Reporting/Fixing

Die Server für den Dualis-Bot werden über den Abgabetermin heraus zur Verfügung stehen, sodass dieser längerfristig genutzt werden kann. Bitte berücksichtigt, dass es sich um einen Prototypen handelt und Bugs auftreten können. Bei größeren Problemen könnt ihr euch gerne bei uns melden oder eigene Pull Requests erstellen, um euch selbst in diesem Projekt zu verwirklichen.

## Haftungsklausel

Da es sich nur um einen Prototypen handelt, der in einer sehr kurzen Zeitspanne entwickelt wurde übernehmen die Contributer keine Haftung für die kommunizierten Noten oder verwendete Daten.

<details><summary><h2>Entwicklungshinweise</h2></summary>
  
### Run / Build Frontend

from directory /dualis-bot/frontend `trex run start | snel build`

### Build / Run Backend and Crawler

from directory /dualis-bot `docker-compose build | docker-compose up`

### Run Backend Tests

`deno test --allow-env --allow-read --importmap=./backend/tests/importmap.json`

### Run Crawler Tests

`cd dualis-crawler | go test -v ./...`

### [Backend-Doku](https://gitlab.com/lumaghg/dualis-bot-backend-doku/-/tree/main)
</details>
