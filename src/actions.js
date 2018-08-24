import fetch from 'cross-fetch'

export const actionTest = text => ({
  type: 'TEST_ACTION',
  text: text
})

export const fetchData = (a) => dispatch => {
  if (!a) return

  fetch(`http://localhost:8080/json`)
    .then(res => res.json())
    .then(data => dispatch(fetchSuccess(data)))
    .catch(error => dispatch(fetchFailure(error)))
}

export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

export const fetchSucess = response => {
  return {
    type: FETCH_SUCCESS,
    payload: response
  }
}

export const fetchFailure = error => {
  return {
    type: FETCH_FAILURE,
    payload: error
  }
}