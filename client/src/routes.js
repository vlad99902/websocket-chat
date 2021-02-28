import { BrowserRouter, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ChatPage } from './pages/ChatPage';

/**
 * Component to set app routes
 * - /
 * - /chat
 */

export const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={AuthPage} />
        <Route path="/chat/:room" component={ChatPage} />
      </BrowserRouter>
    </>
  );
};
