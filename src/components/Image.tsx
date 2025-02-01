import React, { useState } from 'react';

const Image: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false); 
        setIsError(true);
    };

    return (
        <>
            {(isLoading || isError) && <div className={className} />}
            {!isError && <img className={className}
                src={src}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: isLoading ? 'none' : 'block' }}
            />}
        </>
    );
};

export default Image;
