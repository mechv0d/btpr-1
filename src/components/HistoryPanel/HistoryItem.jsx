import React from 'react';

const HistoryItem = ({ item, onClick }) => {
    return (
        <li onClick={onClick}>
            <span className={`method ${item.method}`}>{item.method}</span>
            <span className="url">{item.url}</span>
        </li>
    );
};

export default HistoryItem;