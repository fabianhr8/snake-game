const GlobalState = {
  data: ''
};

const gameReducer = (state = GlobalState, action) => {
  switch (action.type) {
    case 'MOVE_RIGHT':
      return {
        ...state, data: action.payload
      };
    default:
      return state;
  };
};
