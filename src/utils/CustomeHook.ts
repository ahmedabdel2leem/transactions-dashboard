import { useState, useEffect } from "react";

// Custom hook to get and update the query parameter
const useQuery = () => {
    const getQuery = () => new URLSearchParams(window.location.search);

    const [query, setQuery] = useState(getQuery());

    useEffect(() => {
        const handlePopState = () => {
            setQuery(getQuery());
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return query;
};

export default useQuery;
