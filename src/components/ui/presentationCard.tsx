import React from 'react';

interface Props {
    title: string;
    body: string;
    href: string;
}

const PresentationCard: React.FC<Props> = ({ title, body, href }) => {
    return (
        <article className="text-white bg-black px-1 py-2 rounded">
            <a href={href} target='_blank' className="text-title">
                <h2 className="">{title}</h2>
                <p className="">{body}</p>
            </a>
        </article>
    );
};

export default PresentationCard;
