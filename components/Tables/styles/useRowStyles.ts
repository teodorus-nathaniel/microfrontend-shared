import { makeStyles, Theme } from '@material-ui/core'
import vars from '../vars'

const useRowStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  cell: {
    position: 'relative',
    fontWeight: 'inherit',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  checkboxCell: {
    padding: 0,
    textAlign: 'center',
    verticalAlign: 'center',
    minWidth: vars.checkboxWidth,
    width: vars.checkboxWidth,
  },
  checkedCell: {
    backgroundColor: theme.palette.action.hover,
  },
  pointer: {
    cursor: 'pointer',
  },
  openRow: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, .1)',
  },
  additionalRow: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  additionalRowOpen: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
  },
  button: {
    borderRadius: '50%',
    border: `1px solid currentColor`,
    boxShadow: theme.shadows[1],
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  listIcon: {
    fontSize: '1.2rem !important',
  },
  icon: {
    padding: 0,
  },
  error: {
    background: theme.palette.error.light,
  },
  checkbox: {
    padding: 0,
  },
  cellAfterCheckbox: {
    paddingLeft: vars.cellAfterCheckboxLeftPadding,
  },
  firstCell: {
    paddingLeft: theme.spacing(3),
  },
  center: {
    verticalAlign: 'middle',
  },
  top: {
    verticalAlign: 'top',
  },
  bottom: {
    verticalAlign: 'bottom',
  },
}))
export default useRowStyles
