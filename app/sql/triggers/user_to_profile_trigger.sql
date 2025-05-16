create function handle_new_user() -- 새로운 사용자가 생성되면 트리거가 실행된다.
returns trigger -- 트리거는 trigger 타입을 반환한다.
language plpgsql -- plpgsql 언어로 작성된다.
security definer -- 보안 정의자로 실행된다.
set search_path = 'public' -- public 스키마를 사용한다.
as $$ -- 실행될 코드를 작성한다.
begin
    if new.raw_app_meta_data is not null then -- 새로운 사용자의 raw_app_meta_data가 null이 아니면
        if new.raw_app_meta_data ? 'provider' and new.raw_app_meta_data->>'provider' = 'email' then -- 새로운 사용자의 raw_app_meta_data에 provider가 있고, provider가 email이면
            insert into profiles (profile_id, name, username, role) -- profiles 테이블에 데이터를 삽입한다.
            values (
                new.id, -- 새로운 사용자의 id   
                'Anonymous', -- 이름
                '@mr.' || substring(md5(random()::text), 1, 8), -- 사용자 이름
                'developer' -- 역할
            );
        end if;
    end if;
    return new;
end;
$$;

create trigger user_to_profile_trigger 
after insert on auth.users -- users 테이블에 데이터가 삽입되면 user_to_profile_trigger 트리거가 실행된다.
for each row execute function public.handle_new_user(); -- 그리고 각 행에 대해서 handle_new_user 함수를 실행한다.

