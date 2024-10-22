import json
import psycopg2
from psycopg2.extras import execute_values
import os

# 데이터베이스 연결 설정
conn = psycopg2.connect(
    dbname="aibox",
    user="postgres",
    password="0000",
    host="localhost"
)
cur = conn.cursor()

# 기존 테이블 삭제
cur.execute("DROP TABLE IF EXISTS ai_services")

# 테이블 생성
cur.execute("""
    CREATE TABLE IF NOT EXISTS ai_services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE,
        description TEXT,
        logo VARCHAR(255),
        url VARCHAR(255),
        type VARCHAR(50),
        category TEXT[],
        upvotes INTEGER
    )
""")

# JSON 파일들을 읽어서 데이터 처리
js_directory = '/home/aiboxkorea/aibox/js'
all_items = []

for filename in os.listdir(js_directory):
    if filename.endswith('.json'):
        with open(os.path.join(js_directory, filename), 'r', encoding='utf-8') as f:
            data = json.load(f)
            all_items.extend(data.get('items', []))

# 중복 제거 및 타입 변경
unique_items = {}
for item in all_items:
    name = item['name']
    if name not in unique_items:
        if item['type'] == 'Free-Trial':
            item['type'] = '무료 체험'
        unique_items[name] = item

# 데이터 삽입
for item in unique_items.values():
    try:
        cur.execute("""
            INSERT INTO ai_services (name, description, logo, url, type, category, upvotes)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (name) DO NOTHING
        """, (item['name'], item['description'], item.get('logo', ''), item.get('url', ''), item['type'], item.get('category', ''), item.get('upvotes', 0)))
    except psycopg2.Error as e:
        print(f"Error inserting {item['name']}: {e}")

with open('/home/aiboxkorea/aibox/all_categories.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for category in data['categories']:
    for item in category['items']:
        cur.execute("""
            INSERT INTO ai_services (name, description, logo, url, type, category, upvotes)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (name) DO UPDATE SET
            description = EXCLUDED.description,
            logo = EXCLUDED.logo,
            url = EXCLUDED.url,
            type = EXCLUDED.type,
            category = EXCLUDED.category,
            upvotes = EXCLUDED.upvotes
        """, (
            item['name'],
            item['description'],
            item['logo'],
            item['url'],
            item['type'],
            item['category'].split(', '),
            item['upvotes']
        ))

# 변경사항 커밋 및 연결 종료
conn.commit()
cur.close()
conn.close()

print("데이터가 성공적으로 저장되었습니다.")
