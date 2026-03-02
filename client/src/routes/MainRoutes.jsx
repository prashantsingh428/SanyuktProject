import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home.jsx'
import Registation from '../pages/Registation.jsx'
import Login from '../pages/Login.jsx'
import ContactUs from '../pages/ContactUs.jsx'
import AboutUs from '../pages/AboutUs.jsx'
import Legal from '../pages/Legal.jsx'
import Grievance from '../pages/Grievance.jsx'
import Product from '../pages/Product.jsx'
import Recharge from '../pages/Recharge.jsx'
import MyAccount from '../pages/MyAccount.jsx'

import Opportunities from '../pages/Opportunities.jsx'
import ExchangePolicy from '../footerPages/ExchangePolicy.jsx'
import MarketingSalesPolicy from '../footerPages/MarketingSalesPolicy.jsx'
import PaymentPolicy from '../footerPages/PaymentPolicy.jsx'
import PrivacyPolicy from '../footerPages/PrivacyPolicy.jsx'
import TermsConditions from '../footerPages/TermsConditions.jsx'
import RefundCancellationPolicy from '../footerPages/RefundCancellationPolicy.jsx'
import ShipmentDeliveryPolicy from '../footerPages/ShipmentDeliveryPolicy.jsx'
import OrderPolicy from '../footerPages/OrderPolicy.jsx'
import TestimonialPolicy from '../footerPages/TestimonialPolicy.jsx'
import OurBanker from '../footerPages/OurBanker.jsx'
import VerifyOTP from '../pages/VerifyOTP.jsx'
import Checkout from '../pages/Checkout.jsx'
import Franchise from '../pages/Franchise.jsx'

// ✅ Admin imports
import AdminLayout from '../layouts/AdminLayout'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminUsers from '../pages/admin/Users'
import AdminProducts from '../pages/admin/Products'
import AdminFranchise from '../pages/admin/Franchise.jsx'
import AdminRoute from '../routes/AdminRoutes.jsx'

const MainRoutes = () => {
    return (
        <Routes>

            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Registation />} />
            <Route path='/login' element={<Login />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/company/about' element={<AboutUs />} />
            <Route path='/company/legal' element={<Legal />} />
            <Route path='/grievance' element={<Grievance />} />
            <Route path='/products' element={<Product />} />
            <Route path='/recharge' element={<Recharge />} />
            <Route path='/opportunities' element={<Opportunities />} />
            <Route path='/exchange-policy' element={<ExchangePolicy />} />
            <Route path='/marketing-sales-policy' element={<MarketingSalesPolicy />} />
            <Route path='/payment-policy' element={<PaymentPolicy />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-conditions' element={<TermsConditions />} />
            <Route path='/cancellation-policy' element={<RefundCancellationPolicy />} />
            <Route path='/shipment-delivery-policy' element={<ShipmentDeliveryPolicy />} />
            <Route path='/order-policy' element={<OrderPolicy />} />
            <Route path='/testimonial-policy' element={<TestimonialPolicy />} />
            <Route path='/banker' element={<OurBanker />} />
            <Route path='/verify-otp' element={<VerifyOTP />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/franchise/list' element={<Franchise />} />
            <Route path='/my-account' element={<MyAccount />} />

            {/* 🔥 Admin Routes (Nested) */}
            <Route path="/admin" element={
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            }>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="franchise" element={<AdminFranchise />} />
            </Route>

        </Routes>
    )
}

export default MainRoutes