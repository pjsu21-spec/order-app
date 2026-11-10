-- 원물선별: 원물입고·사입 통합 + 원물 자재 코드 + 출고 거래처 이카운트 코드
-- Supabase SQL Editor에서 한 번 실행하세요. (이 SQL을 실행한 뒤에 앱의 새 입고 화면이 정상 동작합니다)

-- 1) 원물입고 한 건에 사입처(필수)·농가(선택)·원물 자재 코드를 같이 저장
ALTER TABLE sorting_inbound ADD COLUMN IF NOT EXISTS vendor_id bigint;      -- 사입처 (앱에서 필수 입력)
ALTER TABLE sorting_inbound ADD COLUMN IF NOT EXISTS item_code text;        -- 원물 자재 코드 (이카운트 자재 마스터)
ALTER TABLE sorting_inbound ADD COLUMN IF NOT EXISTS item_name text;        -- 원물 품목명
ALTER TABLE sorting_inbound ADD COLUMN IF NOT EXISTS variety text;          -- 품종
ALTER TABLE sorting_inbound ALTER COLUMN farm_id DROP NOT NULL;             -- 농가는 선택 (비워둘 수 있게)

-- 2) 출고·정산 거래처에 이카운트 거래처 코드 저장
ALTER TABLE sorting_destinations ADD COLUMN IF NOT EXISTS ecount_code text;

-- 3) 예전 원물입고(농가)·사입 내역 삭제 (사용자 확인: 이전 입력 데이터는 의미 없어 삭제해도 됨)
--    새 방식은 sorting_inbound만 사용하고 sorting_purchases(사입) 테이블은 더 이상 쓰지 않습니다.
--    ※ 지우지 않고 남기려면 아래 두 줄을 실행하지 마세요 (남겨 둔 예전 농가 입고는 사입처가 비어 있어 선별전재고 계산에서 빠집니다).
DELETE FROM sorting_inbound;
DELETE FROM sorting_purchases;

-- 참고: 선별산출(sorting_output) 내역과 출고(sorting_shipment) 내역은 건드리지 않습니다.
--       예전 입고를 지웠기 때문에 예전 선별산출이 남아 있으면 사입처별 선별전재고가 음수로 보일 수 있습니다.
--       그 내역도 정리하고 싶으면 별도로 말씀해 주세요.
