-- 누군가가 나를 팔로우 했을 때
CREATE FUNCTION public.notify_follow()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.notifications (type, source_id, target_id)
    VALUES ('follow', NEW.follower_id, NEW.following_id); -- NEW는 새로 생성된 컬럼 데이터를 의미한다.
    RETURN NEW;
END;
$$;

CREATE TRIGGER notify_follow_trigger
AFTER INSERT ON public.follows
FOR EACH ROW
EXECUTE PROCEDURE public.notify_follow();

-- 누군가가 Product에 리뷰를 남겼을 때
CREATE FUNCTION public.notify_review()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = ''
LANGUAGE plpgsql
AS $$
DECLARE
    product_owner uuid;
    -- product_owner라는 이름의 변수를 선언하고, 타입을 uuid로 선언한다.
BEGIN
    SELECT profile_id INTO product_owner FROM public.products WHERE product_id = NEW.product_id; -- 여기서 NEW는 새로생성(insert)된 데이터를 의미한다.
    -- 1. 새로 생긴 review의 product_id와 같은 product_id를 가진 product를 products 테이블에서 찾는다.
    -- 2. 그리고 그 데이터 중에 profile_id를 찾아서 product_owner 변수에 저장한다.
    INSERT INTO public.notifications (type, source_id, target_id, product_id)
    VALUES ('review', NEW.profile_id, product_owner, NEW.product_id);
    RETURN NEW;
END;
$$;

CREATE TRIGGER notify_review_trigger
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE PROCEDURE public.notify_review();

-- 누군가 게시글에 댓글을 달았을 때
CREATE FUNCTION public.notify_reply()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = ''
LANGUAGE plpgsql
AS $$
DECLARE
    post_owner uuid;
BEGIN
    SELECT profile_id INTO post_owner FROM public.posts WHERE post_id = NEW.post_id;
    INSERT INTO public.notifications (type, source_id, target_id, post_id)
    VALUES ('reply', NEW.profile_id, post_owner, NEW.post_id);
    RETURN NEW;
END;
$$;

CREATE TRIGGER notify_reply_trigger
AFTER INSERT ON public.post_replies
FOR EACH ROW
EXECUTE PROCEDURE public.notify_reply();
