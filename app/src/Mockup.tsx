import Avatar from '@material-ui/core/Avatar/Avatar'
import Button from '@material-ui/core/Button/Button'
import { deepOrange, lightGreen } from '@material-ui/core/colors'
import Divider from '@material-ui/core/Divider/Divider'
import Grid from '@material-ui/core/Grid/Grid'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import Paper from '@material-ui/core/Paper/Paper'
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField/TextField'
import * as React from 'react'
import { SFC } from 'react'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      maxWidth: 760,
      minHeight: '100%',
      flex: 1,
      [theme.breakpoints.up('md')]: {
        padding: `${theme.spacing.unit * 5}px 0`,
      },
    },
    addTaskWrap: {
      paddingRight: theme.spacing.unit * 2,
    },
    userListRoot: {
      padding: `${theme.spacing.unit * 2}px 0`,
    },
    taskListRoot: {
      flex: 1,
    },
    orangeAvatar: {
      marginLeft: '8px',
      color: '#fff',
      backgroundColor: lightGreen[500],
    },
    purpleAvatar: {
      marginLeft: '8px',
      color: '#fff',
      backgroundColor: deepOrange[500],
    },
  })

interface MockupProps extends WithStyles<typeof styles> {}

const Mockup: SFC<MockupProps> = ({ classes }) => {
  return (
    <Grid
      direction="column"
      container={true}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item={true} container={true} xs={12} alignItems="center">
        <Grid item={true} xs={true} className={classes.addTaskWrap}>
          <TextField
            label="Add task"
            fullWidth={true}
            defaultValue="Buy groceries at a later point in time @"
            autoFocus={true}
          />
        </Grid>
        <Button variant="contained" color="primary" size="large">
          Send
        </Button>
      </Grid>

      <Grid
        item={true}
        container={true}
        xs={12}
        justify="flex-end"
        className={classes.userListRoot}
      >
        <Avatar className={classes.orangeAvatar}>LH</Avatar>
        <Avatar className={classes.purpleAvatar}>B</Avatar>
      </Grid>

      <Grid item={true} container={true} xs={true} direction="column">
        <Paper className={classes.taskListRoot}>
          <List component="nav">
            <ListItem>
              <ListItemText>Fix codegen issues</ListItemText>
              <Avatar className={classes.orangeAvatar}>LH</Avatar>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>Make me sandwich</ListItemText>
              <Avatar className={classes.purpleAvatar}>B</Avatar>
              <Avatar className={classes.orangeAvatar}>LH</Avatar>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>Lorem ipsum Dolor sit amet</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>Make me another sandwich</ListItemText>
              <Avatar className={classes.purpleAvatar}>B</Avatar>
            </ListItem>
            <Divider />
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Mockup)
