# presenter Frontend


## Scripts
From the root directory, all scripts can be run with `yarn frontend [Script Name]`. Example, `yarn frontend start`

- `yarn start` - Starts the react app using React Scripts.
- `yarn build` - Builds the frontend using React Scripts and puts the output files in `/build`.
- `yarn deploy` - Deploys the code to the Firebase project.
- `yarn ci` - The linting and testing command the CI server uses to ensure code quality.
- `yarn bundle` - Creates bundle statistics and opens them with Webpack Bundle Analyzer.
- `yarn test` - Runs Jest with React Scripts. Additional configuration for jest is in `package.json`.
- `yarn test:coverage` - Creates a coverage report from Jest. Add `:view` to pen the report in the browser.
- `yarn test:debug` - Runs Jest with a Chrome debugger attached. See [Debugging in Jest](##debugging-in-jest) below for more details.
- `yarn lint` - Checks the code for Typescript and EsLint errors.
- `yarn eslint:fix` - Runs the code through EsLint and fixes any issues.
- `yarn format:fix` - Runs the code through Prettier and fixes any formatting issues.

## Debugging in Jest

Below are the steps to begin debugging using Jest in Chrome Dev Tools.

1. Begin by running `yarn frontend test:watch` from the root of the project. This will start the watch script and attach a debugger to Chrome.
2. Open Chrome and go to this url `chrome://inspect`.
3. Click the `Open dedicated DevTools for Node` link and a Chrome Dev Tool window will open.

As the tests run and encounter `debugger` statements, the dev tools will stop and give you a similar debugging experience as you are used to when creating frontend apps.