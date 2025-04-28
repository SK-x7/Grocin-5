const cron = require('node-cron');
const Order = require('../../models/orderModel'); // Adjust the path to your Order model

// Function to update orders
const updateArrivedOrders = async () => {
  const tenMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);
  const ordersToUpdate = await Order.find({
    paymentStatus: 'pending',
    orderStatus: 'arrived',
    createdAt: { $lt: tenMinutesAgo }
  });

  for (const order of ordersToUpdate) {
    order.paymentStatus = 'successful';
    order.orderStatus = 'successful';
    await order.save();
  }
  console.log(`Checked and updated ${ordersToUpdate.length} orders`);
};

// Schedule the cron job to run every minute
// cron.schedule('* * * * *', () => {
//   console.log('Running check for pending and arrived orders...');
//   updateArrivedOrders().catch(err => console.error(err));
// });
