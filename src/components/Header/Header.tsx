import {
  createStyles,
  Group,
  Switch,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

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
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
        offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
      />
    </Group>
  )
}
export default Header
