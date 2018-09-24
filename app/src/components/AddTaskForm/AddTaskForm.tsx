import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import FormControl from '@material-ui/core/FormControl/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup/FormGroup'
import FormLabel from '@material-ui/core/FormLabel/FormLabel'
import Grid from '@material-ui/core/Grid/Grid'
import Popper from '@material-ui/core/Popper/Popper'
import TextField from '@material-ui/core/TextField/TextField'
import { deburr } from 'lodash'
import * as React from 'react'
import { User } from '../../model/User'
import MentionFieldController, {
  CaretPosition,
} from '../MentionFieldController/MentionFieldController'
import RemovableUserAvatar from '../RemovableUserAvatar/RemovableUserAvatar'
import SelectUserMenu from '../SelectUserMenu/SelectUserMenu'

export interface Task {
  title: string
  assignedTo: User[]
}

interface AddTaskFormProps extends WithStyles<typeof styles> {
  users: User[]
  onTaskCreated: (task: Task) => void
}

class AddTaskForm extends React.Component<AddTaskFormProps> {
  inputRef = React.createRef<HTMLInputElement>()

  searchUsers(rawSearch: string) {
    const search = deburr(rawSearch.trim()).toLowerCase()
    const searchLength = search.length
    let count = 0

    return searchLength === 0
      ? []
      : this.props.users.filter(user => {
          const ok = count < 7 && user.name.toLowerCase().includes(search)

          if (ok) count++

          return ok
        })
  }

  popperAnchor(menuPosition: CaretPosition) {
    const input = this.inputRef.current
    if (!input) return null

    const inputRect = input.getBoundingClientRect()

    return {
      getBoundingClientRect: () => ({
        top: inputRect.top + menuPosition.top - input.scrollTop,
        right: inputRect.left + menuPosition.left + 1 - input.scrollLeft,
        bottom:
          inputRect.top +
          menuPosition.top +
          menuPosition.height -
          input.scrollTop,
        left: inputRect.left + menuPosition.left - input.scrollLeft,
        width: 1,
        height: menuPosition.height,
      }),
      clientWidth: 1,
      clientHeight: menuPosition.height,
    }
  }

  render() {
    const { classes } = this.props

    return (
      <MentionFieldController<User>
        itemToString={user => (user ? user.name : 'empty')}
      >
        {({
          getRootProps,
          getInputProps,
          getLabelProps,
          inputValue,
          mentionSearch,
          selectedItems,
          removeItem,
          isOpen,
          getMenuProps,
          highlightedIndex,
          getItemProps,
          menuPosition,
          reset,
        }) => (
          <form
            className={classes.root}
            onSubmit={ev => {
              ev.preventDefault()

              reset()

              this.props.onTaskCreated({
                title: inputValue!,
                assignedTo: selectedItems,
              })
            }}
          >
            <Grid
              direction="column"
              container={true}
              justify="center"
              alignItems="center"
            >
              <Grid item={true} container={true} xs={12} alignItems="center">
                <Grid item={true} xs={true} className={classes.addTaskWrap}>
                  <TextField
                    label="Add task"
                    fullWidth={true}
                    autoFocus={true}
                    inputProps={getInputProps()}
                    InputLabelProps={getLabelProps()}
                    inputRef={this.inputRef}
                  />
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!inputValue}
                >
                  Add
                </Button>
              </Grid>

              <Grid item={true} container={true} xs={12} alignItems="center"  className={classes.secondRow}>
                <Grid item={true} xs={3}  >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Notify via</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        control={<Checkbox defaultChecked={true} value="sms" />}
                        label="SMS"
                      />
                      <FormControlLabel
                        control={<Checkbox value="email" />}
                        label="Email"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

                <Grid
                  item={true}
                  xs={true}
                  container={true}
                  justify="flex-end"
                >
                  {selectedItems.map(user => (
                    <RemovableUserAvatar
                      key={user.name}
                      userName={user.name}
                      onRemove={() => removeItem(user)}
                    />
                  ))}
                </Grid>
              </Grid>

              <Popper
                open={isOpen}
                placement="bottom-start"
                modifiers={{
                  offset: { offset: '10, 10' },
                }}
                anchorEl={this.popperAnchor(menuPosition)}
                keepMounted={true}
              >
                <div {...getMenuProps()}>
                  <SelectUserMenu
                    userItems={this.searchUsers(mentionSearch).map(
                      (user, i) => ({
                        ...getItemProps({ item: user }),
                        user,
                        selected: selectedItems.includes(user),
                        highlighted: highlightedIndex === i,
                      }),
                    )}
                  />
                </div>
              </Popper>
            </Grid>
          </form>
        )}
      </MentionFieldController>
    )
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    addTaskWrap: {
      paddingRight: theme.spacing.unit * 2,
    },
    secondRow: {
      padding: `${theme.spacing.unit * 2}px 0`,
    },
  })

export default withStyles(styles)(AddTaskForm)
