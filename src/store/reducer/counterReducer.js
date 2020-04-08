const initialState2 = {
  count: 0
};

const counterReducer = (state = initialState2, { type, payload }) => {
  //   console.log(type);
  switch (type) {
    case "ADD":
      return {
        ...state,
        count: state.count + 1
      };

    default:
      return state;
  }
};

export default counterReducer;
