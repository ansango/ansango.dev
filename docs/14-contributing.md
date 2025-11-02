
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
