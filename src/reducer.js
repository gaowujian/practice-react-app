export default (state, action) => {
  switch (action.type) {
    case "light":
      return { ...state, currentTheme: state.themes["light"] };
    case "dark":
      return { ...state, currentTheme: state.themes["dark"] };
    default:
      return state;
  }
};
