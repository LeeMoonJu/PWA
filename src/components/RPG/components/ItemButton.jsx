import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import SwordIcon from '@mui/icons-material/Gavel';
import ShieldIcon from '@mui/icons-material/Shield';

const ItemButton = ({ item, onClick, disabled }) => {
    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'epic': return '#FFD700';
            case 'rare': return '#C0C0C0';
            case 'common': return '#CD7F32';
            default: return '#ffffff';
        }
    };

    const getIcon = () => {
        if (!item.id) return <ShieldIcon />;
        return item.id.startsWith('w') ? <SwordIcon /> : <ShieldIcon />;
    };

    return (
        <Button
            variant="outlined"
            fullWidth
            onClick={onClick}
            disabled={disabled}
            sx={{ 
                justifyContent: 'flex-start', 
                gap: 1,
                borderColor: item.color || '#666666',
                color: item.color || '#666666',
                '&:hover': {
                    borderColor: item.color || '#666666',
                    backgroundColor: `${item.color || '#666666'}22`
                },
                '& .MuiSvgIcon-root': {
                    color: getRarityColor(item.rarity)
                }
            }}
        >
            {getIcon()}
            <Typography sx={{ color: 'text.primary' }}>{item.name}</Typography>
        </Button>
    );
};

ItemButton.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        color: PropTypes.string,
        rarity: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default ItemButton; 