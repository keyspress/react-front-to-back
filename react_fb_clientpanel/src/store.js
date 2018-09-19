import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Reducers
import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyCINtSYD2H5YwcRVPXV3x5_hODQuD1Sq4U',
  authDomain: 'key-reactclientpanel.firebaseapp.com',
  databaseURL: 'https://key-reactclientpanel.firebaseio.com',
  projectId: 'key-reactclientpanel',
  storageBucket: 'key-reactclientpanel.appspot.com',
  messagingSenderId: '372479553418'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: true
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

const initialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
