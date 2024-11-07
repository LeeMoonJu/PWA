// material-ui
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import MusicPlayer from 'views/utilities/MusicPlayer';

// ==============================|| SAMPLE PAGE ||============================== //

const Components = () => {
    return (
        <MainCard title="Components">
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
                <Grid item xs={12} sm={6}>
                    <SubCard title="Music Player">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                122
                            </Grid>
                            <Grid item>
                                122
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Music Player">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                122
                            </Grid>
                            <Grid item>
                                122
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Components;