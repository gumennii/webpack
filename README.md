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
