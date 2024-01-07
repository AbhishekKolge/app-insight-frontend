# AppInsight Frontend using Next JS

It is a frontend for AppInsight web application. It is an app where user can register for free and take advantage of free analytics of applications on google play store.

## Demo

link: https://app-insight.vercel.app

## API Reference

https://api.postman.com/collections/17221325-9a6c9b83-0e61-4cf7-9835-c4f6840dbfed?access_key=PMAT-01HKBAHC3CTR8NYNV8V73R25RA

## Run Locally

Clone the project

```bash
  git clone https://github.com/AbhishekKolge/app-insight-frontend.git
```

Go to the project root directory

```bash
  cd app-insight-frontend
```

Change BASE_URL inside next.config.js as per requirement (default is https://app-insight-production.up.railway.app/api/v1)
You might face CORS error with default BASE_URL

Install dependencies using NPM

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```

Open http://localhost:3000 with your browser to see the result.

Build application for production

```bash
npm run build
```

Run build application Locally

```bash
npm Start
```
