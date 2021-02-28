import { Routes } from './routes';
import { UserContextProvider } from './context/UserContext';
import { ErrorModal } from './containers/ErrorModal';

function App() {
  return (
    <UserContextProvider>
      <ErrorModal />
      <Routes />
    </UserContextProvider>
  );
}

export default App;
