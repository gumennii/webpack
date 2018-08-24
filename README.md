## What needs to be done
1. Add Loaders for
  - JS/JSX
  - TS/TSX (primary)
  - CSS
2. Add gZipping (plus to add Brotli)
3. Chunk JS
4. Chunk CSS

No use of isomorphic tools due to deprecation in favor of webpack `target: node`

## Packages
- `babel-core` // Babel is a compiler for writing next generation JavaScript (`.babelrc` defines all rules)


## Questions
1. Do we want to manage certain things in our App based on the client a.k.a based on `host` and build different/optimized versions of app specific for the client?
  - We need to manage dnsmasq
  - We need to add context to our `Universal` components
  - We need to require needed components/data within functions instead of plain imports
  - We need to create site configs

  So why is seems like very interesting setup?
    - We can have unique content for Archer/Janeway/Sisko (for example privacy policy pages and don't bundle 3 different content pieces together)
    - We can have unique styles for our clients (images, styles)
    - We can have unique components only for 1 client and do not include it for other clients
    - We can exclude entire website sections from the bundle (for example if Addecco doesn't use Reports and Audits, we can simple define that in config and don't include in the bundle)
    - For all new features, we can deploy it only for one client for testing