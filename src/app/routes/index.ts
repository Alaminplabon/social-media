import { Router } from 'express';
import { otpRoutes } from '../modules/otp/otp.routes';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { notificationRoutes } from '../modules/notification/notificaiton.route';
import { wishlistRoutes } from '../modules/wishlist/wishlist.route';
import { packagesRoutes } from '../modules/packages/packages.route';
import { subscriptionRoutes } from '../modules/subscription/subscription.route';
import { paymentsRoutes } from '../modules/payments/payments.route';
import { postRoutes } from '../modules/post/post.route';
import { networkRoutes } from '../modules/network/network.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/otp',
    route: otpRoutes,
  },
  {
    path: '/notifications',
    route: notificationRoutes,
  },
  {
    path: '/wishlist',
    route: wishlistRoutes,
  },
  {
    path: '/packages',
    route: packagesRoutes,
  },
  {
    path: '/subscriptions',
    route: subscriptionRoutes,
  },
  {
    path: '/payments',
    route: paymentsRoutes,
  },
  {
    path: '/post',
    route: postRoutes,
  },
  {
    path: '/network',
    route: networkRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
