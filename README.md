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




