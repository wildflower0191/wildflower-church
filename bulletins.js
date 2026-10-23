(() => {
  const list = document.getElementById('bulletin-list');
  function message(t) { const div=document.createElement('div');div.className='card bulletin-empty';div.textContent=t;list.replaceChildren(div); }
  function create(tag, text, cls) { const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el; }
  fetch('bulletins.json?refresh=' + Math.floor(Date.now()/60000), {cache:'no-store'})
    .then(r => { if(!r.ok) throw Error('not found'); return r.json(); })
    .then(items => {
      if(!Array.isArray(items)||!items.length){message('등록된 소식지가 없습니다. 첫 소식지를 기다려 주세요.');return;}
      list.replaceChildren();
      items.forEach(item => {
        if(!item || typeof item.file !== 'string' || !/^bulletins\/[\w가-힣 .()\-]+\.(pdf|png|jpe?g|webp)$/i.test(item.file))return;
        const card=create('article',undefined,'card bulletin-card');
        const isImg=/\.(png|jpe?g|webp)$/i.test(item.file);
        if(isImg){const img=document.createElement('img');img.src=encodeURI(item.file);img.alt=(item.title||'들꽃 소식지')+' 미리보기';img.loading='lazy';card.append(img);}
        card.append(create('h3',item.title||'들꽃 소식지'));
        if(item.date)card.append(create('p',item.date,'date'));
        const actions=create('div',undefined,'actions');
        const link=create('a',isImg?'소식지 사진 보기 ↗':'소식지 PDF 보기 ↗','btn secondary');
        link.href=encodeURI(item.file);link.target='_blank';link.rel='noopener noreferrer';actions.append(link);card.append(actions);list.append(card);
      });
      if(!list.children.length)message('표시할 수 있는 소식지가 없습니다.');
    }).catch(()=>message('소식지를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.'));
})();
