import { BrowserRouter, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ChatPage } from './pages/ChatPage';
import { NotFoundPage } from './pages/NotFoundPage';

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
        <Route component={NotFoundPage} />
      </BrowserRouter>
    </>
  );
};
