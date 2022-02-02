import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export default function Profile() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', textAlign: 'center' }}>
            <Paper elevation={4} sx={{ maxWidth: '32rem', padding: '10px', backgroundColor: 'red' }}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar sx={{ height: '5rem', width: '5rem' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </StyledBadge>
                <h2>User name</h2>
                <div>
                    <h4>Bio
                        <span style={{ cursor: 'pointer', marginLeft: '8px' }}>
                            <BorderColorOutlinedIcon fontSize="4rem" />
                        </span>
                    </h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut quasi nihil tenetur, iure nisi iusto laboriosam voluptatem consequuntur veritatis voluptate optio minus dicta perferendis in voluptates minima, enim similique sit!
                    </p>
                </div>
            </Paper>
        </div>
    );
}
