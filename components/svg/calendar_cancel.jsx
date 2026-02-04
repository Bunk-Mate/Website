'use client';

export default function CalendarCancelSvg() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-8 max-sm:size-6"
        >
            {/* Calendar body */}
            <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
            />
            {/* Calendar top handles */}
            <line
                x1="8"
                y1="2"
                x2="8"
                y2="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <line
                x1="16"
                y1="2"
                x2="16"
                y2="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            {/* Calendar header line */}
            <line
                x1="3"
                y1="9"
                x2="21"
                y2="9"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            {/* X mark */}
            <line
                x1="9"
                y1="13"
                x2="15"
                y2="19"
                stroke="#cc4e4e"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <line
                x1="15"
                y1="13"
                x2="9"
                y2="19"
                stroke="#cc4e4e"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
