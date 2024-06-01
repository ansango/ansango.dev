# dev.ansango.com

Welcome to the source code of my personal website [dev.ansango.com](https://dev.ansango.com). This website is built using Astro, TypeScript, and TailwindCSS. The content is dynamically generated from another repository through a GitHub Action.

## Technologies Used

- **Astro**: A modern framework for building static websites.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.

## Project Structure

The project follows a typical Astro project structure with a few custom configurations to handle dynamic content:

- **src/**: Contains the main source code for the website, including pages, components, and styles.
- **public/**: Contains static assets like images and fonts.
- **astro.config.mjs**: Astro configuration file.
- **tsconfig.json**: TypeScript configuration file.
- **tailwind.config.js**: TailwindCSS configuration file.

## Content Generation

The content for this website is not stored directly in this repository. Instead, it is generated from a separate repository ([ansango/ansango.dev.vault](https://github.com/ansango/ansango.dev.vault)) using a GitHub Action. This allows for dynamic content updates without modifying the core website structure.

### How It Works

1. **Content Repository**: The content is managed in the [ansango.dev.vault](https://github.com/ansango/ansango.dev.vault) repository using Obsidian.
2. **GitHub Action**: A GitHub Action in the content repository is triggered on push events.
3. **Deployment**: The action builds the content and deploys it to this website, ensuring that the latest content is always displayed.

## Deployment

The website is automatically deployed using GitHub Actions and Cloudflare Pages. Whenever there are changes to the content or the source code, the following steps are performed:

1. **Build**: The website is built using Astro.
2. **Deploy**: The built site is deployed to Cloudflare Pages.

## Development

To set up the project locally for development:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/ansango/ansango.dev
   cd ansango.dev
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm start
   ```

   This will start the Astro development server and you can view the website at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you have any improvements or suggestions, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
