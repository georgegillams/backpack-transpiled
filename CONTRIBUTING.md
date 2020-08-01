## Developing

### Prerequisites

You should have node installed. You can find the best node version to use in [.nvmrc](https://github.com/georgegillams/backpack-transpiled/tree/main/.nvmrc).

### Running locally

```
npm ci
```

#### Pull

The following script is used to pull down and set up the latest `backpack` code.

Note this will take a long time.

```
npm run backpack-pull
```

#### Transpilation

To transpile files into a local `dist` directory ready for publishing.

```
npm run transpile
```

#### Publishing

Ensure that [CHANGELOG.md](https://github.com/georgegillams/backpack-transpiled/tree/main/CHANGELOG.md) has an entry for the version being published. You do not need to list every change made to Backpack itself, unless they are significant.

Note this this script starts by running the tranpilation script.

```
npm run release
```

or

```
npm run release:patch
```

or

```
npm run release:minor
```

or

```
npm run release:major
```

### Testing

Before testing, the [Pull](#pull) and [Transpilation](#transpilation) steps above need to be completed otherwise the package under test will not exist.

Run `npm run test`. This will use the built files in `./backpack-transpiled` as the `backpack-transpiled` dependency for the tests.

