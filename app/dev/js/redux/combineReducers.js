/**
 * A highly boiled down version of the official `combineReducers()` function
 * that ships with Redux. 
 *
 * All the sanity checking & warnings have been stripped out, allowing us to use 
 * combineReducers on just a subset of the reducers at a given level in the state 
 * tree without getting a warning. For example, the following would trigger a 
 * warning in the official Redux version:
 *
 *     state shape: {reducer1: ..., reducer2: ... reducer3: ...}
 *     combineReducers(reducer1, reducer2)
 */

function combineReducers(reducers) {
  let reducerKeys = Object.keys(reducers)

  return function combination(state = {}, action) {
    let nextState = {}

    for (var i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i],
          reducer = reducers[key],
          previousStateForKey = state[key]

      nextState[key] = reducer(previousStateForKey, action)
    }
    return nextState
  }
}

export default combineReducers