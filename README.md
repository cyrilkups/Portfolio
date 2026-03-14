# 🚀 My Portfolio Website

If you like my work, give it a star⭐.

### TL;DR

Yes, you can fork this repo. Please give me proper credit by linking back to [cyril.dev](https://cyril.dev/). Thanks!

## 🛠 Installation & Set Up

First, run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI chat setup

The portfolio chat uses the server route at `app/api/portfolio-chat/route.ts` and expects these environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-mini
```

For local development, place them in `.env.local` and restart the Next dev server.

For Vercel, add the same variables in Project Settings -> Environment Variables for the environments you want chat enabled in:

- `Production`
- `Preview`
- `Development`

## 🤝 Contributing

If you'd like to contribute or suggest improvements, feel free to open an issue or submit a pull request. All contributions are welcome!

## Credit


## 📄 License

This project is open source and available under the [MIT License](https://github.com/cyrilkups/my-portfolio-web/blob/main/LICENSE).
