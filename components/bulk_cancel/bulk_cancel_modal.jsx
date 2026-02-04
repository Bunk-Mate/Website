'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '@/app/_utils/api_constants.js';
import { useNotifications } from '@/app/_contexts/notification';

export default function BulkCancelModal({ showModal, setShowModal, onSuccess }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minEndDate, setMinEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const { addNotification } = useNotifications();

    useEffect(() => {
        if (startDate) {
            const minDate = new Date(startDate);
            minDate.setDate(minDate.getDate());
            setMinEndDate(minDate.toISOString().split('T')[0]);
            // Reset end date if it's before start date
            if (endDate && endDate < startDate) {
                setEndDate('');
            }
        }
    }, [startDate]);

    const handleSubmit = async () => {
        if (!startDate || !endDate) {
            addNotification('Please select both start and end dates.');
            return;
        }

        setLoading(true);
        const header = {
            Authorization: 'Token ' + JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME)),
        };

        try {
            const response = await axios.post(
                API_BASE_URL + '/bulk_cancel',
                {
                    start_date: startDate,
                    end_date: endDate,
                },
                { headers: header }
            );

            if (response.status === 200) {
                const count = response.data.updated_count;
                addNotification(`Successfully cancelled ${count} class${count !== 1 ? 'es' : ''}.`);
                setShowModal(false);
                setStartDate('');
                setEndDate('');
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            if (error.response?.status === 401) {
                addNotification('Session expired. Please login again.');
            } else {
                addNotification('Failed to cancel classes. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!showModal) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="flex min-h-[280px] min-w-[320px] flex-col rounded-[20px] bg-black shadow-[0px_0px_50px_rgb(50,50,50)] md:min-w-[450px]">
                {/* Header */}
                <div className="border-b border-[#333] p-4">
                    <h2 className="text-center text-xl font-light text-white">
                        Cancel Classes (Holiday)
                    </h2>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
                    <p className="text-center text-sm text-[#9e9e9e]">
                        All classes in the selected date range will be marked as cancelled.
                    </p>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <label className="w-16 text-sm text-[#9e9e9e]">From:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-10 w-40 rounded border border-[#3a3a3a] bg-[#1c1c1c] px-3 text-white hover:border-white focus:border-white focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-16 text-sm text-[#9e9e9e]">To:</label>
                            <input
                                type="date"
                                value={endDate}
                                min={minEndDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-10 w-40 rounded border border-[#3a3a3a] bg-[#1c1c1c] px-3 text-white hover:border-white focus:border-white focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex border-t border-[#333]">
                    <button
                        className="flex-1 p-4 text-white transition-colors hover:bg-[#1c1c1c]"
                        onClick={() => {
                            setShowModal(false);
                            setStartDate('');
                            setEndDate('');
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 rounded-br-[20px] bg-[#cc4e4e] p-4 text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={loading || !startDate || !endDate}
                    >
                        {loading ? 'Cancelling...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
