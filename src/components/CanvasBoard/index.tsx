import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { drawObject, generateRandomPosition, clearBoard } from '../../utilities/index.tsx';
import { IGlobalState } from "../store/reducers";
import {
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_UP,
  makeMove,
  increaseSnake,
  scoreUpdates
} from "../../store/actions/index.ts";

export interface ICanvasBoard {
  height: number;
  width: number;
}

const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  const dispatch = useDispatch();
  const state: IGlobalState = useSelector(state => state);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState <CanvasRenderingContext2D | null>(null);
  const [pos, setPos] = useState<IObjectBody>(generateRandomPosition(width - 20, height - 20));
  const [isConsumed, setIsConsumed] = useState<boolean>(false);

  const disallowedDirection = state.disallowedDirection;
  const snake1 = state.snake;

  const moveSnake = useCallback((dx = 0, dy = 0, ds: string) => {
    if (dx > 0 && dy === 0 && ds !== 'RIGHT') dispatch(makeMove(dx, dy, MOVE_RIGHT));
    if (dx < 0 && dy === 0 && ds !== 'LEFT') dispatch(makeMove(dx, dy, MOVE_LEFT));
    if (dx === 0 && dy < 0 && ds !== 'UP') dispatch(makeMove(dx, dy, MOVE_UP));
    if (dx === 0 && dy > 0 && ds !== 'DOWN') dispatch(makeMove(dx, dy, MOVE_DOWN));
  }, [dispatch]);

  const handleKeyEvents = useCallback((event: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (event.key) {
          case 'w':
            moveSnake(0, -20, disallowedDirection);
            break;
          case 's':
            moveSnake(0, 20, disallowedDirection);
            break;
          case 'a':
            moveSnake(-20, 0, disallowedDirection);
            break;
          case 'd':
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else {
        if (
          disallowedDirection !== 'LEFT' &&
          disallowedDirection !== 'UP' &&
          disallowedDirection !== 'DOWN' &&
          event.key === 'd'
        ) moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
      }
    },
    [disallowedDirection, moveSnake]
  );

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext('2d')); //store in state variable
    clearBoard(context);
    drawObject(context, snake1, '#91C483'); //Draws snake at the required position
    drawObject(context, [pos], '#676FA3'); //Draws fruit randomly

    //When the object is consumed
    if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) setIsConsumed(true);
  }, [context, snake1, pos]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyEvents);
    return () => window.removeEventListener('keypress', handleKeyEvents);
  }, [disallowedDirection, handleKeyEvents]);

  useEffect(() => {
    if (isConsumed) {
      const posi = generateRandomPosition(width - 20, height - 20);
      setPos(posi);
      setIsConsumed(false);
      dispatch(increaseSnake());
      dispatch(scoreUpdates());
    }
  }, [isConsumed, dispatch, height, width]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '3px solid black',
      }}
      height={height}
      width={width}
    />
  );
};

export default CanvasBoard;
