# Your Clean Home Website Final

This is the improved YCH website using your provided logo, service info, price list, and a working calculator.

## Run locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Files

```text
ych-website-final/
├─ package.json
├─ vite.config.js
├─ index.html
├─ public/
│  └─ assets/
│     ├─ ych-logo.png
│     ├─ info-1.png
│     ├─ info-2.png
│     ├─ info-3.png
│     ├─ info-4.png
│     ├─ info-5.png
│     └─ prices.png
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   └─ App.css
```


## Formspree setup

The request form is in `src/App.jsx`.

Find this line:

```jsx
action="https://formspree.io/f/YOUR_FORM_ID"
```

Replace `YOUR_FORM_ID` with your real Formspree form ID.

Example:

```jsx
action="https://formspree.io/f/abcdwxyz"
```

Formspree setup:
1. Go to https://formspree.io
2. Create a new form
3. Add your email
4. Copy the endpoint URL
5. Paste it into `src/App.jsx`
