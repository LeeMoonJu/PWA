import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import MusicPlayer from './MusicPlayer';

const Bluetooth = () => {
    return (
        <MainCard title="Bluetooth">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Music Player">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <MusicPlayer />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Bluetooth;
