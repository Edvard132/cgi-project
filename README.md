# cgi-project

2024 suvepraktika proovitöö - kinokülastuse veebirakendus
## Sisukord

- [Paigaldus](#Paigaldus)
- [Projekti omadused](#omadused)
- [Töö käik](#Kulgemine)
- [AI kasutamise juhud](#AI)

## Paigaldus

1. Klooni repositoorium `git clone https://github.com/Edvard132/cgi-project.git`
2. Ava kaust **cinema-booking-app** (serveri kaust) sobivas keskkonnas ning käivita rakendus
3. Ava terminal ning liigu kausta **cinema-booking-app-frontend** (kasutajaliidese kaust)
4. Käivita käsk `npm install`
5. Käivita käsk `npm start`

Veebirakendus on saadaval aadressil `http://localhost:3000`


## Omadused

Rakenduse käivitamisel genereeritakse 10 filmi andmete põhjal nädala seanssid. Päevas on 9 seanssi: esimene hakkab kell 1 päeval ning viimane seanss kell 9 õhtul. 
Filmisaal mahutab 50 inimest ning igale seanssile on hõivatud kohad genereeritud juhuslikult.
Seanssi istekohtade valimiseks peab kasutaja sisse logima, samuti ka filmi soovituste nägemise jaoks.
Autoriseerimine on implementeeritud, kuid ilma parooli tokeniseerimiseta/kodeerimiseta, kuna see ei olnud ülesande kohustulik osa ja prioriteet.

Kasutajale filmide soovitamine toimub kasutaja vaadatud filmide žanrite põhjal. Kui filmis esineb žanr, mida kasutaja varasemalt näinud on, siis seda ka soovitakse. Soovitused on sorteeritud filmi skoori järgi kahanevalt.
Filmi andmete fail on võetud aadressilt __https://github.com/fhsinchy/movieist/blob/master/_data/movies.json__ ning täiendatud vastavalt vajadustele.

## Kulgemine

Töö raskeim osa oli andmebaasi mudeli koostamine, kuna katsetasin palju kombinatsioone ja pidevalt sattusin mõne vea otsa. Tuli ette mitmeid lõpmatuid tsükleid andmete relatsioonide valesti defineerimisest. Need said lahendatud, valides lihtsama mudeli. 

## AI
Tehisintellektist kasutasin OpenAI keelemudelit Chat-GPTd üksikute väiksemate ülesannete lahendamiseks.    
Näide:
Promp: `write a function to read data from json file in java`
![image](https://github.com/Edvard132/cgi-project/assets/92860643/5d7aceb3-50ac-4009-9e85-e0305fcfdafb)

