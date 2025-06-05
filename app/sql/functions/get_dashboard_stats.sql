CREATE OR REPLACE FUNCTION get_dashboard_stats(user_id uuid)
RETURNS TABLE (views bigint, month text) AS $$
BEGIN
    RETURN QUERY
    SELECT
       COUNT(*) AS views,
       to_char(created_at, 'YYYY-MM') AS month
    FROM
        public.events
    JOIN 
        public.profiles ON profile.profile_id = user_id
    WHERE
        event_data = 'username' = profiles.username
    GROUP BY
        month;
END;
$$ LANGUAGE plpgsql;