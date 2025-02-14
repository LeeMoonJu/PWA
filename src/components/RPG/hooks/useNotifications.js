import { useState } from 'react';
import uuid4 from 'uuid4';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'success') => {
        const id = uuid4();
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