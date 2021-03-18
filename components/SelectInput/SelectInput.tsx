import React, { ReactElement } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  dense: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: theme.typography.subtitle2.fontSize,
  },
  disabled: {
    backgroundColor: theme.palette.grey[200],
  },
  container: {
    position: 'relative',
  },
  placeholder: {
    position: 'absolute',
    color: theme.palette.grey[300],
    top: '18px',
    left: '14px',
    transform: 'translateY(-50%)',
  },
}))

export interface Option {
  value: string | number
  text?: string | number | JSX.Element
  disabled?: boolean
}

interface Props {
  value?: string | number
  className?: string
  label?: string
  options: Option[]
  loading?: boolean
  error?: boolean
  fullWidth?: boolean
  disabled?: boolean
  helperText?: string
  placeholder?: string
  noEmptyOption?: boolean
  minWidth?: string
  dense?: boolean
  id?: string
  onChange?: (e: any) => void
  onBlur?: () => void
}

export default function SelectInput({
  className,
  label,
  options,
  placeholder,
  value,
  onChange,
  loading,
  error,
  id: propsId,
  minWidth,
  noEmptyOption,
  helperText,
  fullWidth,
  disabled,
  dense,
  onBlur,
}: Props): ReactElement {
  const id = propsId ?? (label && `select-${label.replace(/\s/g, '')}`)

  const classes = useStyles()

  const displayedOptions = noEmptyOption
    ? options
    : [{ value: '', disabled: true, text: 'None' }, ...options]

  return (
    <FormControl
      error={error}
      variant='outlined'
      className={`${className || ''} ${classes.container}`}
      size='small'
      style={{
        minWidth: minWidth || 'auto',
      }}
      fullWidth={fullWidth}
      disabled={disabled}>
      {label && <InputLabel id={id}>{label}</InputLabel>}
      {!value && placeholder && (
        <Typography className={classes.placeholder}>{placeholder}</Typography>
      )}
      <Select
        fullWidth={fullWidth}
        onBlur={onBlur}
        labelId={id}
        label={label}
        MenuProps={{
          disableScrollLock: true,
        }}
        value={value || ''}
        placeholder={placeholder}
        onChange={onChange}
        className={disabled ? classes.disabled : ''}
        inputProps={{ className: dense ? classes.dense : '' }}>
        {loading ? (
          <MenuItem value='' disabled>
            <em>Loading...</em>
          </MenuItem>
        ) : (
          displayedOptions.map(({ text, value, disabled }) => {
            return (
              <MenuItem value={value} key={value} disabled={disabled}>
                {disabled ? <em>{text || value}</em> : text || value}
              </MenuItem>
            )
          })
        )}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}
