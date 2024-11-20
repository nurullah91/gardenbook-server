import cron from 'node-cron';
import { User } from '../modules/user/user.model';

const checkPlanValidity = async () => {
  try {
    const now = new Date();

    // Find and update all users with an expired plan validity in a single query
    const result = await User.updateMany(
      { plan: 'premium', planValidity: { $lte: now } },
      { $set: { plan: 'basic' } },
    );

    if (result.modifiedCount > 0) {
      console.log(
        `Downgraded ${result.modifiedCount} users to the basic plan.`,
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

// Code For make query in Database
// cron.schedule('* * * * *', checkPlanValidity);

// try {
//   // Fetch all users who have a planValidity field that needs updating
//   const users = await User.find({ planValidity: { $exists: true } });

//   for (const user of users) {
//     console.log(
//       `Before Update - User ID: ${user._id}, planValidity: ${user.planValidity},  planValidity Type: ${typeof user.planValidity}`,
//     );

//     user.planValidity = new Date();
//     await user.save(); // Save the updated user
//     console.log(
//       `After Update - User ID: ${user._id}, planValidity: ${user.planValidity},  planValidity Type: ${typeof user.planValidity}`,
//     );
//   }

//   console.log(`Migration complete. Updated ${users.length} users.`);
// } catch (error) {
//   console.error('Error during migration:', error);
// }
