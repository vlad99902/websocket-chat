import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route path="/" exact component={AuthPage} />
          <Route path="/chat/:room" exact component={ChatPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
