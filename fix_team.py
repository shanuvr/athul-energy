import re

with open('front-end/lib/team-data.ts', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(r'image:\s*"/team/[^"]+"', 'image: ""', c)

with open('front-end/lib/team-data.ts', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated team-data.ts: removed non-existent team images')

