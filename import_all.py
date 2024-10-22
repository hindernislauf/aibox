import os
import json

# 디렉토리 경로 설정
directory = '/home/aiboxkorea/aibox/js'

# 모든 카테고리를 저장할 리스트
all_categories = []

# 디렉토리 내의 모든 JSON 파일을 순회
for filename in os.listdir(directory):
    if filename.endswith('.json'):
        file_path = os.path.join(directory, filename)
        with open(file_path, 'r', encoding='utf-8') as file:
            try:
                # JSON 파일 읽기
                data = json.load(file)
                # 카테고리 이름 추출 (파일 이름에서 .json 제거)
                category_name = os.path.splitext(filename)[0]
                # 카테고리 객체 생성
                category = {
                    "name": category_name,
                    "items": data.get('items', [])
                }
                # 카테고리를 리스트에 추가
                all_categories.append(category)
            except json.JSONDecodeError:
                print(f"Error decoding JSON from file: {filename}")

# 모든 카테고리를 포함하는 새로운 JSON 파일 생성
output_file = '/home/aiboxkorea/aibox/all_categories.json'
with open(output_file, 'w', encoding='utf-8') as outfile:
    json.dump({"categories": all_categories}, outfile, ensure_ascii=False, indent=2)

print(f"All categories have been combined into {output_file}")