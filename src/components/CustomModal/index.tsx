import React, { ReactChild } from 'react';
import './style.scss';

export interface ModalProps {
    // show?: boolean;
    onClose?: any;
}

export const CustomModal = (props: {
    onClose?: any;
    title?: string;
    children?: React.ReactChild | Array<ReactChild>;
}) => {
    const { onClose, title, children } = props;
    // if (!show) return null;

    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    React.useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.addEventListener('keydown', closeOnEscapeKeyDown);
        };
    }, []);

    return (
        <div className={`popup show`} onClick={onClose}>
            <div
                className="popup-content"
                onClick={(e: any) => e.stopPropagation()}
            >
                <div className="popup-header">
                    <h4 className="popup-title">{title}</h4>
                    <button
                        type="button"
                        className="btn-close ms-auto"
                        onClick={onClose}
                    ></button>
                </div>
                <div className="popup-body">{children}</div>
                {/* <div className="popup-footer"></div> */}
            </div>
        </div>
    );
};
