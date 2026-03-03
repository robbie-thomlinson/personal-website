import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    title: string;
    className?: string;
}

export const Section: React.FC<SectionProps> = ({
    children,
    title,
    className = '',
}) => {
    return (
        <section className={`py-12 px-4 ${className}`}>
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            <div>{children}</div>
        </section>
    );
};