// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ChevronLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard, IndianRupee, ShieldCheck } from 'lucide-react';
// import api from '../api';
// import { Box, Typography, Button, Paper, Stepper, Step, StepLabel, StepContent, Divider, Chip } from '@mui/material';

// const OrderDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             try {
//                 const res = await api.get(`/orders/${id}`);
//                 setOrder(res.data);
//             } catch (error) {
//                 console.error('Error fetching order details:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchOrderDetails();
//     }, [id]);

//     if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading Order Details...</Box>;
//     if (!order) return <Box sx={{ p: 4, textAlign: 'center' }}>Order Not Found</Box>;

//     const steps = order.tracking || [];
//     const activeStep = steps.length - 1;

//     const getPaymentLabel = (method) => {
//         const labels = {
//             cod: 'Cash on Delivery',
//             upi: 'UPI Payment',
//             card: 'Card Payment',
//             online: 'Online Payment'
//         };
//         return labels[method] || method.toUpperCase();
//     };

//     return (
//         <Box sx={{ maxWidth: '1000px', mx: 'auto', p: { xs: 2, md: 4 }, minHeight: '80vh' }}>
//             <Button
//                 startIcon={<ChevronLeft />}
//                 onClick={() => navigate('/my-account/orders')}
//                 sx={{ mb: 3, color: '#666', '&:hover': { color: '#0A7A2F' } }}
//             >
//                 Back to My Orders
//             </Button>

//             <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #eee', bgcolor: '#fff' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
//                     <Box>
//                         <Typography variant="h5" fontWeight="bold" gutterBottom>
//                             Order Details
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             Order ID: <span className="font-bold text-gray-800">#{order._id.slice(-8).toUpperCase()}</span>
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             Placed on: {new Date(order.createdAt).toLocaleDateString()}
//                         </Typography>
//                     </Box>
//                     <Chip
//                         label={order.status.replace('_', ' ').toUpperCase()}
//                         color="success"
//                         sx={{ fontWeight: 800, borderRadius: '8px', px: 1 }}
//                     />
//                 </Box>

//                 <Divider sx={{ mb: 4 }} />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {/* Left Side: Tracking Timeline */}
//                     <Box>
//                         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <Truck size={20} className="text-green-600" />
//                             Delivery Status
//                         </Typography>

//                         <Stepper activeStep={activeStep} orientation="vertical" sx={{
//                             '& .MuiStepConnector-line': { minHeight: '40px', borderColor: '#eee' },
//                             '& .MuiStepIcon-root.Mui-active': { color: '#0A7A2F' },
//                             '& .MuiStepIcon-root.Mui-completed': { color: '#0A7A2F' }
//                         }}>
//                             {steps.length > 0 ? steps.map((step, index) => (
//                                 <Step key={index} active={true}>
//                                     <StepLabel icon={index === activeStep ? <Package size={20} /> : <CheckCircle size={18} />}>
//                                         <Typography variant="body1" fontWeight={index === activeStep ? 'bold' : 'medium'}>
//                                             {step.status.replace('_', ' ').toUpperCase()}
//                                         </Typography>
//                                         <Typography variant="caption" color="textSecondary">
//                                             {new Date(step.timestamp).toLocaleString()}
//                                         </Typography>
//                                     </StepLabel>
//                                     <StepContent>
//                                         <Typography variant="body2" color="textSecondary">{step.message}</Typography>
//                                     </StepContent>
//                                 </Step>
//                             )) : (
//                                 <Step active={true}>
//                                     <StepLabel>
//                                         <Typography variant="body1" fontWeight="bold">Order Placed</Typography>
//                                         <Typography variant="caption" color="textSecondary">
//                                             {new Date(order.createdAt).toLocaleString()}
//                                         </Typography>
//                                     </StepLabel>
//                                     <StepContent>
//                                         <Typography variant="body2" color="textSecondary">Your order is being processed.</Typography>
//                                     </StepContent>
//                                 </Step>
//                             )}
//                         </Stepper>
//                     </Box>

//                     {/* Right Side: Order Summary & Info */}
//                     <Box className="space-y-6">
//                         {/* Product Info */}
//                         <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: '16px' }}>
//                             <Typography variant="subtitle2" color="textSecondary" gutterBottom>Product details</Typography>
//                             <Box sx={{ display: 'flex', gap: 2 }}>
//                                 <Box sx={{ w: 60, h: 60, bgcolor: '#eee', borderRadius: '8px', overflow: 'hidden' }}>
//                                     {order.product?.image ? (
//                                         <img
//                                             src={`http://localhost:5001/uploads/${order.product.image}`}
//                                             alt={order.product.name}
//                                             className="w-full h-full object-cover"
//                                         />
//                                     ) : <Box sx={{ w: '100%', h: '100%', display: 'flex', alignItems: 'center', justify: 'center' }}>📦</Box>}
//                                 </Box>
//                                 <Box>
//                                     <Typography variant="body1" fontWeight="bold">{order.product?.name || 'Product'}</Typography>
//                                     <Typography variant="body2" color="textSecondary">Qty: {order.quantity || 1}</Typography>
//                                     <Typography variant="body1" fontWeight="bold" color="#0A7A2F">₹{order.total?.toFixed(2)}</Typography>
//                                 </Box>
//                             </Box>
//                         </Box>

//                         {/* Payment Details */}
//                         <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: '16px' }}>
//                             <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <CreditCard size={16} />
//                                 Payment details
//                             </Typography>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
//                                 <Typography variant="body2">Payment Method</Typography>
//                                 <Typography variant="body2" fontWeight="bold">{getPaymentLabel(order.paymentMethod)}</Typography>
//                             </Box>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
//                                 <Typography variant="body2">Payment Status</Typography>
//                                 <Typography variant="body2" fontWeight="bold" color={order.status === 'delivered' ? 'success.main' : 'warning.main'}>
//                                     {order.status === 'delivered' ? 'Completed' : 'Processing'}
//                                 </Typography>
//                             </Box>
//                         </Box>

//                         {/* Shipping Address */}
//                         <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: '16px' }}>
//                             <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 <MapPin size={16} />
//                                 Shipping address
//                             </Typography>
//                             <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>{order.shippingInfo?.fullName}</Typography>
//                             <Typography variant="body2" color="textSecondary">{order.shippingInfo?.address}</Typography>
//                             <Typography variant="body2" color="textSecondary">{order.shippingInfo?.city}, {order.shippingInfo?.state} - {order.shippingInfo?.pincode}</Typography>
//                             <Typography variant="body2" color="textSecondary">Phone: {order.shippingInfo?.phone}</Typography>
//                         </Box>

//                         <Box sx={{ display: 'flex', gap: 2 }}>
//                             <Button
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{ bgcolor: '#0A7A2F', py: 1.5, borderRadius: '12px', fontWeight: 'bold' }}
//                                 onClick={() => navigate('/products')}
//                             >
//                                 Shop More
//                             </Button>
//                             <Button
//                                 fullWidth
//                                 variant="outlined"
//                                 sx={{ borderColor: '#0A7A2F', color: '#0A7A2F', py: 1.5, borderRadius: '12px', fontWeight: 'bold' }}
//                             >
//                                 Download Invoice
//                             </Button>
//                         </Box>
//                     </Box>
//                 </div>
//             </Paper>
//         </Box>
//     );
// };

// export default OrderDetails;




import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard, IndianRupee, ShieldCheck, Download, FileText } from 'lucide-react';
import api from '../api';
import { Box, Typography, Button, Paper, Stepper, Step, StepLabel, StepContent, Divider, Chip, Snackbar, Alert, CircularProgress } from '@mui/material';
import html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await api.get(`/orders/${id}`);
                setOrder(res.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setSnackbar({
                    open: true,
                    message: 'Error fetching order details. Please try again.',
                    severity: 'error'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);

    const getPaymentLabel = (method) => {
        const labels = {
            cod: 'Cash on Delivery',
            upi: 'UPI Payment',
            card: 'Card Payment',
            online: 'Online Payment'
        };
        return labels[method] || method?.toUpperCase() || 'N/A';
    };

    // Method 1: Download Invoice as PDF using html2pdf
    const downloadInvoiceHTML2PDF = () => {
        setDownloadLoading(true);

        try {
            // Create invoice HTML content
            const invoiceContent = document.createElement('div');
            invoiceContent.innerHTML = generateInvoiceHTML();

            // Options for html2pdf
            const options = {
                margin: [0.5, 0.5, 0.5, 0.5],
                filename: `invoice_${order._id.slice(-8)}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, letterRendering: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            // Generate and download PDF
            html2pdf().set(options).from(invoiceContent).save();

            setSnackbar({
                open: true,
                message: 'Invoice downloaded successfully!',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error downloading invoice:', error);
            setSnackbar({
                open: true,
                message: 'Error downloading invoice. Please try again.',
                severity: 'error'
            });
        } finally {
            setDownloadLoading(false);
        }
    };

    // Method 2: Download Invoice using jsPDF
    const downloadInvoiceJSPDF = () => {
        setDownloadLoading(true);

        try {
            const doc = new jsPDF();

            // Add company logo/header
            doc.setFontSize(22);
            doc.setTextColor(10, 122, 47); // #0A7A2F
            doc.text('INVOICE', 14, 22);

            // Add invoice details
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Invoice #: INV-${order._id.slice(-8).toUpperCase()}`, 14, 32);
            doc.text(`Order ID: #${order._id.slice(-8).toUpperCase()}`, 14, 38);
            doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 44);
            doc.text(`Payment Method: ${getPaymentLabel(order.paymentMethod)}`, 14, 50);

            // Add company details
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Your Store Name', 140, 22);
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            doc.text('123 Business Street', 140, 28);
            doc.text('City, State - 123456', 140, 34);
            doc.text('GST: 22AAAAA0000A1Z5', 140, 40);
            doc.text('support@yourstore.com', 140, 46);

            // Line separator
            doc.setDrawColor(200, 200, 200);
            doc.line(14, 58, 196, 58);

            // Customer details
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.text('Bill To:', 14, 68);
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            doc.text(order.shippingInfo?.fullName || 'N/A', 14, 76);
            doc.text(order.shippingInfo?.address || 'N/A', 14, 82);
            doc.text(`${order.shippingInfo?.city || ''}, ${order.shippingInfo?.state || ''} - ${order.shippingInfo?.pincode || ''}`, 14, 88);
            doc.text(`Phone: ${order.shippingInfo?.phone || 'N/A'}`, 14, 94);
            doc.text(`Email: ${order.shippingInfo?.email || 'N/A'}`, 14, 100);

            // Order items table
            autoTable(doc, {
                startY: 110,
                head: [['Product', 'Quantity', 'Price', 'Total']],
                body: [
                    [
                        order.product?.name || 'Product',
                        order.quantity || 1,
                        `₹${order.product?.price?.toFixed(2) || '0.00'}`,
                        `₹${order.subtotal?.toFixed(2) || '0.00'}`
                    ]
                ],
                headStyles: {
                    fillColor: [10, 122, 47],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold'
                },
                alternateRowStyles: { fillColor: [240, 240, 240] },
                margin: { top: 10 }
            });

            // Get the final Y position after the table
            const finalY = doc.lastAutoTable.finalY || 150;

            // Add price breakdown
            const startY = finalY + 10;

            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);

            const calculations = [
                { label: 'Subtotal:', value: `₹${order.subtotal?.toFixed(2) || '0.00'}` },
                { label: 'Shipping:', value: order.shipping === 0 ? 'Free' : `₹${order.shipping?.toFixed(2) || '0.00'}` },
                { label: 'GST (18%):', value: `₹${order.tax?.toFixed(2) || '0.00'}` }
            ];

            if (order.discount > 0) {
                calculations.push({ label: 'Discount:', value: `-₹${order.discount?.toFixed(2)}` });
            }

            let yPos = startY;
            calculations.forEach(item => {
                doc.text(item.label, 140, yPos);
                doc.text(item.value, 180, yPos, { align: 'right' });
                yPos += 6;
            });

            // Total
            doc.setDrawColor(10, 122, 47);
            doc.setLineWidth(0.5);
            doc.line(140, yPos + 2, 196, yPos + 2);

            doc.setFontSize(12);
            doc.setTextColor(10, 122, 47);
            doc.setFont('helvetica', 'bold');
            doc.text('Grand Total:', 140, yPos + 10);
            doc.text(`₹${order.total?.toFixed(2) || '0.00'}`, 180, yPos + 10, { align: 'right' });

            // Footer
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.setFont('helvetica', 'normal');
            doc.text('Thank you for your business!', 105, 270, { align: 'center' });
            doc.text('This is a computer generated invoice - no signature required.', 105, 276, { align: 'center' });

            // Save the PDF
            doc.save(`invoice_${order._id.slice(-8)}.pdf`);

            setSnackbar({
                open: true,
                message: 'Invoice downloaded successfully!',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error downloading invoice:', error);
            setSnackbar({
                open: true,
                message: 'Error downloading invoice. Please try again.',
                severity: 'error'
            });
        } finally {
            setDownloadLoading(false);
        }
    };

    // Method 3: Download via API (if you have backend endpoint)
    const downloadInvoiceAPI = async () => {
        setDownloadLoading(true);

        try {
            // Make API call to generate invoice
            const response = await api.get(`/orders/${id}/invoice`, {
                responseType: 'blob' // Important for file download
            });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice_${order._id.slice(-8)}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            setSnackbar({
                open: true,
                message: 'Invoice downloaded successfully!',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error downloading invoice:', error);
            setSnackbar({
                open: true,
                message: 'Error downloading invoice. Please try again.',
                severity: 'error'
            });
        } finally {
            setDownloadLoading(false);
        }
    };

    // Generate Invoice HTML content
    const generateInvoiceHTML = () => {
        const orderData = order;
        const product = order.product || {};
        const shipping = order.shippingInfo || {};

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Invoice #${orderData._id?.slice(-8)}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        color: #333;
                    }
                    .invoice-container {
                        max-width: 800px;
                        margin: 0 auto;
                        background: #fff;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 2px solid #0A7A2F;
                        padding-bottom: 20px;
                        margin-bottom: 20px;
                    }
                    .company-info {
                        text-align: right;
                    }
                    .invoice-title {
                        color: #0A7A2F;
                        font-size: 28px;
                        margin: 0;
                    }
                    .customer-info {
                        background: #f8f9fa;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    th {
                        background: #0A7A2F;
                        color: white;
                        padding: 12px;
                        text-align: left;
                    }
                    td {
                        padding: 12px;
                        border-bottom: 1px solid #ddd;
                    }
                    .totals {
                        text-align: right;
                        margin-top: 20px;
                    }
                    .totals table {
                        width: 300px;
                        float: right;
                    }
                    .totals td {
                        border: none;
                        padding: 5px 10px;
                    }
                    .grand-total {
                        font-size: 18px;
                        font-weight: bold;
                        color: #0A7A2F;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 1px solid #ddd;
                        color: #666;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="invoice-container">
                    <div class="header">
                        <div>
                            <h1 class="invoice-title">INVOICE</h1>
                            <p>Invoice #: INV-${orderData._id?.slice(-8).toUpperCase()}</p>
                            <p>Date: ${new Date(orderData.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div class="company-info">
                            <h3>Your Store Name</h3>
                            <p>123 Business Street<br>City, State - 123456<br>GST: 22AAAAA0000A1Z5<br>support@yourstore.com</p>
                        </div>
                    </div>
                    
                    <div class="customer-info">
                        <h3>Bill To:</h3>
                        <p><strong>${shipping.fullName || 'N/A'}</strong><br>
                        ${shipping.address || 'N/A'}<br>
                        ${shipping.city || ''}, ${shipping.state || ''} - ${shipping.pincode || ''}<br>
                        Phone: ${shipping.phone || 'N/A'}<br>
                        Email: ${shipping.email || 'N/A'}</p>
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${product.name || 'Product'}</td>
                                <td>${orderData.quantity || 1}</td>
                                <td>₹${product.price?.toFixed(2) || '0.00'}</td>
                                <td>₹${orderData.subtotal?.toFixed(2) || '0.00'}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div class="totals">
                        <table>
                            <tr>
                                <td>Subtotal:</td>
                                <td>₹${orderData.subtotal?.toFixed(2) || '0.00'}</td>
                            </tr>
                            <tr>
                                <td>Shipping:</td>
                                <td>${orderData.shipping === 0 ? 'Free' : '₹' + orderData.shipping?.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>GST (18%):</td>
                                <td>₹${orderData.tax?.toFixed(2) || '0.00'}</td>
                            </tr>
                            ${orderData.discount > 0 ? `
                            <tr>
                                <td>Discount:</td>
                                <td>-₹${orderData.discount?.toFixed(2)}</td>
                            </tr>
                            ` : ''}
                            <tr class="grand-total">
                                <td>Grand Total:</td>
                                <td>₹${orderData.total?.toFixed(2) || '0.00'}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="clear: both;"></div>
                    
                    <div class="footer">
                        <p>Thank you for your business!</p>
                        <p>This is a computer generated invoice - no signature required.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    };

    // Method to handle invoice download based on available method
    const handleDownloadInvoice = () => {
        if (!order) {
            setSnackbar({
                open: true,
                message: 'Order details not available',
                severity: 'error'
            });
            return;
        }

        // Choose your preferred method:
        // Method 1: Using html2pdf (better styling)
        downloadInvoiceHTML2PDF();

        // Method 2: Using jsPDF (lighter, faster)
        // downloadInvoiceJSPDF();

        // Method 3: Using API (if backend supports)
        // downloadInvoiceAPI();
    };

    if (loading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box>
                    <CircularProgress sx={{ color: '#0A7A2F' }} />
                    <Typography sx={{ mt: 2 }}>Loading Order Details...</Typography>
                </Box>
            </Box>
        );
    }

    if (!order) {
        return (
            <Box sx={{ p: 4, textAlign: 'center', minHeight: '60vh' }}>
                <FileText size={64} className="text-gray-300 mx-auto mb-4" />
                <Typography variant="h6" gutterBottom>Order Not Found</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                    The order you're looking for doesn't exist or has been removed.
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/my-account/orders')}
                    sx={{ bgcolor: '#0A7A2F' }}
                >
                    View My Orders
                </Button>
            </Box>
        );
    }

    const steps = order.tracking || [];
    const activeStep = steps.length - 1;

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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            label={order.status?.replace('_', ' ').toUpperCase() || 'PENDING'}
                            color="success"
                            sx={{ fontWeight: 800, borderRadius: '8px', px: 1 }}
                        />
                    </Box>
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
                                            {step.status?.replace('_', ' ').toUpperCase() || 'Status Update'}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {step.timestamp ? new Date(step.timestamp).toLocaleString() : ''}
                                        </Typography>
                                    </StepLabel>
                                    <StepContent>
                                        <Typography variant="body2" color="textSecondary">{step.message || ''}</Typography>
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
                                <Box sx={{ width: 60, height: 60, bgcolor: '#eee', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {order.product?.image ? (
                                        <img
                                            src={`http://localhost:5001/uploads/${order.product.image}`}
                                            alt={order.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Package size={24} className="text-gray-400" />
                                    )}
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
                                    {order.paymentStatus === 'paid' ? 'Paid' :
                                        order.status === 'delivered' ? 'Completed' : 'Processing'}
                                </Typography>
                            </Box>
                            {order.upiTransactionId && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                    <Typography variant="body2">Transaction ID</Typography>
                                    <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '12px' }}>
                                        {order.upiTransactionId.slice(-12)}
                                    </Typography>
                                </Box>
                            )}
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
                                sx={{
                                    bgcolor: '#0A7A2F',
                                    py: 1.5,
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: '#0A7A2F',
                                        opacity: 0.9
                                    }
                                }}
                                onClick={() => navigate('/products')}
                            >
                                Shop More
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={downloadLoading ? <CircularProgress size={20} /> : <Download size={18} />}
                                disabled={downloadLoading}
                                sx={{
                                    borderColor: '#0A7A2F',
                                    color: '#0A7A2F',
                                    py: 1.5,
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        borderColor: '#0A7A2F',
                                        bgcolor: 'rgba(10, 122, 47, 0.04)'
                                    }
                                }}
                                onClick={handleDownloadInvoice}
                            >
                                {downloadLoading ? 'Downloading...' : 'Download Invoice'}
                            </Button>
                        </Box>
                    </Box>
                </div>
            </Paper>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{
                        width: '100%',
                        borderRadius: '16px',
                        fontWeight: 600,
                        bgcolor: snackbar.severity === 'success' ? '#0A7A2F' : '#f44336',
                        color: 'white',
                        '& .MuiAlert-icon': { color: 'white' }
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default OrderDetails;
