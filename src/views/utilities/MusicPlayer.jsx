// ... existing imports ...
import { useState, useEffect } from 'react';
import { Typography, Box, IconButton, Slider, Stack, Paper } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Drawer, ListItemIcon, Divider } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';

const sampleSongs = [
    {
        title: 'Guitar',
        artist: 'Sample Artist',
        duration: '3:30',
        audioUrl: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg'
    },
    {
        title: 'Piano',
        artist: 'Sample Artist',
        duration: '3:00',
        audioUrl: 'https://actions.google.com/sounds/v1/alarms/mechanical_clock_ring.ogg'
    },
    {
        title: 'Beep',
        artist: 'Sample Artist',
        duration: '2:00',
        audioUrl: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
    },
    {
        title: 'Alarm',
        artist: 'Sample Artist',
        duration: '2:30',
        audioUrl: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
    },
    {
        title: 'Bell',
        artist: 'Sample Artist',
        duration: '1:30',
        audioUrl: 'https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg'
    }
];

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio());

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState(sampleSongs[0]);

    const [volume, setVolume] = useState(30);
    const [isMuted, setIsMuted] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleNext = async () => {
        const nextIndex = (currentSongIndex + 1) % sampleSongs.length;
        console.log(currentSongIndex, sampleSongs.length, nextIndex);
        setCurrentSongIndex(nextIndex);
        setCurrentSong(sampleSongs[nextIndex]);
        setIsPlaying(true);
    };

    useEffect(() => {
        audio.src = currentSong.audioUrl;
        audio.load();
        if (isPlaying) {
            audio.play();
        }
    }, [currentSong]);

    useEffect(() => {
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleNext);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleNext);
        };
    }, [handleNext, audio]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        audio.volume = newValue / 100;
        if (newValue === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
        audio.muted = !isMuted;
    };

    const getVolumeIcon = () => {
        if (isMuted || volume === 0) return <VolumeMuteIcon />;
        if (volume < 50) return <VolumeDownIcon />;
        return <VolumeUpIcon />;
    };

    const handlePrevious = async () => {
        const prevIndex = currentSongIndex === 0 ? sampleSongs.length - 1 : currentSongIndex - 1;
        setCurrentSongIndex(prevIndex);
        setCurrentSong(sampleSongs[prevIndex]);
        setIsPlaying(true);
    };

    // 시간 포맷 함수
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // 슬라이더 변경 핸들러
    const handleSliderChange = (event, newValue) => {
        const time = (newValue / 100) * duration;
        audio.currentTime = time;
        setCurrentTime(time);
    };

    const handleSongSelect = (index) => {
        setCurrentSongIndex(index);
        setCurrentSong(sampleSongs[index]);
        setIsPlaying(true);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={toggleDrawer} sx={{ mr: 2 }}>
                    <QueueMusicIcon />
                </IconButton>

                <Stack direction="row" spacing={2} sx={{ flex: 1, alignItems: 'center' }}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: 'primary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            height: 60
                        }}
                    >
                        <AlbumIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    </Paper>

                    <Stack spacing={0.5} sx={{ flex: 1, overflow: 'hidden' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {currentSong.title}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {currentSong.artist}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2, mt: 1 }}>
                <IconButton onClick={handlePrevious}>
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton
                    onClick={handlePlayPause}
                    sx={{
                        p: 2,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.dark'
                        },
                        color: 'white'
                    }}
                >
                    {isPlaying ? <PauseIcon sx={{ fontSize: 38 }} /> : <PlayArrowIcon sx={{ fontSize: 38 }} />}
                </IconButton>
                <IconButton onClick={handleNext}>
                    <SkipNextIcon />
                </IconButton>
            </Box>

            <Box sx={{ px: 2 }}>
                <Slider
                    size="small"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSliderChange}
                    aria-label="Progress"
                    sx={{
                        color: 'primary.main',
                        '& .MuiSlider-thumb': {
                            width: 12,
                            height: 12,
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: 'none'
                            }
                        }
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                        {formatTime(currentTime)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {formatTime(duration)}
                    </Typography>
                </Box>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <IconButton onClick={handleMuteToggle}>{getVolumeIcon()}</IconButton>
                <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-labelledby="continuous-slider"
                    step={10}
                    marks
                    min={0}
                    max={100}
                />
            </Stack>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                        mt: '64px', // AppBar 높이만큼 여백
                        height: 'calc(100% - 64px)' // AppBar 높이 제외
                    }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                        재생 목록
                    </Typography>
                    <Divider />
                    <List>
                        {sampleSongs.map((song, index) => (
                            <ListItem
                                key={index}
                                button
                                selected={currentSongIndex === index}
                                onClick={() => handleSongSelect(index)}
                                sx={{
                                    borderRadius: 1,
                                    mb: 0.5,
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.lighter',
                                        '&:hover': {
                                            backgroundColor: 'primary.light'
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    <MusicNoteIcon color={currentSongIndex === index ? 'primary' : 'inherit'} sx={{ fontSize: 20 }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={song.title}
                                    secondary={song.artist}
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        fontWeight: currentSongIndex === index ? 600 : 400,
                                        color: currentSongIndex === index ? 'primary.main' : 'text.primary',
                                        sx: {
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }
                                    }}
                                    secondaryTypographyProps={{
                                        sx: {
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }
                                    }}
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                    {song.duration}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Paper>
    );
};

export default MusicPlayer;
