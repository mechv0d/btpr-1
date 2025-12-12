import React, { useState } from 'react';
import './App.css';

// Импорт компонентов
import { RequestPanel } from './components/RequestPanel';
import { ResponsePanel } from './components/ResponsePanel';
import { HistoryPanel } from './components/HistoryPanel';
import { ErrorBanner } from './components/common/ErrorBanner';

// Импорт хуков
import { useRequestHistory } from './hooks/index.js';
import { useFetchRequest } from './hooks/index.js';

function App() {
    const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState([{ key: 'Content-Type', value: 'application/json' }]);
    const [body, setBody] = useState('');

    const { history, addToHistory, loadFromHistory, clearHistory, exportHistory } = useRequestHistory();
    const { response, loading, error, sendRequest } = useFetchRequest();

    const handleSend = async () => {
        const result = await sendRequest(url, method, headers, body);
        if (result) {
            addToHistory(url, method, headers, body);
        }
    };

    const handleLoadFromHistory = (item) => {
        const loadedItem = loadFromHistory(item);
        setUrl(loadedItem.url);
        setMethod(loadedItem.method);
        setHeaders(loadedItem.headers);
        setBody(loadedItem.body || '');
    };


    return (
        <div className="container">
            <header>
                <h1>React HTTP Tester</h1>
            </header>

            <div className="main-layout">
                <div className="request-pane">
                    <RequestPanel
                        url={url}
                        setUrl={setUrl}
                        method={method}
                        setMethod={setMethod}
                        headers={headers}
                        setHeaders={setHeaders}
                        body={body}
                        setBody={setBody}
                        onSend={handleSend}
                        loading={loading}
                    />
                    {error && <ErrorBanner message={error} />}
                </div>

                <div className="request-pane">
                    <ResponsePanel response={response} />
                    <HistoryPanel
                        history={history}
                        onLoadItem={handleLoadFromHistory}
                        onClear={clearHistory}
                        onExport={exportHistory}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;