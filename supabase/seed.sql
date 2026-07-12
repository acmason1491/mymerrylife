-- My Merry Life — Seed Data
-- Run this AFTER the migration (00001_init.sql) has been executed.

-- ── Admin user profile ──
-- Replace the UUID below with the actual auth.users id after registration,
-- or insert a test auth user first.
-- For now, we use a placeholder. After signing up, run:
--   UPDATE public.profiles SET role = 'ADMIN' WHERE email = 'your@email.com';
insert into public.profiles (id, name, role)
values ('00000000-0000-0000-0000-000000000001', '管理員', 'AUTHOR')
on conflict (id) do nothing;

insert into public.profiles (id, name, role)
values ('00000000-0000-0000-0000-000000000002', 'Mason', 'AUTHOR')
on conflict (id) do nothing;

-- ── Categories ──
insert into public.categories (name, slug, description) values
  ('WordPress 教學', 'wordpress', 'WordPress 相關教學與指南'),
  ('前端開發', 'frontend', 'HTML、CSS、JavaScript、React 等前端技術'),
  ('JavaScript', 'javascript', 'JavaScript 程式語言深入探討'),
  ('後端開發', 'backend', 'Node.js、資料庫、API 開發'),
  ('部落格經營', 'blogging', '部落格經營、SEO、內容行銷'),
  ('網賺技巧', 'makemoney', '網路賺錢技巧與方法'),
  ('好用工具', 'tools', '實用網路工具介紹與教學'),
  ('其它', 'other', '其他主題')
on conflict (slug) do nothing;

-- ── Tags ──
insert into public.tags (name, slug) values
  ('WordPress', 'wordpress'),
  ('入門', 'beginner'),
  ('WooCommerce', 'woocommerce'),
  ('購物網站', 'ecommerce'),
  ('SEO', 'seo'),
  ('流量', 'traffic'),
  ('HTML', 'html'),
  ('前端', 'frontend'),
  ('CSS', 'css'),
  ('Flexbox', 'flexbox'),
  ('JavaScript', 'javascript'),
  ('React', 'react'),
  ('Node.js', 'nodejs'),
  ('後端', 'backend'),
  ('DOM', 'dom'),
  ('MySQL', 'mysql'),
  ('MongoDB', 'mongodb'),
  ('API', 'api'),
  ('部落格', 'blog'),
  ('網賺', 'makemoney')
on conflict (slug) do nothing;

-- ── Posts ──
-- We use a fixed author_id; update after real registration.
-- Title, slug, excerpt, content, published_at, category

do $$
declare
  author_admin uuid := '00000000-0000-0000-0000-000000000001';
  author_mason uuid := '00000000-0000-0000-0000-000000000002';
  cat_wp       bigint; cat_frontend bigint; cat_js bigint; cat_backend bigint; cat_blog bigint; cat_makemoney bigint; cat_tools bigint;
begin
  select id into cat_wp       from public.categories where slug = 'wordpress';
  select id into cat_frontend from public.categories where slug = 'frontend';
  select id into cat_js       from public.categories where slug = 'javascript';
  select id into cat_backend  from public.categories where slug = 'backend';
  select id into cat_blog     from public.categories where slug = 'blogging';
  select id into cat_makemoney from public.categories where slug = 'makemoney';
  select id into cat_tools     from public.categories where slug = 'tools';

  insert into public.posts (title, slug, excerpt, content, published, featured, author_id, category_id, published_at) values
    ('WordPress 基礎設定完整指南', 'wordpress-basics', '從安裝到完成基本設定，一步步帶你操作 WordPress 後台。', '<p>WordPress 是目前最受歡迎的內容管理系統，這篇文章將帶你從安裝到基本設定完整走一遍。</p>', true, true, author_admin, cat_wp, '2026-06-15'),
    ('如何選擇適合的網域名稱', 'choose-domain-name', '網域名稱是網站的第一印象，教你如何選擇最好的域名。', '<p>選擇一個好的網域名稱是建立網站的第一步，也是最關鍵的決策之一。</p>', true, true, author_admin, cat_wp, '2026-06-10'),
    ('WooCommerce 購物車設定教學', 'woocommerce-setup', '一步步帶你在 WordPress 上建立完整的網路商店。', '<p>WooCommerce 是 WordPress 上最強大的電子商務外掛，這篇文章將教你如何完整設定。</p>', true, true, author_admin, cat_wp, '2026-06-05'),
    ('SEO 基礎入門：讓你的文章被 Google 看見', 'seo-basics', '了解搜尋引擎優化的核心概念，提升網站流量。', '<p>SEO（搜尋引擎優化）是讓你的網站內容在 Google 等搜尋引擎獲得更好排名的關鍵技術。</p>', true, false, author_admin, cat_blog, '2026-05-28'),
    ('HTML 語意化標籤使用指南', 'html-semantic-tags', '了解 HTML5 語意化標籤的正確使用方式，提升網站可讀性與 SEO。', '<p>HTML5 引入了多個語意化標籤，讓網頁結構更有意義且更容易被搜尋引擎理解。</p>', true, false, author_admin, cat_frontend, '2026-05-20'),
    ('CSS Flexbox 完全攻略', 'css-flexbox-guide', '從基礎到進階，徹底掌握 Flexbox 排版技巧。', '<p>Flexbox 是 CSS3 引入的強大排版工具，讓你能輕鬆建立響應式網頁佈局。</p>', true, false, author_admin, cat_frontend, '2026-05-15'),
    ('JavaScript 基礎入門', 'javascript-basics', 'JavaScript 是網頁互動的核心，從變數開始學起。', '<p>JavaScript 是現代網頁開發不可或缺的程式語言，這篇文章帶你從基礎開始認識。</p>', true, false, author_admin, cat_js, '2026-05-10'),
    ('React 元件開發實戰', 'react-components', '學習 React 元件化開發，建立可重用的 UI 元件。', '<p>React 的元件化開發模式讓前端程式碼更容易維護和重用。</p>', true, false, author_admin, cat_frontend, '2026-05-05'),
    ('Node.js 後端開發入門', 'nodejs-basics', '使用 JavaScript 開發伺服器端應用程式。', '<p>Node.js 讓 JavaScript 能夠在伺服器端執行，開啟了全端 JavaScript 開發的大門。</p>', true, false, author_admin, cat_backend, '2026-04-28'),
    ('HTML 筆記', 'html-notes', 'HTML (HyperText Markup Language) 是打造網頁的基石，從基本結構到常用標籤、表單與多媒體的完整筆記。', '<p>HTML 是網頁開發的基礎語言，這份筆記涵蓋了從基本結構到進階標籤的完整內容。</p>', true, false, author_mason, cat_frontend, '2026-07-10'),
    ('CSS 筆記', 'css-notes', '從 CSS 基礎選擇器、盒模型、Flexbox、Grid 到動畫與響應式設計的完整學習筆記。', '<p>CSS 負責網頁的視覺呈現，這份筆記完整記錄了從基礎到進階的 CSS 知識。</p>', true, false, author_mason, cat_frontend, '2026-07-10'),
    ('JavaScript 筆記 – 1', 'js-notes-1', 'JavaScript 基礎：常見函數、Lexical Structure、變數、資料型別、運算子與控制流程。', '<p>JavaScript 基礎知識整理，包含變數宣告、資料型別、運算子與流程控制。</p>', true, false, author_mason, cat_js, '2026-07-10'),
    ('JavaScript 筆記 – 2', 'js-notes-2', 'JavaScript 進階：物件、陣列、函式進階、JSON、Storage、錯誤處理、非同步與模組。', '<p>JavaScript 進階主題：物件導向、非同步程式設計、錯誤處理與模組系統。</p>', true, false, author_mason, cat_js, '2026-07-10'),
    ('JavaScript 筆記 – DOM', 'js-notes-dom', 'JavaScript DOM 操作：選取元素、事件處理、節點遍歷與操作、視窗事件與表單處理。', '<p>DOM 操作是 JavaScript 與網頁互動的核心，這份筆記涵蓋了所有常用 DOM API。</p>', true, false, author_mason, cat_js, '2026-07-10'),
    ('React 筆記 – 前端框架', 'react-notes', 'React 前端框架學習筆記：SPA 概念、元件化開發、JSX、Props、State 與 Hooks。', '<p>React 是現代前端開發的主流框架，這份筆記整理了 React 的核心概念與實戰技巧。</p>', true, false, author_mason, cat_frontend, '2026-07-10'),
    ('後端開發 筆記 – 1', 'backend-notes-1', '版本控制 (Git)、命令列基礎、資料結構概論、Node.js 入門與 Express 框架。', '<p>後端開發基礎：從版本控制到 Node.js 與 Express 框架的完整學習路徑。</p>', true, false, author_mason, cat_backend, '2026-07-10'),
    ('後端開發 筆記 – 2', 'backend-notes-2', 'MySQL 資料庫、MongoDB NoSQL 資料庫、Mongoose ODM 與綠界金流 API 整合。', '<p>後端開發進階：SQL 與 NoSQL 資料庫操作，以及第三方金流 API 整合實戰。</p>', true, false, author_mason, cat_backend, '2026-07-10'),
    ('後端開發 筆記 – 3', 'backend-notes-3', 'RESTful API 設計、第三方 API 串接、JWT 認證、真實專案架構與部署。', '<p>後端開發實戰：API 設計原則、認證機制、專案架構與部署流程。</p>', true, false, author_mason, cat_backend, '2026-07-10'),
    ('如何建立一個可賺錢的部落格 – 獲取個人的被動收入', 'start-profitable-blog', '從選擇主題、架設網站、內容創作到流量變現，完整教學讓你建立能賺錢的部落格。', '<p>建立一個能賺錢的部落格需要策略與執行力，這篇文章完整解析了從 0 到 1 的過程。</p>', true, false, author_mason, cat_blog, '2026-07-10'),
    ('網賺初學者快速入門法 – 文章點擊賺錢方法 – 1 (Facebook)', 'makemoney-1', '最簡單、容易上手的在家用網路賺錢方法', '<p>Facebook文章點擊賺錢是最簡單的網賺入門方法。</p>', true, false, author_mason, cat_makemoney, '2026-07-10'),
    ('網賺初學者快速入門法 – 文章點擊賺錢方法 – 2 (Facebook)', 'makemoney-2', '進階Facebook文章點擊賺錢技巧', '<p>進階的Facebook文章點擊賺錢技巧與策略。</p>', true, false, author_mason, cat_makemoney, '2026-07-10'),
    ('分身帳號常被FB封鎖、停用嗎？– 如何避免被FB封鎖帳號', 'avoid-fb-block', '教你如何避免Facebook分身帳號被封鎖', '<p>使用多個Facebook分身帳號時如何避免被封鎖的實用技巧。</p>', true, false, author_mason, cat_makemoney, '2026-07-10'),
    ('如何增加網站流量？– 免費、簡單、好用的全自動軟體介紹(Hitleap)', 'hitleap-intro', '使用Hitleap全自動增加網站流量', '<p>Hitleap是一個免費的全自動流量交換平台，可以幫助你增加網站流量。</p>', true, false, author_mason, cat_tools, '2026-07-10'),
    ('全自動流量交換平台介紹、比較 (Hitleap vs BIGHITS4U)', 'hitleap-vs-bighits4u', '比較兩個主流全自動流量交換平台', '<p>詳細比較Hitleap和BIGHITS4U兩個流量交換平台的優缺點。</p>', true, false, author_mason, cat_tools, '2026-07-10'),
    ('自由職業者工作接案、工作外包平台 – Fiverr 網站介紹', 'fiverr-intro', 'Fiverr自由職業者接案平台完整介紹', '<p>Fiverr是全球最大的自由職業者接案平台之一，這篇文章完整介紹其使用方法。</p>', true, false, author_mason, cat_tools, '2026-07-10'),
    ('如何註冊 AWeber ? AWeber Landing Page 製作與電子郵件行銷', 'aweber-landing-page', '沒有網站也能製作一頁式廣告網頁', '<p>使用AWeber製作Landing Page並進行電子郵件自動化行銷的完整教學。</p>', true, false, author_mason, cat_tools, '2026-07-10'),
    ('如何使用 AWeber 網站對客戶進行自動化的群發功能 – 電子郵件行銷', 'aweber-broadcast', 'AWeber自動化群發郵件教學', '<p>學習如何使用AWeber的廣播功能對客戶進行自動化群發郵件。</p>', true, false, author_mason, cat_tools, '2026-07-10'),
    ('如何在 AWeber 平台建立一個自動化回覆的廣告活動 (Campaigns)', 'aweber-campaigns', 'AWeber Campaigns自動化回覆廣告活動教學', '<p>使用AWeber Campaigns功能建立自動化回覆的電子郵件行銷活動。</p>', true, false, author_mason, cat_tools, '2026-07-10'),
    ('如何自行架設網站? – 新手免費教學 (WordPress)', 'self-host-wordpress', '從零開始學習自行架設WordPress網站', '<p>從選擇主機、安裝WordPress到完成基本設定的完整教學。</p>', true, false, author_mason, cat_wp, '2026-07-10'),
    ('如何使用 Bluehost 快速架設網站? 簡單、易學 – 新手免費教學 (WordPress)', 'bluehost-setup', '使用Bluehost快速架設WordPress網站完整教學', '<p>使用Bluehost一鍵安裝功能快速架設WordPress網站的詳細步驟。</p>', true, false, author_mason, cat_wp, '2026-07-10'),
    ('WordPress 網站手動搬家 – 更換虛擬主機網站搬家教學', 'wordpress-move', 'WordPress網站更換主機的手動搬家完整教學', '<p>手動搬遷WordPress網站到新的虛擬主機的完整教學。</p>', true, false, author_mason, cat_wp, '2026-07-10'),
    ('如何使用 HostGator 快速架設網站? 簡單、易學 – 新手免費教學 (WordPress)', 'hostgator-setup', '使用HostGator快速架設WordPress網站完整教學', '<p>使用HostGator快速架設WordPress網站的詳細步驟教學。</p>', true, false, author_mason, cat_wp, '2026-07-10'),
    ('如何免費創建自己的網站 – Google協作平台 (Google site) 教學', 'google-site-free', '免費使用Google協作平台建立自己的網站', '<p>使用Google協作平台免費建立自己的網站，無需任何技術背景。</p>', true, false, author_mason, cat_wp, '2026-07-10'),
    ('如何簡單、快速的製作精美的電子書 – designrr 設計平台介紹', 'designrr-ebook', '使用designrr快速製作精美電子書', '<p>使用designrr平台從部落格文章快速製作精美電子書的教學。</p>', true, false, author_mason, cat_tools, '2026-07-10'),
    ('超好用的 WordPress 全方位外掛 – Thrive Suite 介紹', 'thrive-suite', 'Thrive Architect 和 Thrive Theme Builder 完整介紹', '<p>Thrive Suite是一套全方位的WordPress外掛，包含頁面編輯器、主題建立器等。</p>', true, false, author_mason, cat_tools, '2026-07-10'),
    ('如何使用 Thrive Theme Builder 構建固定式目錄 (Sticky Table of Contents)', 'sticky-table-of-contents', '在長篇文章中構建固定式目錄的教學', '<p>使用Thrive Theme Builder為長篇文章建立固定式目錄的詳細步驟。</p>', true, false, author_mason, cat_tools, '2026-07-10'),
    ('如何在不同電腦之間共用滑鼠和鍵盤？– Mouse Without Borders 應用', 'mouse-without-borders', 'Mouse Without Borders跨電腦共用滑鼠鍵盤教學', '<p>使用Microsoft的Mouse Without Borders軟體在多台電腦間共用滑鼠和鍵盤。</p>', true, false, author_mason, cat_tools, '2026-07-10');
end $$;

-- ── Tags on Posts ──
do $$
declare
  pid bigint;
  tid bigint;
begin
  -- Helper: link a post slug to a tag slug
  create temp table if not exists post_tag_link (post_slug text, tag_slug text) on commit delete rows;

  insert into post_tag_link values
    ('wordpress-basics', 'wordpress'), ('wordpress-basics', 'beginner'),
    ('choose-domain-name', 'wordpress'), ('choose-domain-name', 'beginner'),
    ('woocommerce-setup', 'woocommerce'), ('woocommerce-setup', 'ecommerce'),
    ('seo-basics', 'seo'), ('seo-basics', 'traffic'),
    ('html-semantic-tags', 'html'), ('html-semantic-tags', 'frontend'),
    ('css-flexbox-guide', 'css'), ('css-flexbox-guide', 'flexbox'),
    ('javascript-basics', 'javascript'), ('javascript-basics', 'beginner'),
    ('react-components', 'react'), ('react-components', 'frontend'),
    ('nodejs-basics', 'nodejs'), ('nodejs-basics', 'backend'),
    ('html-notes', 'html'), ('html-notes', 'frontend'),
    ('css-notes', 'css'), ('css-notes', 'frontend'),
    ('js-notes-1', 'javascript'),
    ('js-notes-2', 'javascript'),
    ('js-notes-dom', 'javascript'), ('js-notes-dom', 'dom'),
    ('react-notes', 'react'), ('react-notes', 'frontend'),
    ('backend-notes-1', 'backend'), ('backend-notes-1', 'nodejs'),
    ('backend-notes-2', 'backend'), ('backend-notes-2', 'mysql'), ('backend-notes-2', 'mongodb'),
    ('backend-notes-3', 'backend'), ('backend-notes-3', 'api'), ('backend-notes-3', 'nodejs'),
    ('start-profitable-blog', 'blog'), ('start-profitable-blog', 'makemoney'),
    ('makemoney-1', 'makemoney'),
    ('makemoney-2', 'makemoney'),
    ('avoid-fb-block', 'makemoney'),
    ('hitleap-intro', 'traffic'),
    ('hitleap-vs-bighits4u', 'traffic'),
    ('fiverr-intro', 'wordpress'),
    ('aweber-landing-page', 'blog'),
    ('aweber-broadcast', 'blog'),
    ('aweber-campaigns', 'blog'),
    ('self-host-wordpress', 'wordpress'), ('self-host-wordpress', 'beginner'),
    ('bluehost-setup', 'wordpress'), ('bluehost-setup', 'beginner'),
    ('wordpress-move', 'wordpress'),
    ('hostgator-setup', 'wordpress'), ('hostgator-setup', 'beginner'),
    ('google-site-free', 'wordpress'),
    ('designrr-ebook', 'blog'),
    ('thrive-suite', 'wordpress'),
    ('sticky-table-of-contents', 'wordpress'),
    ('mouse-without-borders', 'tools');

  for pid, tid in
    select p.id, t.id
    from post_tag_link l
    join public.posts p on p.slug = l.post_slug
    join public.tags t on t.slug = l.tag_slug
  loop
    insert into public.tags_on_posts (post_id, tag_id) values (pid, tid) on conflict do nothing;
  end loop;
end $$;

-- ── Courses ──
do $$
declare
  cat_wp bigint; cat_frontend bigint;
begin
  select id into cat_wp       from public.categories where slug = 'wordpress';
  select id into cat_frontend from public.categories where slug = 'frontend';

  insert into public.courses (title, slug, description, excerpt, cover_image, price, level, published, featured, duration, category_id) values
    ('個人部落格架設', 'blog-setup', '從零開始建立自己的 WordPress 部落格', '不需要任何程式背景，跟著步驟就能完成', 'placeholder.svg', 0, 'BEGINNER', true, true, 120, cat_wp),
    ('公司官方網站架設', 'company-website', '為您的企業打造專業的公司網站', '節省高額設計費用，自己動手做', 'placeholder.svg', 0, 'BEGINNER', true, true, 150, cat_wp),
    ('購物網站架設', 'ecommerce-setup', '建立屬於自己的網路商店', 'WooCommerce 完整教學，從安裝到上線', 'placeholder.svg', 0, 'INTERMEDIATE', true, true, 240, cat_wp),
    ('線上課程平台打造', 'online-course-platform', '建立可銷售的線上課程平台', 'Thrive Apprentice + WooCommerce 完整整合', 'placeholder.svg', 0, 'INTERMEDIATE', true, true, 360, cat_wp),
    ('前端開發基礎', 'frontend-basics', 'HTML、CSS、JavaScript 網頁前端核心技術', '掌握現代前端開發的核心技能', 'placeholder.svg', 0, 'BEGINNER', true, true, 480, cat_frontend),
    ('React 框架實戰', 'react-practice', '從基礎到實戰，掌握 React 生態系', '元件化開發、Hooks、狀態管理', 'placeholder.svg', 0, 'INTERMEDIATE', true, true, 360, cat_frontend)
  on conflict (slug) do nothing;
end $$;

-- ── Lessons ──
do $$
declare
  cid bigint;
begin
  -- Blog Setup (9 lessons)
  select id into cid from public.courses where slug = 'blog-setup';
  insert into public.lessons (title, slug, content, duration, "order", published, course_id) values
    ('課程介紹', 'blog-setup-01', '<p>歡迎來到個人部落格架設課程，這堂課將帶你從零開始建立自己的 WordPress 部落格。</p>', 5, 1, true, cid),
    ('什麼是 WordPress', 'blog-setup-02', '<p>WordPress 是一個免費且開源的內容管理系統（CMS），全球超過 40% 的網站使用它。</p>', 10, 2, true, cid),
    ('挑選網域名稱與主機', 'blog-setup-03', '<p>網域名稱是你在網路上的地址，主機則是存放網站檔案的地方。</p>', 15, 3, true, cid),
    ('安裝 WordPress', 'blog-setup-04', '<p>透過 cPanel 或主機商提供的一鍵安裝功能，快速完成 WordPress 安裝。</p>', 15, 4, true, cid),
    ('WordPress 後台導覽', 'blog-setup-05', '<p>熟悉 WordPress 後台介面，了解文章、頁面、外觀、外掛等主要功能。</p>', 15, 5, true, cid),
    ('選擇與安裝主題', 'blog-setup-06', '<p>主題決定了網站的外觀設計，學習如何選擇和安裝適合的主題。</p>', 15, 6, true, cid),
    ('安裝必要外掛', 'blog-setup-07', '<p>外掛能擴充 WordPress 功能，這節課介紹部落格必備的外掛。</p>', 15, 7, true, cid),
    ('撰寫第一篇文章', 'blog-setup-08', '<p>學習使用 WordPress 區塊編輯器撰寫和排版文章。</p>', 15, 8, true, cid),
    ('基本 SEO 設定', 'blog-setup-09', '<p>學會使用 Yoast SEO 外掛進行基本的搜尋引擎優化設定。</p>', 15, 9, true, cid);

  -- Company Website (9 lessons)
  select id into cid from public.courses where slug = 'company-website';
  insert into public.lessons (title, slug, content, duration, "order", published, course_id) values
    ('課程介紹', 'company-website-01', '<p>這堂課教你如何為企業打造專業的官方網站。</p>', 5, 1, true, cid),
    ('企業網站規劃', 'company-website-02', '<p>了解企業網站需要哪些頁面和功能。</p>', 15, 2, true, cid),
    ('選擇適合的主題', 'company-website-03', '<p>企業網站需要專業穩重的設計，學習如何選擇適合的主題。</p>', 15, 3, true, cid),
    ('頁面編輯器介紹', 'company-website-04', '<p>學習使用 Elementor 或區塊編輯器建立專業頁面。</p>', 20, 4, true, cid),
    ('建立首頁', 'company-website-05', '<p>設計專業的首頁佈局，包含 Hero、服務介紹、關於我們等區塊。</p>', 20, 5, true, cid),
    ('關於我們與服務頁面', 'company-website-06', '<p>建立關於我們、服務項目、團隊介紹等頁面。</p>', 15, 6, true, cid),
    ('聯絡表單設定', 'company-website-07', '<p>使用 Contact Form 7 建立聯絡表單。</p>', 10, 7, true, cid),
    ('Google 地圖整合', 'company-website-08', '<p>在網站中加入 Google 地圖，讓客戶更容易找到你。</p>', 10, 8, true, cid),
    ('網站上線檢查清單', 'company-website-09', '<p>上線前的最終檢查，確保一切運作正常。</p>', 10, 9, true, cid);

  -- Ecommerce Setup (18 lessons)
  select id into cid from public.courses where slug = 'ecommerce-setup';
  insert into public.lessons (title, slug, content, duration, "order", published, course_id) values
    ('課程介紹', 'ecommerce-01', '<p>這堂課教你建立屬於自己的網路商店。</p>', 5, 1, true, cid),
    ('為什麼選擇 WooCommerce', 'ecommerce-02', '<p>WooCommerce 是最受歡迎的 WordPress 購物車外掛。</p>', 10, 2, true, cid),
    ('主機需求與安裝', 'ecommerce-03', '<p>購物網站對主機的要求較高，了解如何選擇合適的主機。</p>', 15, 3, true, cid),
    ('安裝 WooCommerce', 'ecommerce-04', '<p>一步步安裝和設定 WooCommerce 外掛。</p>', 15, 4, true, cid),
    ('基本設定', 'ecommerce-05', '<p>設定貨幣、稅率、運送方式等基本參數。</p>', 15, 5, true, cid),
    ('新增商品', 'ecommerce-06', '<p>學習如何建立商品頁面，包含簡單商品與可變商品。</p>', 20, 6, true, cid),
    ('商品分類與標籤', 'ecommerce-07', '<p>建立商品分類和標籤，讓顧客更容易找到商品。</p>', 10, 7, true, cid),
    ('運送設定', 'ecommerce-08', '<p>設定運送區域、運費計算方式。</p>', 15, 8, true, cid),
    ('金流設定', 'ecommerce-09', '<p>整合綠界或藍新金流，讓顧客可以線上付款。</p>', 20, 9, true, cid),
    ('購物車與結帳頁面', 'ecommerce-10', '<p>優化購物車和結帳流程，降低棄購率。</p>', 15, 10, true, cid),
    ('訂單管理', 'ecommerce-11', '<p>學習如何管理和處理顧客訂單。</p>', 10, 11, true, cid),
    ('庫存管理', 'ecommerce-12', '<p>設定庫存提醒和管理商品庫存。</p>', 10, 12, true, cid),
    ('電子郵件通知', 'ecommerce-13', '<p>設定訂單確認、出貨通知等自動化郵件。</p>', 10, 13, true, cid),
    ('優惠券與折扣', 'ecommerce-14', '<p>建立優惠券和折扣活動來促進銷售。</p>', 15, 14, true, cid),
    ('商品評論', 'ecommerce-15', '<p>啟用和管理商品評論功能。</p>', 10, 15, true, cid),
    ('SEO 優化', 'ecommerce-16', '<p>優化商品頁面 SEO，提升搜尋排名。</p>', 15, 16, true, cid),
    ('速度優化', 'ecommerce-17', '<p>學習如何優化購物網站載入速度。</p>', 15, 17, true, cid),
    ('網站安全', 'ecommerce-18', '<p>保護你的購物網站免受攻擊。</p>', 10, 18, true, cid);

  -- Online Course Platform (24 lessons)
  select id into cid from public.courses where slug = 'online-course-platform';
  insert into public.lessons (title, slug, content, duration, "order", published, course_id) values
    ('課程介紹', 'ocp-01', '<p>這堂課教你建立可銷售的線上課程平台。</p>', 5, 1, true, cid),
    ('平台選擇：Thrive Apprentice vs LearnDash', 'ocp-02', '<p>比較兩大線上課程外掛的優缺點。</p>', 10, 2, true, cid),
    ('安裝 Thrive Apprentice', 'ocp-03', '<p>安裝和設定 Thrive Apprentice 外掛。</p>', 15, 3, true, cid),
    ('建立課程結構', 'ocp-04', '<p>設計課程分類、章節和單元的結構。</p>', 15, 4, true, cid),
    ('建立課程頁面', 'ocp-05', '<p>設計吸引人的課程銷售頁面。</p>', 20, 5, true, cid),
    ('新增課程內容', 'ocp-06', '<p>上傳影片、講義和其他課程教材。</p>', 20, 6, true, cid),
    ('影片託管選擇', 'ocp-07', '<p>比較 YouTube、Vimeo、私密影片託管的差異。</p>', 10, 7, true, cid),
    ('會員系統設定', 'ocp-08', '<p>設定會員註冊、登入和權限管理。</p>', 15, 8, true, cid),
    ('金流整合', 'ocp-09', '<p>串接 WooCommerce 與金流服務來銷售課程。</p>', 20, 9, true, cid),
    ('課程定價策略', 'ocp-10', '<p>如何為你的課程定價以最大化收益。</p>', 10, 10, true, cid),
    ('優惠券與促銷', 'ocp-11', '<p>設定課程折扣和限時優惠活動。</p>', 10, 11, true, cid),
    ('學生管理', 'ocp-12', '<p>管理學生名單、學習進度和成績。</p>', 10, 12, true, cid),
    ('測驗與作業', 'ocp-13', '<p>建立測驗和作業來評估學生學習成果。</p>', 15, 13, true, cid),
    ('課程討論區', 'ocp-14', '<p>建立課程討論區促進師生互動。</p>', 10, 14, true, cid),
    ('電子郵件整合', 'ocp-15', '<p>串接電子郵件行銷工具，自動化跟進學生。</p>', 15, 15, true, cid),
    ('完成證書', 'ocp-16', '<p>設定課程完成證書自動發放。</p>', 10, 16, true, cid),
    ('課程遷移', 'ocp-17', '<p>從其他平台遷移課程到 WordPress。</p>', 15, 17, true, cid),
    ('多語系設定', 'ocp-18', '<p>使用 WPML 或 Polylang 建立多語系課程平台。</p>', 20, 18, true, cid),
    ('SEO 優化', 'ocp-19', '<p>優化課程頁面 SEO 吸引學生。</p>', 15, 19, true, cid),
    ('速度優化', 'ocp-20', '<p>優化課程平台的載入速度。</p>', 15, 20, true, cid),
    ('備份與安全', 'ocp-21', '<p>定期備份課程資料和安全防護。</p>', 10, 21, true, cid),
    ('行銷推廣', 'ocp-22', '<p>行銷你的線上課程，吸引更多學生。</p>', 15, 22, true, cid),
    ('數據分析', 'ocp-23', '<p>使用分析工具了解學生行為和課程表現。</p>', 10, 23, true, cid),
    ('總結與下一步', 'ocp-24', '<p>課程總結和進階學習建議。</p>', 5, 24, true, cid);

  -- Frontend Basics (23 lessons)
  select id into cid from public.courses where slug = 'frontend-basics';
  insert into public.lessons (title, slug, content, duration, "order", published, course_id) values
    ('課程介紹', 'fe-01', '<p>這堂課將帶你掌握前端開發的三大核心技術。</p>', 5, 1, true, cid),
    ('開發環境設定', 'fe-02', '<p>安裝 VS Code、瀏覽器開發者工具等必備工具。</p>', 15, 2, true, cid),
    ('HTML 基礎', 'fe-03', '<p>HTML 文件結構、基本標籤與屬性。</p>', 20, 3, true, cid),
    ('HTML 語意化標籤', 'fe-04', '<p>header、nav、main、section、article 等語意化標籤的使用。</p>', 20, 4, true, cid),
    ('HTML 表單', 'fe-05', '<p>建立表單、輸入欄位、驗證屬性的使用。</p>', 20, 5, true, cid),
    ('CSS 基礎', 'fe-06', '<p>CSS 選擇器、顏色、字體、背景等基礎屬性。</p>', 20, 6, true, cid),
    ('CSS 盒模型', 'fe-07', '<p>深入理解 margin、padding、border 和 box-sizing。</p>', 25, 7, true, cid),
    ('CSS 定位', 'fe-08', '<p>Position、Display、Float 等定位方式。</p>', 25, 8, true, cid),
    ('CSS Flexbox', 'fe-09', '<p>Flexbox 完整教學，從基礎到進階排版。</p>', 30, 9, true, cid),
    ('CSS Grid', 'fe-10', '<p>Grid 佈局系統，建立複雜的網格設計。</p>', 30, 10, true, cid),
    ('響應式設計', 'fe-11', '<p>Media Queries、行動優先、響應式圖片。</p>', 25, 11, true, cid),
    ('CSS 動畫', 'fe-12', '<p>Transition、Animation、Transform 動畫效果。</p>', 25, 12, true, cid),
    ('JavaScript 基礎', 'fe-13', '<p>變數、資料型別、運算子、條件判斷。</p>', 25, 13, true, cid),
    ('JavaScript 函式', 'fe-14', '<p>函式宣告、箭頭函式、參數與回傳值。</p>', 25, 14, true, cid),
    ('JavaScript 陣列與物件', 'fe-15', '<p>陣列方法、物件操作、解構賦值。</p>', 25, 15, true, cid),
    ('DOM 操作', 'fe-16', '<p>選取元素、修改內容、操作樣式。</p>', 25, 16, true, cid),
    ('事件處理', 'fe-17', '<p>事件監聽、事件冒泡、事件委派。</p>', 25, 17, true, cid),
    ('ES6+ 新特性', 'fe-18', '<p>模板字串、箭頭函式、Promise、async/await。</p>', 25, 18, true, cid),
    ('Git 版本控制', 'fe-19', '<p>Git 基礎指令、分支管理、GitHub 使用。</p>', 20, 19, true, cid),
    ('套件管理器', 'fe-20', '<p>npm 和 yarn 的基本使用。</p>', 15, 20, true, cid),
    ('建立個人作品集網站', 'fe-21', '<p>綜合運用所學建立個人作品集網站。</p>', 30, 21, true, cid),
    ('部署上線', 'fe-22', '<p>使用 Netlify 或 Vercel 部署靜態網站。</p>', 15, 22, true, cid),
    ('總結與學習路徑', 'fe-23', '<p>前端開發學習資源與進階方向建議。</p>', 10, 23, true, cid);

  -- React Practice (18 lessons)
  select id into cid from public.courses where slug = 'react-practice';
  insert into public.lessons (title, slug, content, duration, "order", published, course_id) values
    ('課程介紹', 'react-01', '<p>這堂課將帶你從基礎到實戰掌握 React 開發。</p>', 5, 1, true, cid),
    ('React 是什麼', 'react-02', '<p>了解 React 的核心概念和為什麼要學習 React。</p>', 10, 2, true, cid),
    ('建立第一個 React 專案', 'react-03', '<p>使用 Create React App 或 Vite 建立專案。</p>', 15, 3, true, cid),
    ('JSX 語法', 'react-04', '<p>JSX 是 React 的模板語言，學習其語法規則。</p>', 15, 4, true, cid),
    ('Component 元件', 'react-05', '<p>函式元件與類別元件的寫法與差異。</p>', 20, 5, true, cid),
    ('Props 屬性', 'react-06', '<p>元件間的資料傳遞方式。</p>', 15, 6, true, cid),
    ('State 狀態', 'react-07', '<p>useState Hook 管理元件狀態。</p>', 20, 7, true, cid),
    ('事件處理', 'react-08', '<p>React 中的事件處理方式。</p>', 15, 8, true, cid),
    ('條件渲染與列表', 'react-09', '<p>條件渲染和列表渲染的技巧。</p>', 15, 9, true, cid),
    ('useEffect', 'react-10', '<p>useEffect Hook 處理副作用。</p>', 20, 10, true, cid),
    ('React Router', 'react-11', '<p>建立多頁面應用程式的路由系統。</p>', 20, 11, true, cid),
    ('表單處理', 'react-12', '<p>受控元件與表單驗證。</p>', 20, 12, true, cid),
    ('Context API', 'react-13', '<p>使用 Context 進行全域狀態管理。</p>', 20, 13, true, cid),
    ('useReducer', 'react-14', '<p>useReducer Hook 管理複雜狀態。</p>', 20, 14, true, cid),
    ('自訂 Hook', 'react-15', '<p>建立可重用的自訂 Hook。</p>', 20, 15, true, cid),
    ('效能優化', 'react-16', '<p>React.memo、useMemo、useCallback 效能優化。</p>', 20, 16, true, cid),
    ('串接 API', 'react-17', '<p>使用 fetch 或 axios 串接後端 API。</p>', 20, 17, true, cid),
    ('部署 React 專案', 'react-18', '<p>將 React 應用部署到 Vercel 或 Netlify。</p>', 15, 18, true, cid);
end $$;
