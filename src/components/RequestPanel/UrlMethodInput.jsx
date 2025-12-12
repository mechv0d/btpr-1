import React from 'react';

const UrlMethodInput = ({ url, setUrl, method, setMethod, onSend, loading }) => {
    return (
        <div className="input-group">
            <select value={method} onChange={e => setMethod(e.target.value)}>
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>PATCH</option>
                <option>DELETE</option>
            </select>
            <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Enter URL"
            />
            <button onClick={onSend} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
};

export default UrlMethodInput;