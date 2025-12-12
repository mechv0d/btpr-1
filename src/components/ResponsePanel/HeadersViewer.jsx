import React from 'react';

const HeadersViewer = ({ headers }) => {
    return (
        <div className="headers-view">
            {headers.map(([key, val], i) => (
                <div key={i}><b>{key}:</b> {val}</div>
            ))}
        </div>
    );
};

export default HeadersViewer;