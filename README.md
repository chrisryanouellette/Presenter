# Presenter

To get started, run `yarn && yarn start` in the root directory.

you can then begin adding `.md` files to the `files/` directory.

## Development

For information on the frontend see [README.md](./frontend/README.md) file.

For information on the backend see [README.md](./backend/README.md) file.

### Customizing Markdown

You can add new rules to / output for the markdown files in the `frontend/src/rules.ts` file.

Add styling for the rules to `frontend/src/styles/markdown.css`.

### Scripts
From the root directory, all scripts can be run with `yarn frontend [Script Name]`. Example, `yarn frontend start`

- `yarn frontend` - Alias for `yarn workspace frontend run`. You can add additional args to the command like so `yarn frontend start`.
- `yarn backend` - Alias for `yarn workspace backend run`. You can add additional args to the command like so `yarn backend start`.
- `yarn start` - Starts the frontend and backend projects.
- `yarn build` - Builds the frontend and backend projects.
- `yarn deploy` - Deploys the frontend and backend projects
- `yarn ci` - Run the CI scripts for the frontend and backend projects.
- `yarn test` - Runs the test scripts for the frontend and backend projects.
- `yarn test:coverage` - Creates a coverage report from Jest for the frontend and backend projects.
- `yarn lint` - Runs the lint scripts for the frontend and backend projects.

### Adding Packages

#### To the Root

Run command `yarn add -W [-D?] [Package Name]` and the package will be added to the root of the monorepo.

#### To a Mono Repo

Run command `yarn workspace [Workspace Name] add [-D?][Package Name]` and the package will be installed in the workspace specified.

### Debugging w/ Jest

Both the frontend and backend repos can be debugged with Jest using the Chrome Debugger.

1. Begin by running `yarn [Workspace Name] test:watch`. This will start the watch script and attach a debugger to Chrome.
2. Open Chrome and go to this url `chrome://inspect`.
3. Click the `Open dedicated DevTools for Node` link and a Chrome Dev Tool window will open.

As the tests run and encounter `debugger` statements, the dev tools will stop and give you a similar debugging experience as you are used to when creating frontend apps.