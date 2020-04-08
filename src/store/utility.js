export const utility = (oldstate, updateState) => {
  return {
    ...oldstate,
    ...updateState
  };
};
