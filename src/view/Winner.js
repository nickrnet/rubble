import React from 'react';

import { Dialog, DialogTitle, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Winner ({ gameOver, winner }) {

    return (
        <div>
        <Dialog
            open={gameOver}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{`${winner} won!`}</DialogTitle>
        </Dialog>
        </div>
    );
}
