import {FC} from 'react';

import Home from './app/screens/Home';

interface Props {
  appName: string;
}

const App: FC<Props> = (props): JSX.Element => {
  return <Home />;
};

export default App;
