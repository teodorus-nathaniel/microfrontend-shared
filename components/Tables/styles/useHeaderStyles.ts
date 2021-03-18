import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import vars from '../vars'

const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: ({ altHeaderColor }: any) =>
        altHeaderColor
          ? theme.palette.background.paper
          : theme.palette.primary.main,
    },
    block: {
      display: 'block',
      width: '100%',
    },
    checkbox: {
      color: ({ altHeaderColor }: any) =>
        altHeaderColor ? 'initial' : `${theme.palette.common.white} !important`,
      padding: 0,
    },
    cellAfterCheckbox: {
      paddingLeft: vars.cellAfterCheckboxLeftPadding,
    },
    firstCell: {
      paddingLeft: theme.spacing(3),
    },
    checkboxCell: {
      padding: 0,
      textAlign: 'center',
      verticalAlign: 'center',
      minWidth: vars.checkboxWidth,
      maxWidth: vars.checkboxWidth,
      width: vars.checkboxWidth,
    },
    headContent: {
      color: theme.palette.common.white,
      fontWeight: 'bold',
      paddingTop: theme.spacing(1.25),
      paddingBottom: theme.spacing(1.25),
      position: 'relative',
      '& span:hover, & .MuiTableSortLabel-active, & .MuiTableSortLabel-active > svg': {
        color: 'inherit !important',
        filter: 'brightness(0.8)',
      },
      '&:last-child::after': {
        display: 'none',
      },
      '& > div': {
        justifyContent: 'flex-start',
      },
    },
    altHeader: {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.background.paper,
      '& > span:hover, & > .MuiTableSortLabel-active, & > .MuiTableSortLabel-active > svg': {
        color: 'rgba(0, 0, 0, 0.54)',
        filter: 'brightness(1)',
      },
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
)
export default useHeaderStyles
