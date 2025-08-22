# 시나리오 API 스펙

## 개요
시나리오 번호를 받아서 환자 이미지 URL을 반환하는 API입니다.

## API 엔드포인트

### 1. 시나리오 목록 조회
- **GET** `/scenarios`
- 모든 시나리오 목록을 반환합니다.

#### 응답 예시
```json
[
  {
    "scenario_id": 1,
    "scenario_name": "시나리오 1: 기억력 저하",
    "patient_image_url": "https://s3.amazonaws.com/bucket/scenarios/patient_1.jpg",
    "description": "기억력 저하를 보이는 노인 환자"
  },
  {
    "scenario_id": 2,
    "scenario_name": "시나리오 2: 복통",
    "patient_image_url": "https://s3.amazonaws.com/bucket/scenarios/patient_2.jpg",
    "description": "복통을 호소하는 중년 환자"
  }
]
```

### 2. 시나리오별 환자 이미지 조회
- **GET** `/scenarios/{scenario_id}/image`
- 특정 시나리오의 환자 이미지 정보를 반환합니다.

#### 경로 파라미터
- `scenario_id` (number): 시나리오 번호

#### 응답 예시
```json
{
  "scenario_id": 1,
  "scenario_name": "시나리오 1: 기억력 저하",
  "patient_image_url": "https://s3.amazonaws.com/bucket/scenarios/patient_1.jpg",
  "description": "기억력 저하를 보이는 노인 환자"
}
```

## 백엔드 구현 예시 (Python FastAPI)

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import boto3
from botocore.exceptions import ClientError

app = FastAPI()

# S3 클라이언트 설정
s3_client = boto3.client(
    's3',
    aws_access_key_id='YOUR_ACCESS_KEY',
    aws_secret_access_key='YOUR_SECRET_KEY',
    region_name='YOUR_REGION'
)

class ScenarioResponse(BaseModel):
    scenario_id: int
    scenario_name: str
    patient_image_url: str
    description: Optional[str] = None

# 시나리오 데이터 (실제로는 데이터베이스에서 가져옴)
scenarios_data = [
    {
        "scenario_id": 1,
        "scenario_name": "시나리오 1: 기억력 저하",
        "patient_image_url": "https://s3.amazonaws.com/bucket/scenarios/patient_1.jpg",
        "description": "기억력 저하를 보이는 노인 환자"
    },
    {
        "scenario_id": 2,
        "scenario_name": "시나리오 2: 복통",
        "patient_image_url": "https://s3.amazonaws.com/bucket/scenarios/patient_2.jpg",
        "description": "복통을 호소하는 중년 환자"
    }
]

@app.get("/scenarios", response_model=List[ScenarioResponse])
async def get_scenario_list():
    """모든 시나리오 목록을 반환합니다."""
    return scenarios_data

@app.get("/scenarios/{scenario_id}/image", response_model=ScenarioResponse)
async def get_scenario_image(scenario_id: int):
    """특정 시나리오의 환자 이미지 정보를 반환합니다."""
    for scenario in scenarios_data:
        if scenario["scenario_id"] == scenario_id:
            return scenario
    
    raise HTTPException(status_code=404, detail="시나리오를 찾을 수 없습니다.")

# S3에서 Presigned URL 생성 (필요시)
def generate_presigned_url(bucket_name: str, object_key: str, expiration: int = 3600):
    """S3 객체에 대한 Presigned URL을 생성합니다."""
    try:
        response = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': object_key},
            ExpiresIn=expiration
        )
        return response
    except ClientError as e:
        print(f"Error generating presigned URL: {e}")
        return None
```

## 데이터베이스 스키마 예시 (SQL)

```sql
-- 시나리오 테이블
CREATE TABLE scenarios (
    scenario_id SERIAL PRIMARY KEY,
    scenario_name VARCHAR(255) NOT NULL,
    description TEXT,
    patient_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 샘플 데이터
INSERT INTO scenarios (scenario_name, description, patient_image_url) VALUES
('시나리오 1: 기억력 저하', '기억력 저하를 보이는 노인 환자', 'https://s3.amazonaws.com/bucket/scenarios/patient_1.jpg'),
('시나리오 2: 복통', '복통을 호소하는 중년 환자', 'https://s3.amazonaws.com/bucket/scenarios/patient_2.jpg');
```

## 에러 처리

### 404 Not Found
- 존재하지 않는 시나리오 ID로 요청한 경우

```json
{
  "detail": "시나리오를 찾을 수 없습니다."
}
```

### 500 Internal Server Error
- 서버 내부 오류가 발생한 경우

```json
{
  "detail": "서버 내부 오류가 발생했습니다."
}
```

## 보안 고려사항

1. **인증**: JWT 토큰을 통한 사용자 인증
2. **권한**: 시나리오 접근 권한 확인
3. **S3 보안**: 
   - Presigned URL 사용으로 직접 접근 제한
   - 적절한 CORS 설정
   - 버킷 정책 설정

## 프론트엔드 연동

프론트엔드에서는 다음과 같이 API를 호출합니다:

```typescript
// 시나리오 목록 가져오기
const scenarios = await getScenarioList();

// 특정 시나리오의 환자 이미지 가져오기
const scenarioData = await getScenarioImage(scenarioId);
const patientImageUrl = scenarioData.patient_image_url;
```
