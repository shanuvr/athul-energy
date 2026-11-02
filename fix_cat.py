with open('front-end/app/(admin)/dashboard/clients/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

target = 'category: "Chemical" | "Manufacturing" | "Automotive" | "Healthcare" | "Textile" | "Institutions";'
replacement = 'category: "Chemical" | "Manufacturing" | "Automotive" | "Healthcare" | "Textile" | "Institutions" | "Commercial";'

if target in c:
    c = c.replace(target, replacement)
    with open('front-end/app/(admin)/dashboard/clients/page.tsx', 'w', encoding='utf-8') as f:
        f.write(c)
    print("Successfully added Commercial category")
else:
    print("Target not found")

