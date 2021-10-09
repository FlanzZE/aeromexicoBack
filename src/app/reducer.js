
const initState = {
  characters: [],
  loading: false,
  error: null,
  filter: "",
  favorites: []
};
const charactersReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_POSTS_REQUESTS":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        characters: action.payload,
        loading: false,
      }
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case "REMOVE_FAVORITE_CHARACTER":
      return {
        ...state,
        loading: false,
        filter: ""
      }
    case "ADD_FAVORITE_CHARACTER":
      return {
        ...state,
        loading: false,
        filter: ""
      }
    case "FETCH_BY_STUDENT_SUCCESS":
      return {
        ...state,
        characters: action.payload,
        loading: false,
        filter: "student"
      }
    case "FETCH_BY_STAFF_SUCCESS":
      return {
        ...state,
        characters: action.payload,
        loading: false,
        filter: "staff"
      }
    case "FETCH_FAVORITES_SUCCESS":
      return {
        ...state,
        favorites: action.payload,
        loading: false,
      }
    case "POST_CHARACTER_REQUESTS_SUCCESS":
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}

export default charactersReducer