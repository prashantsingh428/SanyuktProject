import { useEffect, useState } from "react";
import api from "../../api";

// Material-UI imports
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

// Icons
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ProgressIcon from '@mui/icons-material/Autorenew';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import CategoryIcon from '@mui/icons-material/Category';

// Theme colors
const themeColors = {
    green: '#0A7A2F',
    orange: '#F7931E',
    white: '#FFFFFF',
    lightGreen: '#e8f5e9',
    lightOrange: '#fff3e0',
    darkGreen: '#065f25',
    darkOrange: '#e67e22'
};

// Styled Components
const AnimatedCard = styled(Card)(({ theme }) => ({
    transition: 'all 0.3s ease-in-out',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${themeColors.lightGreen}`,
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 12px 30px ${themeColors.green}20`,
        borderColor: themeColors.green,
    },
}));

const StyledChip = styled(Chip)(({ status }) => ({
    transition: 'all 0.3s ease',
    fontWeight: 600,
    ...(status === 'Pending' && {
        backgroundColor: themeColors.orange,
        color: themeColors.white,
        '&:hover': {
            backgroundColor: themeColors.darkOrange,
        },
    }),
    ...(status === 'In Progress' && {
        backgroundColor: themeColors.green,
        color: themeColors.white,
        '&:hover': {
            backgroundColor: themeColors.darkGreen,
        },
    }),
    ...(status === 'Resolved' && {
        backgroundColor: '#4caf50',
        color: themeColors.white,
        '&:hover': {
            backgroundColor: '#388e3c',
        },
    }),
}));

const FullPageContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    width: '100%',
    background: `linear-gradient(135deg, ${themeColors.white} 0%, ${themeColors.lightGreen} 50%, ${themeColors.lightOrange} 100%)`,
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

const HeaderPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: `linear-gradient(135deg, ${themeColors.green} 0%, ${themeColors.orange} 100%)`,
    color: themeColors.white,
    borderRadius: '16px',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 150,
        height: 150,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
    },
    '@keyframes float': {
        '0%': { transform: 'translateY(0px) rotate(0deg)' },
        '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        '100%': { transform: 'translateY(0px) rotate(0deg)' },
    },
}));

const StatsPaper = styled(Paper)(({ theme, bgcolor }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: bgcolor || themeColors.white,
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    border: `1px solid ${themeColors.lightGreen}`,
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: `0 8px 20px ${themeColors.green}30`,
    },
}));

const AdminGrievance = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [showContent, setShowContent] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            console.log("Fetching grievances...");
            const res = await api.get("/grievance/all");
            console.log("✅ API Response:", res);
            console.log("✅ Data received:", res.data);
            console.log("✅ Number of items:", res.data.length);

            if (res.data.length > 0) {
                console.log("✅ First item sample:", res.data[0]);
            } else {
                console.log("⚠️ No data received from API");
            }

            setData(res.data);
            setFilteredData(res.data);
            setTimeout(() => setShowContent(true), 300);
        } catch (error) {
            console.error("❌ Error fetching grievances:", error);
            console.error("❌ Error response:", error.response);
            console.error("❌ Error message:", error.message);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Error fetching grievances',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const grievance = data.find(item => item._id === id);
            console.log("Updating status for:", grievance.ticket, "to:", status);

            const res = await api.post("/grievance/update", {
                ticket: grievance.ticket,
                status
            });

            if (res.data.success) {
                setSnackbar({
                    open: true,
                    message: 'Status updated successfully!',
                    severity: 'success'
                });
                fetchData();
            }
        } catch (error) {
            console.error("Error updating status:", error);
            setSnackbar({
                open: true,
                message: error.response?.data?.msg || 'Error updating status',
                severity: 'error'
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = data;

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.ticket?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sellerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'All') {
            filtered = filtered.filter(item => item.status === statusFilter);
        }

        setFilteredData(filtered);
    }, [searchTerm, statusFilter, data]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <PendingIcon sx={{ color: themeColors.orange }} />;
            case 'In Progress': return <ProgressIcon sx={{ color: themeColors.green }} />;
            case 'Resolved': return <CheckCircleIcon sx={{ color: '#4caf50' }} />;
            default: return <AssignmentIcon sx={{ color: themeColors.green }} />;
        }
    };

    const handleRefresh = () => {
        fetchData();
        setSnackbar({
            open: true,
            message: 'Data refreshed!',
            severity: 'success'
        });
    };

    const stats = {
        total: data.length,
        pending: data.filter(item => item.status === 'Pending').length,
        inProgress: data.filter(item => item.status === 'In Progress').length,
        resolved: data.filter(item => item.status === 'Resolved').length
    };

    if (loading) {
        return (
            <FullPageContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Zoom in={true} timeout={1000}>
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress
                            size={isMobile ? 50 : 60}
                            thickness={4}
                            sx={{
                                color: themeColors.green,
                                animation: 'pulse 1.5s ease-in-out infinite',
                                '@keyframes pulse': {
                                    '0%': { transform: 'scale(1)' },
                                    '50%': { transform: 'scale(1.1)' },
                                    '100%': { transform: 'scale(1)' },
                                }
                            }}
                        />
                        <Typography
                            variant={isMobile ? "body1" : "h6"}
                            sx={{
                                mt: 2,
                                color: themeColors.green,
                                fontWeight: 500,
                                animation: 'fadeIn 1s ease-in-out',
                                '@keyframes fadeIn': {
                                    '0%': { opacity: 0 },
                                    '100%': { opacity: 1 },
                                }
                            }}
                        >
                            Loading grievances...
                        </Typography>
                    </Box>
                </Zoom>
            </FullPageContainer>
        );
    }

    return (
        <FullPageContainer>
            <Container
                maxWidth="xl"
                sx={{
                    height: '100%',
                    px: { xs: 1, sm: 2, md: 3 }
                }}
            >
                {/* Header Section */}
                <Slide direction="down" in={showContent} timeout={800}>
                    <HeaderPaper elevation={3}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 2,
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                flexWrap: 'wrap'
                            }}>
                                <Avatar
                                    sx={{
                                        bgcolor: themeColors.white,
                                        color: themeColors.green,
                                        width: { xs: 48, sm: 56 },
                                        height: { xs: 48, sm: 56 },
                                        animation: 'float 3s ease-in-out infinite',
                                    }}
                                >
                                    <AdminPanelSettingsIcon fontSize={isMobile ? "medium" : "large"} />
                                </Avatar>
                                <Box>
                                    <Typography
                                        variant={isMobile ? "h5" : "h4"}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: { xs: '1.5rem', sm: '2rem' }
                                        }}
                                    >
                                        Grievance Management
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Manage and track all user grievances
                                    </Typography>
                                </Box>
                            </Box>

                            <Tooltip title="Refresh">
                                <IconButton
                                    onClick={handleRefresh}
                                    sx={{
                                        color: themeColors.white,
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        '&:hover': {
                                            transform: 'rotate(180deg)',
                                            bgcolor: 'rgba(255,255,255,0.3)',
                                            transition: 'transform 0.5s ease'
                                        }
                                    }}
                                >
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {/* Stats Cards */}
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={3}>
                                    <Fade in={showContent} timeout={1000}>
                                        <StatsPaper bgcolor={themeColors.white}>
                                            <Typography variant="h4" sx={{ color: themeColors.green, fontWeight: 600 }}>
                                                {stats.total}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: themeColors.green }}>
                                                Total
                                            </Typography>
                                        </StatsPaper>
                                    </Fade>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Fade in={showContent} timeout={1200}>
                                        <StatsPaper bgcolor={themeColors.lightOrange}>
                                            <Typography variant="h4" sx={{ color: themeColors.orange, fontWeight: 600 }}>
                                                {stats.pending}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: themeColors.orange }}>
                                                Pending
                                            </Typography>
                                        </StatsPaper>
                                    </Fade>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Fade in={showContent} timeout={1400}>
                                        <StatsPaper bgcolor={themeColors.lightGreen}>
                                            <Typography variant="h4" sx={{ color: themeColors.green, fontWeight: 600 }}>
                                                {stats.inProgress}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: themeColors.green }}>
                                                In Progress
                                            </Typography>
                                        </StatsPaper>
                                    </Fade>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Fade in={showContent} timeout={1600}>
                                        <StatsPaper bgcolor={themeColors.white}>
                                            <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 600 }}>
                                                {stats.resolved}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#4caf50' }}>
                                                Resolved
                                            </Typography>
                                        </StatsPaper>
                                    </Fade>
                                </Grid>
                            </Grid>
                        </Box>
                    </HeaderPaper>
                </Slide>

                {/* Search and Filter Section */}
                <Grow in={showContent} timeout={1000}>
                    <Paper sx={{
                        p: 2,
                        mb: 3,
                        borderRadius: '12px',
                        backgroundColor: themeColors.white,
                        border: `1px solid ${themeColors.lightGreen}`,
                    }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Search by name, ticket, seller ID, mobile, email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: themeColors.green }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '20px',
                                            '&:hover fieldset': {
                                                borderColor: themeColors.green,
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: themeColors.green,
                                            },
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel sx={{ color: themeColors.green }}>Filter by Status</InputLabel>
                                    <Select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        label="Filter by Status"
                                        sx={{
                                            borderRadius: '20px',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: themeColors.green,
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: themeColors.green,
                                            },
                                        }}
                                    >
                                        <MenuItem value="All">All Status</MenuItem>
                                        <MenuItem value="Pending">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PendingIcon sx={{ color: themeColors.orange }} />
                                                <span>Pending</span>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="In Progress">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <ProgressIcon sx={{ color: themeColors.green }} />
                                                <span>In Progress</span>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value="Resolved">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CheckCircleIcon sx={{ color: '#4caf50' }} />
                                                <span>Resolved</span>
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Typography variant="body2" align={isMobile ? 'left' : 'right'} sx={{ color: themeColors.green }}>
                                    Showing {filteredData.length} of {data.length} grievances
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grow>

                {/* Debug Info - Show if no data */}
                {data.length === 0 && (
                    <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff3e0', border: '1px solid #f7931e' }}>
                        <Typography variant="h6" sx={{ color: themeColors.orange, mb: 2 }}>
                            ⚠️ Debug Information - No Data Found
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            1. Check if backend is running on correct port
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            2. Check MongoDB connection
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            3. Check if any grievances exist in database
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            4. API endpoint: /grievance/all
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={fetchData}
                            sx={{ mt: 2, bgcolor: themeColors.orange }}
                        >
                            Retry Fetch
                        </Button>
                    </Paper>
                )}

                {/* Grievance Cards */}
                {filteredData.length === 0 ? (
                    <Fade in={showContent} timeout={800}>
                        <Paper sx={{
                            p: 6,
                            textAlign: 'center',
                            backgroundColor: themeColors.white,
                            borderRadius: '16px',
                            border: `1px solid ${themeColors.lightGreen}`,
                        }}>
                            <SupportAgentIcon sx={{ fontSize: 80, color: themeColors.lightGreen, mb: 2 }} />
                            <Typography variant="h6" sx={{ color: themeColors.green }} gutterBottom>
                                No grievances found
                            </Typography>
                            <Typography variant="body2" sx={{ color: themeColors.orange }}>
                                {searchTerm || statusFilter !== 'All' ? 'Try adjusting your filters' : 'New grievances will appear here'}
                            </Typography>
                        </Paper>
                    </Fade>
                ) : (
                    <Grid container spacing={3}>
                        {filteredData.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={item._id}>
                                <Zoom in={showContent} timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <AnimatedCard>
                                        <CardContent>
                                            {/* Header with Name and Ticket */}
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Avatar sx={{ bgcolor: themeColors.lightGreen, color: themeColors.green, width: 32, height: 32 }}>
                                                        <SupportAgentIcon fontSize="small" />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: themeColors.green }}>
                                                            {item.name || 'Anonymous'}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: themeColors.orange }}>
                                                            {item.ticket || 'No ticket'}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <StyledChip
                                                    size="small"
                                                    icon={getStatusIcon(item.status)}
                                                    label={item.status}
                                                    status={item.status}
                                                />
                                            </Box>

                                            {/* Direct Seller ID */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <BadgeIcon sx={{ color: themeColors.green, fontSize: 18 }} />
                                                <Typography variant="body2" sx={{ color: '#666' }}>
                                                    <strong>Seller ID:</strong> {item.sellerId || 'N/A'}
                                                </Typography>
                                            </Box>

                                            {/* Mobile */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <PhoneIcon sx={{ color: themeColors.green, fontSize: 18 }} />
                                                <Typography variant="body2" sx={{ color: '#666' }}>
                                                    <strong>Mobile:</strong> {item.mobile || 'N/A'}
                                                </Typography>
                                            </Box>

                                            {/* Email */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <EmailIcon sx={{ color: themeColors.green, fontSize: 18 }} />
                                                <Typography variant="body2" sx={{ color: '#666', wordBreak: 'break-all' }}>
                                                    <strong>Email:</strong> {item.email || 'N/A'}
                                                </Typography>
                                            </Box>

                                            {/* Category */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <CategoryIcon sx={{ color: themeColors.green, fontSize: 18 }} />
                                                <Typography variant="body2" sx={{ color: '#666' }}>
                                                    <strong>Category:</strong> {item.category || 'N/A'}
                                                </Typography>
                                            </Box>

                                            {/* Subject */}
                                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: themeColors.green }}>
                                                <strong>Subject:</strong> {item.subject || 'No subject'}
                                            </Typography>

                                            {/* Message */}
                                            {item.message && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mb: 2,
                                                        color: '#666',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    <strong>Message:</strong> {item.message}
                                                </Typography>
                                            )}

                                            <Divider sx={{ my: 2, borderColor: themeColors.lightGreen }} />

                                            {/* Status Update */}
                                            <FormControl fullWidth size="small">
                                                <Select
                                                    value={item.status}
                                                    onChange={(e) => updateStatus(item._id, e.target.value)}
                                                    sx={{
                                                        borderRadius: '20px',
                                                        '& .MuiSelect-select': {
                                                            py: 1,
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: themeColors.green,
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="Pending">
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <PendingIcon fontSize="small" sx={{ color: themeColors.orange }} />
                                                            <span style={{ color: themeColors.orange }}>Pending</span>
                                                        </Box>
                                                    </MenuItem>
                                                    <MenuItem value="In Progress">
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <ProgressIcon fontSize="small" sx={{ color: themeColors.green }} />
                                                            <span style={{ color: themeColors.green }}>In Progress</span>
                                                        </Box>
                                                    </MenuItem>
                                                    <MenuItem value="Resolved">
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <CheckCircleIcon fontSize="small" sx={{ color: '#4caf50' }} />
                                                            <span style={{ color: '#4caf50' }}>Resolved</span>
                                                        </Box>
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>

                                            {/* Created Date */}
                                            {item.createdAt && (
                                                <Typography variant="caption" sx={{ color: themeColors.orange, display: 'block', mt: 1 }}>
                                                    Created: {new Date(item.createdAt).toLocaleDateString()}
                                                </Typography>
                                            )}
                                        </CardContent>
                                    </AnimatedCard>
                                </Zoom>
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    TransitionComponent={Slide}
                >
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{
                            width: '100%',
                            backgroundColor: themeColors.white,
                            color: themeColors.green,
                            border: `1px solid ${themeColors.green}`,
                            '& .MuiAlert-icon': {
                                color: themeColors.green,
                            },
                        }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </FullPageContainer>
    );
};

export default AdminGrievance;
