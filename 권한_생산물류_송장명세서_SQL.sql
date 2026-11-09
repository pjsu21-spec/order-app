-- ══════════════════════════════════════════════════════════════════════
-- 권한 세분화: 「생산/물류」·「송장/명세서」를 발주자동화와 별도 권한으로 부여
--  * perm_plan(생산/물류), perm_invoice(송장/명세서) 칸 추가
--      값: NULL = 발주자동화 권한을 따름(기존과 동일) / 'none' 차단 / 'read' 읽기만 / 'full' 전체
--  * 사용자 정보·권한 수정 함수(app_admin_update_user)가 새 칸을 받을 수 있게 교체
--  * 기존 직원은 아무것도 바뀌지 않습니다 (모두 NULL = 발주자동화를 따름).
--  * 여러 번 실행해도 안전합니다.
--  * 실행 위치: Supabase 대시보드 → SQL Editor → 전체 붙여넣고 Run
-- ══════════════════════════════════════════════════════════════════════

alter table public.users add column if not exists perm_plan text;
alter table public.users add column if not exists perm_invoice text;

create or replace function public.app_admin_update_user(p_token text, p_id text, p_fields jsonb)
returns jsonb
language plpgsql security definer set search_path = public, extensions
as $$
declare
  u public.users; k text;
  allowed text[] := array['display_name','department','role','is_active','access_order','access_sorting','sorting_master_edit',
                          'access_files','access_cost','access_sample','readonly_order','readonly_sorting','readonly_files',
                          'perm_plan','perm_invoice'];
begin
  select * into u from public._app_user_by_token(p_token);
  if not found or u.role <> 'admin' then return jsonb_build_object('error', 'forbidden'); end if;
  for k in select jsonb_object_keys(p_fields) loop
    if not (k = any(allowed)) then return jsonb_build_object('error', 'bad_field', 'field', k); end if;
  end loop;
  update public.users set
    display_name        = case when p_fields ? 'display_name' then p_fields->>'display_name' else display_name end,
    department          = case when p_fields ? 'department' then nullif(trim(p_fields->>'department'), '') else department end,
    role                = case when p_fields ? 'role' then (case when p_fields->>'role' = 'admin' then 'admin' else 'staff' end) else role end,
    is_active           = case when p_fields ? 'is_active' then (p_fields->>'is_active')::boolean else is_active end,
    access_order        = case when p_fields ? 'access_order' then (p_fields->>'access_order')::boolean else access_order end,
    access_sorting      = case when p_fields ? 'access_sorting' then (p_fields->>'access_sorting')::boolean else access_sorting end,
    sorting_master_edit = case when p_fields ? 'sorting_master_edit' then (p_fields->>'sorting_master_edit')::boolean else sorting_master_edit end,
    access_files        = case when p_fields ? 'access_files' then (p_fields->>'access_files')::boolean else access_files end,
    access_cost         = case when p_fields ? 'access_cost' then (p_fields->>'access_cost')::boolean else access_cost end,
    access_sample       = case when p_fields ? 'access_sample' then p_fields->>'access_sample' else access_sample end,
    readonly_order      = case when p_fields ? 'readonly_order' then (p_fields->>'readonly_order')::boolean else readonly_order end,
    readonly_sorting    = case when p_fields ? 'readonly_sorting' then (p_fields->>'readonly_sorting')::boolean else readonly_sorting end,
    readonly_files      = case when p_fields ? 'readonly_files' then (p_fields->>'readonly_files')::boolean else readonly_files end,
    perm_plan           = case when p_fields ? 'perm_plan' then (case when p_fields->>'perm_plan' in ('none','read','full') then p_fields->>'perm_plan' else null end) else perm_plan end,
    perm_invoice        = case when p_fields ? 'perm_invoice' then (case when p_fields->>'perm_invoice' in ('none','read','full') then p_fields->>'perm_invoice' else null end) else perm_invoice end
  where id::text = p_id;
  if not found then return jsonb_build_object('error', 'not_found'); end if;
  -- 비활성화한 사용자는 로그인 세션도 끊는다
  if p_fields ? 'is_active' and (p_fields->>'is_active')::boolean = false then
    delete from public.sessions where user_id::text = p_id;
  end if;
  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.app_admin_update_user(text, text, jsonb) from public;
grant execute on function public.app_admin_update_user(text, text, jsonb) to anon, authenticated;
