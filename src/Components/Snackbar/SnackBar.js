import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

class SnackBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            setOpen: false
        }
    }
    handleClick = () => {
        this.setState({open: true})
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({open: false})
    };

    render() {
        const {open} = this.state
        return (
            <div>
                <Snackbar
                    style={{marginTop:"56px"}}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                    // message={this.props.message}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </React.Fragment>
                    }
                >
                    <MuiAlert elevation={4} variant="filled" onClose={this.handleClose} severity={(this.props.messageType === "SUCCESS")? "success":"error"} >{this.props.message}</MuiAlert>
                </Snackbar>
            </div>);
    }
}

export default SnackBar;

