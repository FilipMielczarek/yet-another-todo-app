import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import { AuthRoute } from 'components'
import { Authentication, Homepage, NotFound } from 'pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ colorScheme, fontFamily: 'Open Sans' }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthRoute>
                    <Homepage />
                  </AuthRoute>
                }
              />
              <Route path="/login" element={<Authentication />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
export default App
