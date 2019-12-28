import React, { FC, useEffect } from 'react';

const DocumentTitle: FC<{ title: string }> = ({ title }) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        return () => {
          document.title = previousTitle;
        };
    }, [title]);

    return <></>;
};

export default DocumentTitle;
