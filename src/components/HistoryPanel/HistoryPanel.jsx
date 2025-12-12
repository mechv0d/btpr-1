import React from 'react';
import HistoryItem from './HistoryItem';
import ResponsePanel from "../ResponsePanel/ResponsePanel.jsx";

export const HistoryPanel = ({ history, onLoadItem, onClear, onExport }) => {
    return (
        <div className="history-section">
            <div className="history-header">
                <h3>History</h3>
                <div>
                    <button onClick={onExport} className="button">Export JSON</button>
                    <button onClick={onClear} className="btn-small btn-danger">Clear</button>
                </div>
            </div>
            <ul className="history-list">
                {history.map(item => (
                    <HistoryItem
                        key={item.id}
                        item={item}
                        onClick={() => onLoadItem(item)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default HistoryPanel;