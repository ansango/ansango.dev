
# 🤝 Contributing

Thank you for your interest in improving this personal website template!

## About This Project

This is a personal website template, but suggestions and improvements are welcome. Whether you've found a bug, have a feature idea, or want to improve documentation, your contributions help make this template better for everyone.

## Ways to Contribute

### 🐛 Report Bugs

Found a bug? Please open an issue:

1. Search existing issues to avoid duplicates
2. Use the bug report template
3. Include:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, browser)

### 💡 Suggest Features

Have an idea for improvement?

1. Check existing feature requests
2. Open a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Potential implementation approach
   - Examples from other projects (if any)

### 📝 Improve Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add missing information
- Improve examples
- Translate documentation
- Add tutorials or guides

### 🔧 Submit Code Changes

Ready to code?

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 18+
- npm, pnpm, or bun
- Git

### Local Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/ansango.dev.git
cd ansango.dev

# Install dependencies
npm install

# Copy environment variables
cp .env.sample .env
# Edit .env with your test credentials

# Start development server
npm run dev
```

### Development Workflow

1. **Create a branch**:

   ```bash
   git checkout -b feature/my-feature
   # or
   git checkout -b fix/bug-description
   ```

2. **Make changes**:
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic

3. **Test locally**:

   ```bash
   npm run dev    # Test in development
   npm run build  # Test production build
   npm run preview # Preview production build
   ```

4. **Format code**:

   ```bash
   npm run format
   ```

5. **Commit changes**:

   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue with..."
   ```

6. **Push to your fork**:

   ```bash
   git push origin feature/my-feature
   ```

7. **Create Pull Request**:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Submit for review

## Code Style

### JavaScript/TypeScript

Follow existing patterns:

```typescript
// Use TypeScript for type safety
interface Props {
  title: string;
  description?: string;
}

// Destructure props
const { title, description } = Astro.props;

// Use meaningful variable names
const publishedPosts = posts.filter(post => post.data.published);

// Add comments for complex logic
// Calculate pagination based on total entries and entries per page
const totalPages = Math.ceil(totalEntries / entriesPerPage);
```

### Astro Components

```astro
---
// Script section first
import Component from '@/components/Component.astro';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!-- Template section -->
<div>
  <h1>{title}</h1>
</div>

<!-- Styles last (if needed) -->
<style>
  div {
    /* Prefer Tailwind over custom CSS */
  }
</style>
```

### CSS/Tailwind

```html
<!-- Prefer Tailwind utilities -->
<div class="container mx-auto px-4 py-8">
  
<!-- Use responsive modifiers -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Group related classes -->
<div class="flex flex-col gap-4 md:flex-row md:gap-8">
```

### Markdown

```markdown
<!-- Use consistent heading levels -->
# H1 - Main Title
## H2 - Major Section
### H3 - Subsection

<!-- Add blank lines around blocks -->
Paragraph text here.

- List item 1
- List item 2

Another paragraph.

<!-- Use code blocks with language -->
```typescript
const example = "code";
```

```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```

type(scope): description

[optional body]

[optional footer]

```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or tooling changes

### Examples

```bash
feat(music): add album art to music player
fix(search): resolve dialog not opening on Safari
docs(readme): update installation instructions
style(components): format code with prettier
refactor(lib): simplify collection fetching logic
perf(images): optimize image loading
```

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style
- [ ] All tests pass (`npm run build`)
- [ ] Code is formatted (`npm run format`)
- [ ] No console errors or warnings
- [ ] Documentation updated if needed
- [ ] Changes tested locally

### PR Description

Include:

1. **What**: What changes did you make?
2. **Why**: Why were these changes needed?
3. **How**: How did you implement them?
4. **Testing**: How did you test the changes?
5. **Screenshots**: If UI changes, include before/after

### Example PR Description

```markdown
## Description

Adds a new component for displaying code blocks with copy functionality.

## Motivation

Users requested an easy way to copy code snippets from blog posts.

## Changes

- Created `CodeBlock.astro` component
- Added copy-to-clipboard functionality
- Styled with Tailwind to match site theme
- Updated content.css to use new component

## Testing

- [x] Tested in Chrome, Firefox, Safari
- [x] Tested copy functionality
- [x] Verified styling matches theme
- [x] Tested with dark/light mode

## Screenshots

Before: [screenshot]
After: [screenshot]
```

## Review Process

1. **Submission**: You submit a PR
2. **Review**: Maintainer reviews code
3. **Feedback**: Suggestions for improvements
4. **Updates**: You address feedback
5. **Approval**: PR is approved
6. **Merge**: Changes are merged

### Review Timeline

- Most PRs reviewed within 1-3 days
- Large PRs may take longer
- Be patient and respectful

## Testing

### Manual Testing

```bash
# Development
npm run dev
# Test all pages, features, integrations

# Production build
npm run build
npm run preview
# Test production bundle

# Different browsers
# Test in Chrome, Firefox, Safari, Edge
```

### Automated Testing

Currently no automated tests, but welcome to add:

- Unit tests (Vitest)
- Integration tests
- E2E tests (Playwright)

## Documentation

When adding features:

1. **Update relevant docs** in `/docs`
2. **Update README** if it affects quick start
3. **Add code comments** for complex logic
4. **Update TypeScript types** for type safety

### Documentation Style

- Clear and concise
- Examples for complex features
- Code samples with syntax highlighting
- Screenshots for UI changes
- Links to related documentation

## Community Guidelines

### Be Respectful

- Use welcoming and inclusive language
- Respect differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Be Collaborative

- Help others who have questions
- Share knowledge and insights
- Give credit where due
- Assume good intentions

### Be Professional

- Keep discussions on-topic
- Avoid spam and self-promotion
- Don't share others' private information
- Report inappropriate behavior

## Getting Help

Need help contributing?

- **Questions**: Open a discussion
- **Unclear documentation**: Open an issue
- **Stuck on implementation**: Ask in PR comments
- **General discussion**: Start a discussion

## Recognition

Contributors are recognized:

- Listed in GitHub contributors
- Mentioned in release notes (for significant contributions)
- Credit in documentation (for documentation improvements)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You! 🎉

Every contribution, no matter how small, helps improve this template. Thank you for taking the time to contribute!

---

## Quick Reference

### Useful Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build
npm run format       # Format code
npm run astro        # Astro CLI
```

### Project Structure

```
src/
├── components/     # UI components
├── content/        # Markdown content
├── layout/         # Page layouts
├── lib/            # Utilities
├── pages/          # Routes
├── styles/         # CSS
└── constants.ts    # Config
```

### Important Files

- `src/content.config.ts` - Collection schemas
- `src/constants.ts` - Site configuration
- `src/site.json` - Site metadata
- `astro.config.ts` - Astro configuration

---

Happy contributing! 🚀
