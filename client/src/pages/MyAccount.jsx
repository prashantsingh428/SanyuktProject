import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const [userData, setUserData] = useState(null);
    const [userGrievances, setUserGrievances] = useState([]);
    const [grievancesLoading, setGrievancesLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [showContent, setShowContent] = useState(false);

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

            // Fetch user's grievances
            fetchUserGrievances(parsedUser.email);

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
                                <Avatar sx={{ bgcolor: '#F7931E', width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 } }}>
                                    <AccountCircleIcon fontSize={isMobile ? "medium" : "large"} />
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

                {/* Tabs */}
                <Grow in={showContent} timeout={1000}>
                    <AnimatedPaper sx={{ mb: 3, borderRadius: '16px', overflow: 'hidden' }}>
                        <Tabs
                            value={tabValue}
                            onChange={(e, val) => setTabValue(val)}
                            variant={isMobile ? "scrollable" : "fullWidth"}
                            scrollButtons={isMobile ? "auto" : false}
                            sx={{
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontSize: { xs: '14px', sm: '16px' },
                                    fontWeight: 500,
                                    minHeight: { xs: '48px', sm: '60px' },
                                    flex: isMobile ? '0 0 auto' : 1,
                                },
                                '& .Mui-selected': { color: '#0A7A2F !important', fontWeight: 600 },
                                '& .MuiTabs-indicator': { backgroundColor: '#0A7A2F', height: '3px' },
                            }}
                        >
                            <StyledTab icon={<PersonIcon />} label="Profile" iconPosition="start" />
                            <StyledTab icon={<HomeIcon />} label="Address" iconPosition="start" />
                            <StyledTab icon={<ShoppingBagIcon />} label="Orders" iconPosition="start" />
                            <StyledTab icon={<ReceiptIcon />} label="Transactions" iconPosition="start" />
                        </Tabs>
                    </AnimatedPaper>
                </Grow>

                {/* Tab Panels */}
                <Fade in={showContent} timeout={800}>
                    <AnimatedPaper sx={{ p: { xs: 2, sm: 3 }, borderRadius: '16px' }}>
                        {/* Profile Tab */}
                        {tabValue === 0 && (
                            <Box>
                                <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 3, fontWeight: 600, borderBottom: '2px solid #0A7A2F', pb: 1, display: 'inline-block' }}>
                                    Profile Information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Zoom in={showContent} timeout={600} style={{ transitionDelay: '200ms' }}>
                                            <AnimatedCard variant="outlined">
                                                <CardContent>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ fontWeight: 600 }}>
                                                        Personal Details
                                                    </Typography>
                                                    <Divider sx={{ mb: 2 }} />
                                                    <InfoItem><PersonIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">User Name</Typography><Typography variant="body2">{formatValue(userData.userName)}</Typography></Box></InfoItem>
                                                    <InfoItem><GroupsIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Father's Name</Typography><Typography variant="body2">{formatValue(userData.fatherName)}</Typography></Box></InfoItem>
                                                    <InfoItem><EmailIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Email</Typography><Typography variant="body2">{formatValue(userData.email)}</Typography></Box></InfoItem>
                                                    <InfoItem><PhoneIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Mobile</Typography><Typography variant="body2">{formatValue(userData.mobile)}</Typography></Box></InfoItem>
                                                </CardContent>
                                            </AnimatedCard>
                                        </Zoom>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Zoom in={showContent} timeout={600} style={{ transitionDelay: '400ms' }}>
                                            <AnimatedCard variant="outlined">
                                                <CardContent>
                                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ fontWeight: 600 }}>
                                                        Account Details
                                                    </Typography>
                                                    <Divider sx={{ mb: 2 }} />
                                                    <InfoItem><FingerprintIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Sponsor ID</Typography><Typography variant="body2">{formatValue(userData.sponsorId)}</Typography></Box></InfoItem>
                                                    <InfoItem><BadgeIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Sponsor Name</Typography><Typography variant="body2">{formatValue(userData.sponsorName)}</Typography></Box></InfoItem>
                                                    <InfoItem><WcIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Gender</Typography><Typography variant="body2">{formatValue(userData.gender)}</Typography></Box></InfoItem>
                                                    <InfoItem><PersonIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Position</Typography><Typography variant="body2">{formatValue(userData.position)}</Typography></Box></InfoItem>
                                                </CardContent>
                                            </AnimatedCard>
                                        </Zoom>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {/* Address Tab */}
                        {tabValue === 1 && (
                            <Box>
                                <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 3, fontWeight: 600, borderBottom: '2px solid #0A7A2F', pb: 1, display: 'inline-block' }}>
                                    Address Information
                                </Typography>
                                <Zoom in={showContent} timeout={600}>
                                    <AnimatedCard variant="outlined">
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}><InfoItem><LocationOnIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Shipping Address</Typography><Typography variant="body2">{formatValue(userData.shippingAddress)}</Typography></Box></InfoItem></Grid>
                                                <Grid item xs={12} sm={6}><InfoItem><FlagIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">State</Typography><Typography variant="body2">{formatValue(userData.state)}</Typography></Box></InfoItem></Grid>
                                                <Grid item xs={12} sm={6}><InfoItem><FlagIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">District</Typography><Typography variant="body2">{formatValue(userData.district)}</Typography></Box></InfoItem></Grid>
                                                <Grid item xs={12} sm={6}><InfoItem><HomeIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Assembly Area</Typography><Typography variant="body2">{formatValue(userData.assemblyArea)}</Typography></Box></InfoItem></Grid>
                                                <Grid item xs={12} sm={6}><InfoItem><AgricultureIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Block</Typography><Typography variant="body2">{formatValue(userData.block)}</Typography></Box></InfoItem></Grid>
                                                <Grid item xs={12} sm={6}><InfoItem><GroupsIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Village Council</Typography><Typography variant="body2">{formatValue(userData.villageCouncil)}</Typography></Box></InfoItem></Grid>
                                                <Grid item xs={12} sm={6}><InfoItem><VillaIcon sx={{ color: '#F7931E' }} /><Box><Typography variant="caption" color="textSecondary">Village</Typography><Typography variant="body2">{formatValue(userData.village)}</Typography></Box></InfoItem></Grid>
                                            </Grid>
                                            <Box sx={{ mt: 3 }}>
                                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>Complete Address:</Typography>
                                                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                                                    <Typography>{[userData.shippingAddress, userData.village, userData.villageCouncil, userData.block, userData.district, userData.state].filter(Boolean).join(', ') || 'No address available'}</Typography>
                                                </Paper>
                                            </Box>
                                        </CardContent>
                                    </AnimatedCard>
                                </Zoom>
                            </Box>
                        )}

                        {/* 👇 UPDATED ORDERS TAB - SHOW GRIEVANCES 👇 */}
                        {tabValue === 2 && (
                            <Box>
                                <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 3, fontWeight: 600, borderBottom: '2px solid #0A7A2F', pb: 1, display: 'inline-block' }}>
                                    My Grievances / Tickets
                                </Typography>

                                {grievancesLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                        <CircularProgress size={40} sx={{ color: '#0A7A2F' }} />
                                    </Box>
                                ) : userGrievances.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                        <SupportAgentIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                                        <Typography variant="h6" color="textSecondary" gutterBottom>
                                            No Grievances Found
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                                            You haven't submitted any grievances yet
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            startIcon={<AssignmentIcon />}
                                            sx={{ bgcolor: '#F7931E', '&:hover': { bgcolor: '#e67e22' } }}
                                            onClick={() => navigate('/grievance')}
                                        >
                                            Submit a Grievance
                                        </Button>
                                    </Box>
                                ) : (
                                    <Grid container spacing={2}>
                                        {userGrievances.map((grievance, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Zoom in={showContent} timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
                                                    <Card variant="outlined" sx={{
                                                        '&:hover': {
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                            borderColor: '#0A7A2F'
                                                        },
                                                        transition: 'all 0.3s ease'
                                                    }}>
                                                        <CardContent>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <Avatar sx={{ bgcolor: '#e8f5e9', width: 32, height: 32 }}>
                                                                        <SupportAgentIcon sx={{ color: '#0A7A2F', fontSize: 18 }} />
                                                                    </Avatar>
                                                                    <Typography variant="subtitle1" sx={{ color: '#0A7A2F', fontWeight: 600 }}>
                                                                        {grievance.ticket}
                                                                    </Typography>
                                                                </Box>
                                                                <StatusChip
                                                                    size="small"
                                                                    icon={getStatusIcon(grievance.status)}
                                                                    label={grievance.status}
                                                                    status={grievance.status}
                                                                />
                                                            </Box>

                                                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                                                <strong>Subject:</strong> {grievance.subject || 'N/A'}
                                                            </Typography>

                                                            {grievance.category && (
                                                                <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                                                                    <strong>Category:</strong> {grievance.category}
                                                                </Typography>
                                                            )}

                                                            {grievance.message && (
                                                                <Typography variant="body2" sx={{
                                                                    mb: 2,
                                                                    color: '#666',
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis'
                                                                }}>
                                                                    <strong>Message:</strong> {grievance.message}
                                                                </Typography>
                                                            )}

                                                            <Divider sx={{ my: 1.5 }} />

                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                    <EventIcon sx={{ color: '#F7931E', fontSize: 16 }} />
                                                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                                                        {grievance.submittedDate ? new Date(grievance.submittedDate).toLocaleDateString() : 'N/A'}
                                                                    </Typography>
                                                                </Box>
                                                                <Button
                                                                    size="small"
                                                                    sx={{ color: '#0A7A2F' }}
                                                                    onClick={() => window.open(`/track-grievance?ticket=${grievance.ticket}`, '_blank')}
                                                                >
                                                                    Track Status
                                                                </Button>
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

                        {/* Transactions Tab */}
                        {tabValue === 3 && (
                            <Box>
                                <Typography variant="h6" sx={{ color: '#0A7A2F', mb: 3, fontWeight: 600, borderBottom: '2px solid #0A7A2F', pb: 1, display: 'inline-block' }}>
                                    Transaction History
                                </Typography>
                                <Box sx={{ textAlign: 'center', py: 6 }}>
                                    <ReceiptIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                                    <Typography variant="h6" color="textSecondary" gutterBottom>
                                        No Transactions Yet
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Your transactions will appear here
                                    </Typography>
                                </Box>
                            </Box>
                        )}
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
