/* ==========================================================
   WHITE SHIRTS COFFEE - main.js
   구성: 1) 데이터  2) 유틸  3) GNB/Scrollspy  4) Hero 핸드드립
         5) Scroll Reveal  6) MENU  7) SHOP+모달  8) NEWS  9) CONTACT
   ========================================================== */
'use strict';

/* ---------- 1) 데이터 (수정가이드: 내용/가격/이미지 주소는 여기서만 수정) ----------
   img: 이미지 URL (교체 시 이 값만 바꾸면 됨). 로딩 실패 시 자동으로 대체 이미지가 표시됩니다. */
const U = id => `https://images.unsplash.com/photo-${id}?w=700&q=80`;

const MENU_DATA = [
  {cat:'커피', name:'핸드드립 (싱글오리진)', price:6500, desc:'오늘의 원두를 한 잔씩 천천히 추출', img:U('1514432324607-a09d9b4aefdd')},
  {cat:'커피', name:'화이트 라떼', price:6000, desc:'부드러운 우유와 진한 에스프레소', img:U('1509042239860-f550ce710b93')},
  {cat:'커피', name:'카푸치노', price:5500, desc:'고운 거품과 깊은 커피 향', img:U('1495474472287-4d71bcdd2085')},
  {cat:'음료', name:'콜드브루', price:5800, desc:'12시간 저온 추출, 깔끔한 단맛', img:U('1461023058943-07fcbe16d735')},
  {cat:'베이커리', name:'버터 크루아상', price:4800, desc:'매일 아침 구워내는 바삭한 크루아상', img:U('1555507036-ab1f4038808a')},
  {cat:'베이커리', name:'소금빵', price:3800, desc:'겉은 바삭, 속은 촉촉', img:U('1509440159596-0249088772ff')},
];
const MENU_CATS = ['전체','커피','음료','베이커리'];

// status: 'sale'(판매중) | 'soldout'(품절) | 'soon'(재입고 예정)
// tag: 'BEST' | 'NEW' | '' ,  link: 외부 구매 페이지(스마트스토어 등)
const PRODUCTS = [
  {id:1, cat:'원두', tag:'BEST', name:'에티오피아 예가체프', price:18000, status:'sale', desc:'꽃향기와 시트러스의 밝은 산미', origin:'에티오피아', process:'워시드', flavor:'자스민, 레몬, 꿀', brew:'핸드드립',
   img:U('1559056199-641a0ac8b55e'), img2:U('1447933601403-0c6688de566e'), link:'https://smartstore.naver.com',
   reviews:[{u:'kim**',s:5,t:'향이 정말 좋아요. 재구매했습니다.'},{u:'lee**',s:4,t:'산미가 깔끔하고 배송도 빨랐어요.'}]},
  {id:2, cat:'원두', tag:'BEST', name:'하우스 블렌드', price:15000, status:'sale', desc:'고소함과 단맛의 균형', origin:'브라질·콜롬비아', process:'내추럴/워시드', flavor:'견과류, 초콜릿', brew:'에스프레소·드립',
   img:U('1447933601403-0c6688de566e'), img2:U('1559056199-641a0ac8b55e'), link:'https://smartstore.naver.com',
   reviews:[{u:'park**',s:5,t:'매일 마시는 데일리 원두로 최고예요.'}]},
  {id:3, cat:'원두', tag:'NEW', name:'콜롬비아 우일라', price:19000, status:'soon', desc:'붉은 과일의 달콤함', origin:'콜롬비아', process:'허니', flavor:'체리, 캐러멜', brew:'핸드드립',
   img:U('1442512595331-e89e73853f31'), img2:U('1559056199-641a0ac8b55e'), link:'https://smartstore.naver.com', reviews:[]},
  {id:4, cat:'커피용품', tag:'', name:'드립 서버 & 드리퍼 세트', price:32000, status:'sale', desc:'집에서 즐기는 핸드드립 입문 세트', origin:'-', process:'-', flavor:'-', brew:'-',
   img:U('1514432324607-a09d9b4aefdd'), img2:U('1497935586351-b67a49e012bf'), link:'https://smartstore.naver.com',
   reviews:[{u:'choi**',s:5,t:'디자인이 예쁘고 사용하기 편해요.'}]},
  {id:5, cat:'굿즈', tag:'NEW', name:'화이트셔츠 머그', price:14000, status:'soldout', desc:'단정한 화이트 세라믹 머그', origin:'-', process:'-', flavor:'-', brew:'-',
   img:U('1497935586351-b67a49e012bf'), img2:U('1495474472287-4d71bcdd2085'), link:'https://smartstore.naver.com', reviews:[]},
  {id:6, cat:'선물세트', tag:'', name:'드립백 선물세트 (10입)', price:22000, status:'sale', desc:'간편하게 즐기는 드립백 모음', origin:'-', process:'-', flavor:'-', brew:'드립백',
   img:U('1461023058943-07fcbe16d735'), img2:U('1447933601403-0c6688de566e'), link:'https://smartstore.naver.com', reviews:[]},
];
const SHOP_CATS = ['전체','원두','커피용품','굿즈','선물세트'];

const NEWS_DATA = [
  {title:'성수 팝업스토어 오픈', date:'2026.11.20 – 12.05', desc:'핸드드립 바와 한정 원두를 만나보세요.', img:U('1442512595331-e89e73853f31')},
  {title:'겨울 시즌 메뉴 출시', date:'2026.11.15', desc:'시나몬 라떼와 뱅쇼 콜드브루가 추가됩니다.', img:U('1461023058943-07fcbe16d735')},
  {title:'신규 원두 콜롬비아 우일라 입고', date:'2026.11.10', desc:'재입고 알림을 신청하세요.', img:U('1559056199-641a0ac8b55e')},
];

/* ---------- 2) 유틸 ---------- */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const won = n => n.toLocaleString('ko-KR') + '원';
// 이미지 로딩 실패 시 보여줄 대체 이미지(SVG). 이미지 교체 전 임시 표시 용도.
const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700"><rect width="100%" height="100%" fill="#e9e3d6"/><text x="50%" y="50%" fill="#A67C52" font-family="sans-serif" font-size="28" text-anchor="middle">IMAGE</text></svg>');
// 전역 이미지 오류 처리 (img 태그의 src만 바꾸면 되도록)
document.addEventListener('error', e => { if (e.target.tagName === 'IMG' && e.target.src !== FALLBACK) e.target.src = FALLBACK; }, true);
const img = (src, alt, cls='') => `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy">`;
// 탭 버튼 생성 + 선택 시 콜백 호출 (MENU/SHOP 공용)
function makeTabs(el, cats, onSelect){
  el.innerHTML = cats.map((c,i)=>`<button role="tab" aria-selected="${i===0}" data-c="${c}">${c}</button>`).join('');
  el.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', el).forEach(x => x.setAttribute('aria-selected', x === b));
    onSelect(b.dataset.c);
  });
}

/* ---------- 3) GNB: 스크롤 시 테두리, 모바일 메뉴, Scrollspy ---------- */
const gnb = $('#gnb'), nav = $('#nav'), burger = $('#burger');
/* GNB 언어 전환 효과: data-ko 가 있는 메뉴를 영문/국문 두 줄 구조로 바꿔줌 */
$$('#nav a[data-ko]').forEach(a => {
  const en = a.textContent.trim();
  a.setAttribute('aria-label', `${en} (${a.dataset.ko})`);
  a.innerHTML = `<span class="swap" aria-hidden="true">
    <span class="en">${en}</span><span class="ko">${a.dataset.ko}</span></span>`;
});
addEventListener('scroll', () => gnb.classList.toggle('scrolled', scrollY > 10), {passive:true});
burger.addEventListener('click', () => {            // 모바일 햄버거 메뉴 열기/닫기
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
$$('#nav a, #csBtn').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));
// Scrollspy: 화면 중앙에 들어온 섹션의 메뉴를 활성화 (IntersectionObserver)
const spyLinks = $$('[data-spy]');
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting)
    spyLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id)); });
}, {rootMargin:'-45% 0px -50% 0px'});
$$('main section').forEach(s => spy.observe(s));

/* ---------- 4) HERO: 인터랙티브 핸드드립 ----------
   - 마우스/터치를 움직이면 주전자가 좌우로 이동, 물줄기가 내려옴
   - 물줄기가 서버 위에 있는 동안 커피가 채워짐 (FILL_SPEED로 속도 조절)
   - 100% 도달 시 .done 클래스 → 스팀 + 로고/슬로건 등장 */
const hero = $('#hero'), drip = $('#drip'), kettle = $('#kettle'), stream = $('#stream'), fillRect = $('#fillRect');
/* [수정가이드] 그림 크기/위치를 바꾸면 아래 값을 함께 조정하세요 (단위 px)
   tipX/tipY : 주전자 가운데 기준 주둥이 끝 위치(물줄기 시작점)
   dripperTop: 서버 영역 상단~드리퍼 입구 높이 / dripperHalf: 물줄기가 들어가는 드리퍼 입구 반폭
   serverH   : 드리퍼+서버 전체 높이 / fillBottom,fillMaxH : 서버 안 커피 바닥 y와 최대 높이 */
const CFG = {tipX:-85, tipY:36, dripperTop:14, dripperHalf:55, serverH:260, fillBottom:248, fillMaxH:120, speed:0.3};
let level = 0, finished = false, kx = 0;   // kx: 주전자 좌우 이동량(px)

function setFill(){                        // 커피 높이를 SVG 사각형에 반영
  const h = level / 100 * CFG.fillMaxH;
  fillRect.setAttribute('y', CFG.fillBottom - h); fillRect.setAttribute('height', h);
}
function finish(){                         // 추출 완료 처리
  finished = true; level = 100; setFill();
  hero.classList.remove('pouring'); hero.classList.add('done');
}
function moveKettle(clientX){              // 포인터 위치 → 주전자 위치
  const r = drip.getBoundingClientRect(), max = r.width/2 - 70;
  kx = Math.max(-max, Math.min(max, clientX - (r.left + r.width/2)));
  kettle.style.transform = `translateX(${kx}px) rotate(-8deg)`;     // 주둥이 끝을 축으로 기울임
  stream.style.left = `calc(50% + ${kx + CFG.tipX}px)`;            // 물줄기를 주둥이 끝에 정렬
}
hero.addEventListener('pointermove', e => { if (!finished) moveKettle(e.clientX); });
hero.addEventListener('pointerdown', e => { if (!finished) moveKettle(e.clientX); });
function loop(){                           // 매 프레임: 물줄기/채움 갱신
  if (!finished){
    const onDripper = Math.abs(kx + CFG.tipX) < CFG.dripperHalf;    // 물줄기가 드리퍼 입구 안인지
    const bottom = onDripper ? drip.clientHeight - CFG.serverH + CFG.dripperTop : drip.clientHeight;
    stream.style.opacity = 1;
    stream.style.top = CFG.tipY + 'px';
    stream.style.height = Math.max(0, bottom - CFG.tipY) + 'px';
    hero.classList.toggle('pouring', onDripper);                    // 드리퍼 아래 물방울 애니메이션
    if (onDripper){ level = Math.min(100, level + CFG.speed); setFill(); }
    if (level >= 100) finish();
    $('#hint').textContent = onDripper ? `추출 중… ${Math.floor(level)}%` : '주전자를 드리퍼 위로 움직여 보세요';
  } else stream.style.opacity = 0;
  requestAnimationFrame(loop);
}
moveKettle(innerWidth/2 + 200);            // 시작 위치(드리퍼 옆)
requestAnimationFrame(loop);
$('#skipBtn').addEventListener('click', finish);
if (matchMedia('(prefers-reduced-motion: reduce)').matches) finish();  // 모션 최소화 설정 시 즉시 완료

/* ---------- 5) Scroll Reveal: 화면에 들어오면 .in 추가 (CSS가 애니메이션 처리) ---------- */
const rv = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); o.unobserve(e.target); } }), {threshold:.15});
$$('.reveal').forEach(el => rv.observe(el));

/* ---------- 6) MENU: 카테고리 탭 + 카드 렌더링 ---------- */
function renderMenu(cat='전체'){
  $('#menuGrid').innerHTML = MENU_DATA.filter(m => cat === '전체' || m.cat === cat).map(m => `
    <article class="card" tabindex="0"><div class="thumb">${img(m.img, m.name)}</div>
    <div class="body"><h3>${m.name}</h3><p>${m.desc}</p><span class="price">${won(m.price)}</span></div></article>`).join('');
}
makeTabs($('#menuTabs'), MENU_CATS, renderMenu); renderMenu();

/* ---------- 7) SHOP: 카테고리 필터 + 재고 표시 + 상세/리뷰 모달 ---------- */
const STATUS = {sale:['판매중',''], soldout:['품절','soldout'], soon:['재입고 예정','soon']};
function renderShop(cat='전체'){
  $('#shopGrid').innerHTML = PRODUCTS.filter(p => cat === '전체' || p.cat === cat).map(p => `
    <article class="card" tabindex="0" data-id="${p.id}"><div class="thumb">${img(p.img, p.name)}${img(p.img2, '', 'alt-img')}</div>
    <div class="body">${p.tag ? `<span class="tag">${p.tag}</span>` : ''}<h3>${p.name}<span class="badge ${STATUS[p.status][1]}">${STATUS[p.status][0]}</span></h3>
    <p>${p.desc}</p><span class="price">${won(p.price)}</span></div></article>`).join('');
}
makeTabs($('#shopTabs'), SHOP_CATS, renderShop); renderShop();

const modal = $('#modal');
function openModal(id){
  const p = PRODUCTS.find(x => x.id == id); if (!p) return;
  const avg = p.reviews.length ? (p.reviews.reduce((a,r)=>a+r.s,0)/p.reviews.length).toFixed(1) : null;
  $('#modalBody').innerHTML = `
    <div class="m-grid">${img(p.img, p.name)}
      <div class="m-info"><h3 id="mTitle">${p.name}</h3><p class="price">${won(p.price)}</p><p>${p.desc}</p>
        <dl><dt>원산지</dt><dd>${p.origin}</dd><dt>가공</dt><dd>${p.process}</dd><dt>향미</dt><dd>${p.flavor}</dd><dt>추천 추출</dt><dd>${p.brew}</dd><dt>재고</dt><dd>${STATUS[p.status][0]}</dd></dl>
        ${p.status === 'sale' ? `<a class="btn" href="${p.link}" target="_blank" rel="noopener">구매하기</a>` : `<button class="btn" disabled>${STATUS[p.status][0]}</button>`}
      </div></div>
    <div class="reviews"><h3>구매 후기 ${avg ? `<span class="stars">★</span> ${avg}` : ''}</h3>
      <ul>${p.reviews.length ? p.reviews.map(r => `<li><span class="stars">${'★'.repeat(r.s)}${'☆'.repeat(5-r.s)}</span> <b>${r.u}</b><br>${r.t}</li>`).join('') : '<li>아직 등록된 후기가 없습니다.</li>'}</ul></div>`;
  modal.hidden = false; document.body.style.overflow = 'hidden'; $('#modalClose').focus();
}
function closeModal(){ modal.hidden = true; document.body.style.overflow = ''; }
$('#shopGrid').addEventListener('click', e => { const c = e.target.closest('.card'); if (c) openModal(c.dataset.id); });
$('#shopGrid').addEventListener('keydown', e => { if (e.key === 'Enter'){ const c = e.target.closest('.card'); if (c) openModal(c.dataset.id); } });
$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });   // 배경 클릭 시 닫기
addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });        // ESC 로 닫기

/* ---------- 8) NEWS: 카드 렌더링 + 뉴스레터 구독 ---------- */
$('#newsGrid').innerHTML = NEWS_DATA.map(n => `
  <article class="card" tabindex="0"><div class="thumb" style="aspect-ratio:16/10">${img(n.img, n.title)}</div>
  <div class="body"><span class="tag">${n.date}</span><h3>${n.title}</h3><p>${n.desc}</p></div></article>`).join('');
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function setMsg(el, text, ok){ el.textContent = text; el.className = 'msg ' + (ok ? 'ok' : 'err'); }
$('#newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = $('#nlEmail').value.trim(), m = $('#nlMsg');
  if (!emailOk(v)) return setMsg(m, '올바른 이메일 주소를 입력해 주세요.', false);
  // [수정가이드] 실제 서비스에서는 여기서 fetch()로 구독 API(스티비, 메일침프 등)에 전송하세요.
  setMsg(m, '구독 신청이 완료되었습니다. 감사합니다!', true); e.target.reset();
});

/* ---------- 9) CONTACT: 문의 폼 검증 ---------- */
$('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#cName').value.trim(), mail = $('#cMail').value.trim(), body = $('#cBody').value.trim(), m = $('#cMsg');
  if (!name || !body) return setMsg(m, '이름과 문의 내용을 입력해 주세요.', false);
  if (!emailOk(mail)) return setMsg(m, '올바른 이메일 주소를 입력해 주세요.', false);
  // [수정가이드] 실제 전송: fetch('/api/contact', {method:'POST', body: JSON.stringify({...})}) 또는 mailto 로 교체
  setMsg(m, '문의가 접수되었습니다. 영업일 기준 2일 내 답변드립니다.', true); e.target.reset();
});
