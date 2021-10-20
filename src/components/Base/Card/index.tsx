import React from 'react';
import styles from './index.module.scss';

interface CardProps {
    title?: string
}

const Card: React.FC<CardProps> = ({ title, children }) => {

    return (
        <div className={styles.card}>
            {title && <div className={styles.title}>
                <div>{title}</div>
            </div>}
            <div>
                {children}
            </div>
        </div>
    )

}

export default Card