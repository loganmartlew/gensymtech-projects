import AppRouter from './AppRouter';
import GlobalStyles from './GlobalStyles';
import Providers from './Providers';

const App = () => {
  return (
    <Providers>
      <GlobalStyles />
      <AppRouter />
    </Providers>
  );
};

export default App;
