export const messageTemplate = (status: string) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Status</title>
    <style>
        body {
         margin: 0; padding: 0; font-family: Arial, sans-serif; background: #f4f4f9; height: 100vh; display: flex; justify-content: center; align-items: center;
        }
        .container {
            background-color: white; 
            padding: 50px;
            margin: auto 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
            text-align: center;
            max-width: 500px; 
            width: 100%;
        }
        .success {
            background-color: #4eff054d;
        }
        .failed {
            background-color: #FFBABA;
        }
        .success h1 {
            color: #4F8A10;
        }
        .failed h1 {
            color: #D8000C;
        }
        a {
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            display: inline-block;
            margin-top: 20px;
        }
        .success a {
            background-color: #4CAF50;
        }
        .failed a {
            background-color: #F44336;
        }
    </style>
</head>
<body>
    <div class="container ${status}">
        ${
          status === 'success'
            ? `
            <h1>Payment Successful!</h1>
            <p>Your transaction was completed successfully.</p>
            <a href="https://meeting-spot.netlify.app/my-bookings">Go to My Bookings</a>
        `
            : `
            <h1>Payment Failed!</h1>
            <p>Unfortunately, your payment could not be processed.</p>
            <a href="https://meeting-spot.netlify.app/rooms">Try Again</a>
        `
        }
    </div>
</body>
</html>
`;
  return html;
};
