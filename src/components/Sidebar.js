// Sidebar.js
import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isVisible, onClose }) => {
    const [logsAPITo, setLogsAPITo] = useState('https://clickthis.dlawork9888.site/clickthis_django/count_clicks/click/?top100=true');
    const [logs, setLogs] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(false); 

    const handleUpdateClick = () => {
        setUpdateTrigger(prev => !prev); 
    };

    useEffect(() => {
        fetch(logsAPITo)
            .then(response => response.json())
            .then(data => {
                setLogs(data);
                console.log('logs GET request succeeded!', data);
            })
            .catch(error => {
                console.log('logs GET request failed...', error);
            });
    }, [logsAPITo, updateTrigger]);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
            <div className="sidebar-content">
                <div
                 style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                 }}
                >
                    <div
                        className="AppText"
                        onClick={onClose}
                        style={{
                            fontSize: 40,
                            color: '#FFFFFF',
                        }}
                    >
                        x
                    </div>
                    <div
                        className="AppText"
                        onClick={handleUpdateClick}
                        style={{
                            fontSize: 20,
                            color: '#FFFFFF',
                            marginRight: 20,
                            cursor: 'pointer' 
                        }}
                    >
                        UPDATE!
                    </div>
                    
                </div>
                <div className="logs">
                    {logs.length > 0 ? (
                        logs.map((log, index) => (
                            <div key={index} className="AppText" style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                                <div
                                style={{marginRight:10}}
                                >
                                    {log.count_id}
                                    </div>
                                <div style={{ fontSize: 15, color: '#555555' }}>
                                    {formatTime(log.clicked_date)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No logs available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
