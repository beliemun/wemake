-- topics
INSERT INTO topics (topic_id, name, slug, created_at)
VALUES
  (1, 'AI', 'ai', now()),
  (2, 'Web', 'web', now()),
  (3, 'Design', 'design', now()),
  (4, 'Startup', 'startup', now()),
  (5, 'Marketing', 'marketing', now());

-- categories
INSERT INTO categories (category_id, name, description, created_at, updated_at)
VALUES
  (1, 'Productivity', 'Tools for productivity', now(), now()),
  (2, 'Health', 'Health related', now(), now()),
  (3, 'Finance', 'Finance tools', now(), now()),
  (4, 'Education', 'Learning platforms', now(), now()),
  (5, 'Entertainment', 'Fun and games', now(), now());

-- products
INSERT INTO products (product_id, name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at)
VALUES
  (1, 'Prod1', 'Tag1', 'Desc1', 'How1', 'icon1.png', 'https://prod1.com', '{"views":10,"reviews":2}', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 1, now(), now()),
  (2, 'Prod2', 'Tag2', 'Desc2', 'How2', 'icon2.png', 'https://prod2.com', '{"views":20,"reviews":3}', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 2, now(), now()),
  (3, 'Prod3', 'Tag3', 'Desc3', 'How3', 'icon3.png', 'https://prod3.com', '{"views":30,"reviews":4}', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 3, now(), now()),
  (4, 'Prod4', 'Tag4', 'Desc4', 'How4', 'icon4.png', 'https://prod4.com', '{"views":40,"reviews":5}', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 4, now(), now()),
  (5, 'Prod5', 'Tag5', 'Desc5', 'How5', 'icon5.png', 'https://prod5.com', '{"views":50,"reviews":6}', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 5, now(), now());

-- jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, company_id, company_name, company_logo, company_location, apply_url, job_type, location, salary_range, created_at, updated_at)
VALUES
  ('Frontend Dev', 'Web dev', 'Build UI', 'React', 'Remote', 1, 'CompanyA', 'logo1.png', '서울', 'https://apply1.com', 'full-time', '서울', '5000만원 이상', now(), now()),
  ('Backend Dev', 'API dev', 'Build API', 'Node.js', 'Remote', 2, 'CompanyB', 'logo2.png', '경기', 'https://apply2.com', 'part-time', '경기', '4000만원 ~ 5000만원', now(), now()),
  ('Designer', 'UI/UX', 'Design UI', 'Figma', 'Remote', 3, 'CompanyC', 'logo3.png', '인천', 'https://apply3.com', 'contract', '인천', '3000만원 ~ 4000만원', now(), now()),
  ('Marketer', 'SNS', 'Marketing', 'SNS', 'Remote', 4, 'CompanyD', 'logo4.png', '강원', 'https://apply4.com', 'intern', '강원', '2000만원 ~ 3000만원', now(), now()),
  ('PM', 'Manage', 'Manage team', 'PM', 'Remote', 5, 'CompanyE', 'logo5.png', '제주', 'https://apply5.com', 'all', '제주', '1000만원 이하', now(), now());

-- posts
INSERT INTO posts (post_id, title, content, created_at, updated_at, topic_id, profile_id)
VALUES
  (1, 'AI 혁신', 'AI로 세상을 바꾼다', now(), now(), 1, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (2, '웹 개발', '최신 웹 트렌드', now(), now(), 2, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (3, '디자인 팁', 'UI/UX 꿀팁', now(), now(), 3, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (4, '스타트업', '창업 이야기', now(), now(), 4, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (5, '마케팅 전략', '성공하는 마케팅', now(), now(), 5, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b');

-- reviews
INSERT INTO reviews (product_id, profile_id, rating, review, created_at, updated_at)
VALUES
  (1, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 5, 'Great!', now(), now()),
  (2, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 4, 'Good', now(), now()),
  (3, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 3, 'Okay', now(), now()),
  (4, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 2, 'Bad', now(), now()),
  (5, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 1, 'Terrible', now(), now());

-- teams
INSERT INTO teams (team_id, product_name, team_size, equity_split, roles, product_description, created_at, updated_at)
VALUES
  (1, 'Prod1', 5, 20, 'dev', 'Desc1', now(), now()),
  (2, 'Prod2', 4, 25, 'design', 'Desc2', now(), now()),
  (3, 'Prod3', 3, 33, 'pm', 'Desc3', now(), now()),
  (4, 'Prod4', 2, 50, 'marketing', 'Desc4', now(), now()),
  (5, 'Prod5', 6, 16, 'dev', 'Desc5', now(), now());

-- follows (composite PK)
INSERT INTO follows (follower_id, following_id, created_at)
VALUES
  ('c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  ('c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  ('c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  ('c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  ('c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now());

-- product_upvotes (composite PK)
INSERT INTO product_upvotes (product_id, profile_id, created_at)
VALUES
  (1, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  (2, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  (3, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  (4, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  (5, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now());

-- gpt_ideas
INSERT INTO gpt_ideas (gpt_idea_id, idea, views, claimed_at, claimed_by, created_at)
VALUES
  (1, 'AI로 하는 자동화', 10, now(), 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  (2, '웹사이트 빌더', 20, now(), 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  (3, '디자인 툴', 30, now(), 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  (4, '스타트업 플랫폼', 40, now(), 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now()),
  (5, '마케팅 자동화', 50, now(), 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', now());

-- get_ideas_likes (composite PK)
INSERT INTO get_ideas_likes (gpt_idea_id, profile_id)
VALUES
  (1, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (2, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (3, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (4, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (5, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b');

-- post_upvotes (composite PK)
INSERT INTO post_upvotes (post_id, profile_id)
VALUES
  (1, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (2, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (3, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (4, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b'),
  (5, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b');

-- post_replies
INSERT INTO post_replies (reply_id, reply, post_id, profile_id, parent_id, created_at, updated_at)
VALUES
  (1, '좋은 글이네요!', 1, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', NULL, now(), now()),
  (2, '감사합니다!', 1, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', 1, now(), now()),
  (3, '궁금한 점이 있어요.', 2, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', NULL, now(), now()),
  (4, '설명이 명확하네요.', 3, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', NULL, now(), now()),
  (5, '더 많은 정보 부탁해요.', 4, 'c90d0f8a-b9df-41cb-8250-63f3b9f7008b', NULL, now(), now()); 