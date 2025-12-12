import React from 'react';
import UrlMethodInput from './UrlMethodInput';
import HeadersEditor from './HeadersEditor';
import BodyEditor from './BodyEditor';

export default function RequestPanel({
                                         url,
                                         setUrl,
                                         method,
                                         setMethod,
                                         headers,
                                         setHeaders,
                                         body,
                                         setBody,
                                         onSend,
                                         loading
                                     }) {
    return (
        <>
            <UrlMethodInput
                url={url}
                setUrl={setUrl}
                method={method}
                setMethod={setMethod}
                onSend={onSend}
                loading={loading}
            />

            <div className="request-pane">
                <HeadersEditor headers={headers} setHeaders={setHeaders}/>
            </div>

            {method !== 'GET' && (
                <div className="request-pane">
                    <BodyEditor body={body} setBody={setBody}/>
                </div>
            )}
        </>
    );
}