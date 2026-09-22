-- My Merry Life — App 運作所需的最小種子資料
-- 用途：留言 / 收藏 / 課程進度只需要 posts、courses、lessons 三張表的 id 對照
-- （文章內文都由靜態網站提供，不存在 DB 裡）
-- 執行位置：Supabase Dashboard → SQL Editor → 貼上全文 → Run
-- 前提：已跑過 00001_init.sql；至少有一個已註冊的使用者（profile 會自動建立）

-- 0. 分類（外鍵目標，先確保存在）
insert into public.categories (name, slug) values
  ('WordPress 教學', 'wordpress'),
  ('前端開發', 'frontend'),
  ('JavaScript', 'javascript'),
  ('後端開發', 'backend'),
  ('部落格經營', 'blogging'),
  ('網賺技巧', 'makemoney'),
  ('好用工具', 'tools')
on conflict (slug) do nothing;

do $$
declare
  author_id uuid;
  cat_wordpress bigint; cat_frontend bigint; cat_javascript bigint;
  cat_backend bigint; cat_blogging bigint; cat_makemoney bigint; cat_tools bigint;
  course_blog bigint; course_company bigint; course_shop bigint; course_school bigint;
begin
  -- 1. 以你自己的帳號作為文章作者（請確認 email 與註冊時相同）
  select p.id into author_id
  from public.profiles p
  join auth.users u on u.id = p.id
  where u.email = 'acmason1491@gmail.com';

  if author_id is null then
    raise exception '找不到 acmason1491@gmail.com 的 profile，請先完成註冊＋Email 驗證＋登入一次';
  end if;

  select id into cat_wordpress  from public.categories where slug = 'wordpress';
  select id into cat_frontend   from public.categories where slug = 'frontend';
  select id into cat_javascript from public.categories where slug = 'javascript';
  select id into cat_backend    from public.categories where slug = 'backend';
  select id into cat_blogging   from public.categories where slug = 'blogging';
  select id into cat_makemoney  from public.categories where slug = 'makemoney';
  select id into cat_tools      from public.categories where slug = 'tools';

  -- 2. 34 篇文章（slug 必須與網站完全一致，網站只用 id 做關聯查詢）
  insert into public.posts (title, slug, excerpt, content, published, featured, author_id, category_id, published_at) values
    ('SEO 基礎入門：讓你的文章被 Google 看見', 'seo-basics', 'SEO 摘要', '<p>SEO</p>', true, false, author_id, cat_blogging, now()),
    ('HTML 語意化標籤使用指南', 'html-semantic-tags', 'HTML 摘要', '<p>HTML</p>', true, false, author_id, cat_frontend, now()),
    ('CSS Flexbox 完全攻略', 'css-flexbox-guide', 'CSS 摘要', '<p>CSS</p>', true, false, author_id, cat_frontend, now()),
    ('JavaScript 基礎入門', 'javascript-basics', 'JS 摘要', '<p>JS</p>', true, false, author_id, cat_javascript, now()),
    ('React 元件開發實戰', 'react-components', 'React 摘要', '<p>React</p>', true, false, author_id, cat_frontend, now()),
    ('Node.js 後端開發入門', 'nodejs-basics', 'Node 摘要', '<p>Node</p>', true, false, author_id, cat_backend, now()),
    ('HTML – 筆記', 'html-notes', 'HTML 筆記', '<p>HTML 筆記</p>', true, false, author_id, cat_frontend, now()),
    ('CSS – 筆記', 'css-notes', 'CSS 筆記', '<p>CSS 筆記</p>', true, false, author_id, cat_frontend, now()),
    ('JavaScript 筆記 – 1', 'js-notes-1', 'JS 筆記 1', '<p>JS1</p>', true, false, author_id, cat_javascript, now()),
    ('JavaScript 筆記 – 2', 'js-notes-2', 'JS 筆記 2', '<p>JS2</p>', true, false, author_id, cat_javascript, now()),
    ('JavaScript 筆記 – DOM', 'js-notes-dom', 'JS DOM', '<p>DOM</p>', true, false, author_id, cat_javascript, now()),
    ('React 筆記 – 前端框架', 'react-notes', 'React 筆記', '<p>React 筆記</p>', true, false, author_id, cat_frontend, now()),
    ('後端開發 筆記 – 1', 'backend-notes-1', '後端 1', '<p>後端 1</p>', true, false, author_id, cat_backend, now()),
    ('後端開發 筆記 – 2', 'backend-notes-2', '後端 2', '<p>後端 2</p>', true, false, author_id, cat_backend, now()),
    ('後端開發 筆記 – 3', 'backend-notes-3', '後端 3', '<p>後端 3</p>', true, false, author_id, cat_backend, now()),
    ('如何建立一個可賺錢的部落格', 'start-profitable-blog', '部落格變現', '<p>變現</p>', true, false, author_id, cat_blogging, now()),
    ('網賺初學者快速入門法 – 1', 'makemoney-1', '網賺 1', '<p>網賺 1</p>', true, false, author_id, cat_makemoney, now()),
    ('網賺初學者快速入門法 – 2', 'makemoney-2', '網賺 2', '<p>網賺 2</p>', true, false, author_id, cat_makemoney, now()),
    ('如何避免被 FB 封鎖帳號', 'avoid-fb-block', 'FB 帳號', '<p>FB</p>', true, false, author_id, cat_makemoney, now()),
    ('如何增加網站流量 (Hitleap)', 'hitleap-intro', '流量', '<p>流量</p>', true, false, author_id, cat_tools, now()),
    ('Hitleap vs BIGHITS4U', 'hitleap-vs-bighits4u', '流量比較', '<p>比較</p>', true, false, author_id, cat_tools, now()),
    ('Fiverr 網站介紹', 'fiverr-intro', 'Fiverr', '<p>Fiverr</p>', true, false, author_id, cat_tools, now()),
    ('AWeber Landing Page 製作', 'aweber-landing-page', 'AWeber LP', '<p>LP</p>', true, false, author_id, cat_tools, now()),
    ('AWeber 自動化群發功能', 'aweber-broadcast', 'AWeber 群發', '<p>群發</p>', true, false, author_id, cat_tools, now()),
    ('AWeber Campaigns 廣告活動', 'aweber-campaigns', 'AWeber Campaigns', '<p>Campaigns</p>', true, false, author_id, cat_tools, now()),
    ('如何自行架設網站 (WordPress)', 'self-host-wordpress', '自架站', '<p>自架站</p>', true, false, author_id, cat_wordpress, now()),
    ('Bluehost 快速架設網站', 'bluehost-setup', 'Bluehost', '<p>Bluehost</p>', true, false, author_id, cat_wordpress, now()),
    ('WordPress 網站手動搬家', 'wordpress-move', '搬家', '<p>搬家</p>', true, false, author_id, cat_wordpress, now()),
    ('HostGator 快速架設網站', 'hostgator-setup', 'HostGator', '<p>HostGator</p>', true, false, author_id, cat_wordpress, now()),
    ('Google 協作平台建站教學', 'google-site-free', 'Google Site', '<p>Site</p>', true, false, author_id, cat_wordpress, now()),
    ('designrr 電子書平台介紹', 'designrr-ebook', 'designrr', '<p>designrr</p>', true, false, author_id, cat_tools, now()),
    ('Thrive Suite 介紹', 'thrive-suite', 'Thrive', '<p>Thrive</p>', true, false, author_id, cat_tools, now()),
    ('Sticky Table of Contents', 'sticky-table-of-contents', '目錄', '<p>目錄</p>', true, false, author_id, cat_tools, now()),
    ('Mouse Without Borders 應用', 'mouse-without-borders', 'MWB', '<p>MWB</p>', true, false, author_id, cat_tools, now())
  on conflict (slug) do nothing;

  -- 3. 4 堂課程（單元數必須與網站一致：9 / 9 / 18 / 25）
  insert into public.courses (title, slug, description, excerpt, price, level, published, featured, duration, category_id) values
    ('個人部落格架設', 'blog-setup', '部落格課程', '部落格', 0, 'BEGINNER', true, false, 120, cat_wordpress),
    ('公司官方網站架設', 'company-website', '公司網站課程', '公司網站', 0, 'BEGINNER', true, false, 150, cat_wordpress),
    ('WordPress 購物網站教學', 'ecommerce-setup', '購物網站課程', '購物網站', 0, 'INTERMEDIATE', true, false, 240, cat_wordpress),
    ('線上課程平台打造', 'online-course-platform', '線上課程課程', '線上課程', 0, 'INTERMEDIATE', true, false, 360, cat_wordpress)
  on conflict (slug) do nothing;

  select id into course_blog    from public.courses where slug = 'blog-setup';
  select id into course_company from public.courses where slug = 'company-website';
  select id into course_shop    from public.courses where slug = 'ecommerce-setup';
  select id into course_school  from public.courses where slug = 'online-course-platform';

  -- 4. 各課程單元（order 從 0 開始，必須與網站單元索引一致）
  insert into public.lessons (title, slug, "order", published, course_id)
  select '單元 ' || (g + 1), 'blog-setup-lesson-' || g, g, true, course_blog
  from generate_series(0, 8) g
  on conflict (slug) do nothing;

  insert into public.lessons (title, slug, "order", published, course_id)
  select '單元 ' || (g + 1), 'company-website-lesson-' || g, g, true, course_company
  from generate_series(0, 8) g
  on conflict (slug) do nothing;

  insert into public.lessons (title, slug, "order", published, course_id)
  select '單元 ' || (g + 1), 'ecommerce-setup-lesson-' || g, g, true, course_shop
  from generate_series(0, 17) g
  on conflict (slug) do nothing;

  insert into public.lessons (title, slug, "order", published, course_id)
  select '單元 ' || (g + 1), 'online-course-platform-lesson-' || g, g, true, course_school
  from generate_series(0, 24) g
  on conflict (slug) do nothing;
end $$;
