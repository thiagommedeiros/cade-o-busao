import { SAVE_SEARCH, SAVE_SHAPE, SAVE_LINES } from '../constants/actionTypes'
import { loadStoredState, updateStoredState } from '../utils'

const defaultState = {
  searches: [],
  shapes: [],
  lines: [],
  ...loadStoredState(),
}

const findByMatchingProperties = (arr, wanted) =>
	arr.filter(item =>
		Object.keys(wanted).every(key =>
			item[key] === wanted[key]
		)
  )

const storage = (state = defaultState, action = {}) => {
  if (action.type === SAVE_SEARCH) {
    const alreadyHasValue = findByMatchingProperties(state.searches, action.payload.choice)
    if (alreadyHasValue.length) return state

    const newState = Object.assign({}, state, {
      ...loadStoredState(),
      searches: [action.payload.choice].concat(state.searches)
    })
    updateStoredState(newState)
    return newState
  }

  if (action.type === SAVE_SHAPE) {
    const alreadyHasValue = findByMatchingProperties(state.shapes, action.payload)
    if (alreadyHasValue.length) return state

    const newState = Object.assign({}, state, {
      ...loadStoredState(),
      shapes: [action.payload].concat(state.shapes)
    })
    window.state = newState
    updateStoredState(newState)
    return newState
  }

  if (action.type === SAVE_LINES) {
    const alreadyHasValue = findByMatchingProperties(state.lines, action.payload)
    if (alreadyHasValue.length) return state

    const newState = Object.assign({}, state, {
      ...loadStoredState(),
      lines: [action.payload].concat(state.lines)
    })
    window.state = newState
    updateStoredState(newState)
    return newState
  }

  return state
}

export default storage
