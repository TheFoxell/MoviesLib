import { createStore } from 'redux'
import toggleFavorite from './Reducers/favoriteReducer'
import {persistCombineReducers} from 'redux-persist'
import setAvatar from './Reducers/avatarReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';


const rootPersistConfig = {
    key: 'root',
    storage : AsyncStorage
}


export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}))