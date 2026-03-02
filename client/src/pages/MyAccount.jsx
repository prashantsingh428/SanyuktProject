import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Material-UI imports
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import VillaIcon from '@mui/icons-material/Villa';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import GroupsIcon from '@mui/icons-material/Groups';
import WcIcon from '@mui/icons-material/Wc';
import FaceIcon from '@mui/icons-material/Face';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const MyAccount = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const [userData, setUserData] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Check authentication on load - SIRF EK BAAR
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        console.log('MyAccount - Checking auth:', { token, user });

        if (!token || !user) {
            console.log('No token/user, redirecting to login');
            navigate('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(user);
            console.log('User data loaded:', parsedUser);
            setUserData(parsedUser);
        } catch (error) {
            console.error('Error parsing user:', error);
            localStorage.clear();
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }, []); // <-- EMPTY ARRAY - SIRF EK BAAR

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setSnackbar({
            open: true,
            message: 'Logged out successfully!',
            severity: 'success'
        });
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    const getDisplayName = () => {
        if (!userData) return 'User';
        return userData.userName ||
            userData.name ||
            userData.firstName ||
            userData.email?.split('@')[0] ||
            'User';
    };

    const formatValue = (value) => {
        if (value === undefined || value === null || value === '') return 'Not provided';
        return value;
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <CircularProgress sx={{ color: '#0A7A2F' }} />
            </Box>
        );
    }

    if (!userData) {
        return (
            <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="error">
                        No user data found. Please login again.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, bgcolor: '#0A7A2F' }}
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            {/* Welcome Header */}
            <Paper sx={{ p: 3, mb: 3, bgcolor: '#0A7A2F', color: 'white', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Welcome, {getDisplayName()}!
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon fontSize="small" />
                                <Typography variant="body1">{formatValue(userData.email)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon fontSize="small" />
                                <Typography variant="body1">{formatValue(userData.mobile)}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            borderColor: 'white',
                            color: 'white',
                            '&:hover': {
                                borderColor: 'white',
                                bgcolor: 'rgba(255,255,255,0.1)'
                            }
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Paper>

            {/* Tabs */}
            <Paper sx={{ mb: 3, borderRadius: '12px' }}>
                <Tabs
                    value={tabValue}
                    onChange={(e, val) => setTabValue(val)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 500,
                            minHeight: '60px',
                        },
                        '& .Mui-selected': {
                            color: '#0A7A2F !important',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#0A7A2F',
                        },
                    }}
                >
                    <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
                    <Tab icon={<HomeIcon />} label="Address" iconPosition="start" />
                    <Tab icon={<ShoppingBagIcon />} label="Orders" iconPosition="start" />
                    <Tab icon={<ReceiptIcon />} label="Transactions" iconPosition="start" />
                </Tabs>
            </Paper>

            {/* Tab Panels */}
            <Paper sx={{ p: 3, borderRadius: '12px' }}>
                {/* Profile Tab */}
                {tabValue === 0 && (
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ color: '#0A7A2F', mb: 3 }}>
                            Profile Information
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                            Personal Details
                                        </Typography>
                                        <Divider sx={{ mb: 2 }} />

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <PersonIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">User ID</Typography>
                                                <Typography variant="body2">{formatValue(userData.userId || userData.id)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <PersonIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">User Name</Typography>
                                                <Typography variant="body2">{formatValue(userData.userName)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <BadgeIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">First Name</Typography>
                                                <Typography variant="body2">{formatValue(userData.firstName)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <BadgeIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Last Name</Typography>
                                                <Typography variant="body2">{formatValue(userData.lastName)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <GroupsIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Father's Name</Typography>
                                                <Typography variant="body2">{formatValue(userData.fatherName)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <GroupsIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Mother's Name</Typography>
                                                <Typography variant="body2">{formatValue(userData.motherName)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <FaceIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Nickname</Typography>
                                                <Typography variant="body2">{formatValue(userData.nickname)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <EmailIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Email</Typography>
                                                <Typography variant="body2">{formatValue(userData.email)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <PhoneIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Mobile</Typography>
                                                <Typography variant="body2">{formatValue(userData.mobile)}</Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                            Account Details
                                        </Typography>
                                        <Divider sx={{ mb: 2 }} />

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <FingerprintIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Sponsor ID</Typography>
                                                <Typography variant="body2">{formatValue(userData.sponsorId)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <BadgeIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Sponsor Name</Typography>
                                                <Typography variant="body2">{formatValue(userData.sponsorName)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <WcIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Gender</Typography>
                                                <Typography variant="body2">{formatValue(userData.gender)}</Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <PersonIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Position</Typography>
                                                <Typography variant="body2">{formatValue(userData.position)}</Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Address Tab */}
                {tabValue === 1 && (
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ color: '#0A7A2F', mb: 3 }}>
                            Address Information
                        </Typography>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                                            <LocationOnIcon sx={{ color: '#F7931E', mt: 0.5 }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Shipping Address</Typography>
                                                <Typography variant="body2">{formatValue(userData.shippingAddress)}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <FlagIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">State</Typography>
                                                <Typography variant="body2">{formatValue(userData.state)}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <FlagIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">District</Typography>
                                                <Typography variant="body2">{formatValue(userData.district)}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <HomeIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Assembly Area</Typography>
                                                <Typography variant="body2">{formatValue(userData.assemblyArea)}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <AgricultureIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Block</Typography>
                                                <Typography variant="body2">{formatValue(userData.block)}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <GroupsIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Village Council</Typography>
                                                <Typography variant="body2">{formatValue(userData.villageCouncil)}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <VillaIcon sx={{ color: '#F7931E' }} />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary">Village</Typography>
                                                <Typography variant="body2">{formatValue(userData.village)}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                        Complete Address:
                                    </Typography>
                                    <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                                        <Typography>
                                            {[
                                                userData.shippingAddress,
                                                userData.village,
                                                userData.villageCouncil,
                                                userData.block,
                                                userData.district,
                                                userData.state
                                            ].filter(Boolean).join(', ') || 'No address available'}
                                        </Typography>
                                    </Paper>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {/* Orders Tab */}
                {tabValue === 2 && (
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ color: '#0A7A2F', mb: 3 }}>
                            Order History
                        </Typography>
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <ShoppingBagIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                No Orders Yet
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                                Start shopping to see your orders here
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: '#F7931E' }}
                                onClick={() => navigate('/products')}
                            >
                                Start Shopping
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* Transactions Tab */}
                {tabValue === 3 && (
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ color: '#0A7A2F', mb: 3 }}>
                            Transaction History
                        </Typography>
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <ReceiptIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                No Transactions Yet
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Your transactions will appear here
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Paper>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default MyAccount;