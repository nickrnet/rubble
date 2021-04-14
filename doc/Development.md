# Development

## Development Flow

The development of Garbage has the following flow:

    1.) Fork the repository
    2.) Clone the fork to get the source on your machine
    3.) Create a branch to work on, keeping changes isolated
    4.) When ready, submit a pull request from the branch to the main branch

## Setup

If NodeJS (Node) needs to be installed, we recommend `nvm` to manage versions. It is available at https://github.com/nvm-sh/nvm.

Run

    npm install

in the `rubble` directory after cloning your fork to get what is needed to work on local code.

Using any text editor, open the `rubble` directory in it.

## Layout

The structure is as follows:

    rubble
    ├── doc
    ├── public
    └── src
        ├── Board
        ├── Deck
        ├── Discard
        ├── Player
        ├── __tests__
        └── view

If creating a new component for user interface (UI), create a subdirectory in `src`. If creating a new module with no UI, place its Javascript Node module in `src`.

An example of a Node module is `src/Player.js`. An example of a UI component is `src/BoardView.js` with its corresponding controller.

## Tests

There are a few tests included for the Node modules. To run them run

    npm test

in a Terminal.

## Running

To run the Garbage game, run

    npm start

in a Terminal. This will open a browser to the page.
