import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

export default function createTheme(themeData: any) {
  let theme = createMuiTheme(themeData)
  theme = responsiveFontSizes(theme)
  return theme
}
