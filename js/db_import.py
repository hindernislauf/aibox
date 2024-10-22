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
        name VARCHAR(255),
        description TEXT,
        logo VARCHAR(255),
        url VARCHAR(255),
        type VARCHAR(50),
        category TEXT,
        views INTEGER
    )
""")

# JSON 파일 읽기
with open('aixploria_all_categories.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 데이터 처리 및 삽입
items = data['items']
for item in items:
    cur.execute("""
        INSERT INTO ai_services (name, description, logo, url, type, category, views)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (item['name'], item['description'], item['logo'], item['url'], item['type'], item['category'], item.get('upvotes', 0)))

# 변경사항 커밋 및 연결 종료
conn.commit()
cur.close()
conn.close()

print("데이터가 성공적으로 저장되었습니다.")
