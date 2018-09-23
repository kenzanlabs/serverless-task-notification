import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import * as React from 'react'
import { SFC } from 'react'
import UserAvatar from '../UserAvatar/UserAvatar'

interface RemovableUserAvatarProps extends WithStyles<typeof styles> {
  userName: string
  onRemove: () => void
}

const RemovableUserAvatar: SFC<RemovableUserAvatarProps> = ({
  classes,
  userName,
  onRemove,
}) => (
  <UserAvatar userName={userName} onClick={onRemove} className={classes.root} />
)

const styles = (theme: Theme) =>
  createStyles({
    root: {
      background: 'blue',
      cursor: 'pointer',

      '&:hover': {
        background: 'red',
      },
    },
  })

export default withStyles(styles)(RemovableUserAvatar)
