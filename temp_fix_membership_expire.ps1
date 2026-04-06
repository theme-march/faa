$ErrorActionPreference = "Stop"

function Replace-Regex {
    param(
        [string]$Content,
        [string]$Pattern,
        [string]$Replacement,
        [string]$Label
    )

    if ($Content -notmatch $Pattern) {
        throw "Pattern not found for $Label"
    }

    return [System.Text.RegularExpressions.Regex]::Replace(
        $Content,
        $Pattern,
        $Replacement,
        [System.Text.RegularExpressions.RegexOptions]::Singleline
    )
}

function Replace-Exact {
    param(
        [string]$Content,
        [string]$OldValue,
        [string]$NewValue,
        [string]$Label
    )

    if (-not $Content.Contains($OldValue)) {
        throw "Exact block not found for $Label"
    }

    return $Content.Replace($OldValue, $NewValue)
}

$apiPath = "C:\Users\Akash\Desktop\faaw_admin\controllers\api\member.js"
$memberPath = "C:\Users\Akash\Desktop\faaw_admin\controllers\member\Member.js"

$apiContent = Get-Content -Raw -LiteralPath $apiPath
$memberContent = Get-Content -Raw -LiteralPath $memberPath

$helperOld = @'
function resolveEffectiveApprovedDate({
  adminApproval,
  approvedAt,
  lastPaymentRaw,
  createdAt,
}) {
  if (Number(adminApproval) !== 1) return null;
  const byApprovedAt = parseValidDate(approvedAt);
  if (byApprovedAt) return byApprovedAt;

  const byLastPayment = parseValidDate(lastPaymentRaw);
  if (byLastPayment) return byLastPayment;

  return parseValidDate(createdAt);
}
'@

$helperReplacement = @'
function resolveEffectiveApprovedDate({
  adminApproval,
  lastPaymentRaw,
}) {
  if (Number(adminApproval) !== 1) return null;
  return parseValidDate(lastPaymentRaw);
}
'@

$apiContent = Replace-Exact $apiContent $helperOld $helperReplacement "api helper"
$memberContent = Replace-Exact $memberContent $helperOld $helperReplacement "member helper"

$apiQueryNew = @'
        SELECT
          ml.id,
          ml.is_pay,
          ml.admin_approval,
          ml.approved_at,
          ml.created_at,
          ml.updated_at,
          cl.category_name,
          cl.category_title,
          MAX(COALESCE(mp.tx_tran_date, mp.created_at, mp.updated_at)) AS last_payment_raw
        FROM member_list ml
        LEFT JOIN member_ship_payments mp
          ON ml.id = mp.member_id
          AND mp.tx_status IN ('VALID', 'CASH_RECEIVED')
        LEFT JOIN category_list cl
          ON cl.id = ml.membership_category_id
'@

$apiContent = Replace-Regex $apiContent 'SELECT\s+ml\.id,\s+ml\.is_pay,\s+ml\.admin_approval,\s+ml\.approved_at,\s+ml\.created_at,\s+ml\.updated_at,\s+cl\.category_name,\s+cl\.category_title,\s+COALESCE\(\s+MAX\(\s+COALESCE\(\s+mp\.tx_tran_date,\s+mp\.created_at,\s+mp\.updated_at,\s+er\.tx_tran_date,\s+er\.created_at\s+\)\s+\),\s+ml\.updated_at,\s+ml\.created_at\s+\)\s+AS last_payment_raw\s+FROM member_list ml\s+LEFT JOIN member_ship_payments mp\s+ON ml\.id = mp\.member_id\s+AND mp\.tx_status IN \(''VALID'', ''CASH_RECEIVED''\)\s+LEFT JOIN event_register er\s+ON ml\.id = er\.member_id\s+AND er\.tx_status IN \(''VALID'', ''CASH_RECEIVED''\)\s+LEFT JOIN category_list cl\s+ON cl\.id = ml\.membership_category_id' $apiQueryNew "api viewer query"

$viewerLogicOld = @'
      const categoryMeta = resolveCategoryMembershipMeta(row.category_title, row.category_name);
      const approvedDate = resolveEffectiveApprovedDate({
        adminApproval: row.admin_approval,
        approvedAt: row.approved_at,
        lastPaymentRaw: row.last_payment_raw,
        createdAt: row.created_at,
      });

      let isExpired = false;
      if (!isNotApproved && !isUnpaid && categoryMeta.membership_type !== "lifetime" && approvedDate) {
        const durationMs = Number(categoryMeta.membership_duration_days || 365) * 24 * 60 * 60 * 1000;
        const expireDate = new Date(approvedDate.getTime() + durationMs);
        isExpired = expireDate.getTime() < Date.now();
      }
'@

$viewerLogicNew = @'
      const categoryMeta = resolveCategoryMembershipMeta(row.category_title, row.category_name);
      const lastPaymentDate = parseValidDate(row.last_payment_raw);

      let isExpired = false;
      if (!isNotApproved && !isUnpaid && categoryMeta.membership_type !== "lifetime" && lastPaymentDate) {
        const durationMs = Number(categoryMeta.membership_duration_days || 365) * 24 * 60 * 60 * 1000;
        const expireDate = new Date(lastPaymentDate.getTime() + durationMs);
        isExpired = expireDate.getTime() < Date.now();
      }
'@

$apiContent = Replace-Exact $apiContent $viewerLogicOld $viewerLogicNew "api viewer logic"

$userDetailsOld = @'
        const derivedLastPaymentDate = deriveLatestPaymentDateFromCollections({
          paidEventRegistrations,
          sponsorContributions,
          donationContributions,
        });
        const effectiveApprovedDate = resolveEffectiveApprovedDate({
          adminApproval: memberDetails?.admin_approval,
          approvedAt: memberDetails?.approved_at,
          lastPaymentRaw: derivedLastPaymentDate,
          createdAt: memberDetails?.created_at,
        });

        safeMemberDetails.approved_date = formatDateYmd(effectiveApprovedDate);

        if (
          Number(memberDetails?.admin_approval) === 1 &&
          !memberDetails?.approved_at &&
          effectiveApprovedDate
        ) {
          await MemberModel.update(
            { approved_at: effectiveApprovedDate },
            { where: { id: memberDetails.id } }
          ).catch(() => {});
        }
'@

$userDetailsNew = @'
        safeMemberDetails.approved_date = null;
'@

$apiContent = Replace-Exact $apiContent $userDetailsOld $userDetailsNew "api user details membership block"

$expiredOnlyQueryNew = @'
        SELECT 
          ml.id,
          ml.name,
          ml.phone_number,
          ml.email,
          ml.session,
          ml.admin_approval,
          ml.approved_at,
          ml.created_at,
          cl.category_name,
          cl.category_title,
          MAX(COALESCE(mp.tx_tran_date, mp.created_at, mp.updated_at)) AS last_payment_raw
        FROM member_list ml
        LEFT JOIN member_ship_payments mp
          ON ml.id = mp.member_id
          AND mp.tx_status IN ('VALID', 'CASH_RECEIVED')
        INNER JOIN category_list cl
          ON cl.id = ml.membership_category_id
'@

$apiContent = Replace-Regex $apiContent 'SELECT\s+ml\.id,\s+ml\.name,\s+ml\.phone_number,\s+ml\.email,\s+ml\.session,\s+ml\.admin_approval,\s+ml\.approved_at,\s+ml\.created_at,\s+cl\.category_name,\s+cl\.category_title,\s+COALESCE\(\s+MAX\(\s+COALESCE\(\s+mp\.tx_tran_date,\s+mp\.created_at,\s+mp\.updated_at,\s+er\.tx_tran_date,\s+er\.created_at\s+\)\s+\),\s+ml\.updated_at,\s+ml\.created_at\s+\)\s+AS last_payment_raw\s+FROM member_list ml\s+LEFT JOIN member_ship_payments mp\s+ON ml\.id = mp\.member_id\s+AND mp\.tx_status IN \(''VALID'', ''CASH_RECEIVED''\)\s+LEFT JOIN event_register er\s+ON ml\.id = er\.member_id\s+AND er\.tx_status IN \(''VALID'', ''CASH_RECEIVED''\)\s+INNER JOIN category_list cl\s+ON cl\.id = ml\.membership_category_id' $expiredOnlyQueryNew "api expired-only query"

$expiredOnlyLogicOld = @'
        const categoryMeta = resolveCategoryMembershipMeta(row.category_title, row.category_name);
        const lastPaymentDate = row.last_payment_raw ? new Date(row.last_payment_raw) : null;
        const approvedDate = resolveEffectiveApprovedDate({
          adminApproval: row.admin_approval,
          approvedAt: row.approved_at,
          lastPaymentRaw: row.last_payment_raw,
          createdAt: row.created_at,
        });
        const isValidApprovedDate = !!approvedDate;

        let expireDate = null;
        if (categoryMeta.membership_type !== "lifetime" && isValidApprovedDate) {
          const durationMs = Number(categoryMeta.membership_duration_days || 365) * 24 * 60 * 60 * 1000;
          expireDate = new Date(approvedDate.getTime() + durationMs);
        }

        const status =
          Number(row.admin_approval) !== 1
            ? "Not Approved"
            : categoryMeta.membership_type === "lifetime"
            ? "Active"
            : expireDate && expireDate.getTime() < now
              ? "Expired"
              : "Active";
'@

$expiredOnlyLogicNew = @'
        const categoryMeta = resolveCategoryMembershipMeta(row.category_title, row.category_name);
        const lastPaymentDate = parseValidDate(row.last_payment_raw);

        let expireDate = null;
        if (categoryMeta.membership_type !== "lifetime" && lastPaymentDate) {
          const durationMs = Number(categoryMeta.membership_duration_days || 365) * 24 * 60 * 60 * 1000;
          expireDate = new Date(lastPaymentDate.getTime() + durationMs);
        }

        const status =
          Number(row.admin_approval) !== 1
            ? "Not Approved"
            : categoryMeta.membership_type === "lifetime"
            ? "Active"
            : !lastPaymentDate
              ? "Pending"
              : expireDate && expireDate.getTime() < now
                ? "Expired"
                : "Active";
'@

$apiContent = Replace-Exact $apiContent $expiredOnlyLogicOld $expiredOnlyLogicNew "api expired-only logic"

$expiredOnlyPromisePattern = 'await Promise\.all\(\s*query_data.*?\);\s*\r?\n\s*return res\.status\(200\)\.json'
$apiContent = Replace-Regex $apiContent $expiredOnlyPromisePattern "return res.status(200).json" "api expired-only approved_at backfill removal"

$memberQueryNew = @'
        SELECT 
          ml.id,
          ml.name,
          ml.phone_number,
          ml.email,
          ml.session,
          ml.admin_approval,
          ml.approved_at,
          ml.created_at,
          cl.category_name,
          cl.category_title,
          MAX(COALESCE(mp.tx_tran_date, mp.created_at, mp.updated_at)) AS last_payment_raw
        FROM member_list ml
        INNER JOIN category_list cl ON cl.id = ml.membership_category_id
        LEFT JOIN member_ship_payments mp
          ON ml.id = mp.member_id
          AND mp.tx_status IN ('VALID', 'CASH_RECEIVED')
'@

$memberContent = Replace-Regex $memberContent 'SELECT\s+ml\.id,\s+ml\.name,\s+ml\.phone_number,\s+ml\.email,\s+ml\.session,\s+ml\.admin_approval,\s+ml\.approved_at,\s+ml\.created_at,\s+cl\.category_name,\s+cl\.category_title,\s+COALESCE\(\s+MAX\(COALESCE\(mp\.tx_tran_date,\s+mp\.created_at,\s+er\.tx_tran_date,\s+er\.created_at\)\),\s+NULL\s+\)\s+AS last_payment_raw\s+FROM member_list ml\s+INNER JOIN category_list cl ON cl\.id = ml\.membership_category_id\s+LEFT JOIN member_ship_payments mp\s+ON ml\.id = mp\.member_id\s+AND mp\.tx_status IN \(''VALID'', ''CASH_RECEIVED''\)\s+LEFT JOIN event_register er\s+ON ml\.id = er\.member_id\s+AND er\.tx_status IN \(''VALID'', ''CASH_RECEIVED''\)' $memberQueryNew "member expired query"

$memberLogicOld = @'
          const categoryMeta = resolveCategoryMembershipMeta(row.category_title, row.category_name);
          const approvedDate = resolveEffectiveApprovedDate({
            adminApproval: row.admin_approval,
            approvedAt: row.approved_at,
            lastPaymentRaw: row.last_payment_raw,
            createdAt: row.created_at,
          });
          const isValidApprovedDate = !!approvedDate;
          const lastPaymentDate = row.last_payment_raw ? new Date(row.last_payment_raw) : null;

          let expireDate = null;
          if (categoryMeta.membership_type !== "lifetime" && isValidApprovedDate) {
            const durationMs =
              Number(categoryMeta.membership_duration_days || 365) * 24 * 60 * 60 * 1000;
            expireDate = new Date(approvedDate.getTime() + durationMs);
          }

          const status =
            categoryMeta.membership_type === "lifetime"
              ? "Active"
              : expireDate && expireDate.getTime() < now
                ? "Expired"
'@

$memberLogicNew = @'
          const categoryMeta = resolveCategoryMembershipMeta(row.category_title, row.category_name);
          const lastPaymentDate = parseValidDate(row.last_payment_raw);

          let expireDate = null;
          if (categoryMeta.membership_type !== "lifetime" && lastPaymentDate) {
            const durationMs =
              Number(categoryMeta.membership_duration_days || 365) * 24 * 60 * 60 * 1000;
            expireDate = new Date(lastPaymentDate.getTime() + durationMs);
          }

          const status =
            categoryMeta.membership_type === "lifetime"
              ? "Active"
              : expireDate && expireDate.getTime() < now
                ? "Expired"
'@

$memberContent = Replace-Exact $memberContent $memberLogicOld $memberLogicNew "member expired list logic"
$memberContent = Replace-Exact $memberContent $memberLogicOld $memberLogicNew "member expired excel logic"

$memberBackfillPattern = 'await Promise\.all\(\s*\(baseRows \|\| \[\]\).*?\);\s*\r?\n\s*const paginatedRows'
$memberContent = Replace-Regex $memberContent $memberBackfillPattern "const paginatedRows" "member approved_at backfill removal"

Set-Content -LiteralPath $apiPath -Value $apiContent -Encoding UTF8
Set-Content -LiteralPath $memberPath -Value $memberContent -Encoding UTF8

Write-Host "Patched membership expiry logic in api/member.js and member/Member.js"
