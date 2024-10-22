import json
import psycopg2
from psycopg2.extras import execute_values

conn = psycopg2.connect(
    dbname="aibox2",
    user="postgres",
    password="0000",
    host="localhost"
)
cur = conn.cursor()

with open('/home/aiboxkorea/aibox/js/all_categories.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for category in data['categories']:
    for item in category['items']:
        cur.execute("""
            INSERT INTO services (name, description, logo, url, type, upvotes)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (item['name'], item['description'], item['logo'], item['url'], item['type'], item['upvotes']))
        service_id = cur.fetchone()[0]

        categories = item['category'].split(', ')
        for cat in categories:
            cur.execute("""
                INSERT INTO categories (name)
                VALUES (%s)
                ON CONFLICT (name) DO NOTHING
                RETURNING id
            """, (cat,))
            result = cur.fetchone()
            if result:
                category_id = result[0]
            else:
                cur.execute("SELECT id FROM categories WHERE name = %s", (cat,))
                category_id = cur.fetchone()[0]

            cur.execute("""
                INSERT INTO service_categories (service_id, category_id)
                VALUES (%s, %s)
            """, (service_id, category_id))

conn.commit()
cur.close()
conn.close()

print("데이터가 성공적으로 데이터베이스에 삽입되었습니다.")
