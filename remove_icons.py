import re

with open('cv.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove section-icon blocks with their SVG content
pattern = r'<div class="section-icon">\s*<svg[^>]*>[\s\S]*?</svg>\s*</div>'
content = re.sub(pattern, '', content)

with open('cv.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Icons removed')
