create function handle_post_upvote()
returns trigger
language plpgsql
security definer
set search_path = 'public'
as $$
begin
    update posts
    set upvotes = upvotes + 1
    where post_id = new.post_id;
    return new;
end;
$$;

create trigger post_upvote_trigger
after insert on post_upvotes
for each row execute function handle_post_upvote();

create function handle_post_downvote()
returns trigger
language plpgsql
security definer
set search_path = 'public'
as $$
begin
    update posts
    set upvotes = upvotes - 1
    where post_id = old.post_id;
    return old;
end;
$$;

create trigger post_downvote_trigger
after delete on post_upvotes
for each row execute function handle_post_downvote();