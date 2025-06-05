CREATE OR REPLACE FUNCTION get_product_stats(product_id text)
RETURNS TABLE(
    product_view bigint,
    product_visit bigint,
    month text
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        SUM(CASE WHEN event_type = 'product_view' THEN 1 ELSE 0 END) AS product_view,
        SUM(CASE WHEN event_type = 'product_visit' THEN 1 ELSE 0 END) AS product_visit,
        TO_CHAR(events.created_at, 'YYYY-MM') AS month
    FROM
        public.events
    WHERE
        event_data ->> 'product_id' = product_id
    GROUP BY
        TO_CHAR(events.created_at, 'YYYY-MM')
END;
$$ LANGUAGE plpgsql;