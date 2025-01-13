import '@mantine/core/styles.css';
import { AppShell, MantineProvider } from '@mantine/core';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell header={{ height: 60 }} padding="md" >
        <AppShell.Header>
          < Header />
        </AppShell.Header>
        <AppShell.Main style={{ backgroundColor: '#ececec'}}>
          <Main />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
