import combineReducers from 'react-combine-reducers';
import {srpReducer} from './srpReducer'
import {srpInitalState} from '@/store/App/srpStore'
export const [reducerCombined, initialStateCombined] = combineReducers({
    srpReducer : [srpReducer , srpInitalState]
})