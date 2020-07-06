# [https://backpack.github.io/](https://backpack.github.io/?utm_source=backpack_transpiled)

![Build status](https://github.com/georgegillams/backpack-transpiled/workflows/CI/badge.svg)

![Dependencies status](https://img.shields.io/david/georgegillams/backpack-transpiled)

Scripts used to publish a transpiled version of Skyscanner's Backpack design-system components.

## Why?

Skyscanner's web components (for React) are published untranspiled. This is fine internally because we have a custom set of react-scripts that handle ES6 syntax and SASS files, but projects outside Skyscanner might not want to use [backpack-react-scripts](https://github.com/skyscanner/backpack-react-scripts/) or set up custom bundler rules.

So this is a transpiled version of the components that uses vanilla JS and CSS.

This is shipped as one big package - but modern code-splitting/tree-shaking techniques should mean that your bundle size is not adversely affected

## Documentation

For component documentation, see [https://backpack.github.io/](https://backpack.github.io/?utm_source=backpack_transpiled).

## Developing

### Prerequisites

TODO

### Running locally

```
npm ci
TODO
```

### Testing

## Contributing

Contributions are welcome. Please fork and submit a PR if you want to add or change a feature.
