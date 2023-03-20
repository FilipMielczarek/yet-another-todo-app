import {
  Button,
  createStyles,
  Drawer,
  Group,
  Switch,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { IconMenu2 } from '@tabler/icons-react'
import { AuthContext } from 'context'
import { useContext, useState } from 'react'

const useStyles = createStyles(theme => ({
  navbar: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
}))

const Header = () => {
  const { currentUser, signOut } = useContext(AuthContext)
  const [opened, setOpened] = useState(false)

  const { classes } = useStyles()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  return (
    <Group className={classes.navbar} my={30}>
      <Title
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        ta="center"
        fz="2xl"
        fw={700}
      >
        Yet Another Todo App
      </Title>
      <Group>
        <Switch
          checked={colorScheme === 'dark'}
          onChange={() => toggleColorScheme()}
          size="lg"
          onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
          offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
        />
        <Button onClick={() => setOpened(true)}>
          <IconMenu2 />
        </Button>
      </Group>
      <Drawer opened={opened} onClose={() => setOpened(false)} title="Menu" padding="xl" size="xl">
        <h3>Welcome: {currentUser !== 'initial' && currentUser?.email}!</h3>
        <button onClick={signOut}>Sign Out</button>
      </Drawer>
    </Group>
  )
}
export default Header
