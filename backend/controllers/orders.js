import Order from '../models/Order';

export const fetchOrders = async (ws, req) => {
	const orders = await Order.aggregate([
		{ $lookup: { 
			from: 'customers', 
			localField: 'customerId',
			foreignField: '_id',
			as: 'customers' } },
			{
				$unwind: '$customers'
			},
			{
				$lookup: {
					from: 'products', 
					localField: 'productId',
					foreignField: '_id',
					as: 'products'
				}
			},
			{
				$unwind: '$products'
			}
	]);		
  ws.send(JSON.stringify(orders));
}

export const ordersByDay = async (ws, req) => {
  const ordersStats = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
  ]);
  const dat = new Date();
  const allStats = geStatsOfMonth(dat.getMonth(), dat.getFullYear(), ordersStats);
  ws.send(JSON.stringify(allStats));
}

const geStatsOfMonth = (month, year, ordersStats) => {
  const days = (new Array(31)).fill('').map((v,i)=>new Date(year,month,i+1)).filter(v=>v.getMonth()===month);
  let stats = [];
  let pos = 0;
  days.map(d => {
    const formatted = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
    const dates = ordersStats.map(os => os._id);
    const idx = dates.indexOf(formatted);
    const count = idx > -1 ? ordersStats[idx].count : 0
    stats.splice(pos, 0, {day: formatted.slice(8, 10), count: count});
    pos++;
  });
  return stats;
} 