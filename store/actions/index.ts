export const MOVE_RIGHT = "MOVE_RIGHT"

// without payload
export const moveRight = () => ({
  type: MOVE_RIGHT
});

// with payload
export const moveRight = (data: string) => ({
  type: MOVE_RIGHT,
  payload: data
});
