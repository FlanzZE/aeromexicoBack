import Axios from "axios"
const apiURL = "http://localhost:8000/api/"
export const fetchCharacters = () => async (dispatch) => {

  dispatch({ type: "FETCH_POSTS_REQUESTS" })
  try {
    const response = await Axios.get(apiURL + "characters");
    dispatch({ type: "FETCH_POSTS_SUCCESS", payload: response.data })
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error })
  }
}
export const fetchFavoriteCharacters = () => async (dispatch) => {

  dispatch({ type: "FETCH_POSTS_REQUESTS" })
  try {
    const response = await Axios.get(apiURL + "characters?favorite=true");
    dispatch({ type: "FETCH_FAVORITES_SUCCESS", payload: response.data })
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error })
  }
}
export const removeFromFavorites = (id) => async (dispatch) => {
  try {
    dispatch({ type: "REMOVE_FAVORITE_CHARACTER" })
    const response = await Axios.patch(apiURL + `characters/${id}`, { favorite: false });
    if (response) {
      dispatch(fetchCharacters())
      dispatch(fetchFavoriteCharacters())
    }
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error })
  }
}
export const addToFavorites = (id) => async (dispatch, getState) => {
  try {
    const { characters } = getState()
    if (characters.filter(e => e.favorite).length < 5) {
      dispatch({ type: "ADD_FAVORITE_CHARACTER" })
      const response = await Axios.patch(apiURL + `characters/${id}`, { favorite: true });
      if (response) {
        dispatch(fetchCharacters())
        dispatch(fetchFavoriteCharacters())
      }
    }
  } catch (error) {

  }
}

export const filterByStudent = () => async (dispatch) => {
  dispatch({ type: "FETCH_POSTS_REQUESTS" })
  try {
    const response = await Axios.get(apiURL + "characters?hogwartsStudent=true");
    dispatch({ type: "FETCH_BY_STUDENT_SUCCESS", payload: response.data })
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error })
  }
}
export const filterByStaff = () => async (dispatch) => {
  dispatch({ type: "FETCH_POSTS_REQUESTS" })
  try {
    const response = await Axios.get(apiURL + "characters?hogwartsStaff=true");
    // const newData = response.data.map((e, id) => {
    //   return { ...e, id: id + 1, favorite: false }
    // });

    dispatch({ type: "FETCH_BY_STAFF_SUCCESS", payload: response.data })
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error })
  }
}
export const postNewCharacter = (data) => async (dispatch) => {
  dispatch({ type: "FETCH_POSTS_REQUESTS" })
  try {
    const response = await Axios.post(apiURL + "characters", data);
    dispatch({ type: "POST_CHARACTER_REQUESTS_SUCCESS", payload: response.data })
    if (response) {
      dispatch(fetchCharacters())
      dispatch(fetchFavoriteCharacters())
    }
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error })
  }
}

// const promise = Axios.get(
//   apiURL+"characters"
// )

// return {
//   type: "FETCH_POSTS",
//   payload: promise
// }