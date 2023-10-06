# Hírkezelő API - Készítette: Pavlik Dániel

Ez a projekt a **Budapest Közút Zrt.** által kiírt fullstack fejlesztő pozíció felvételi feladatára készült.

## Előfeltételek a telepítéshez

A gépen szükséges, hogy legyen **Docker** és **docker compose**.
Windowson a **Docker Desktop** alkalmazást használtam erre a célra.

## Telepítés

A projekt telepítése

```bash
  git clone https://github.com/web-sub/hirkezelo-api.git hirkezelo-api

  cd hirkezelo-api
```

## Futtatás

A projekt indításához az alábbi parancsot kell futtatni a hirkezelo-api mappában:

```bash
  docker compose up --build -d
```

Miután a container-ek elindultak **várni kell, amíg a next build lefut**, utána a **localhost:3000-en lesz elérhető a projekt**.
![alt text](https://drive.google.com/uc?export=download&id=16WPqNFEXeRPrPzKatAsJ8Ggt0XiTz7Cx)

## Belépés, Token generálása

A kék **"Bejelentkezés Google-el"** gombra kattintva be tudunk jelentkezni az alkalmazásba google-el.

Ezután a **"Hozzáférési token másolása"** gombra kattintva automatikusan a vágólapra másolódik a saját tokenünk.
![alt text](https://drive.google.com/uc?export=download&id=1SBZH9vOW2t3p2YksabgeGIfLSm5WdWw8)

## Token használata azonosításra

A kapott token használható azonosításra **Bearer tokenként** elküldve, illetve az **url-ben ?token= paraméterként**.

## API műveletek

A bal fent található dokumentáció gombra kattintva, vagy a **localhost:3000/api-doc** oldalon megtaláljuk az **API végpontok dokumentációját**, illetve interaktívan is tudjuk őket használni.

![alt text](https://drive.google.com/uc?export=download&id=1drkrjWyhP9nKEXWvkhSsZafqb_FYmK7-)

## Készítette

-   [@pavlik.daniel](https://www.github.com/web-sub)

## Elérhetőségek

-   email: email@pavlikdaniel.hu
-   telefon: +36306257478
