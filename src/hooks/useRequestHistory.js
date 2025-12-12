import { useState, useEffect, useCallback } from 'react';
import { exportToJsonFile } from '../utils/index.js';

export const useRequestHistory = () => {
    const [history, setHistory] = useState(() => {
        // Используем ленивую инициализацию состояния
        try {
            const savedHistory = localStorage.getItem('req_history');
            return savedHistory ? JSON.parse(savedHistory) : [];
        } catch (error) {
            console.error('Failed to parse history from localStorage:', error);
            return [];
        }
    });

    // Сохраняем историю при изменении
    useEffect(() => {
        try {
            localStorage.setItem('req_history', JSON.stringify(history));
        } catch (error) {
            console.error('Failed to save history to localStorage:', error);
        }
    }, [history]);

    const addToHistory = useCallback((url, method, headers, body) => {
        const headerObj = headers.reduce((acc, curr) => {
            if (curr.key) acc[curr.key] = curr.value;
            return acc;
        }, {});

        const newItem = {
            id: Date.now(),
            url,
            method,
            headers: Object.entries(headerObj).map(([key, value]) => ({ key, value })),
            body,
            date: new Date().toLocaleString()
        };

        setHistory(prevHistory => [newItem, ...prevHistory].slice(0, 50));
    }, []);

    const loadFromHistory = useCallback((item) => {
        return item;
    }, []);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    const exportHistory = useCallback(() => {
        exportToJsonFile(history, 'history.json');
    }, [history]);

    return {
        history,
        addToHistory,
        loadFromHistory,
        clearHistory,
        exportHistory
    };
};