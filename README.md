# Apprentice Node.js Backend Assignment The Task

Build a “Chess as a Service” API
Specifically, please create a REST endpoint for each of the following use cases, keeping in mind that for this project, we only want to deal with moving/updating pawns (and none of the other pieces).

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
