# 4 for 4

Hi and thank you for checking out my project!

"4 for 4" is a two player online browser four-in-a-row game written in
TypeScript. I started the project during my internship at Devilie AB.
The project was meant to teach me how to set up a server and write both
front-end and back-end code.

This is the first time I am using TypeScript and coding for the web. My
mentor decided on the language since it is widely known and common in many
fields of programming.

## Installation

```bash
$ npm install
```

## Running the app

Start an app listening on [http://localhost:3000/]
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## How to start the game

- Create a game.
- Enter nickname for Player 1.
- Send invite link to Player 2.
- Enter nickname for Player 2.
- Game will start with randomized start-player.

## How to play

- Place any color on tile
- Next turn that color will be unavailable until all colors have been placed once.
- When all colors have been placed once, all colors will be available again and you are free to place any color.

## How to win

- Be the first player to get four tiles in a horizontal, vertical or diagonal row.

## License

"4 for 4" is [MIT licensed](LICENSE).
