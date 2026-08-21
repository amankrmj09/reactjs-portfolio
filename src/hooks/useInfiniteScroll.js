import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Infinite scroll hook — fetches pages of data and appends them.
 *
 * @param {Function} fetchFn  - async (page, size) => PageResponse<T>
 * @param {number}   pageSize - items per page
 */
export const useInfiniteScroll = (fetchFn, pageSize = 6) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const sentinelRef = useRef(null);
    const isFetchingRef = useRef(false); // prevent double-fetching

    const fetchPage = useCallback(async (pageNumber) => {
        if (isFetchingRef.current || (!hasMore && pageNumber > 0)) return;
        isFetchingRef.current = true;
        setLoading(true);
        try {
            const data = await fetchFn(pageNumber, pageSize);
            const content = data?.content ?? (Array.isArray(data) ? data : []);
            const last = data?.last ?? (content.length < pageSize);
            setItems(prev => pageNumber === 0 ? content : [...prev, ...content]);
            setHasMore(!last);
            setPage(pageNumber);
        } catch (err) {
            console.error('useInfiniteScroll fetch error:', err);
        } finally {
            setLoading(false);
            setInitialLoading(false);
            isFetchingRef.current = false;
        }
    }, [fetchFn, pageSize, hasMore]);

    // Initial load
    useEffect(() => {
        fetchPage(0);
    }, []);

    // Intersection observer on sentinel
    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
                    fetchPage(page + 1);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasMore, page, fetchPage]);

    return { items, loading, initialLoading, hasMore, sentinelRef };
};
