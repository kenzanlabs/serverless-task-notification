import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import Avatar, { AvatarProps } from '@material-ui/core/Avatar/Avatar'
import cx from 'classnames'
import * as React from 'react'
import { SFC } from 'react'

type UserAvatarProps = AvatarProps &
  WithStyles<typeof styles> & { userName: string }

const UserAvatar: SFC<UserAvatarProps> = ({
  classes,
  userName,
  ...other
}) => (
  <Avatar {...other} className={cx(classes.root, other.className)}>
    {userName
      .split(' ')
      .map(
        (namePart, i, parts) =>
          i === 0 || i === parts.length - 1 ? namePart.charAt(0) : null,
      )
      .join('')}
  </Avatar>
)

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginLeft: '8px',
      color: '#fff',
    },
  })

export default withStyles(styles)(UserAvatar)
