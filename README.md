# Chess as a Service

## Requirements

Create a REST endpoint for each of the following use cases, keeping in mind that for this project, we only want to deal with moving/updating pawns (and none of the other pieces).

1. Create a new chess game

- If a game is created successfully, return a 200, along with a representation of the initial game-state that a client can use to create their UI
- The response JSON can be anything of your choosing
- Assume that clients are dumb, and that they rely on the API for the starting position.

2. Fetch a game’s current state

- How you represent the game-state and send it back to the clients is up to you.
- A client should be able to take this game-state and build their UI, as well as know if white or
black needs to move next.

3. Fetch potential, valid spaces to which a piece could move from its current position

- This endpoint can be used to determine where any piece – white or black – can possibly
move from its current position.
- It does not need to take into account whose turn it is since no state is being saved.
- The response JSON can be anything of your choosing.
- The response should indicate if a potential move will result in them capturing an opposing
piece.
- Important: Only implement this for pawns. For the purposes of this project, non-pawn
moves should result in an error code of your choosing.

4. Update the game-state with a new move:

- This endpoint will be used by clients to attempt to make a move.
- The response JSON can be anything of your choosing.
- Assume that the API must check to make sure each move is valid and is made in the proper
order (white, then black, then white, etc.)
- A 200 from this endpoint indicates that the move was valid and the game-state has been
updated successfully.
- Important: Only implement this for pawns. For the purposes of this project, non-pawn
moves should result in an error code of your choosing.

5. Fetch the history of all moves in a game

- Do not implement this endpoint’s logic, but make it available for clients to hit.
- When fully implemented, this would return the history of moves made by both sides. - For now, please return an error code of your choosing.

### Limiting the Scope of the Project

- For the purposes of this question, assume that 1. Many chess games can be created by many users, but 2. Each chess game is played by one person, against him/her-self, in a single browser window/app. In other words, do not worry about attempting to broadcast updates to other players and supporting a multi-user, live-time experience.
- To reiterate: Only worry about moving/updating pawns for endpoints 3 and 4. Do not implement logic for endpoints 3 and 4 for any other pieces.
- Because you are only moving/updating pawns, do not worry about detecting checkmate or stalemate, or promoting a pawn.

## Set up

1. Mongo DB access

- obtain db credential from the Developer
- add them to `.env.template` in the project root folder
- remove file extension, should become `.env`.

2. Installing Dependencies

```bash
npm run i
```

3. Running application

Developer mode

```bash
npm start
```

Production

```bash
npm run start:prod
```

Testing

```bash
npm test
```

## Usage

The Application allows to play Chess game via API.
API Documentation available at [Chess API](https://documenter.getpostman.com/view/6976266/UzJFvJ2E#229e70ca-0871-4f53-a487-5b357fa69681)

You can use any API client, I suggest postman.com, you can just click [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6976266-ab9c6232-9eeb-4ba8-80a8-2a32906fd80e?action=collection%2Ffork&collection-url=entityId%3D6976266-ab9c6232-9eeb-4ba8-80a8-2a32906fd80e%26entityType%3Dcollection%26workspaceId%3D6cda8a35-4fad-46a2-8acc-e6c562458dec#?env%5BLocal%5D=W3sia2V5IjoiYmFzZVVybCIsInZhbHVlIjoibG9jYWxob3N0OjMwMDAiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6ImxvY2FsaG9zdDozMDAwIiwic2Vzc2lvbkluZGV4IjowfV0=)

1. Sign up (create User)

Use Create User endpoint, add `email` to the body, any string.

2. Log in

Use Get User endpoint to obtain `token` (it's actually just user id).
Use `token` as Bearer token.
Or just set it as ``{{token}}`` postman global variable and postman will take care of everything.

3. Play

Follow the API documentation: [Chess API](https://documenter.getpostman.com/view/6976266/UzJFvJ2E#229e70ca-0871-4f53-a487-5b357fa69681).

## Implementation details

**Requirement:** Moves: "For the purposes of this project, non-pawn moves should result in an error code of your choosing."

**Implementation:**

- For all pieces the app with check if the piece is in correct position and respond with 'No cheating! Not found 'piece' at 'from' if not.
- If the piece is in correct position the app will check if the move is implemented and respond with 'Moves for 'piece' is not implemented yet'.
