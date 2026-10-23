from pathlib import Path
import json, re
root=Path(__file__).resolve().parents[1]
files=[p for p in (root/'bulletins').iterdir() if p.is_file() and p.suffix.lower() in {'.pdf','.png','.jpg','.jpeg','.webp'}]
# 파일명 예: 2026-10-25_들꽃교회_주보.pdf
files.sort(key=lambda p:p.name,reverse=True)
items=[]
for p in files:
    stem=p.stem
    m=re.match(r'^(\d{4}-\d{2}-\d{2})[_ -]*(.*)$',stem)
    date=m.group(1) if m else ''
    title=(m.group(2) if m else stem).replace('_',' ').strip() or '들꽃 소식지'
    items.append({'file':'bulletins/'+p.name,'date':date,'title':title})
(root/'bulletins.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'{len(items)}개 소식지 반영')
