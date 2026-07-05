# FAA System Flow Guide

This document explains how the 4 main payment-enabled modules work in the FAA system:

1. Membership
2. Donation
3. Event Registration
4. Event Sponsor Registration

It also explains:

- which frontend page triggers which backend flow
- which database table is used
- where PDF invoices are stored
- which admin settings control live URLs, SMTP, SSL payment, and invoice design
- what should be used in production for `faa-dubd.org` and `cms.faa-dubd.org`

---

## 1. Live Architecture

### Frontend

- Public website: `https://faa-dubd.org`
- Local frontend during development: usually `http://localhost:3001`

### Backend / Admin

- Admin CMS / backend: `https://cms.faa-dubd.org`
- Local admin/backend during development: usually `http://localhost:3000`

### Important rule

For almost all member-facing redirect links, QR links, invoice download links, payment success/fail/cancel redirects, and frontend navigation:

- use the public frontend domain: `https://faa-dubd.org`

Do **not** save localhost in live settings.

---

## 2. Core Payment Controller

Main backend payment flow file:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\payment.js`

This file handles:

- membership payment
- donation payment
- event payment
- sponsor payment
- SSLCommerz redirect validation
- payment success/fail/cancel status handling

### Payment source prefixes

To keep each payment type separate, the system uses unique transaction ID prefixes:

- Membership: `MEM-`
- Donation: `DON-`
- Event: `EVT-`
- Event Sponsor: `ESP-`

Example:

- membership payment ID `2639` becomes `MEM-2639`
- donation ID `1938` becomes `DON-1938`

This is important because plain numeric IDs can overlap between tables.

---

## 3. Membership Payment Flow

### Frontend entry points

- Member payment page:
  - `C:\Users\Akash\Desktop\faa\src\pages\MemberPayment.jsx`
- Frontend payment API:
  - `C:\Users\Akash\Desktop\faa\src\features\payment\sslPaymentApiIn.js`
- Membership payment API route used from frontend:
  - `/payment_membership`

### Backend entry point

- `exports.sslPaymentMembership`
  - file: `C:\Users\Akash\Desktop\faaw_admin\controllers\payment.js`

### Database tables used

- membership payment records:
  - `member_ship_payments`
- member master record:
  - `member_list`
- category information:
  - `category_list`

### Membership payment flow

1. Member opens `/members-payment/:id`
2. Frontend submits payment request to `/payment_membership`
3. Backend creates a row in `member_ship_payments`
4. If payment type is SSL:
   - SSLCommerz session starts
   - transaction id is saved as `MEM-<paymentId>`
5. If payment type is cash:
   - payment is saved as `CASH_PENDING`
6. After successful SSL validation:
   - payment status becomes successful (`VALID` / `VALIDATED` / `SUCCESS`)
   - member record in `member_list` is updated automatically
   - member becomes paid
   - admin approval is updated automatically for successful SSL membership payment
   - membership invoice email can be sent automatically if auto-send is enabled

### Member record updates on successful membership SSL payment

Inside `payment.js`, successful membership validation updates `member_list` such as:

- `is_pay = 1`
- `admin_approval = 1`
- payment-related amount fields

That is why a successful membership payment should show:

- `Payment = Pay`
- `Approval = Approved`

in admin member list.

### Membership invoice generation

Main service:

- `C:\Users\Akash\Desktop\faaw_admin\services\membershipInvoiceMailer.js`

Important behavior:

- builds membership PDF invoice
- sends email invoice through SMTP
- stores generated PDFs in:
  - `C:\Users\Akash\Desktop\faaw_admin\public\membershippayment`

### Membership invoice download from member profile

Frontend profile page:

- `C:\Users\Akash\Desktop\faa\src\pages\MemberDetails.jsx`

Backend API that provides profile payment data:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\api\member.js`

The profile page can show membership payment table and download invoice from the generated membership PDF folder.

---

## 4. Donation Payment Flow

### Frontend entry point

- Donation page:
  - `C:\Users\Akash\Desktop\faa\src\pages\Donation.jsx`
- Shared payment API:
  - `C:\Users\Akash\Desktop\faa\src\features\payment\sslPaymentApiIn.js`

### Backend entry point

- `exports.sslPayment`
  - file: `C:\Users\Akash\Desktop\faaw_admin\controllers\payment.js`

### Database table used

- `donation_list`

### Donation flow

1. User submits donation form
2. Backend creates donation row in `donation_list`
3. SSL transaction id is saved as `DON-<donationId>`
4. After SSL validation:
   - only the donation table is updated
   - it must **not** update membership payment data
   - it must **not** appear as membership payment

### Important separation rule

Membership and donation are fully separate systems:

- Membership payment must update `member_ship_payments`
- Donation must update `donation_list`

If a membership payment ever appears inside donation flow, the bug is usually in:

- wrong transaction prefix
- wrong validation source detection
- wrong payment status lookup

The source-prefix-based flow in `payment.js` is what keeps these separated.

---

## 5. Event Registration Payment Flow

### Frontend entry point

- Event participate form:
  - `C:\Users\Akash\Desktop\faa\src\components\EventRegistrationForm\EventParticipateRegistrationForm.jsx`

### Backend table used

- `event_register`

### Backend payment flow

Inside:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\payment.js`

successful event registration records use the source:

- `event`
- transaction prefix: `EVT-`

### Event invoice generation

Service:

- `C:\Users\Akash\Desktop\faaw_admin\services\eventInvoiceMailer.js`

Generated event invoice PDFs are stored in:

- `C:\Users\Akash\Desktop\faaw_admin\public\invoices`

### Event invoice download / resend from admin

Controller:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\event_registration\EventRegistration.js`

This handles:

- download invoice
- resend invoice
- reset entry
- event registration table actions

### Event entry QR flow

QR base URL is controlled from admin event invoice settings.

The QR usually points to:

- `https://faa-dubd.org/event/enter?id=<registrationId>`

That page is used for:

- showing event entry page
- checking entered / not entered status
- allowing event entry flow

---

## 6. Event Sponsor Payment Flow

### Frontend entry point

- Sponsor registration form:
  - `C:\Users\Akash\Desktop\faa\src\components\EventRegistrationForm\EventSponsorRegistrationForm.jsx`

### Backend table used

- `event_sponsor_register`

### Payment flow

Handled through:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\payment.js`

using source:

- `event_sponsor`
- transaction prefix: `ESP-`

### What it stores

- sponsor name / organization
- amount
- payment type
- transaction status
- event relation

### Member profile visibility

Sponsor contributions shown on member profile are fetched from:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\api\member.js`

and rendered in:

- `C:\Users\Akash\Desktop\faa\src\pages\MemberDetails.jsx`

---

## 7. Collection Of Payments

Main controller:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\collection_of_payments\CollectionOfPayments.js`

This page combines separate payment sources into one reporting table.

### Available sources

- Membership Payment
- Donation
- Event
- Event Sponsor

### Purpose

This page is for admin reporting only.

It should:

- show correct source label
- calculate correct total amount
- filter by date and source
- export to Excel

If a membership payment is missing here, check:

1. membership payment row exists in `member_ship_payments`
2. payment status is successful (`VALID`, `CASH_RECEIVED`, etc.)
3. the collection query includes that status

---

## 8. Member Profile Data Flow

Frontend page:

- `C:\Users\Akash\Desktop\faa\src\pages\MemberDetails.jsx`

Backend API:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\api\member.js`

### What profile can show

- basic member profile info
- membership payment history
- paid event registrations
- sponsor contribution history
- donation history

### Security model

- logged-in member always sees own secure payment sections
- approved/eligible logged-in members can view other members’ shared sections if backend allows
- owner-only actions stay owner-only, such as:
  - some invoice downloads
  - certain update buttons

---

## 9. Admin Settings Pages

### Payment settings

Admin page:

- `/payment-settings`

Controller:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\payment_settings\PaymentSettings.js`

Controls:

- SSL enabled / disabled
- Cash enabled / disabled
- Store ID
- Store Password
- Live / sandbox
- Site URL

### Correct live value for Site URL

Use:

- `https://faa-dubd.org`

Do **not** use:

- `http://localhost:3000`
- `http://localhost:3001`
- backend CMS domain for frontend redirect

Why:

`site_url` here is used for public/member-facing redirect flows.

---

## 10. Event Invoice Settings

Admin page:

- `/event-invoice-settings`

Controller:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\event_invoice_settings\EventInvoiceSettings.js`

Related service:

- `C:\Users\Akash\Desktop\faaw_admin\services\eventInvoiceMailer.js`

Controls:

- event invoice title
- contact details line
- logo path / uploaded logo
- QR base URL
- event-wise logo override
- SMTP and email template behavior

### Important live values

- Site URL should point to public frontend base:
  - `https://faa-dubd.org`
- QR Base URL should usually be:
  - `https://faa-dubd.org/event/enter?id=`

---

## 11. Membership Invoice Settings

Admin page:

- `/membership-invoice-settings`

Controller:

- `C:\Users\Akash\Desktop\faaw_admin\controllers\MembershipInvoiceSettings.js`

Related services:

- `C:\Users\Akash\Desktop\faaw_admin\services\membershipInvoiceSettings.js`
- `C:\Users\Akash\Desktop\faaw_admin\services\membershipInvoiceMailer.js`
- `C:\Users\Akash\Desktop\faaw_admin\services\membershipInvoiceTemplate.js`

Controls:

- setup active/inactive
- auto-send after payment
- SMTP host / port / user / password / secure
- invoice title
- subtitle
- contact details line
- invoice logo
- site URL for member-facing links

### Correct live Site URL

Use:

- `https://faa-dubd.org`

This field exists so generated links and future member-facing invoice redirects do not use localhost.

---

## 12. Invoice Storage Locations

### Event invoices

- folder:
  - `C:\Users\Akash\Desktop\faaw_admin\public\invoices`

### Membership invoices

- folder:
  - `C:\Users\Akash\Desktop\faaw_admin\public\membershippayment`

### Why they are separate

To avoid mixing:

- event entry pass / event invoice PDFs
- membership payment invoice PDFs

This also makes download logic cleaner.

---

## 13. SMTP / Email Sending

### Event invoice mail

Uses:

- `C:\Users\Akash\Desktop\faaw_admin\services\eventInvoiceMailer.js`

### Membership invoice mail

Uses:

- `C:\Users\Akash\Desktop\faaw_admin\services\membershipInvoiceMailer.js`

### Forgot password mail

Configured separately from invoice SMTP.

Admin menu item:

- Forgot Password SMTP

### Recommendation

Keep these configured carefully:

- SMTP Host
- SMTP Port
- Secure
- SMTP User
- SMTP Password
- From Email
- Reply-To

If email fails after payment, payment may still be successful, but invoice sending can fail separately.

---

## 14. Live Production Checklist

For live production, verify these values:

### Public website

- `https://faa-dubd.org`

### Admin / CMS

- `https://cms.faa-dubd.org`

### Payment Settings

- Site URL = `https://faa-dubd.org`
- SSL enabled = as needed
- Cash enabled = as needed
- correct Store ID / Store Password
- live mode enabled when production SSL is used

### Event Invoice Settings

- Site URL = `https://faa-dubd.org`
- QR Base URL = `https://faa-dubd.org/event/enter?id=`
- SMTP configured if event invoice email should auto-send

### Membership Invoice Settings

- Site URL = `https://faa-dubd.org`
- Auto Send After Payment = `On` if membership invoice email should auto-send
- SMTP configured correctly

### Invoice folders must exist and be writable

- `C:\Users\Akash\Desktop\faaw_admin\public\invoices`
- `C:\Users\Akash\Desktop\faaw_admin\public\membershippayment`

---

## 15. Quick Troubleshooting Guide

### Membership payment goes into donation

Check:

- `payment.js`
- transaction prefix generation
- source detection in validation

Expected:

- membership = `MEM-*`
- donation = `DON-*`

### Member paid but admin still shows Not Pay

Check:

- successful row exists in `member_ship_payments`
- `sslPaymentValidate` updated `member_list.is_pay = 1`
- transaction status is successful

### Collection Of Payments does not show membership payment

Check:

1. record exists in `member_ship_payments`
2. status is successful
3. collection query includes the status

### Event invoice download works but member profile invoice does not

Check:

- correct folder exists
- correct backend API endpoint is returned
- profile API is returning invoice path for owner

### QR code opens wrong domain

Check:

- Event Invoice Settings
- `QR Base URL`
- `Site URL`

Live should point to:

- `https://faa-dubd.org`

---

## 16. Most Important Files by Module

### Shared payment core

- `C:\Users\Akash\Desktop\faaw_admin\controllers\payment.js`

### Payment settings

- `C:\Users\Akash\Desktop\faaw_admin\controllers\payment_settings\PaymentSettings.js`

### Membership invoice system

- `C:\Users\Akash\Desktop\faaw_admin\controllers\MembershipInvoiceSettings.js`
- `C:\Users\Akash\Desktop\faaw_admin\services\membershipInvoiceMailer.js`

### Event invoice system

- `C:\Users\Akash\Desktop\faaw_admin\controllers\event_invoice_settings\EventInvoiceSettings.js`
- `C:\Users\Akash\Desktop\faaw_admin\services\eventInvoiceMailer.js`

### Member profile API

- `C:\Users\Akash\Desktop\faaw_admin\controllers\api\member.js`

### Frontend member profile

- `C:\Users\Akash\Desktop\faa\src\pages\MemberDetails.jsx`

### Frontend membership payment page

- `C:\Users\Akash\Desktop\faa\src\pages\MemberPayment.jsx`

### Frontend shared payment API

- `C:\Users\Akash\Desktop\faa\src\features\payment\sslPaymentApiIn.js`

---

## 17. Final Operational Summary

### Membership

- member pays from member payment page
- saved in `member_ship_payments`
- success updates `member_list`
- membership invoice PDF saved in `public/membershippayment`
- invoice can be emailed and downloaded

### Donation

- user donates from donation page
- saved in `donation_list`
- fully separate from membership

### Event

- user registers for event
- saved in `event_register`
- event invoice / entry pass saved in `public/invoices`
- QR links go to event entry page

### Sponsor

- sponsor registers for event sponsor payment
- saved in `event_sponsor_register`
- separate from event participant registration

---

If needed, this document can be extended later with:

- route list
- database schema summary
- payment status code matrix
- live deployment checklist for new server setup
