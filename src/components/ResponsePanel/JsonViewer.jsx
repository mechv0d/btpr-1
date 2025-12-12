import React from 'react';

const JsonViewer = ({ data }) => {
    return (
        <pre className="json-view">
            {typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data)}
        </pre>
    );
};

export default JsonViewer;