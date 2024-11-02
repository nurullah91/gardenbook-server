export const emailTemplate = `<div>
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
    </div></div>`;
