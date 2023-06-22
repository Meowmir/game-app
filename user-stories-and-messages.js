
ACTIONS A USER CAN TAKE:
CREATE NEW GAME
START GAME
PLACE TILE
GIVE UP (only avaliable if there is no winner)
RESTART GAME (only avaliable if there is a winner)


REAL TIME CHAT? TO LET THE OTHER PLAYER KNOW WHEN YOU ARE BRB
SHOULD USERS BE ABLE TO DECIDE SIZE OF BOARD?


-------


USER STORY 1:
'As a new player, I want to invite a friend, so that we can play the game.'

MESSAGE EXAMPLE 1: Create game (when player 1 loads the page and wants a link to share)
client message: {
    "type": "CREATE_NEW_GAME"
}

server response: {
    "type": "GAME_STATE",
    "game_id": "<id>",
    "game_board":[
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    ],
    "players": [{"name": "player_1"}, {"name": "player_2"}]
    "turn": "<round>"
}

USER STORY 2:
'As a player, I want to start the game, so that I can place a tile.'

MESSAGE EXAMPLE 2: Start the game (when player 2 has opened the link)
client message: {
    "type": "START_GAME",
    "game_id": "<id>"}

server response: {
    "type": "GAME_STATE",
    "game_id": "<id>",
    "game_board":  [
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    ],
    "players": [{player_1}, {player_2}],
    "turn": "<round>"
    }

USER STORY 3:
'As a player, I want to place a tile, so that I can come closer to winning.'

MESSAGE EXAMPLE 3: Placing a tile
client message: {
    "type": "PLACE_TILE",
    "game_id": "<id>",
    "turn": "<round>",
    "player": "player_1",
    "tile": {"color": "<hollow_green>",
    "position": [0, 0]
    }

server response: {
    "type": "GAME_PENDING",
    "game_id": "<id>",
    "game_board":  [
        [{"color": "<hollow_green>"}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    ],
    "turn": "1",
    "player": "player_1"
    }


USER STORY 4:
'As a player, I want to place a tile, so that I can win.'

    MESSAGE EXAMPLE 4: Ending the game
client message: {
    "type": "PLACE_TILE",
    "game_id": "<id>",
    "turn": "<round>"}
    "player": "player_1"
    "tile": {"color": "<hollow_green>",
    "position": [0, 3]}
}

server response: {
    "type": "GAME_END",
    "game_id": "<id>",
    "game_board":  [
        [{"color": "<hollow_green>"}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{"color": "<hollow_green>"}, {}, {}, {}, {}, {}, {}, {"color": "<blue>"}, {}, {"color": "<red>"}, {"color": "<red>"}, {"color": "<red>"}],
        [{"color": "<hollow_green>"}, {}, {}, {}, {}, {}, {}, {}, {"color": "<hollow_blue>"}, {}, {}, {}],
        [{"color": "<hollow_green>"}, {}, {}, {}, {}, {}, {"color": "<green>"}, {"color": "<green>"}, {"color": "<green>"}, {"color": "<hollow_blue>"}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {"color": "<hollow_blue>"}, {}],
        [{}, {"color": "<yellow>"}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {"color": "<hollow_yellow>"}, {}, {}, {}, {}, {}, {}, {}, {"color": "<yellow>"}, {}],
        [{}, {}, {}, {"color": "<hollow_yellow>"}, {}, {}, {}, {}, {}, {}, {"color": "<yellow>"}, {}],
        [{}, {}, {}, {}, {"color": "<hollow_yellow>"}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {"color": "<blue>"}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {"color": "<blue>"}, {}, {"color": "<hollow_red>"}, {"color": "<hollow_red>"}, {"color": "<hollow_red>"}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    ]
}


USER STORY 5:
'As a player, I want to restart the game, so that we can play again.'

MESSAGE EXAMPLE 5: Restarting the game
client message: {
    "type": "RESTART_GAME",
}

server response: {
    "type": "GAME_STARTED",
    "game_id": "<id>",
    "game_board":  [
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
],
    "players": [{player_1}, {player_2}],
    "turn": "<round>"
}
