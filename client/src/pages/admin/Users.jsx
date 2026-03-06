import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Grid, Box, Chip, TextField, Divider, Paper
} from '@mui/material';

const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: ""
    });

    // KYC State
    const [kycDialogOpen, setKycDialogOpen] = useState(false);
    const [selectedUserForKyc, setSelectedUserForKyc] = useState(null);
    const [kycRejectReason, setKycRejectReason] = useState("");
    const [isRejecting, setIsRejecting] = useState(false);

    // ================= FETCH USERS =================
    const fetchUsers = async () => {

        try {
            setLoading(true);
            setError("");

            console.log('Fetching users from: /admin/users');

            // Correct URL: /admin/users (not /api/admin/users because api.js already has /api)
            const response = await api.get("/admin/users");

            console.log('Users response:', response.data);

            // Handle different response structures
            if (response.data.users) {
                setUsers(response.data.users);
            } else if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else if (response.data.data) {
                setUsers(response.data.data);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Fetch error:", error.response?.data || error.message);

            if (error.response?.status === 403) {
                setError("Permission denied. Please log out and log back in to refresh your session.");
            } else if (error.response?.status === 401) {
                setError("Session expired. Please login again.");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setError("Failed to fetch users. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ================= DELETE USER =================
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            setError("");

            await api.delete(`/admin/users/${id}`);

            // Refresh users list
            fetchUsers();
        } catch (error) {
            console.error("Delete error:", error.response?.data || error.message);

            if (error.response?.status === 403) {
                setError("Admin access only. You don't have permission.");
            } else if (error.response?.status === 404) {
                setError("User not found.");
            } else {
                setError("Delete failed. Please try again.");
            }
        }
    };

    // ================= EDIT CLICK =================
    const handleEditClick = (user) => {
        setEditingUser(user._id);
        setFormData({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "user",
            status: user.status || "active"
        });
    };

    // ================= UPDATE USER =================
    const handleUpdate = async () => {
        try {
            setError("");

            await api.put(`/admin/users/${editingUser}`, formData);

            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Update error:", error.response?.data || error.message);

            if (error.response?.status === 403) {
                setError("Admin access only. You don't have permission.");
            } else if (error.response?.status === 404) {
                setError("User not found.");
            } else {
                setError("Update failed. Please try again.");
            }
        }
    };

    // ================= CANCEL EDIT =================
    const handleCancelEdit = () => {
        setEditingUser(null);
        setFormData({
            name: "",
            email: "",
            role: "",
            status: ""
        });
    };

    // ================= HANDLE INPUT CHANGE =================
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ================= KYC HANDLERS =================
    const handleOpenKyc = (user) => {
        setSelectedUserForKyc(user);
        setKycRejectReason(user.kycMessage || "");
        setIsRejecting(false);
        setKycDialogOpen(true);
    };

    const handleCloseKyc = () => {
        setKycDialogOpen(false);
        setSelectedUserForKyc(null);
    };

    const handleUpdateKycStatus = async (status) => {
        if (status === 'Rejected' && !kycRejectReason.trim()) {
            setError("Please provide a rejection reason.");
            setKycDialogOpen(false);
            window.scrollTo(0, 0);
            return;
        }

        try {
            setError("");
            await api.put(`/admin/users/${selectedUserForKyc._id}`, {
                kycStatus: status,
                kycMessage: status === 'Rejected' ? kycRejectReason : ""
            });
            handleCloseKyc();
            fetchUsers();
        } catch (error) {
            console.error("Update KYC error:", error.response?.data || error.message);
            setError("Failed to update KYC status.");
            setKycDialogOpen(false);
            window.scrollTo(0, 0);
        }
    };

    // ================= LOGOUT =================
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // ================= GET STATUS COLOR =================
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return '#4CAF50';
            case 'inactive':
                return '#f44336';
            case 'pending':
                return '#ff9800';
            default:
                return '#9e9e9e';
        }
    };

    // ================= GET ROLE COLOR =================
    const getRoleColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return '#9c27b0';
            case 'premium':
                return '#2196F3';
            default:
                return '#757575';
        }
    };

    // ================= GET KYC STATUS COLOR =================
    const getKycStatusColor = (status) => {
        switch (status) {
            case 'Verified': return '#4CAF50';
            case 'Rejected': return '#f44336';
            case 'Submitted': return '#2196F3';
            default: return '#757575'; // Pending
        }
    };

    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
            fontFamily: "Arial, sans-serif"
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: "#0A7A2F",
                color: "white",
                padding: "20px 40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: "24px" }}>Sanyukt Parivar</h1>
                    <p style={{ margin: "5px 0 0", opacity: 0.9 }}>
                        Welcome back, {currentUser.name || 'Admin'}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ padding: "40px" }}>
                {/* Dashboard Header */}
                <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div>
                        <h2 style={{ margin: 0, color: "#333" }}>Admin Users Panel</h2>
                        <p style={{ margin: "5px 0 0", color: "#666" }}>
                            Manage all registered users
                        </p>
                    </div>
                    <button
                        onClick={fetchUsers}
                        disabled={loading}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#0A7A2F",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Refreshing..." : "Refresh Users"}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        padding: "16px",
                        backgroundColor: "#ffebee",
                        color: "#c62828",
                        border: "1px solid #ffcdd2",
                        borderRadius: "4px",
                        marginBottom: "20px"
                    }}>
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Users Table */}
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    overflow: "hidden"
                }}>
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "60px" }}>
                            <div style={{
                                width: "40px",
                                height: "40px",
                                margin: "0 auto 20px",
                                border: "4px solid #f3f3f3",
                                borderTop: "4px solid #0A7A2F",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite"
                            }}></div>
                            <p style={{ color: "#666" }}>Loading users...</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table style={{
                                width: "100%",
                                borderCollapse: "collapse"
                            }}>
                                <thead>
                                    <tr style={{
                                        backgroundColor: "#f8f9fa",
                                        borderBottom: "2px solid #dee2e6"
                                    }}>
                                        <th style={{ padding: "15px", textAlign: "left", fontWeight: "600" }}>Name</th>
                                        <th style={{ padding: "15px", textAlign: "left", fontWeight: "600" }}>Email</th>
                                        <th style={{ padding: "15px", textAlign: "left", fontWeight: "600" }}>Role</th>
                                        <th style={{ padding: "15px", textAlign: "left", fontWeight: "600" }}>Status</th>
                                        <th style={{ padding: "15px", textAlign: "left", fontWeight: "600" }}>KYC Status</th>
                                        <th style={{ padding: "15px", textAlign: "left", fontWeight: "600" }}>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" style={{
                                                padding: "60px",
                                                textAlign: "center",
                                                color: "#666"
                                            }}>
                                                No users found
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user._id} style={{
                                                borderBottom: "1px solid #dee2e6",
                                                backgroundColor: editingUser === user._id ? "#f0f7ff" : "white"
                                            }}>
                                                <td style={{ padding: "15px" }}>
                                                    {editingUser === user._id ? (
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            style={{
                                                                padding: "8px",
                                                                border: "1px solid #ddd",
                                                                borderRadius: "4px",
                                                                width: "100%"
                                                            }}
                                                        />
                                                    ) : (
                                                        user.name || "N/A"
                                                    )}
                                                </td>

                                                <td style={{ padding: "15px" }}>
                                                    {editingUser === user._id ? (
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            style={{
                                                                padding: "8px",
                                                                border: "1px solid #ddd",
                                                                borderRadius: "4px",
                                                                width: "100%"
                                                            }}
                                                        />
                                                    ) : (
                                                        user.email || "N/A"
                                                    )}
                                                </td>

                                                <td style={{ padding: "15px" }}>
                                                    {editingUser === user._id ? (
                                                        <select
                                                            name="role"
                                                            value={formData.role}
                                                            onChange={handleInputChange}
                                                            style={{
                                                                padding: "8px",
                                                                border: "1px solid #ddd",
                                                                borderRadius: "4px",
                                                                width: "100%"
                                                            }}
                                                        >
                                                            <option value="user">User</option>
                                                            <option value="premium">Premium</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                    ) : (
                                                        <span style={{
                                                            padding: "4px 8px",
                                                            borderRadius: "4px",
                                                            backgroundColor: getRoleColor(user.role),
                                                            color: "white",
                                                            fontSize: "0.9em"
                                                        }}>
                                                            {user.role || "user"}
                                                        </span>
                                                    )}
                                                </td>

                                                <td style={{ padding: "15px" }}>
                                                    {editingUser === user._id ? (
                                                        <select
                                                            name="status"
                                                            value={formData.status}
                                                            onChange={handleInputChange}
                                                            style={{
                                                                padding: "8px",
                                                                border: "1px solid #ddd",
                                                                borderRadius: "4px",
                                                                width: "100%"
                                                            }}
                                                        >
                                                            <option value="active">Active</option>
                                                            <option value="inactive">Inactive</option>
                                                            <option value="pending">Pending</option>
                                                        </select>
                                                    ) : (
                                                        <span style={{
                                                            padding: "4px 8px",
                                                            borderRadius: "4px",
                                                            backgroundColor: getStatusColor(user.status),
                                                            color: "white",
                                                            fontSize: "0.9em"
                                                        }}>
                                                            {user.status || "active"}
                                                        </span>
                                                    )}
                                                </td>

                                                <td style={{ padding: "15px" }}>
                                                    <span style={{
                                                        padding: "4px 8px",
                                                        borderRadius: "4px",
                                                        backgroundColor: getKycStatusColor(user.kycStatus),
                                                        color: "white",
                                                        fontSize: "0.9em"
                                                    }}>
                                                        {user.kycStatus || "Pending"}
                                                    </span>
                                                </td>

                                                <td style={{ padding: "15px" }}>
                                                    {editingUser === user._id ? (
                                                        <div style={{ display: "flex", gap: "8px" }}>
                                                            <button
                                                                onClick={handleUpdate}
                                                                style={{
                                                                    padding: "8px 16px",
                                                                    backgroundColor: "#4CAF50",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={handleCancelEdit}
                                                                style={{
                                                                    padding: "8px 16px",
                                                                    backgroundColor: "#f44336",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div style={{ display: "flex", gap: "8px" }}>
                                                            <button
                                                                onClick={() => handleEditClick(user)}
                                                                style={{
                                                                    padding: "8px 16px",
                                                                    backgroundColor: "#2196F3",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleOpenKyc(user)}
                                                                style={{
                                                                    padding: "8px 16px",
                                                                    backgroundColor: "#ff9800",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                KYC
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(user._id)}
                                                                style={{
                                                                    padding: "8px 16px",
                                                                    backgroundColor: "#f44336",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Stats */}
                {!loading && users.length > 0 && (
                    <div style={{
                        marginTop: "20px",
                        padding: "20px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "15px"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0A7A2F" }}>
                                {users.length}
                            </div>
                            <div style={{ color: "#666", fontSize: "14px" }}>Total Users</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#9c27b0" }}>
                                {users.filter(u => u.role === 'admin').length}
                            </div>
                            <div style={{ color: "#666", fontSize: "14px" }}>Admins</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#4CAF50" }}>
                                {users.filter(u => u.status === 'active').length}
                            </div>
                            <div style={{ color: "#666", fontSize: "14px" }}>Active Users</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ff9800" }}>
                                {users.filter(u => u.status === 'pending').length}
                            </div>
                            <div style={{ color: "#666", fontSize: "14px" }}>Pending</div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div style={{
                    marginTop: "20px",
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    color: "#666"
                }}>
                    <p>© 2024 Sanyukt Parivar. All rights reserved.</p>
                </div>
            </div>

            {/* KYC Dialog */}
            <Dialog open={kycDialogOpen} onClose={handleCloseKyc} maxWidth="md" fullWidth>
                <DialogTitle sx={{ bgcolor: '#0A7A2F', color: 'white' }}>KYC Verification for {selectedUserForKyc?.name}</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    {selectedUserForKyc && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">Aadhar Number</Typography>
                                <Typography variant="body1">{selectedUserForKyc.aadharNumber || 'N/A'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">PAN Number</Typography>
                                <Typography variant="body1">{selectedUserForKyc.panNumber || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>Bank Details</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle2" color="textSecondary">Account Number</Typography>
                                <Typography variant="body1">{selectedUserForKyc.bankDetails?.accountNumber || 'N/A'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle2" color="textSecondary">IFSC Code</Typography>
                                <Typography variant="body1">{selectedUserForKyc.bankDetails?.ifscCode || 'N/A'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle2" color="textSecondary">Bank Name</Typography>
                                <Typography variant="body1">{selectedUserForKyc.bankDetails?.bankName || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>Documents</Typography>
                            </Grid>
                            {['aadharFront', 'aadharBack', 'panCard', 'passbook'].map((docKey) => (
                                <Grid item xs={12} sm={6} md={3} key={docKey}>
                                    <Paper variant="outlined" sx={{ p: 1, textAlign: 'center', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                                            {docKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </Typography>
                                        {selectedUserForKyc.kycDocuments?.[docKey] ? (
                                            <a href={selectedUserForKyc.kycDocuments[docKey]} target="_blank" rel="noreferrer">
                                                <img
                                                    src={selectedUserForKyc.kycDocuments[docKey]}
                                                    alt={docKey}
                                                    style={{ maxHeight: '70px', maxWidth: '100%', objectFit: 'contain' }}
                                                />
                                            </a>
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">Not Uploaded</Typography>
                                        )}
                                    </Paper>
                                </Grid>
                            ))}

                            {isRejecting && (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Reason for Rejection"
                                        multiline
                                        rows={2}
                                        value={kycRejectReason}
                                        onChange={(e) => setKycRejectReason(e.target.value)}
                                        required
                                        error={!kycRejectReason.trim()}
                                        helperText={!kycRejectReason.trim() ? "Rejection reason is required" : ""}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid #eee' }}>
                    <Button onClick={handleCloseKyc} color="inherit">Cancel</Button>
                    {!isRejecting ? (
                        <>
                            <Button variant="outlined" color="error" onClick={() => setIsRejecting(true)}>Reject</Button>
                            <Button variant="contained" color="success" onClick={() => handleUpdateKycStatus('Verified')}>Verify & Approve</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setIsRejecting(false)}>Back</Button>
                            <Button variant="contained" color="error" onClick={() => handleUpdateKycStatus('Rejected')}>Confirm Rejection</Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>

            {/* Animation keyframes */}
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminUsers;