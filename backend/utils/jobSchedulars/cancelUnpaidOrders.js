const cron = require('node-cron');
const Order = require('../../models/orderModel'); // Adjust the path to your Order model

// Function to cancel unpaid orders
const cancelUnpaidOrders = async () => {
  const tenMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
  const ordersToCancel = await Order.find({
    paymentStatus: 'pending',
    orderStatus:'idle',
    createdAt: { $lt: tenMinutesAgo }
  });

  for (const order of ordersToCancel) {
    order.paymentStatus = 'cancelled';
    order.orderStatus = 'cancelled';
    await order.save();
  }
  console.log(`Checked and cancelled ${ordersToCancel.length} orders`);
};

// Schedule the cron job to run every minute
cron.schedule('* * * * *', () => {
  console.log('Running check for unpaid orders...');
  cancelUnpaidOrders().catch(err => console.error(err));
});
