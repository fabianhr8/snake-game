import {
  CallEffect,
  delay,
  put,
  PutEffect,
  takeLatest
} from "redux-saga/effects";
import {
  DOWN,
	UP,
	RIGHT,
  LEFT,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  STOP_GAME,
  RESET,
  ISnakeCoord,
  setDisDirection
} from "../actions/index.ts";

export function* moveSaga(params: { type: string; payload: ISnakeCoord; }):
	Generator<
	| PutEffect<{ type: string; payload: ISnakeCoord }>
	| PutEffect<{ type: string; payload: string }>
	| CallEffect<true>
	> {
	while (params.type !== RESET && params.type !== STOP_GAME) {
		//dispatches movement actions
		yield put({
			type: params.type.split("_")[1],
			payload: params.payload,
		});

		//Dispatches SET_DIS_DIRECTION action
		switch (params.type.split("_")[1]) {
			case RIGHT:
				yield put(setDisDirection(LEFT));
				break;
			case LEFT:
				yield put(setDisDirection(RIGHT));
				break;
			case UP:
				yield put(setDisDirection(DOWN));
				break;
			case DOWN:
				yield put(setDisDirection(UP));
				break;
		}
		yield delay(80);
	}
}

function* watcherSagas() {
	yield takeLatest(
		[MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, RESET, STOP_GAME],
		moveSaga
	);
};

export default watcherSagas;
