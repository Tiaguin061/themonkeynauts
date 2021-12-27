import { useEffect } from 'react';

import { Loading } from './components';

import { AuthProvider } from './contexts';
import { useBoolean } from './hooks';

import { AppRoutes } from './routes';

import { 
  GlobalStyle, 
  AppContainer 
} from './styles/global';

export function App() {
  const loadingPage = useBoolean(true);

  useEffect(() => {
    window.addEventListener('load', (event) => {
      if(event) {
        loadingPage.changeToFalse();
      }
    })
  }, [loadingPage]);

  return (
    <AuthProvider>
      <AppContainer isLoading={loadingPage.state}>
        {loadingPage.state ? <Loading size={7.2} /> : <AppRoutes />}
        <GlobalStyle />
      </AppContainer>
    </AuthProvider>
  );
}
