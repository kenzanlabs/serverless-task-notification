import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import Paper from '@material-ui/core/Paper/Paper'
import * as React from 'react'
import { LiHTMLAttributes } from 'react'
import { User } from '../service/model/User'

interface UserMenuItem extends LiHTMLAttributes<HTMLElement> {
  user: User
  selected: boolean
  highlighted: boolean
}

interface SelectUserMenuProps {
  userItems: UserMenuItem[]
}

class SelectUserMenu extends React.Component<SelectUserMenuProps> {
  render() {
    const { userItems } = this.props

    return (
      <Paper square={true}>
        {userItems.map(({ user, selected, highlighted, ...itemProps }) => (
          <MenuItem
            {...itemProps}
            key={user.name}
            selected={highlighted}
            component="div"
            style={{
              fontWeight: selected ? 500 : 400,
            }}
          >
            {user.name}
          </MenuItem>
        ))}
      </Paper>
    )
  }
}

export default SelectUserMenu
