import React, { ReactElement } from 'react'
import { Box, BoxProps, Container } from '@material-ui/core'

interface Props extends BoxProps {
  children: any
}

export default function FullContentContainer({
  children,
  ...boxProps
}: Props): ReactElement {
  return (
    <Box
      py={3}
      position='absolute'
      px={3}
      top={0}
      left={0}
      width='100%'
      height='100%'
      {...boxProps}>
      <Box height='100%' clone>
        <Container>
          <Box display='flex' flexDirection='column' height='100%'>
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

// export default function FullContentContainer({
//   children,
//   ...boxProps
// }: Props): ReactElement {
//   return (
//     <Box
//       py={3}
//       position="absolute"
//       px={3}
//       top={0}
//       left={0}
//       width="100%"
//       height={`calc(100vh - ${stylesVariables.navbarHeight})`}
//       display="flex"
//       flexDirection="column"
//       {...boxProps}>
//       {children}
//     </Box>
//   );
// }
