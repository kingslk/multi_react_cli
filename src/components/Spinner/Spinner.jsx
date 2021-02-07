import React from 'react';
import './Spinner.scss';

function Circle() {
    const SIZE = {
        small: {
            viewBox: '25 25 50 50',
            cx: '50',
            cy: '50',
            r: '20'
        }
    };
    return (
        <svg viewBox="25 25 50 50" className="circular">
            <circle className="path" cx="50" cy="50" r="20" fill="none" />
        </svg>
    );
}
function Spinner({ type = '' }) {
    return (
        <div
            className={classnames('spinner-wrapper', {
                'spinner-global': type === 'global',
                'spinner-list': type === 'list'
            })}
        >
            <div className="spinner-ctx">
                <Circle />
                <p>正在加载中</p>
            </div>
        </div>
    );
}

export default Spinner;
