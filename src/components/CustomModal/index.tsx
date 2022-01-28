import React, { ReactChild } from 'react';
import { motion } from 'framer-motion';
import './style.scss';

export interface ModalProps {
    // show?: boolean;
    onClose: any;
}

const dropIn = {
    hidden: {
        y: '-20vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

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
        <BackDrop className="popup show" onClick={onClose}>
            <motion.div
                className="popup-content"
                onClick={(e: any) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
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
            </motion.div>
        </BackDrop>
    );
};

const BackDrop = (props: {
    children: React.ReactChild | Array<ReactChild>;
    className?: string;
    onClick: () => void;
}) => {
    const { children, className = '', onClick } = props;
    return (
        <motion.div
            onClick={onClick}
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};
