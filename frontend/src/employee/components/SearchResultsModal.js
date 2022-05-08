import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchResultsModal({
  modalVisible,
  onHide,
  data,
  onClick,
}) {
  const RenderItem = (item, key) => {
    return (
      <div onClick={() => onClick(item)}>
        <ListItem button>
          <ListItemText primary={item.fullName} />
        </ListItem>
      </div>
    );
  };

  const handleClose = () => {
    onHide();
  };

  return (
    <Dialog
      open={modalVisible}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {"Search Results"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {data.length > 0
            ? `${data.length} result(s) found`
            : "Nothing to display"}
          <br />
          <List component="nav" aria-label="search results">
            {data.map((item, key) => {
              return RenderItem(item, key);
            })}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
