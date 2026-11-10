-- 원물선별 출고·정산: 출고 제품(SKU) 저장용 컬럼 (Supabase SQL Editor에서 한 번 실행)
-- 실행하기 전에도 출고 등록은 되지만, 제품이 메모에 "포장: 제품명 × N박스"로만 남습니다.
ALTER TABLE sorting_shipment ADD COLUMN IF NOT EXISTS sku_id text;
ALTER TABLE sorting_shipment ADD COLUMN IF NOT EXISTS sku_name text;
