import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {ListScreen} from './src/ListScreen';

const App = () => {
  return (
    <Provider store={store}>
      <ListScreen />
    </Provider>
  );
};

export default App;
