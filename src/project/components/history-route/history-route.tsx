import { Router } from 'react-router-dom';
import type { BrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';

interface HistoryRouterProps {
  basename: string;
  children: React.ReactNode;
  history: BrowserHistory;
}

function HistoryRouter({ basename, children, history }: HistoryRouterProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export { HistoryRouter };
