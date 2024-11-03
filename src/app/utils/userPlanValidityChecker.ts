import cron from 'node-cron';
import { User } from '../modules/user/user.model';

const checkPlanValidity = async () => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // One day before

    // Find users with expired plan validity
    const planExpiredUsers = await User.find({
      planValidity: { $lte: oneDayAgo },
    });

    if (planExpiredUsers.length > 0) {
      console.log(`Found ${planExpiredUsers.length} users with expired plans.`);

      // Update expired users' plans to 'basic'
      await Promise.all(
        planExpiredUsers.map(async (user) => {
          user.plan = 'basic';
          await user.save();
        }),
      );
    } else {
      console.log('No users with expired plans found.');
    }
  } catch (error) {
    console.error('Error checking plan validity:', error);
  }
};

// Schedule the function to run daily at midnight (00:00)
cron.schedule('0 0 * * *', checkPlanValidity);
