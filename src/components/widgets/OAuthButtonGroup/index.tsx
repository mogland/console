import { Button, ButtonGroup } from '@chakra-ui/react'
import { GitHubIcon } from '@components/universal/ProviderIcons'

const providers = [
  { name: 'GitHub', icon: <GitHubIcon boxSize="5" marginRight={"3"} /> },
]

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} width="full">
        {icon}
        Sign in with {name}
      </Button>
    ))}
  </ButtonGroup>
)