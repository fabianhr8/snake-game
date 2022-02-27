export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';

export const RIGHT = 'RIGHT';
export const LEFT = 'LEFT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export const SET_DIS_DIRECTION = 'SET_DIS_DIRECTION';
export const INCREASE_SNAKE = 'INCREASE_SNAKE';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const STOP_GAME = 'STOP_GAME';
export const RESET_SCORE = 'RESET_SCORE';
export const RESET = 'RESET';

export const setDisDirection = (direction: string) => ({
  type: SET_DIS_DIRECTION,
  payload: direction
});

export const makeMove = (dx: number, dy: number, move: string) => ({
  type: move,
  payload: [dx, dy]
});

export const increaseSnake = () => ({
  type: INCREASE_SNAKE
});

export const scoreUpdates = (type: string) => ({
  type
});

export const stopGame = () => ({
  type: STOP_GAME
});

export const resetGame = () => ({
  type: RESET
});
