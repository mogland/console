import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({ 
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.50', 'gray.900')(props),
      }
    })
  },
 })

export default theme
