import { createStore } from 'redux'
var index=1,states=['direction','question','answer-sheet','report']
function counter(state = 'ini val', action={
    stepShow:true,
    followMe:true,
}) {
    switch (action.type) {
        case 'INCREMENT':
            let val=states[index];
            index++
            return val
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
    // return action;
}
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter, /* preloadedState, */
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
//store.subscribe(() => {
//        console.log(store.getState())
//    }
//)
// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
//store.dispatch({type: 'INCREMENT'})
//// 1
//store.dispatch({type: 'INCREMENT'})
//// 2
//store.dispatch({type: 'DECREMENT'})
// 1
export default store