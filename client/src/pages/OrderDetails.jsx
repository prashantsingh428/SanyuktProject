import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard, IndianRupee, ShieldCheck } from 'lucide-react';
import api from '../api';
import { Box, Typography, Button, Paper, Stepper, Step, StepLabel, StepContent, Divider, Chip } from '@mui/material';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await api.get(`/orders/${id}`);
                setOrder(res.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);

    if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading Order Details...</Box>;
    if (!order) return <Box sx={{ p: 4, textAlign: 'center' }}>Order Not Found</Box>;

    const steps = order.tracking || [];
    const activeStep = steps.length - 1;

    const getPaymentLabel = (method) => {
        const labels = {
            cod: 'Cash on Delivery',
            upi: 'UPI Payment',
            card: 'Card Payment',
            online: 'Online Payment'
        };
        return labels[method] || method.toUpperCase();
    };

    return (
        <Box sx={{ maxWidth: '1000px', mx: 'auto', p: { xs: 2, md: 4 }, minHeight: '80vh' }}>
            <Button
                startIcon={<ChevronLeft />}
                onClick={() => navigate('/my-account/orders')}
                sx={{ mb: 3, color: '#666', '&:hover': { color: '#0A7A2F' } }}
            >
                Back to My Orders
            </Button>

            <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #eee', bgcolor: '#fff' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                    <Box>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Order Details
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Order ID: <span className="font-bold text-gray-800">#{order._id.slice(-8).toUpperCase()}</span>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Placed on: {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Chip
                        label={order.status.replace('_', ' ').toUpperCase()}
                        color="success"
                        sx={{ fontWeight: 800, borderRadius: '8px', px: 1 }}
                    />
                </Box>

                <Divider sx={{ mb: 4 }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side: Tracking Timeline */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Truck size={20} className="text-green-600" />
                            Delivery Status
                        </Typography>

                        <Stepper activeStep={activeStep} orientation="vertical" sx={{
                            '& .MuiStepConnector-line': { minHeight: '40px', borderColor: '#eee' },
                            '& .MuiStepIcon-root.Mui-active': { color: '#0A7A2F' },
                            '& .MuiStepIcon-root.Mui-completed': { color: '#0A7A2F' }
                        }}>
                            {steps.length > 0 ? steps.map((step, index) => (
                                <Step key={index} active={true}>
                                    <StepLabel icon={index === activeStep ? <Package size={20} /> : <CheckCircle size={18} />}>
                                        <Typography variant="body1" fontWeight={index === activeStep ? 'bold' : 'medium'}>
                                            {step.status.replace('_', ' ').toUpperCase()}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {new Date(step.timestamp).toLocaleString()}
                                        </Typography>
                                    </StepLabel>
                                    <StepContent>
                                        <Typography variant="body2" color="textSecondary">{step.message}</Typography>
                                    </StepContent>
                                </Step>
                            )) : (
                                <Step active={true}>
                                    <StepLabel>
                                        <Typography variant="body1" fontWeight="bold">Order Placed</Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </Typography>
                                    </StepLabel>
                                    <StepContent>
                                        <Typography variant="body2" color="textSecondary">Your order is being processed.</Typography>
                                    </StepContent>
                                </Step>
                            )}
                        </Stepper>
                    </Box>

                    {/* Right Side: Order Summary & Info */}
                    <Box className="space-y-6">
                        {/* Product Info */}
                        <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: '16px' }}>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>Product details</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ w: 60, h: 60, bgcolor: '#eee', borderRadius: '8px', overflow: 'hidden' }}>
                                    {order.product?.image ? (
                                        <img
                                            src={`http://localhost:5001/uploads/${order.product.image}`}
                                            alt={order.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : <Box sx={{ w: '100%', h: '100%', display: 'flex', alignItems: 'center', justify: 'center' }}>📦</Box>}
                                </Box>
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">{order.product?.name || 'Product'}</Typography>
                                    <Typography variant="body2" color="textSecondary">Qty: {order.quantity || 1}</Typography>
                                    <Typography variant="body1" fontWeight="bold" color="#0A7A2F">₹{order.total?.toFixed(2)}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Payment Details */}
                        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: '16px' }}>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CreditCard size={16} />
                                Payment details
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography variant="body2">Payment Method</Typography>
                                <Typography variant="body2" fontWeight="bold">{getPaymentLabel(order.paymentMethod)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                <Typography variant="body2">Payment Status</Typography>
                                <Typography variant="body2" fontWeight="bold" color={order.status === 'delivered' ? 'success.main' : 'warning.main'}>
                                    {order.status === 'delivered' ? 'Completed' : 'Processing'}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Shipping Address */}
                        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: '16px' }}>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MapPin size={16} />
                                Shipping address
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>{order.shippingInfo?.fullName}</Typography>
                            <Typography variant="body2" color="textSecondary">{order.shippingInfo?.address}</Typography>
                            <Typography variant="body2" color="textSecondary">{order.shippingInfo?.city}, {order.shippingInfo?.state} - {order.shippingInfo?.pincode}</Typography>
                            <Typography variant="body2" color="textSecondary">Phone: {order.shippingInfo?.phone}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ bgcolor: '#0A7A2F', py: 1.5, borderRadius: '12px', fontWeight: 'bold' }}
                                onClick={() => navigate('/products')}
                            >
                                Shop More
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ borderColor: '#0A7A2F', color: '#0A7A2F', py: 1.5, borderRadius: '12px', fontWeight: 'bold' }}
                            >
                                Download Invoice
                            </Button>
                        </Box>
                    </Box>
                </div>
            </Paper>
        </Box>
    );
};

export default OrderDetails;
