# Saros SDK Documentation

A comprehensive documentation site for the Saros Finance SDKs, built with Docusaurus and designed for developers building on Solana.

## Features

- **Classic Theme**: Clean black and white theme for professional documentation
- **Developer-Focused**: Practical guides and tutorials
- **Runnable Examples**: Complete TypeScript scripts ready to use
- **Responsive Design**: Works on desktop and mobile devices
- **Search**: Built-in search functionality
- **Syntax Highlighting**: Beautiful code highlighting for TypeScript/JavaScript
- **Theme Toggle**: Switch between light and dark modes

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd saros-docs

# Install dependencies
npm install

# Start development server
npm start
```

The site will be available at `http://localhost:3000`.

### Building for Production

```bash
# Build the site
npm run build

# Serve the built site locally
npm run serve
```

## Project Structure

```
saros-docs/
├── docs/                    # Documentation content
│   ├── introduction.md     # Welcome page
│   ├── quick-start.md      # Getting started guide
│   ├── tutorials/          # Tutorial content
│   │   ├── swapping-tokens.md
│   │   ├── providing-liquidity.md
│   │   └── removing-liquidity.md
│   ├── code-examples.md    # Runnable scripts
│   ├── api-reference.md    # API documentation
│   └── sdk-analysis.md     # SDK analysis and suggestions
├── src/
│   ├── components/         # React components
│   ├── css/               # Custom styles
│   └── pages/             # Additional pages
├── static/                # Static assets
└── docusaurus.config.ts   # Docusaurus configuration
```

## Content Overview

### Introduction
Welcome page explaining the purpose and target SDKs.

### Quick Start
Step-by-step guide to set up a project and perform your first interaction with the Saros DLMM protocol.

### Tutorials
- **Swapping Tokens**: Complete guide to executing token swaps
- **Providing Liquidity**: How to add liquidity to DLMM pools
- **Removing Liquidity**: Guide to withdrawing liquidity from positions

### Code Examples
Complete, runnable TypeScript scripts for common operations.

### API Reference
High-level reference for the most common SDK instructions.

### SDK Analysis
Constructive analysis of the SDK with improvement suggestions.

## Customization

### Styling
The site uses a classic black and white theme defined in `src/css/custom.css`. Key color variables:

- Primary: `#000000` (black)
- Background: `#ffffff` (white)
- Surface: `#f8f9fa` (light gray)
- Text: `#333333` (dark gray)
- Links: `#000000` (black)

### Navigation
Sidebar navigation is configured in `sidebars.ts`. To add new pages:

1. Create a new `.md` file in the `docs/` directory
2. Add the filename to the sidebar configuration
3. The page will automatically appear in the navigation

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### GitHub Pages

```bash
npm run deploy
```

### Other Platforms

Build the site and deploy the `build/` directory to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm start`
5. Submit a pull request

## License

This documentation is created for the [Saros SDK Guide Challenge on Superteam Earn](https://earn.superteam.fun/listing/saros-sdk-guide-challenge).

## Links

- [Official Saros Documentation](https://docs.saros.xyz/)
- [Saros Finance GitHub](https://github.com/saros-finance)
- [Superteam Challenge](https://earn.superteam.fun/listing/saros-sdk-guide-challenge)