import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    // --- Состояния (Task 1 & 2) ---
    const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState([{key: 'Content-Type', value: 'application/json'}]);
    const [body, setBody] = useState('');

    // --- Состояния ответа и UI (Task 3 & 5) ---
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Состояния истории (Task 4) ---
    const [history, setHistory] = useState([]);

    // Загрузка истории при старте
    useEffect(() => {
        const savedHistory = localStorage.getItem('req_history');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    // --- Управление заголовками ---
    const handleHeaderChange = (index, field, value) => {
        const newHeaders = [...headers];
        newHeaders[index][field] = value;
        setHeaders(newHeaders);
    };

    const addHeader = () => setHeaders([...headers, {key: '', value: ''}]);
    const removeHeader = (index) => setHeaders(headers.filter((_, i) => i !== index));

    // --- Логика отправки запроса (Task 2 & 5) ---
    const handleSend = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);
        const startTime = performance.now();

        try {
            // Преобразование массива заголовков в объект
            const headerObj = headers.reduce((acc, curr) => {
                if (curr.key) acc[curr.key] = curr.value;
                return acc;
            }, {});

            const options = {
                method,
                headers: headerObj,
            };

            if (method !== 'GET' && method !== 'HEAD' && body) {
                options.body = body;
            }

            const res = await fetch(url, options);
            const endTime = performance.now();

            const responseData = await res.text(); // Получаем как текст, чтобы оценить размер
            let parsedData;

            try {
                parsedData = JSON.parse(responseData);
            } catch (e) {
                console.log(e)
                parsedData = responseData; // Если не JSON, оставляем как текст
            }

            const responseObj = {
                status: res.status,
                statusText: res.statusText,
                headers: [...res.headers.entries()], // Превращаем итератор заголовков в массив
                data: parsedData,
                time: (endTime - startTime).toFixed(2),
                size: new Blob([responseData]).size, // Размер в байтах
            };

            setResponse(responseObj);
            addToHistory(url, method, headerObj, body); // Сохраняем в историю

        } catch (err) {
            // Обработка сетевых ошибок (Task 5)
            setError(err.message || 'Network Error');
        } finally {
            setLoading(false);
        }
    };

    // --- Управление историей (Task 4) ---
    const addToHistory = (url, method, headersObj, bodyData) => {
        const newItem = {
            id: Date.now(),
            url,
            method,
            headers: Object.entries(headersObj).map(([key, value]) => ({key, value})),
            body: bodyData,
            date: new Date().toLocaleString()
        };

        const newHistory = [newItem, ...history].slice(0, 50); // Храним последние 50
        setHistory(newHistory);
        localStorage.setItem('req_history', JSON.stringify(newHistory));
    };

    const loadFromHistory = (item) => {
        setUrl(item.url);
        setMethod(item.method);
        setHeaders(item.headers);
        setBody(item.body || '');
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('req_history');
    };

    const exportHistory = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "history.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    // --- Определение цвета статус кода (Task 3) ---
    const getStatusColor = (status) => {
        if (status >= 200 && status < 300) return 'green';
        if (status >= 300 && status < 400) return 'orange';
        return 'red';
    };

    return (
        <div className="container">
            <header>
                <h1>React HTTP Tester</h1>
            </header>

            <div className="main-layout">
                {/* Левая колонка: Форма запроса */}
                <div className="request-pane">
                    {/* Task 1: Метод и URL */}
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
                        <button onClick={handleSend} disabled={loading}>
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </div>

                    {/* Task 1 & 2: Заголовки */}
                    <div className="request-pane">
                        <h3>Headers</h3>
                        {headers.map((header, index) => (
                            <div key={index} className="input-group">
                                <input
                                    placeholder="Key"
                                    value={header.key}
                                    onChange={e => handleHeaderChange(index, 'key', e.target.value)}
                                />
                                <input
                                    placeholder="Value"
                                    value={header.value}
                                    onChange={e => handleHeaderChange(index, 'value', e.target.value)}
                                />
                                <button onClick={() => removeHeader(index)} className="button">×</button>
                            </div>
                        ))}
                        <button onClick={addHeader} className="btn-small">+ Add Header</button>
                    </div>

                    {/* Task 1: Тело запроса (только если не GET) */}
                    {method !== 'GET' && (
                        <div className="request-pane">
                            <h3>Body (JSON)</h3>
                            <textarea
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                rows={5}
                                placeholder='{"key": "value"}'
                            />
                        </div>
                    )}

                    {/* Task 5: Ошибки */}
                    {error && <div className="error-banner">Error: {error}</div>}
                </div>

                {/* Правая колонка: Ответ и История */}
                <div className="request-pane">

                    {/* Task 3: Отображение ответа */}
                    <div className="response-section">
                        <h2>Response</h2>
                        {response ? (
                            <div className="response-details">
                                <div className="meta">
                   <span style={{color: getStatusColor(response.status), fontWeight: 'bold'}}>
                     {response.status} {response.statusText}
                   </span>
                                    <span>Time: {response.time}ms</span>
                                    <span>Size: {response.size} B</span>
                                </div>

                                <div className="tabs">
                                    <strong>Body</strong>
                                </div>
                                <pre className="json-view">
                   {JSON.stringify(response.data, null, 2)}
                 </pre>

                                <div className="tabs">
                                    <strong>Response Headers</strong>
                                </div>
                                <div className="headers-view">
                                    {response.headers.map(([key, val], i) => (
                                        <div key={i}><b>{key}:</b> {val}</div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="placeholder">Ответ появится здесь...</p>
                        )}
                    </div>

                    {/* Task 4: История */}
                    <div className="history-section">
                        <div className="history-header">
                            <h3>History</h3>
                            <div>
                                <button onClick={exportHistory} className="button">Export JSON</button>
                                <button onClick={clearHistory} className="btn-small btn-danger">Clear</button>
                            </div>
                        </div>
                        <ul className="history-list">
                            {history.map(item => (
                                <li key={item.id} onClick={() => loadFromHistory(item)}>
                                    <span className={`method ${item.method}`}>{item.method}</span>
                                    <span className="url">{item.url}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;