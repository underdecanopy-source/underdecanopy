from pathlib import Path
import re
contents = Path('lib/data/applysmart.ts').read_text(encoding='utf-8')
start = contents.find('export const courseInstitutionMap: Record<string, string[]> = {')
after = contents[start:]
map_keys = re.findall(r'\n\s*\"?([^\"\n]+?)\"?\s*:\s*\[', after)
print('map_keys', len(map_keys))
print(sorted(map_keys))
