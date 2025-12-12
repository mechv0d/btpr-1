import React from 'react';

const BodyEditor = ({ body, setBody }) => {
    return (
        <>
            <h3>Body (JSON)</h3>
            <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={5}
                placeholder='{"key": "value"}'
            />
        </>
    );
};

export default BodyEditor;