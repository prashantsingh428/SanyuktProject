import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

// 7. FOOTER BACKGROUND & SPACING
const FooterContainer = styled(Box)({
    backgroundColor: '#0A7A2F',
    color: '#FFFFFF',
    fontFamily: '"Poppins", "Roboto", sans-serif',
    width: '100%',
});

const FooterContent = styled(Container)({
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    paddingTop: '60px',
    paddingBottom: '60px',
});

// LOGO & INFO (COLUMN 1)
const LogoContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    cursor: 'pointer',
});

const LogoImage = styled('img')({
    height: '45px',
    width: 'auto',
    objectFit: 'contain',
});

const LogoTextContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

const LogoMain = styled('span')({
    fontFamily: '"Poppins", "Roboto", sans-serif',
    fontWeight: 700,
    fontSize: '1.2rem',
    color: '#FFFFFF',
});

const CompanyDescription = styled(Typography)({
    fontSize: '14px',
    lineHeight: 1.7,
    color: '#FFFFFF',
    opacity: 0.9,
    fontFamily: '"Poppins", "Roboto", sans-serif',
    maxWidth: '320px',
    marginBottom: '24px',
});

// SECTION TITLES
const SectionTitle = styled(Typography)({
    fontSize: '18px',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: '24px',
    fontFamily: '"Poppins", "Roboto", sans-serif',
});

// LINKS
const FooterLink = styled(Link)({
    display: 'block',
    color: '#FFFFFF',
    fontSize: '14px',
    textDecoration: 'none',
    marginBottom: '12px',
    fontFamily: '"Poppins", "Roboto", sans-serif',
    transition: 'color 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        color: '#F7931E',
    },
});

// CONTACT DETAILS (RIGHT SIDE OF COLUMN 3)
const ContactText = styled(Typography)({
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: '8px',
    fontFamily: '"Poppins", "Roboto", sans-serif',
});

const ContactLine = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#FFFFFF',
    opacity: 0.9,
    fontFamily: '"Poppins", "Roboto", sans-serif',
    transition: 'color 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        color: '#F7931E',
    },
});

// SOCIAL ICONS
const SocialIconContainer = styled(Box)({
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
});

const SocialButton = styled('a')({
    color: '#FFFFFF',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#F7931E',
        color: '#FFFFFF',
        transform: 'translateY(-2px)',
    },
});

// BOTTOM BAR
const BottomBar = styled(Box)({
    backgroundColor: '#0A5F26',
    padding: '16px 20px',
    textAlign: 'center',
    width: '100%',
});

const CopyrightText = styled(Typography)({
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: '"Poppins", "Roboto", sans-serif',
    opacity: 0.9,
});

const Footer = () => {
    const [logoError, setLogoError] = useState(false);

    // COLUMN 2 - Quick Links (Exact order from instructions)
    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/company/about' },
        { name: 'Company Profile', path: '/company/profile' },
        { name: 'Our Products', path: '/products' },
        { name: 'Opportunities', path: '/opportunities' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Seminar List', path: '/seminars' },
        { name: 'Downloads', path: '/downloads' },
        { name: 'Contact Us', path: '/contact' },
    ];

    // COLUMN 3 LEFT - Policies (Exact order from instructions)
    const policyLinks = [
        { name: 'Exchange Policy', path: '/exchange-policy' },
        { name: 'Marketing & Sales Policy', path: '/marketing-sales-policy' },
        { name: 'Order Policy', path: '/order-policy' },
        { name: 'Payment Policy', path: '/payment-policy' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms & Conditions', path: '/terms-conditions' },
        { name: 'Cancellation Policy', path: '/cancellation-policy' },
        { name: 'Shipping & Delivery Policy', path: '/shipment-delivery-policy' },
        { name: 'Testimonial Policy', path: '/testimonial-policy' },
        { name: 'Grievance', path: '/grievance' },
        { name: 'FAQ', path: '/faq' },
    ];

    const handleNavigation = (path) => {
        window.location.href = path;
    };

    const handleLogoError = () => {
        setLogoError(true);
    };

    return (
        <FooterContainer>
            <FooterContent>
                {/* 3 Columns Layout */}
                <Grid container spacing={4} justifyContent="space-between">

                    {/* COLUMN 1 – COMPANY INFO */}
                    <Grid item xs={12} md={4}>
                        <LogoContainer onClick={() => handleNavigation('/')}>
                            {!logoError ? (
                                <LogoImage src="/logo.png" alt="Sanyukt Parivaar Logo" onError={handleLogoError} />
                            ) : null}
                            <LogoTextContainer>
                                <LogoMain>Sanyukt Parivaar</LogoMain>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF' }}>& Rich Life Company</Typography>
                            </LogoTextContainer>
                        </LogoContainer>

                        <CompanyDescription>
                            Sanyukt Parivaar & Rich Life Company is a direct selling and network marketing organization founded by experienced professionals. We empower individuals to achieve financial independence by promoting high-quality lifestyle, wellness, personal care, and home utility products through a transparent and rewarding MLM business model.
                        </CompanyDescription>

                        <SocialIconContainer>
                            <SocialButton href="#" target="_blank" aria-label="Facebook">
                                <FacebookIcon sx={{ fontSize: '18px' }} />
                            </SocialButton>
                            <SocialButton href="#" target="_blank" aria-label="Instagram">
                                <InstagramIcon sx={{ fontSize: '18px' }} />
                            </SocialButton>
                            <SocialButton href="#" target="_blank" aria-label="YouTube">
                                <YouTubeIcon sx={{ fontSize: '18px' }} />
                            </SocialButton>
                        </SocialIconContainer>
                    </Grid>

                    {/* COLUMN 2 – QUICK LINKS */}
                    <Grid item xs={12} sm={6} md={3}>
                        <SectionTitle>Quick Links</SectionTitle>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {quickLinks.map((link, index) => (
                                <FooterLink key={index} onClick={() => handleNavigation(link.path)}>
                                    {link.name}
                                </FooterLink>
                            ))}
                        </Box>
                    </Grid>

                    {/* COLUMN 3 – POLICIES & CONTACT US (Split internally) */}
                    <Grid item xs={12} sm={6} md={5}>
                        <Grid container spacing={2}>
                            {/* Policies Left side */}
                            <Grid item xs={12} sm={6}>
                                <SectionTitle>Our Policies</SectionTitle>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    {policyLinks.map((link, index) => (
                                        <FooterLink key={index} onClick={() => handleNavigation(link.path)}>
                                            {link.name}
                                        </FooterLink>
                                    ))}
                                </Box>
                            </Grid>

                            {/* Contact Us Right side */}
                            <Grid item xs={12} sm={6}>
                                <SectionTitle>Contact Us</SectionTitle>
                                <Box sx={{ mb: 3 }}>
                                    <ContactText sx={{ fontWeight: 600, mb: 1, color: '#FFFFFF' }}>
                                        Sanyukt Parivaar & Rich Life Company
                                    </ContactText>
                                    <ContactText>
                                        Near Main Business Hub,<br />
                                        India
                                    </ContactText>
                                </Box>
                                <Box>
                                    <ContactLine onClick={() => window.open('tel:+919628145157', '_self')}>
                                        <Typography sx={{ fontWeight: 600, mr: 1, color: '#F7931E' }}>Phone:</Typography>
                                        +91 96281 45157
                                    </ContactLine>
                                    <ContactLine onClick={() => window.open('mailto:info@sanyuktparivaar.com', '_self')}>
                                        <Typography sx={{ fontWeight: 600, mr: 1, color: '#F7931E' }}>Email:</Typography>
                                        info@sanyuktparivaar.com
                                    </ContactLine>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </FooterContent>

            {/* 11. FOOTER BOTTOM BAR */}
            <BottomBar>
                <CopyrightText>
                    © 2026 Sanyukt Parivaar & Rich Life Company. All Rights Reserved.
                </CopyrightText>
            </BottomBar>
        </FooterContainer>
    );
};

export default Footer;
