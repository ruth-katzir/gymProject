import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(props.open);

  const checkPurchacesByUserId = async (userId) => {
    let check = false;
    axios
      // .get(`http://localhost:3600/api/purchase${userId}`)
      .get(`http://localhost:3600/api/purchase/${userId}`)
      .then(response => {
        console.log(response.data);
        // for (const purchase of response.data) {
        //   if (purchase.numOfEnters > 0) {
        //     if(purchase.type===1){
        //       check=true
        //     }
        //     else if(check===2){

        //     }
        //     else if()
        //     // Perform actions when numOfEnters > 0
        //     console.log(check);
        //     // Add your logic here for further processing
        //   }
        for (const purchase of response.data) {
          if (purchase.numOfEnters > 0) {
            if (purchase.type === 1) {
              check = true;
            } else if (purchase.type === 2 || purchase.type === 3) {
              const startDate = new Date(purchase.startDate);
              const currentDate = new Date();

              const oneMonthPassed = (currentDate - startDate) >= 30 * 24 * 60 * 60 * 1000;
              const oneYearPassed = (currentDate - startDate) >= 365 * 24 * 60 * 60 * 1000;

              if (oneMonthPassed & purchase.type === 2) {
                // More than 1 month has passed since the startDate
                // Add your logic here for further processing
                console.log("More than 1 month has passed");
              } else if (oneYearPassed & purchase.type === 3) {
                // More than 1 year has passed since the startDate
                // Add your logic here for further processing
                console.log("More than 1 year has passed");
              } else {
                // Less than 1 month has passed since the startDate
                // Add your logic here for further processing
                check = true;
                console.log("Less than 1 month has passed");
              }
            }
          }
        }
        return check;
      }
        //remove enter
        // Finish processing the response
      )
      .catch(error => console.error(error));
  }

  // const getUserIdByImage = async (imgPath) => {
  //   axios
  //     .get(`http://localhost:3600/api/auth${imgPath}`)
  //     .then(response => {
  //       console.log(response.data);
  //       // Check if the user has a purchase
  //       console.log(await checkPurchacesByUserId(response.data));


  //       // Finish processing the response
  //     })
  //     .catch(error => console.error(error));
  // };
  const getUserIdByImage = (imgPath) => {
    axios
      .get(`http://localhost:3600/api/auth${imgPath}`)
      .then(async (response) => {
        console.log(response.data);

        // Check if the user has a purchase
        console.log(await checkPurchacesByUserId(response.data));

        // Finish processing the response
      })
      .catch(error => console.error(error));
  };



  const handleClose = () => {
    axios
      .get('http://localhost:3600/api/ai')
      .then(response => {
        console.log(response.data);
        //get the user id
        getUserIdByImage(response.data);
      })
      .catch(error => console.error("no user found!"));
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
