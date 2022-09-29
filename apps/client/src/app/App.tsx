import AppRouter from './AppRouter';
import Providers from './Providers';

const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};

export default App;
