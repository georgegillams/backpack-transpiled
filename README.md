# [https://backpack.github.io/](https://backpack.github.io/?utm_source=backpack_transpiled)

![Build status](https://github.com/georgegillams/backpack-transpiled/workflows/CI/badge.svg)

![Dependencies status](https://img.shields.io/david/georgegillams/backpack-transpiled)

Scripts used to publish a transpiled version of Skyscanner's Backpack design-system components.

## Support

This is **not** an official Skyscanner project. It is provided "as-is", with no guarantee of support.

## Why?

Skyscanner's web components (for React) are published untranspiled. This is fine internally because we have a custom set of react-scripts that handle ES6 syntax and SASS files, but projects outside Skyscanner might not want to use [backpack-react-scripts](https://github.com/skyscanner/backpack-react-scripts/) or set up custom bundler rules.

So this is a transpiled version of the components that uses vanilla JS and CSS.

This is shipped as one big package - but modern tree-shaking techniques should mean that your bundle size is not adversely affected.

## Documentation

For component documentation, see [https://backpack.github.io/](https://backpack.github.io/?utm_source=backpack_transpiled).

### Using in a create-react-app

Simply import the components you want to use, and render them.

```
import BpkButton from 'backpack-transpiled/bpk-component-button';
...
return (<BpkButton>Test</BpkButton>);
```

### Using in Next.js

To use this in Next.js there are a couple of additional steps needed.

Install `css-loader`, `mini-css-extract-plugin`, `next-transpile-modules` and `webpack`.

(If your next project is using webpack 4, make sure you install a version of webpack 4).

Download [`next.config.js`](http://github.com/georgegillams/backpack-transpiled/tree/main/examples/next.config.js) and place it at the top of your project:

Installing and using `backpack-transpiled` should now work as it would in a vanilla create-react-app.

## Contributing

Contributions are welcome. Please fork and submit a PR if you want to add or change a feature. See [CONTRIBUTING.md](https://github.com/georgegillams/backpack-transpiled/tree/main/CONTRIBUTING.md) for information on how to set up the project.
