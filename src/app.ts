import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import { CouponRoutes } from './app/modules/coupon/coupon.route';
import { OrderRoutes } from './app/modules/order/order.route';
import { ProductRoutes } from './app/modules/product/product.route';
import { UserRoutes } from './app/modules/User/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/coupon', CouponRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server Running');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
