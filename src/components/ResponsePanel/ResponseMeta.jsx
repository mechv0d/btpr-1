import React from 'react';

const ResponseMeta = ({ status, statusText, time, size, statusColor }) => {
    return (
        <div className="meta">
            <span style={{ color: statusColor, fontWeight: 'bold' }}>
                {status} {statusText}
            </span>
            <span>Time: {time}ms</span>
            <span>Size: {size} B</span>
        </div>
    );
};

export default ResponseMeta;