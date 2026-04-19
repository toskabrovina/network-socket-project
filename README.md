# UDP-socket-client-and-server-implementation-Node.js---Rrjeta-Kompjuterike
#Projekti ne Rrjeta Kompjuterike

Ky projekt është realizuar në **Node.js** dhe demonstron komunikimin **client-server** përmes **UDP socket**.  
Qëllimi i projektit është që klienti të mund të lidhet me serverin, të dërgojë komanda dhe të kryejë operime të ndryshme me fajlla, si listimi, leximi, ngarkimi, shkarkimi, fshirja, kërkimi dhe shfaqja e informatave për fajllat. Klienti i përdor komandat nga terminali dhe serveri i përpunon ato sipas rolit të përdoruesit. Struktura dhe komandat e klientit përputhen me implementimin në `client.js`. :contentReference[oaicite:0]{index=0}

## Funksionalitetet kryesore

Projekti përfshin këto funksione:

- lidhjen e klientit me serverin përmes UDP
- përdorimin e roleve të ndryshme të përdoruesve
- listimin e fajllave në folderin e përbashkët
- leximin e përmbajtjes së një fajlli
- ngarkimin e fajllave nga klienti në server
- shkarkimin e fajllave nga serveri në klient
- fshirjen e fajllave nga serveri
- kërkimin e fajllave sipas fjalës kyçe
- shfaqjen e informatave si madhësia, data e krijimit dhe modifikimit të fajllit
- dërgimin e mesazheve të zakonshme nga klienti te serveri

## Teknologjitë e përdorura

- **JavaScript**
- **Node.js**
- **dgram** për UDP socket
- **fs** për menaxhim të fajllave
- **path** për rrugët e fajllave
- **readline** për marrjen e komandave nga terminali

## Struktura e projektit

```bash
network-socket-project/
│── client.js
│── server.js
│── fileService.js
│── config.js
│── shared/
│── README.md
```

## Përshkrimi i fajllave

- **client.js** – përmban logjikën e klientit, marrjen e komandave nga terminali dhe komunikimin me serverin.
- **server.js** – përmban logjikën kryesore të serverit UDP dhe përpunimin e kërkesave nga klientët.
- **fileService.js** – përmban funksionet për menaxhimin e fajllave si listimi, leximi, ruajtja, fshirja dhe kërkimi.
- **config.js** – përmban konfigurimet bazë si IP adresa, porti dhe folderi i përbashkët.

## Rolet e përdoruesve

- **admin** – ka qasje në të gjitha komandat.
- **read** – ka qasje vetëm në komandat bazë.

## Komandat e projektit

| Komanda | Përshkrimi |
|--------|------------|
| `/list` | Shfaq fajllat në server |
| `/read <filename>` | Lexon një fajll |
| `/upload <local_filename>` | Ngarkon një fajll në server |
| `/download <filename>` | Shkarkon një fajll nga serveri |
| `/delete <filename>` | Fshin një fajll nga serveri |
| `/search <keyword>` | Kërkon fajlla sipas emrit |
| `/info <filename>` | Shfaq informata për fajllin |

## Si ekzekutohet projekti

Së pari duhet të keni të instaluar **Node.js**.

**Nisja e serverit**

```bash
node server.js
```

**Nisja e klientit**

```bash
node client.js Client_01 admin
```

ose

```bash
node client.js Client_02 read
```

## Shembuj përdorimi

```bash
/list
/read test.txt
/search test
/info test.txt
/download test.txt
```

Për `admin`:

```bash
/upload dokument.txt
/delete dokument.txt
```

## Përmbledhje

Ky projekt tregon përdorimin e komunikimit client-server me UDP në Node.js, së bashku me operime bazë me fajlla dhe kontroll të qasjes sipas roleve të përdoruesve.

## Anëtarët e grupit

- Toska Brovina
- Sumeja Ibrahimi
- Ubejd Shahini
- Valon Hajredini
