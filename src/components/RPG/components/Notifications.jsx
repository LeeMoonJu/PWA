import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const Notifications = ({ notifications }) => {
    return notifications.map((note, index) => (
        <Snackbar
            key={note.id}
            open={true}
            anchorOrigin={{ 
                vertical: 'top', 
                horizontal: 'center' 
            }}
            sx={{ 
                top: `${(index * 80) + 24}px`
            }}
        >
            <Alert 
                severity={note.type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {note.message}
            </Alert>
        </Snackbar>
    ));
};

Notifications.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Notifications; 