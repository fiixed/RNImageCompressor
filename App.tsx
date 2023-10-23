import {FC} from 'react';

import Home from './app/screens/Home';
import AppNavigator from './app/navigation/AppNavigator';

interface Props {
  appName: string;
}

const App: FC<Props> = (props): JSX.Element => {
  return <AppNavigator />;
};

export default App;
