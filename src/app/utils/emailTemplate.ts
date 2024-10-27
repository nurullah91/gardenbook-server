export const emailTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9fafb;
        color: #333;
      }
      a {
        text-decoration: none;
      }
      .container {
        width: 90%;
        padding: 20px;
        margin: 20px auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .content {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        line-height: 1.6;
      }
      .header {
        font-size: 28px;
        font-weight: bold;
        color: #2967a7;
        margin-bottom: 20px;
      }
      .greeting {
        font-size: 18px;
        font-weight: bold;
      }
      p {
        font-size: 16px;
        margin-bottom: 20px;
        color: #555;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff !important;
        background-color: #2967a7;
        text-decoration: none;
        border-radius: 8px;
        transition: background-color 0.3s ease;
      }
      .button:hover {
        background-color: #1e4e82;
      }
      .footer {
        margin-top: 40px;
        font-size: 14px;
        color: #aaa;
      }
      .website {
        cursor: pointer;
        text-decoration: underline;
        color: #1a2235 !important;
      }

      @media (max-width: 768px) {
        .content {
          padding: 20px;
        }
        .header {
          font-size: 24px;
        }
        .button {
          padding: 10px 20px;
        }
      }

      @media (max-width: 480px) {
        .content {
          padding: 15px;
        }
        .header {
          font-size: 22px;
        }
        p {
          font-size: 14px;
        }
        .button {
          padding: 10px 18px;
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <div class="header">Reset Your Password at Gardenbook</div>
        <p class="greeting">Hello, {{userName}},</p>
        <p>
          You requested to reset your password for your Gardenbook account.
          Click the button below within 10 minutes to reset it.
        </p>
        <a href="{{reset_link}}" class="button">Reset Password</a>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <div class="footer">
          &copy; 2024
          <span class="website"
            ><a href="https://gardenbook-client.vercel.app/"
              >Gardenbook</a
            ></span
          >. All rights reserved.
        </div>
      </div>
    </div>
  </body>
</html>
`;
