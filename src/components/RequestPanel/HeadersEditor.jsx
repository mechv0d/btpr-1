import React from 'react';

const HeadersEditor = ({headers = [], setHeaders}) => {

    const handleHeaderChange = (index, field, value) => {
        console.log(index, field, value);
        const newHeaders = [...headers];
        newHeaders[index][field] = value;
        setHeaders(newHeaders);
    };

    const addHeader = () => {
        console.log(setHeaders)
        setHeaders([...headers, {key: '', value: ''}]);
    }
    const removeHeader = (index) => setHeaders(headers.filter((_, i) => i !== index));

    return (
        <>
            <h3>Headers</h3>
            {headers.map((header, index) => (
                <div key={index} className="input-group">
                    <input
                        placeholder="Key"
                        value={header.key || ''}
                        onChange={e => handleHeaderChange(index, 'key', e.target.value)}
                    />
                    <input
                        placeholder="Value"
                        value={header.value || ''}
                        onChange={e => handleHeaderChange(index, 'value', e.target.value)}
                    />
                    <button
                        onClick={() => removeHeader(index)}
                        className="button"
                        type="button"
                    >
                        ×
                    </button>
                </div>
            ))}
            <button
                onClick={addHeader}
                className="btn-small"
                type="button"
            >
                + Add Header
            </button>
        </>
    );
};

export default HeadersEditor;