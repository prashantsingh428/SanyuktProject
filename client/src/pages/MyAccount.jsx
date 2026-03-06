import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../api"; // 👈 API import karo

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
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingIcon from '@mui/icons-material/Pending';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Styled Components
const AnimatedCard = styled(Card)(({ theme }) => ({
    transition: 'all 0.3s ease-in-out',
    height: '100%',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 20px rgba(10, 122, 47, 0.15)',
    },
}));

const AnimatedPaper = styled(Paper)(({ theme }) => ({
    transition: 'all 0.3s ease-in-out',
    width: '100%',
    '&:hover': {
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    transition: 'all 0.2s ease-in-out',
    flex: 1,
    '&:hover': {
        backgroundColor: 'rgba(10, 122, 47, 0.05)',
        transform: 'scale(1.05)',
    },
}));

const InfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    transition: 'all 0.2s ease-in-out',
    width: '100%',
    '&:hover': {
        backgroundColor: '#f5f5f5',
        transform: 'translateX(8px)',
        '& .MuiSvgIcon-root': {
            transform: 'scale(1.2)',
            color: '#0A7A2F',
        },
    },
}));

const FullPageContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
    position: 'relative',
    overflow: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
    },
}));

const StatusChip = styled(Chip)(({ status }) => ({
    fontWeight: 600,
    ...(status === 'Pending' && {
        backgroundColor: '#F7931E',
        color: 'white',
    }),
    ...(status === 'In Progress' && {
        backgroundColor: '#0A7A2F',
        color: 'white',
    }),
    ...(status === 'Resolved' && {
        backgroundColor: '#4caf50',
        color: 'white',
    }),
}));

const MyAccount = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Determine active tab from URL path
    const pathToTab = {
        '/my-account': 0,
        '/my-account/profile': 0,
        '/my-account/address': 1,
        '/my-account/orders': 2,
        '/my-account/transactions': 3,
        '/my-account/grievances': 4,
        '/my-account/kyc': 5,
    };
    const tabValue = pathToTab[location.pathname] ?? 0;
    const setTabValue = (index) => {
        const tabPaths = ['/my-account/profile', '/my-account/address', '/my-account/orders', '/my-account/transactions', '/my-account/grievances', '/my-account/kyc'];
        navigate(tabPaths[index] || '/my-account/profile');
    };

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userGrievances, setUserGrievances] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [userTransactions, setUserTransactions] = useState([]);
    const [grievancesLoading, setGrievancesLoading] = useState(false);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [transactionsLoading, setTransactionsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [showContent, setShowContent] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({});
    const [saving, setSaving] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    // KYC State
    const [kycData, setKycData] = useState({
        aadharNumber: '',
        panNumber: '',
        bankDetails: { accountNumber: '', ifscCode: '', bankName: '' },
        kycDocuments: { aadharFront: '', aadharBack: '', panCard: '', passbook: '' }
    });
    const [kycSubmitting, setKycSubmitting] = useState(false);
    const kycReadOnly = userData?.kycStatus === 'Submitted' || userData?.kycStatus === 'Verified';

    const handleEditStart = () => {
        setEditData({
            userName: userData.userName || '',
            fatherName: userData.fatherName || '',
            mobile: userData.mobile || '',
            gender: userData.gender || '',
        });
        setEditMode(true);
    };

    const handleEditCancel = () => {
        setEditMode(false);
        setEditData({});
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            const payload = { ...editData };
            if (profileImage) payload.profileImage = profileImage;
            const res = await api.put('/profile', payload);
            const updatedUser = res.data.user;
            setUserData(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('storage')); // refresh navbar avatar
            setEditMode(false);
            setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: err.response?.data?.message || 'Failed to update profile', severity: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleKycImageUpload = (e, docType) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setKycData(prev => ({
                ...prev,
                kycDocuments: {
                    ...prev.kycDocuments,
                    [docType]: reader.result
                }
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleKycSubmit = async () => {
        // Validation
        if (!kycData.aadharNumber || !kycData.panNumber || !kycData.bankDetails.accountNumber) {
            setSnackbar({ open: true, message: 'Please fill all required KYC fields', severity: 'warning' });
            return;
        }

        setKycSubmitting(true);
        try {
            const res = await api.put('/kyc', kycData);
            const updatedUser = res.data.user;
            setUserData(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setSnackbar({ open: true, message: 'KYC submitted successfully!', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: err.response?.data?.message || 'Failed to submit KYC', severity: 'error' });
        } finally {
            setKycSubmitting(false);
        }
    };

    // Fetch user orders
    const fetchUserOrders = async () => {
        setOrdersLoading(true);
        try {
            console.log("Fetching user orders...");
            const res = await api.get('/orders/myorders');
            console.log("Orders received:", res.data);
            setUserOrders(res.data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
            // Don't show snackbar error for orders to avoid cluttering if it's just empty
        } finally {
            setOrdersLoading(false);
        }
    };

    // Fetch user grievances
    const fetchUserGrievances = async (email) => {
        if (!email) return;

        setGrievancesLoading(true);
        try {
            console.log("Fetching grievances for:", email);
            const res = await api.get(`/grievance/user/${email}`);
            console.log("Grievances received:", res.data);

            if (res.data.success) {
                setUserGrievances(res.data.grievances || []);
            }
        } catch (error) {
            console.error("Error fetching grievances:", error);
            setSnackbar({
                open: true,
                message: 'Error fetching your grievances',
                severity: 'error'
            });
        } finally {
            setGrievancesLoading(false);
        }
    };

    // Fetch user transactions
    const fetchUserTransactions = async () => {
        setTransactionsLoading(true);
        try {
            const res = await api.get('/recharge/my-transactions');
            setUserTransactions(res.data || []);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setTransactionsLoading(false);
        }
    };

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
            if (parsedUser.profileImage) setProfileImage(parsedUser.profileImage);

            // Set initial KYC data if available
            setKycData({
                aadharNumber: parsedUser.aadharNumber || '',
                panNumber: parsedUser.panNumber || '',
                bankDetails: parsedUser.bankDetails || { accountNumber: '', ifscCode: '', bankName: '' },
                kycDocuments: parsedUser.kycDocuments || { aadharFront: '', aadharBack: '', panCard: '', passbook: '' }
            });

            // Fetch data
            fetchUserGrievances(parsedUser.email);
            fetchUserOrders();
            fetchUserTransactions();

            // Show content with animation after loading
            setTimeout(() => setShowContent(true), 300);
        } catch (error) {
            console.error('Error parsing user:', error);
            localStorage.clear();
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }, []);

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
            userData.email?.split('@')[0] ||
            'User';
    };

    const formatValue = (value) => {
        if (value === undefined || value === null || value === '') return 'Not provided';
        return value;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <PendingIcon />;
            case 'In Progress': return <HistoryIcon />;
            case 'Resolved': return <CheckCircleIcon />;
            default: return <AssignmentIcon />;
        }
    };

    if (loading) {
        return (
            <FullPageContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Zoom in={true} timeout={1000}>
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress
                            size={isMobile ? 50 : 60}
                            thickness={4}
                            sx={{ color: '#0A7A2F' }}
                        />
                        <Typography
                            variant={isMobile ? "body1" : "h6"}
                            sx={{ mt: 2, color: '#0A7A2F', fontWeight: 500 }}
                        >
                            Loading your profile...
                        </Typography>
                    </Box>
                </Zoom>
            </FullPageContainer>
        );
    }

    if (!userData) {
        return (
            <FullPageContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Fade in={true} timeout={1000}>
                    <Paper sx={{
                        p: isMobile ? 3 : 4,
                        textAlign: 'center',
                        borderRadius: '16px',
                        maxWidth: '500px',
                        width: '100%',
                        margin: '0 auto'
                    }}>
                        <Typography variant={isMobile ? "body1" : "h6"} color="error" gutterBottom>
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
                </Fade>
            </FullPageContainer>
        );
    }

    return (
        <FullPageContainer>
            <Container maxWidth="lg" disableGutters sx={{ px: { xs: 1, sm: 2, md: 0 } }}>
                {/* Welcome Header */}
                <Slide direction="down" in={showContent} timeout={800}>
                    <AnimatedPaper sx={{
                        p: { xs: 2, sm: 3 },
                        mb: 3,
                        background: 'linear-gradient(135deg, #0A7A2F 0%, #1a8c3a 50%, #2a9e45 100%)',
                        color: 'white',
                        borderRadius: '16px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 2
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                    src={profileImage || undefined}
                                    sx={{ bgcolor: '#F7931E', width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 }, fontSize: 22, fontWeight: 700, border: '2px solid rgba(255,255,255,0.3)' }}
                                >
                                    {!profileImage && (userData.userName || 'U')[0].toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600 }}>
                                        Welcome, {getDisplayName()}!
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 3 } }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EmailIcon fontSize="small" />
                                            <Typography variant="body2">{formatValue(userData.email)}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PhoneIcon fontSize="small" />
                                            <Typography variant="body2">{formatValue(userData.mobile)}</Typography>
                                        </Box>
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
                                    width: { xs: '100%', sm: 'auto' },
                                    '&:hover': {
                                        borderColor: 'white',
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                    }
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </AnimatedPaper>
                </Slide>

                {/* Vertical Sidebar + Content Layout */}
                <Fade in={showContent} timeout={800}>
                    <AnimatedPaper sx={{ borderRadius: '16px', overflow: 'hidden', display: 'flex', minHeight: '500px' }}>
                        {/* Left Sidebar */}
                        <Box sx={{
                            width: { xs: '64px', sm: '220px' },
                            flexShrink: 0,
                            background: 'linear-gradient(180deg, #0A7A2F 0%, #1a8c3a 60%, #0A7A2F 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            py: 3,
                        }}>
                            {[
                                { icon: <PersonIcon />, label: 'Profile', index: 0, path: '/my-account/profile' },
                                { icon: <HomeIcon />, label: 'Address', index: 1, path: '/my-account/address' },
                                { icon: <ShoppingBagIcon />, label: 'Orders', index: 2, path: '/my-account/orders' },
                                { icon: <ReceiptIcon />, label: 'Transactions', index: 3, path: '/my-account/transactions' },
                                { icon: <SupportAgentIcon />, label: 'Grievances', index: 4, path: '/my-account/grievances' },
                                { icon: <FingerprintIcon />, label: 'KYC Verification', index: 5, path: '/my-account/kyc' },
                            ].map((item) => (
                                <Box
                                    key={item.index}
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        display: 'flex', alignItems: 'center',
                                        gap: { xs: 0, sm: 1.5 },
                                        justifyContent: { xs: 'center', sm: 'flex-start' },
                                        px: { xs: 0, sm: 2.5 }, py: 1.75,
                                        mx: 1.5, mb: 0.5,
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        bgcolor: tabValue === item.index ? 'rgba(255,255,255,0.2)' : 'transparent',
                                        borderLeft: tabValue === item.index ? '3px solid #F7931E' : '3px solid transparent',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                                    }}
                                >
                                    <Box sx={{ color: tabValue === item.index ? '#F7931E' : 'rgba(255,255,255,0.8)', display: 'flex' }}>
                                        {React.cloneElement(item.icon, { sx: { fontSize: 22 } })}
                                    </Box>
                                    <Typography sx={{
                                        display: { xs: 'none', sm: 'block' },
                                        color: tabValue === item.index ? 'white' : 'rgba(255,255,255,0.75)',
                                        fontWeight: tabValue === item.index ? 700 : 500,
                                        fontSize: '14px',
                                    }}>
                                        {item.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Right Content Panel */}
                        <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 4 }, overflow: 'auto', bgcolor: '#fafafa' }}>
                            {/* Profile Tab */}
                            {tabValue === 0 && (
                                <Box>
                                    {/* Avatar Hero Card */}
                                    <Box sx={{ mb: 3, borderRadius: '14px', overflow: 'hidden', border: '1px solid #e8f5e9', boxShadow: '0 2px 12px rgba(10,122,47,0.07)' }}>
                                        <Box sx={{ height: '5px', background: 'linear-gradient(90deg, #0A7A2F, #F7931E)' }} />
                                        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2.5, bgcolor: 'white', flexWrap: 'wrap' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                                {/* Avatar with Camera Upload Overlay */}
                                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                                    <Avatar
                                                        src={profileImage || undefined}
                                                        sx={{ width: 80, height: 80, bgcolor: '#0A7A2F', fontSize: 32, fontWeight: 700, border: '3px solid #e8f5e9' }}
                                                    >
                                                        {!profileImage && (userData.userName || 'U')[0].toUpperCase()}
                                                    </Avatar>
                                                    <Tooltip title="Upload photo">
                                                        <Box
                                                            component="label"
                                                            htmlFor="profile-image-upload"
                                                            sx={{
                                                                position: 'absolute', bottom: 0, right: 0,
                                                                bgcolor: '#0A7A2F', borderRadius: '50%', width: 26, height: 26,
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                cursor: 'pointer', border: '2px solid white',
                                                                '&:hover': { bgcolor: '#085c22' }, transition: 'background 0.2s'
                                                            }}
                                                        >
                                                            <CameraAltIcon sx={{ color: 'white', fontSize: 13 }} />
                                                        </Box>
                                                    </Tooltip>
                                                    <input
                                                        id="profile-image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        hidden
                                                        onChange={handleImageUpload}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography sx={{ fontWeight: 800, fontSize: '20px', color: '#111', lineHeight: 1.2 }}>{formatValue(userData.userName)}</Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.75 }}>
                                                        <Box sx={{ bgcolor: '#e8f5e9', color: '#0A7A2F', fontWeight: 600, fontSize: '12px', px: 1.5, py: 0.25, borderRadius: '20px' }}>{formatValue(userData.position)}</Box>
                                                        <Typography sx={{ color: '#bbb', fontSize: '13px' }}>{[userData.district, userData.state].filter(Boolean).join(', ') || 'India'}</Typography>
                                                    </Box>
                                                    <Typography sx={{ color: '#999', fontSize: '13px', mt: 0.5 }}>{formatValue(userData.email)}</Typography>
                                                </Box>
                                            </Box>
                                            {/* Edit / Save / Cancel Buttons */}
                                            {!editMode ? (
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<EditIcon />}
                                                    onClick={handleEditStart}
                                                    size="small"
                                                    sx={{ borderColor: '#0A7A2F', color: '#0A7A2F', borderRadius: '8px', fontWeight: 600, '&:hover': { bgcolor: '#e8f5e9' } }}
                                                >
                                                    Edit Profile
                                                </Button>
                                            ) : (
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={saving ? <CircularProgress size={14} sx={{ color: 'white' }} /> : <SaveIcon />}
                                                        onClick={handleSaveProfile}
                                                        disabled={saving}
                                                        size="small"
                                                        sx={{ bgcolor: '#0A7A2F', borderRadius: '8px', fontWeight: 600, '&:hover': { bgcolor: '#085c22' } }}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<CancelIcon />}
                                                        onClick={handleEditCancel}
                                                        size="small"
                                                        sx={{ borderColor: '#ddd', color: '#666', borderRadius: '8px', fontWeight: 600 }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>

                                    {/* Personal Information Section */}
                                    <Paper variant="outlined" sx={{ borderRadius: '14px', overflow: 'hidden', mb: 3 }}>
                                        <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#111' }}>Personal Information</Typography>
                                        </Box>
                                        <Box sx={{ px: 3, py: 1 }}>
                                            {editMode ? (
                                                // Edit mode — TextFields
                                                <Grid container spacing={2.5} sx={{ py: 2.5 }}>
                                                    {[
                                                        { label: 'User Name', key: 'userName' },
                                                        { label: "Father's Name", key: 'fatherName' },
                                                        { label: 'Phone', key: 'mobile' },
                                                        { label: 'Gender', key: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                                                    ].map((field) => (
                                                        <Grid item xs={6} key={field.key}>
                                                            {field.type === 'select' ? (
                                                                <TextField
                                                                    select
                                                                    fullWidth
                                                                    size="small"
                                                                    label={field.label}
                                                                    value={editData[field.key] || ''}
                                                                    onChange={(e) => setEditData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                                                    SelectProps={{ native: true }}
                                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                                                                >
                                                                    <option value=""></option>
                                                                    {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                                                                </TextField>
                                                            ) : (
                                                                <TextField
                                                                    fullWidth
                                                                    size="small"
                                                                    label={field.label}
                                                                    value={editData[field.key] || ''}
                                                                    onChange={(e) => setEditData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                                                                />
                                                            )}
                                                        </Grid>
                                                    ))}
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            fullWidth size="small" label="Email Address"
                                                            value={formatValue(userData.email)}
                                                            disabled
                                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#f9f9f9' } }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            fullWidth size="small" label="Position"
                                                            value={formatValue(userData.position)}
                                                            disabled
                                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#f9f9f9' } }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            ) : (
                                                // View mode — rows with dividers
                                                [
                                                    [{ label: 'User Name', value: formatValue(userData.userName) }, { label: "Father's Name", value: formatValue(userData.fatherName) }],
                                                    [{ label: 'Email Address', value: formatValue(userData.email) }, { label: 'Phone', value: formatValue(userData.mobile) }],
                                                    [{ label: 'Gender', value: formatValue(userData.gender) }, { label: 'Position', value: formatValue(userData.position) }],
                                                ].map((row, ri) => (
                                                    <Box key={ri}>
                                                        <Box sx={{ display: 'flex', py: 2.5 }}>
                                                            {row.map((field, fi) => (
                                                                <Box key={fi} sx={{ flex: 1, pr: fi === 0 ? 3 : 0 }}>
                                                                    <Typography sx={{ color: '#999', fontSize: '12px', fontWeight: 400, mb: 0.5 }}>{field.label}</Typography>
                                                                    <Typography sx={{ color: '#111', fontSize: '15px', fontWeight: 700 }}>{field.value}</Typography>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                        {ri < 2 && <Divider />}
                                                    </Box>
                                                ))
                                            )}
                                        </Box>
                                    </Paper>

                                    {/* Account Details Section (read-only) */}
                                    <Paper variant="outlined" sx={{ borderRadius: '14px', overflow: 'hidden' }}>
                                        <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid #f0f0f0' }}>
                                            <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#111' }}>Account Details</Typography>
                                        </Box>
                                        <Box sx={{ px: 3, py: 1 }}>
                                            {[
                                                [{ label: 'Sponsor ID', value: formatValue(userData.sponsorId) }, { label: 'Sponsor Name', value: formatValue(userData.sponsorName) }],
                                                [{ label: 'State', value: formatValue(userData.state) }, { label: 'District', value: formatValue(userData.district) }],
                                            ].map((row, ri) => (
                                                <Box key={ri}>
                                                    <Box sx={{ display: 'flex', py: 2.5 }}>
                                                        {row.map((field, fi) => (
                                                            <Box key={fi} sx={{ flex: 1, pr: fi === 0 ? 3 : 0 }}>
                                                                <Typography sx={{ color: '#999', fontSize: '12px', fontWeight: 400, mb: 0.5 }}>{field.label}</Typography>
                                                                <Typography sx={{ color: '#111', fontSize: '15px', fontWeight: 700 }}>{field.value}</Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                    {ri < 1 && <Divider />}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Paper>
                                </Box>
                            )}

                            {/* Address Tab */}
                            {tabValue === 1 && (
                                <Box>
                                    {/* Address Summary Card */}
                                    <Box sx={{ mb: 3, borderRadius: '14px', overflow: 'hidden', border: '1px solid #e8f5e9', boxShadow: '0 2px 12px rgba(10,122,47,0.07)' }}>
                                        <Box sx={{ height: '5px', background: 'linear-gradient(90deg, #0A7A2F, #F7931E)' }} />
                                        <Box sx={{ p: 3, bgcolor: 'white', display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <LocationOnIcon sx={{ color: '#0A7A2F', fontSize: 26 }} />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#111' }}>Address Information</Typography>
                                                <Typography sx={{ color: '#999', fontSize: '13px', mt: 0.25 }}>
                                                    {[userData.village, userData.district, userData.state].filter(Boolean).join(', ') || 'No address on file'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Location Details */}
                                    <Paper variant="outlined" sx={{ borderRadius: '14px', overflow: 'hidden', mb: 3 }}>
                                        <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid #f0f0f0' }}>
                                            <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#111' }}>Location Details</Typography>
                                        </Box>
                                        <Box sx={{ px: 3, py: 1 }}>
                                            {[
                                                [{ label: 'State', value: formatValue(userData.state) }, { label: 'District', value: formatValue(userData.district) }],
                                                [{ label: 'Assembly Area', value: formatValue(userData.assemblyArea) }, { label: 'Block', value: formatValue(userData.block) }],
                                                [{ label: 'Village Council', value: formatValue(userData.villageCouncil) }, { label: 'Village', value: formatValue(userData.village) }],
                                            ].map((row, ri) => (
                                                <Box key={ri}>
                                                    <Box sx={{ display: 'flex', py: 2.5 }}>
                                                        {row.map((field, fi) => (
                                                            <Box key={fi} sx={{ flex: 1, pr: fi === 0 ? 3 : 0 }}>
                                                                <Typography sx={{ color: '#999', fontSize: '12px', fontWeight: 400, mb: 0.5 }}>{field.label}</Typography>
                                                                <Typography sx={{ color: '#111', fontSize: '15px', fontWeight: 700 }}>{field.value}</Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                    {ri < 2 && <Divider />}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Paper>

                                    {/* Shipping Address */}
                                    <Paper variant="outlined" sx={{ borderRadius: '14px', overflow: 'hidden' }}>
                                        <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid #f0f0f0' }}>
                                            <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#111' }}>Shipping Address</Typography>
                                        </Box>
                                        <Box sx={{ px: 3, py: 2.5 }}>
                                            <Typography sx={{ color: '#999', fontSize: '12px', fontWeight: 400, mb: 0.5 }}>Full Address</Typography>
                                            <Typography sx={{ color: '#111', fontSize: '15px', fontWeight: 700, lineHeight: 1.6 }}>
                                                {[userData.shippingAddress, userData.village, userData.villageCouncil, userData.block, userData.district, userData.state].filter(Boolean).join(', ') || '—'}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Box>
                            )}

                            {/* Orders Tab */}
                            {tabValue === 2 && (
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 3, fontWeight: 700, borderBottom: '3px solid #0A7A2F', pb: 1, display: 'inline-block' }}>
                                        My Orders
                                    </Typography>
                                    {ordersLoading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={40} sx={{ color: '#0A7A2F' }} /></Box>
                                    ) : userOrders.length === 0 ? (
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <ShoppingBagIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                                            <Typography variant="h6" color="textSecondary" gutterBottom>No Orders Found</Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>You haven't placed any orders yet</Typography>
                                            <Button variant="contained" sx={{ bgcolor: '#0A7A2F', '&:hover': { bgcolor: '#085c22' } }} onClick={() => navigate('/products')}>Start Shopping</Button>
                                        </Box>
                                    ) : (
                                        <Grid container spacing={2}>
                                            {userOrders.map((order, index) => (
                                                <Grid item xs={12} key={order._id || index}>
                                                    <Card variant="outlined" sx={{ '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }, transition: 'all 0.3s ease' }}>
                                                        <CardContent>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                                <Box>
                                                                    <Typography variant="subtitle2" color="textSecondary">Order ID: #{order._id?.slice(-8).toUpperCase()}</Typography>
                                                                    <Typography variant="h6" sx={{ color: '#0A7A2F', fontWeight: 600 }}>{order.product?.name || 'Product Details'}</Typography>
                                                                </Box>
                                                                <StatusChip label={order.status || 'Pending'} status={order.status || 'Pending'} size="small" />
                                                            </Box>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={4}>
                                                                    <Typography variant="caption" color="textSecondary">Price</Typography>
                                                                    <Typography variant="body1" fontWeight="bold">₹{order.total}</Typography>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Typography variant="caption" color="textSecondary">Quantity</Typography>
                                                                    <Typography variant="body1">{order.quantity}</Typography>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Typography variant="caption" color="textSecondary">Date</Typography>
                                                                    <Typography variant="body1">{new Date(order.createdAt).toLocaleDateString()}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                </Box>
                            )}

                            {/* Transactions Tab */}
                            {tabValue === 3 && (
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 3, fontWeight: 700, borderBottom: '3px solid #0A7A2F', pb: 1, display: 'inline-block' }}>
                                        Transaction History
                                    </Typography>

                                    {/* Dashboard Overview / Stats */}
                                    <Grid container spacing={2} sx={{ mb: 4 }}>
                                        <Grid item xs={12} sm={4}>
                                            <Paper sx={{ p: 2.5, borderRadius: '12px', borderLeft: '4px solid #0A7A2F', bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600, textTransform: 'uppercase' }}>Total Orders</Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color: '#111' }}>{userOrders.length}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Paper sx={{ p: 2.5, borderRadius: '12px', borderLeft: '4px solid #F7931E', bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600, textTransform: 'uppercase' }}>Recharges</Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color: '#111' }}>{userTransactions.length}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Paper sx={{ p: 2.5, borderRadius: '12px', borderLeft: '4px solid #2196f3', bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                                <Typography variant="caption" sx={{ color: '#999', fontWeight: 600, textTransform: 'uppercase' }}>Support Tickets</Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color: '#111' }}>{userGrievances.length}</Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>


                                    {/* ── ORDER HISTORY SECTION ── */}
                                    <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 2, fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        🛒 Order History
                                    </Typography>

                                    {ordersLoading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={36} sx={{ color: '#0A7A2F' }} /></Box>
                                    ) : userOrders.length === 0 ? (
                                        <Box sx={{ textAlign: 'center', py: 4, bgcolor: 'white', borderRadius: '12px', border: '1px solid #eee', mb: 4 }}>
                                            <ShoppingBagIcon sx={{ fontSize: 60, color: '#eee', mb: 1 }} />
                                            <Typography sx={{ color: '#999', fontWeight: 600 }}>No Orders Yet</Typography>
                                            <Typography variant="body2" sx={{ color: '#ccc', mt: 0.5 }}>Your product orders will appear here.</Typography>
                                        </Box>
                                    ) : (
                                        <Box sx={{ mb: 4 }}>
                                            {userOrders.map((order, index) => (
                                                <Paper key={order._id || index} variant="outlined" sx={{ p: 2, borderRadius: '12px', mb: 1.5, cursor: 'pointer', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.07)', borderColor: '#0A7A2F' }, transition: 'all 0.2s' }} onClick={() => setTabValue(2)}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                            <Box sx={{ width: 42, height: 42, borderRadius: '10px', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <ShoppingBagIcon sx={{ color: '#0A7A2F', fontSize: 22 }} />
                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>
                                                                    Order #{order._id?.slice(-8).toUpperCase() || index + 1}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '12px', color: '#999' }}>
                                                                    {order.items?.length || 0} item(s) • {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                                </Typography>
                                                                {order.items?.slice(0, 2).map((item, i) => (
                                                                    <Typography key={i} sx={{ fontSize: '11px', color: '#aaa' }}>
                                                                        {item.name || item.productId?.name || 'Product'} × {item.quantity}
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ textAlign: 'right' }}>
                                                            <Typography sx={{ fontWeight: 800, color: '#111', fontSize: '15px' }}>
                                                                ₹{order.totalAmount || order.total || '—'}
                                                            </Typography>
                                                            <Chip
                                                                label={(order.status || 'Placed').toUpperCase()}
                                                                size="small"
                                                                sx={{
                                                                    height: 20, fontSize: '10px', fontWeight: 700, mt: 0.5,
                                                                    bgcolor: order.status === 'delivered' ? '#0A7A2F' : order.status === 'cancelled' ? '#d32f2f' : '#F7931E',
                                                                    color: 'white'
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                            ))}
                                        </Box>
                                    )}

                                    {/* ── RECHARGE HISTORY SECTION ── */}
                                    <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 2, fontWeight: 700, fontSize: '16px', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        ⚡ Recharge History
                                    </Typography>

                                    {transactionsLoading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={36} sx={{ color: '#0A7A2F' }} /></Box>
                                    ) : userTransactions.length === 0 ? (
                                        <Box sx={{ textAlign: 'center', py: 4, bgcolor: 'white', borderRadius: '12px', border: '1px solid #eee' }}>
                                            <ReceiptIcon sx={{ fontSize: 60, color: '#eee', mb: 1 }} />
                                            <Typography sx={{ color: '#999', fontWeight: 600 }}>No Recharges Yet</Typography>
                                            <Typography variant="body2" sx={{ color: '#ccc', mt: 0.5 }}>Your Mobile / DTH / Data recharges will appear here.</Typography>
                                            <Button variant="outlined" size="small" sx={{ mt: 2, borderColor: '#0A7A2F', color: '#0A7A2F', borderRadius: '8px' }} onClick={() => navigate('/recharge')}>
                                                Do a Recharge
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box>
                                            {userTransactions.map((txn, index) => (
                                                <Paper key={txn._id || index} variant="outlined" sx={{ p: 2, borderRadius: '12px', mb: 1.5, '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }, transition: 'all 0.2s' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                            <Box sx={{
                                                                width: 42, height: 42, borderRadius: '10px',
                                                                bgcolor: txn.status === 'success' ? '#e8f5e9' : txn.status === 'failed' ? '#ffebee' : '#fff8e1',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                            }}>
                                                                <ReceiptIcon sx={{ fontSize: 22, color: txn.status === 'success' ? '#0A7A2F' : txn.status === 'failed' ? '#d32f2f' : '#fbc02d' }} />
                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>
                                                                    {txn.operator} — {txn.type?.toUpperCase()} Recharge
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '12px', color: '#999' }}>
                                                                    #{txn.rechargeNumber} • {new Date(txn.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ textAlign: 'right' }}>
                                                            <Typography sx={{ fontWeight: 800, color: '#111', fontSize: '15px' }}>₹{txn.amount}</Typography>
                                                            <Chip
                                                                label={txn.status?.toUpperCase()}
                                                                size="small"
                                                                sx={{
                                                                    height: 20, fontSize: '10px', fontWeight: 700, mt: 0.5,
                                                                    bgcolor: txn.status === 'success' ? '#0A7A2F' : txn.status === 'failed' ? '#d32f2f' : '#fbc02d',
                                                                    color: 'white'
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            )}

                            {/* Grievances Tab */}
                            {tabValue === 4 && (
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 3, fontWeight: 700, borderBottom: '3px solid #0A7A2F', pb: 1, display: 'inline-block' }}>
                                        My Grievances / Tickets
                                    </Typography>
                                    {grievancesLoading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={40} sx={{ color: '#0A7A2F' }} /></Box>
                                    ) : userGrievances.length === 0 ? (
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <SupportAgentIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                                            <Typography variant="h6" color="textSecondary" gutterBottom>No Grievances Found</Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>You haven't submitted any grievances yet</Typography>
                                            <Button variant="contained" startIcon={<AssignmentIcon />} sx={{ bgcolor: '#F7931E', '&:hover': { bgcolor: '#e67e22' } }} onClick={() => navigate('/grievance')}>Submit a Grievance</Button>
                                        </Box>
                                    ) : (
                                        <Grid container spacing={2}>
                                            {userGrievances.map((grievance, index) => (
                                                <Grid item xs={12} key={index}>
                                                    <Zoom in={showContent} timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
                                                        <Card variant="outlined" sx={{ '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderColor: '#0A7A2F' }, transition: 'all 0.3s ease' }}>
                                                            <CardContent>
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <Avatar sx={{ bgcolor: '#e8f5e9', width: 32, height: 32 }}><SupportAgentIcon sx={{ color: '#0A7A2F', fontSize: 18 }} /></Avatar>
                                                                        <Typography variant="subtitle1" sx={{ color: '#0A7A2F', fontWeight: 600 }}>{grievance.ticket}</Typography>
                                                                    </Box>
                                                                    <StatusChip size="small" icon={getStatusIcon(grievance.status)} label={grievance.status} status={grievance.status} />
                                                                </Box>
                                                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}><strong>Subject:</strong> {grievance.subject || 'N/A'}</Typography>
                                                                {grievance.category && <Typography variant="body2" sx={{ mb: 1, color: '#666' }}><strong>Category:</strong> {grievance.category}</Typography>}
                                                                {grievance.message && <Typography variant="body2" sx={{ mb: 2, color: '#666', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}><strong>Message:</strong> {grievance.message}</Typography>}
                                                                <Divider sx={{ my: 1.5 }} />
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                        <EventIcon sx={{ color: '#F7931E', fontSize: 16 }} />
                                                                        <Typography variant="caption" sx={{ color: '#666' }}>{grievance.submittedDate ? new Date(grievance.submittedDate).toLocaleDateString() : 'N/A'}</Typography>
                                                                    </Box>
                                                                    <Button size="small" sx={{ color: '#0A7A2F' }} onClick={() => window.open(`/track-grievance?ticket=${grievance.ticket}`, '_blank')}>Track Status</Button>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>
                                                    </Zoom>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                </Box>
                            )}

                            {/* KYC Verification Tab */}
                            {tabValue === 5 && (
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 3, fontWeight: 700, borderBottom: '3px solid #0A7A2F', pb: 1, display: 'inline-block' }}>
                                        KYC Verification
                                    </Typography>

                                    <Paper variant="outlined" sx={{ borderRadius: '14px', p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                            <Typography variant="subtitle1" fontWeight="bold">Status</Typography>
                                            <StatusChip
                                                label={userData.kycStatus || 'Pending'}
                                                status={userData.kycStatus || 'Pending'}
                                                sx={{
                                                    ...(userData.kycStatus === 'Verified' && { bgcolor: '#0A7A2F', color: 'white' }),
                                                    ...(userData.kycStatus === 'Rejected' && { bgcolor: '#d32f2f', color: 'white' }),
                                                    ...(userData.kycStatus === 'Submitted' && { bgcolor: '#F7931E', color: 'white' }),
                                                    ...(userData.kycStatus === 'Pending' && { bgcolor: '#757575', color: 'white' }),
                                                    ...(userData.kycStatus === undefined && { bgcolor: '#757575', color: 'white' })
                                                }}
                                            />
                                        </Box>

                                        {userData.kycMessage && userData.kycStatus === 'Rejected' && (
                                            <Alert severity="error" sx={{ mb: 3 }}>
                                                <strong>Rejection Reason:</strong> {userData.kycMessage}
                                            </Alert>
                                        )}

                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Aadhar Number"
                                                    value={kycData.aadharNumber}
                                                    onChange={(e) => setKycData({ ...kycData, aadharNumber: e.target.value })}
                                                    disabled={kycReadOnly}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    fullWidth
                                                    label="PAN Number"
                                                    value={kycData.panNumber}
                                                    onChange={(e) => setKycData({ ...kycData, panNumber: e.target.value.toUpperCase() })}
                                                    disabled={kycReadOnly}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, mt: 1 }}>Bank Details</Typography>
                                                <Divider sx={{ mb: 2 }} />
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Account Number"
                                                    value={kycData.bankDetails.accountNumber}
                                                    onChange={(e) => setKycData({ ...kycData, bankDetails: { ...kycData.bankDetails, accountNumber: e.target.value } })}
                                                    disabled={kycReadOnly}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="IFSC Code"
                                                    value={kycData.bankDetails.ifscCode}
                                                    onChange={(e) => setKycData({ ...kycData, bankDetails: { ...kycData.bankDetails, ifscCode: e.target.value.toUpperCase() } })}
                                                    disabled={kycReadOnly}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    fullWidth
                                                    label="Bank Name"
                                                    value={kycData.bankDetails.bankName}
                                                    onChange={(e) => setKycData({ ...kycData, bankDetails: { ...kycData.bankDetails, bankName: e.target.value } })}
                                                    disabled={kycReadOnly}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, mt: 1 }}>Documents (Upload format: JPG, PNG)</Typography>
                                                <Divider sx={{ mb: 2 }} />
                                            </Grid>

                                            {/* Document Uploads Grid */}
                                            {['aadharFront', 'aadharBack', 'panCard', 'passbook'].map((docType) => (
                                                <Grid item xs={12} sm={6} md={3} key={docType}>
                                                    <Box sx={{ border: '1px dashed #ccc', borderRadius: 2, p: 2, textAlign: 'center', position: 'relative', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                        {kycData.kycDocuments[docType] ? (
                                                            <>
                                                                <img src={kycData.kycDocuments[docType]} alt={docType} style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }} />
                                                                {!kycReadOnly && (
                                                                    <IconButton size="small" sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.8)' }} onClick={() => setKycData({ ...kycData, kycDocuments: { ...kycData.kycDocuments, [docType]: '' } })}>
                                                                        <CancelIcon fontSize="small" color="error" />
                                                                    </IconButton>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CameraAltIcon sx={{ color: '#ccc', fontSize: 32, mb: 1 }} />
                                                                <Typography variant="caption" sx={{ color: '#888' }}>
                                                                    {docType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                                </Typography>
                                                                {!kycReadOnly && (
                                                                    <Button component="label" size="small" sx={{ mt: 1 }}>
                                                                        Upload
                                                                        <input type="file" hidden accept="image/*" onChange={(e) => handleKycImageUpload(e, docType)} />
                                                                    </Button>
                                                                )}
                                                            </>
                                                        )}
                                                    </Box>
                                                </Grid>
                                            ))}

                                            {!kycReadOnly && (
                                                <Grid item xs={12} sx={{ mt: 2 }}>
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        onClick={handleKycSubmit}
                                                        disabled={kycSubmitting}
                                                        startIcon={kycSubmitting ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon />}
                                                        sx={{ bgcolor: '#0A7A2F', '&:hover': { bgcolor: '#085c22' }, py: 1.5, fontSize: '16px', fontWeight: 'bold' }}
                                                    >
                                                        {kycSubmitting ? 'Submitting...' : 'Submit KYC'}
                                                    </Button>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Paper>
                                </Box>
                            )}
                        </Box>
                    </AnimatedPaper>
                </Fade>

                {/* Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    TransitionComponent={Slide}
                >
                    <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </FullPageContainer>
    );
};

export default MyAccount;