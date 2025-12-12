import React from 'react';
import ResponseMeta from './ResponseMeta';
import JsonViewer from './JsonViewer';
import HeadersViewer from './HeadersViewer';
import { getStatusColor } from '../../utils/index.js';

export const ResponsePanel = ({ response }) => {
    if (!response) {
        return (
            <div className="response-section">
                <h2>Response</h2>
                <p className="placeholder">Ответ появится здесь...</p>
            </div>
        );
    }

    return (
        <div className="response-section">
            <h2>Response</h2>
            <div className="response-details">
                <ResponseMeta
                    status={response.status}
                    statusText={response.statusText}
                    time={response.time}
                    size={response.size}
                    statusColor={getStatusColor(response.status)}
                />

                <div className="tabs">
                    <strong>Body</strong>
                </div>
                <JsonViewer data={response.data} />

                <div className="tabs">
                    <strong>Response Headers</strong>
                </div>
                <HeadersViewer headers={response.headers} />
            </div>
        </div>
    );
};

export default ResponsePanel;