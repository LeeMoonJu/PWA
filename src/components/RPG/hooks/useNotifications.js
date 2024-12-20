import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'success') => {
        const id = uuidv4();
        setNotifications(prev => [...prev, { id, message, type }]);
        
        setTimeout(() => {
            setNotifications(prev => prev.filter(note => note.id !== id));
        }, 3000);
    };

    return {
        notifications,
        addNotification
    };
}; 