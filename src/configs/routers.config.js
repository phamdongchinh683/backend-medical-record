const { Router } = require('express');
const router = Router();
const authRouters = require('../routers/auth');
const patientRoutes = require('../routers/patient');
const doctorRoutes = require('../routers/doctor');
const publicRoutes = require('../routers/public');
const API_PREFIX = '/api/v1';

const routes = [
    {
        path: `${API_PREFIX}/auth`,
        routes: authRouters
    },
    {
        path: `${API_PREFIX}/patient`,
        routes: patientRoutes
    },
    {
        path: `${API_PREFIX}/doctor`,
        routes: doctorRoutes
    },
    {
        path: `${API_PREFIX}/public`,
        routes: publicRoutes
    }
];

routes.forEach(route => {
    router.use(route.path, route.routes);
});

module.exports = router;