import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Reorder, { reorder } from 'react-reorder';

export default ({ currentVideoId, list, changeVideoId, removeVideoId, onReorder }) => {
  return (
    <div>
      <h2>PLAYLIST</h2>
      {list.length > 0 ? '' : 'No items here...'}
      <Reorder
        reorderId="my-list"
        reorderGroup="reorder-group"
        component={List}
        // lock="horizontal"
        // holdTime={500}
        // touchHoldTime={500}
        // mouseHoldTime={200}
        autoScroll={true}
        disabled={false}
        disableContextMenus={true}
        onReorder={(e, prev, next) => onReorder({ prev, next })}
        // placeholder={
        //   <div className="custom-placeholder" />
        // }
      >
        {
          list.map((item, index) => (
            <ListItem key={item + index}>
                <Button onClick={() => changeVideoId(item)} fullWidth color={currentVideoId === item ? 'primary' : ''}>
                  {item}
                </Button>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => removeVideoId(item)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
          ))
        }
      </Reorder>
      {/* <List dense={false}>
        {
          list.map((item, index) =>
            (
              <ListItem key={item + index}>
                <Button onClick={() => changeVideoId(item)} fullWidth color={currentVideoId === item ? 'primary' : ''}>
                  {item}
                </Button>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => removeVideoId(item)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          )
        }
      </List> */}
    </div>
  )
}