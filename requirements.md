# Nestly — Product Requirements Document

**Document Version:** 1.0
**Product Version:** V1
**Status:** Development Ready
**Product Name:** Nestly
**Tagline:** Your little space for life.

---

# 1. Product Overview

Nestly is a personal life-management web application designed to provide users with one private place to manage everyday life.

The application combines:

* Personal journaling
* Notes
* Financial records
* Tasks
* Personal dashboard
* User profile and settings

The core philosophy is:

> **Nestly is a private digital space where users can record, organize, and reflect on their everyday life.**

The application should feel personal, calm, simple, and comfortable rather than like a corporate productivity dashboard.

---

# 2. Product Vision

Nestly aims to become a personal life-management ecosystem.

Future versions may support:

* Couple spaces
* Friend spaces
* Shared journals
* Shared notes
* Shared finances
* Shared tasks
* Collaboration
* Mobile applications
* Advanced finance management
* Calendar
* Goals
* Notifications

However, these features are explicitly OUT OF SCOPE for V1.

V1 must focus on creating a strong and stable personal foundation.

---

# 3. V1 Objective

The primary objective of V1 is to build a production-quality personal web application that can actually be used daily.

A user should be able to:

1. Create an account.
2. Log in securely.
3. View a personal dashboard.
4. Create and manage journal entries.
5. Create and manage notes.
6. Record income and expenses.
7. View basic financial summaries.
8. Create and manage tasks.
9. Manage their profile.
10. Log out securely.

All personal data must be isolated between users.

---

# 4. Target Users

Primary target users:

* University students
* Young adults
* Young professionals
* People interested in journaling
* People who want lightweight personal organization

Initial deployment target:

5–20 users.

The application should be designed so that the architecture can later scale to more users.

---

# 5. Product Principles

## 5.1 Private by Default

All user-created content is private.

A user must never be able to access another user's personal data.

---

## 5.2 Simple

Users should be able to perform common actions quickly.

Examples:

* Add journal → minimal friction
* Add note → minimal friction
* Add expense → minimal friction
* Complete task → one interaction

---

## 5.3 Calm

The application should feel comfortable and personal.

Avoid:

* Excessive colors
* Dense dashboards
* Excessive animations
* Enterprise-style tables
* Unnecessary information
* Complicated navigation

---

## 5.4 Consistent

All modules must use the same:

* Typography
* Spacing
* Components
* Buttons
* Form patterns
* Colors
* Navigation
* Error handling
* Loading states

---

## 5.5 Future Compatible

The V1 architecture must allow future versions to introduce shared spaces without requiring a complete rewrite.

---

# 6. Scope

## 6.1 In Scope

V1 includes:

* Authentication
* User profile
* Dashboard
* Journal
* Notes
* Finance
* Tasks
* Responsive web design
* Light/dark/system appearance
* Data isolation
* Basic validation
* Error handling
* Loading states
* Empty states
* Deployment

---

## 6.2 Out of Scope

The following must NOT be implemented in V1:

* Couple spaces
* Friend spaces
* Shared spaces
* Chat
* Comments
* Reactions
* Social feed
* Public profiles
* Public journals
* AI assistant
* Push notifications
* Native mobile application
* Advanced budgeting
* Recurring transactions
* Investment tracking
* Cryptocurrency
* Complex accounting
* Calendar
* Goals
* Gamification
* Subscription system
* Payment system

Do not implement these features unless explicitly requested in a future requirement.

---

# 7. Technology Requirements

## 7.1 Frontend

Use:

* Next.js
* TypeScript
* App Router
* Tailwind CSS
* shadcn/ui

---

## 7.2 Backend

Use:

* Supabase

Supabase will provide:

* Authentication
* PostgreSQL database
* Row Level Security
* Storage when required

---

## 7.3 Form and Validation

Use:

* React Hook Form
* Zod

All important user input must be validated.

---

## 7.4 Icons

Use:

* Lucide Icons

Avoid mixing multiple icon libraries unless absolutely necessary.

---

## 7.5 Deployment

Web application should be deployable to:

* Vercel

Database/backend:

* Supabase

Source control:

* GitHub

---

# 8. Authentication Requirements

## AUTH-001 — Register

The user must be able to create an account using:

* Display name
* Email
* Password
* Confirm password

Validation:

* Email must be valid.
* Password must satisfy the defined minimum security requirement.
* Password confirmation must match.

---

## AUTH-002 — Login

User must be able to log in using:

* Email
* Password

---

## AUTH-003 — Logout

User must be able to log out from the application.

After logout, protected pages must no longer be accessible.

---

## AUTH-004 — Forgot Password

User must be able to request password recovery.

---

## AUTH-005 — Protected Routes

The following routes require authentication:

* `/dashboard`
* `/journal`
* `/notes`
* `/finance`
* `/tasks`
* `/profile`

Unauthenticated users must be redirected to `/login`.

---

# 9. User Profile Requirements

Each authenticated user must have a profile.

Profile fields:

* ID
* Display name
* Email
* Avatar
* Created date
* Updated date

Users must be able to:

* View profile
* Edit display name
* Upload/change avatar if storage is implemented
* Change appearance preference
* Logout

---

# 10. Dashboard Requirements

The dashboard is the primary home screen.

It should display:

## 10.1 Greeting

Example:

> Good evening, Kemal 👋

Display the current date.

---

## 10.2 Quick Actions

Provide quick actions:

* New Journal
* New Note
* Add Expense
* Add Task

---

## 10.3 Recent Journal

Display the latest journal entry.

Information:

* Title
* Date
* Mood
* Preview

Provide link to view all journals.

---

## 10.4 Recent Notes

Display a small list of recently updated notes.

---

## 10.5 Finance Summary

Display:

* Total income
* Total expense
* Balance

Formula:

`balance = total_income - total_expense`

---

## 10.6 Today's Tasks

Display tasks due today.

Allow users to mark a task as completed directly from the dashboard.

---

# 11. Journal Requirements

## JOURNAL-001 — Journal List

Display the user's journal entries.

Each entry should show:

* Title
* Date
* Mood
* Content preview
* Tags
* Updated time

Newest entries should appear first.

---

## JOURNAL-002 — Create Journal

User can create a journal entry.

Fields:

* Title
* Content
* Mood
* Tags
* Date

Title is required.

Content is required.

Mood is optional.

Tags are optional.

---

## JOURNAL-003 — View Journal

User can open a journal entry and read the complete content.

---

## JOURNAL-004 — Edit Journal

User can edit an existing journal entry.

Only the owner may edit it.

---

## JOURNAL-005 — Delete Journal

User can delete a journal entry.

Deletion must require confirmation.

Example:

> Delete this journal?
>
> This action cannot be undone.

---

## JOURNAL-006 — Search

User can search journals by:

* Title
* Content

---

## JOURNAL-007 — Filter

User can filter journals by:

* Date
* Mood
* Tags

---

# 12. Journal Mood

V1 mood options:

* Happy
* Sad
* Angry
* Anxious
* Neutral
* Excited
* Tired

Mood should be visually represented but must not rely only on color.

---

# 13. Notes Requirements

## NOTES-001 — Note List

Display user's notes.

Each note should show:

* Title
* Content preview
* Tags
* Updated date

Newest updated notes should appear first.

---

## NOTES-002 — Create Note

Fields:

* Title
* Content
* Tags

Title is required.

Content is required.

---

## NOTES-003 — Edit Note

User can edit an existing note.

Only the owner may edit it.

---

## NOTES-004 — Delete Note

User can delete a note.

Deletion requires confirmation.

---

## NOTES-005 — Search

User can search notes by:

* Title
* Content

---

# 14. Finance Requirements

Finance V1 is a lightweight personal transaction tracker.

It is NOT an accounting system.

---

## FINANCE-001 — Transaction Types

Transactions have two types:

* Income
* Expense

---

## FINANCE-002 — Create Transaction

User can create a transaction.

Fields:

* Type
* Amount
* Category
* Description
* Transaction date

Amount must be greater than zero.

---

## FINANCE-003 — Transaction List

Display:

* Category
* Description
* Amount
* Type
* Date

Newest transactions should appear first.

---

## FINANCE-004 — Edit Transaction

User can edit an existing transaction.

---

## FINANCE-005 — Delete Transaction

User can delete a transaction.

Deletion requires confirmation.

---

## FINANCE-006 — Financial Summary

Display:

* Total income
* Total expenses
* Balance

Formula:

`balance = income - expense`

---

## FINANCE-007 — Categories

V1 default categories:

### Food

### Transport

### Shopping

### Bills

### Entertainment

### Education

### Health

### Other

Do not implement custom categories in V1.

---

## FINANCE-008 — Filters

Users should be able to filter transactions by:

* Date
* Category
* Type

---

# 15. Task Requirements

## TASK-001 — Task List

Display tasks separated into:

* Today
* Upcoming
* Completed

---

## TASK-002 — Create Task

Fields:

* Title
* Description
* Due date
* Priority

Title is required.

---

## TASK-003 — Priority

Priority values:

* Low
* Medium
* High

---

## TASK-004 — Complete Task

User can mark a task as completed.

Completed tasks should have a clear visual state.

Do not rely only on color.

---

## TASK-005 — Edit Task

User can edit:

* Title
* Description
* Due date
* Priority

---

## TASK-006 — Delete Task

User can delete a task.

Deletion requires confirmation.

---

# 16. Database Requirements

The V1 database must contain the following tables:

* `profiles`
* `journals`
* `notes`
* `transactions`
* `tasks`

---

# 17. Profiles Table

Required fields:

```text
id
display_name
avatar_url
created_at
updated_at
```

`id` must reference `auth.users.id`.

---

# 18. Journals Table

Required fields:

```text
id
user_id
title
content
mood
created_at
updated_at
```

`user_id` references the authenticated user.

---

# 19. Notes Table

Required fields:

```text
id
user_id
title
content
created_at
updated_at
```

---

# 20. Transactions Table

Required fields:

```text
id
user_id
type
amount
category
description
transaction_date
created_at
updated_at
```

`amount` must use PostgreSQL numeric/decimal type.

Do NOT use floating point for financial values.

---

# 21. Tasks Table

Required fields:

```text
id
user_id
title
description
due_date
priority
status
created_at
updated_at
```

---

# 22. Database Security

Row Level Security MUST be enabled on all user-owned tables.

Tables requiring RLS:

* profiles
* journals
* notes
* transactions
* tasks

---

# 23. RLS Rules

A user may only:

* Read their own data
* Insert their own data
* Update their own data
* Delete their own data

Conceptually:

```text
record.user_id == auth.uid()
```

Never rely on frontend filtering for authorization.

The database itself must enforce access control.

---

# 24. Security Requirements

The application must:

* Use Supabase Auth.
* Never store plaintext passwords.
* Never expose Supabase service-role credentials to the client.
* Validate all user input.
* Use server-side authorization where appropriate.
* Use HTTPS in production.
* Enable RLS.
* Prevent unauthorized record access.
* Sanitize/render rich content safely if rich text is introduced.
* Never trust user-provided `user_id`.

The authenticated user's identity must come from the authenticated session, not from arbitrary client input.

---

# 25. Routing Requirements

Public routes:

```text
/
 /login
 /register
 /forgot-password
```

Protected routes:

```text
/dashboard
/journal
/journal/new
/journal/[id]
/journal/[id]/edit

/notes
/notes/new
/notes/[id]
/notes/[id]/edit

/finance
/finance/new
/finance/[id]
/finance/[id]/edit

/tasks
/tasks/new
/tasks/[id]
/tasks/[id]/edit

/profile
```

---

# 26. Navigation

Desktop sidebar:

```text
Nestly

Home
Journal
Notes
Finance
Tasks

----------------

Profile
Settings
```

Mobile navigation should provide easy access to the most important sections.

Do not simply shrink the desktop sidebar.

---

# 27. UI / UX Requirements

The design should communicate:

* Calm
* Personal
* Modern
* Minimal
* Warm
* Premium
* Private

Avoid:

* Corporate dashboard appearance
* Excessive cards
* Excessive colors
* Dense information
* Excessive animations
* Large decorative illustrations that reduce usability

---

# 28. Visual Design

Primary background:

`#F7F7F5`

Surface:

`#FFFFFF`

Primary text:

`#202020`

Secondary text:

`#6B6B6B`

Muted text:

`#9A9A9A`

Border:

`#E8E8E5`

Use a subtle accent color.

Financial semantic colors should be muted:

* Income → subtle green
* Expense → subtle red
* Warning → subtle amber

---

# 29. Typography

Preferred typography:

* Inter
* Manrope
* Poppins

Use:

* Large page titles
* Medium section titles
* Comfortable body text
* Small muted metadata

Avoid making every heading extremely bold.

---

# 30. Responsive Requirements

The application must work on:

* Desktop
* Tablet
* Mobile

Breakpoints should follow standard responsive design conventions.

Mobile interactions must be touch-friendly.

Minimum recommended touch target:

`44px`

---

# 31. Loading States

Every async data operation should provide appropriate feedback.

Examples:

* Skeleton loading
* Button loading state
* Saving indicator

Avoid unnecessary full-screen loading spinners.

---

# 32. Empty States

Every main section must have an intentional empty state.

Journal:

> No entries yet.
> Write down how your day went.

Notes:

> No notes yet.
> Capture an idea before you forget it.

Finance:

> No transactions yet.
> Start tracking your money.

Tasks:

> Nothing planned.
> Add something when you're ready.

Each empty state should include an appropriate CTA.

---

# 33. Error States

Errors must be understandable to normal users.

Good:

> Your journal couldn't be saved. Please try again.

Bad:

> PostgreSQL error: duplicate key value violates unique constraint...

Never expose raw database errors to users.

---

# 34. Confirmation Dialogs

Destructive actions must require confirmation.

Actions:

* Delete journal
* Delete note
* Delete transaction
* Delete task

Confirmation must clearly explain the action.

---

# 35. Toast Notifications

Use subtle toast notifications for:

* Created
* Updated
* Deleted
* Saved
* Task completed
* Profile updated

Do not overuse toasts.

---

# 36. Accessibility

The application should support:

* Keyboard navigation
* Visible focus states
* Semantic HTML
* Accessible labels
* Accessible form errors
* Sufficient contrast
* Touch-friendly controls

Do not rely solely on color to communicate status.

---

# 37. Performance Requirements

The application should:

* Load quickly.
* Avoid unnecessary client-side JavaScript.
* Use server components where appropriate.
* Paginate or limit large lists where appropriate.
* Avoid unnecessary database requests.
* Optimize images.
* Avoid excessive third-party libraries.

---

# 38. SEO

Public pages should have basic metadata.

Protected application pages do not need to be indexed.

---

# 39. Project Structure

Recommended structure:

```text
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── forgot-password/
│
├── (dashboard)/
│   ├── dashboard/
│   ├── journal/
│   ├── notes/
│   ├── finance/
│   ├── tasks/
│   └── profile/
│
├── layout.tsx
└── page.tsx

components/
├── ui/
├── layout/
├── dashboard/
├── journal/
├── notes/
├── finance/
└── tasks/

lib/
├── supabase/
├── validations/
├── utils/
└── constants/

types/
├── database.ts
├── journal.ts
├── note.ts
├── transaction.ts
└── task.ts
```

The exact structure may be adjusted if there is a strong technical reason.

---

# 40. Code Quality Requirements

Use TypeScript strictly.

Avoid:

```typescript
any
```

unless there is a documented reason.

Prefer:

* Reusable components
* Reusable validation schemas
* Typed database responses
* Small focused functions
* Clear naming
* Consistent formatting

Do not duplicate business logic unnecessarily.

---

# 41. Git Requirements

Use Git.

Recommended branches:

```text
main
develop
feature/*
fix/*
```

Example feature branches:

```text
feature/auth
feature/dashboard
feature/journal
feature/notes
feature/finance
feature/tasks
```

Commit messages should describe the change.

Examples:

```text
feat: add journal creation
feat: add finance summary
fix: prevent unauthorized journal access
fix: validate transaction amount
refactor: simplify dashboard data loading
```

---

# 42. Testing Requirements

Minimum functional testing must cover:

## Authentication

* Register
* Login
* Logout
* Wrong credentials
* Protected route without authentication

## Journal

* Create
* Read
* Update
* Delete
* Search
* Filter
* Unauthorized access prevention

## Notes

* Create
* Read
* Update
* Delete
* Search
* Unauthorized access prevention

## Finance

* Create income
* Create expense
* Edit transaction
* Delete transaction
* Calculate balance
* Invalid amount validation
* Unauthorized access prevention

## Tasks

* Create
* Edit
* Complete
* Delete
* Unauthorized access prevention

---

# 43. Acceptance Criteria

V1 is considered complete when:

### Authentication

* User can register.
* User can login.
* User can logout.
* Protected routes work.
* Password recovery works.

### Journal

* CRUD works.
* Search works.
* Filters work.
* Data is private.

### Notes

* CRUD works.
* Search works.
* Data is private.

### Finance

* Income can be recorded.
* Expense can be recorded.
* Transactions can be edited/deleted.
* Summary calculation is correct.
* Data is private.

### Tasks

* CRUD works.
* Tasks can be completed.
* Priority works.
* Data is private.

### Dashboard

* Recent journal appears.
* Recent notes appear.
* Finance summary appears.
* Today's tasks appear.
* Quick actions work.

### UI

* Responsive.
* Consistent.
* Accessible.
* Loading states exist.
* Empty states exist.
* Error states exist.

### Security

* RLS enabled.
* Unauthorized access blocked.
* Service-role secret never exposed to client.

---

# 44. Future Architecture Compatibility

Although V1 does not implement shared spaces, the architecture must not prevent them.

Future V2 will potentially introduce:

```text
spaces
space_members
space_invitations
```

The current V1 database should therefore consistently use:

```text
user_id
```

for personal ownership.

Do not hardcode user-specific assumptions into application logic.

Future shared data can later introduce:

```text
space_id
```

without redesigning the entire application.

---

# 45. Development Strategy

Implement V1 incrementally.

Recommended order:

```text
1. Project setup
2. Supabase configuration
3. Database schema
4. RLS policies
5. Authentication
6. Application layout
7. Dashboard
8. Journal
9. Notes
10. Finance
11. Tasks
12. Profile
13. Responsive optimization
14. Error/loading/empty states
15. Testing
16. Production deployment
```

Do not implement all features simultaneously.

Each feature should be completed and tested before moving to the next.

---

# 46. Important Agent Instructions

When implementing this specification:

1. Treat this document as the source of truth for V1.
2. Do not add features outside the defined V1 scope.
3. Do not implement V2/V3 features proactively.
4. Prioritize security over convenience.
5. Never bypass RLS.
6. Never expose secret keys.
7. Do not create unnecessary abstractions.
8. Prefer simple maintainable architecture.
9. Reuse components.
10. Keep the UI consistent.
11. Make the application responsive.
12. Test each feature before moving forward.
13. If a requirement is ambiguous, choose the simplest implementation that satisfies the requirement.
14. Do not silently change product requirements.
15. Document significant technical decisions.
16. Keep the codebase ready for future shared-space functionality.
17. Do not replace Supabase with another backend without explicit approval.

---

# 47. V1 Definition

The final V1 should feel like a real application that a small group of users can use daily.

The user should be able to open Nestly and immediately understand:

> "This is my private place to write, remember, organize, and manage my everyday life."

The application should prioritize:

**Privacy → Simplicity → Usability → Consistency → Maintainability**

over feature quantity.

---

# 48. V1 Final Feature Map

```text
Nestly V1
│
├── Authentication
│   ├── Register
│   ├── Login
│   ├── Logout
│   └── Forgot Password
│
├── Dashboard
│   ├── Greeting
│   ├── Recent Journal
│   ├── Recent Notes
│   ├── Finance Summary
│   ├── Today's Tasks
│   └── Quick Actions
│
├── Journal
│   ├── List
│   ├── Create
│   ├── Read
│   ├── Edit
│   ├── Delete
│   ├── Search
│   └── Filter
│
├── Notes
│   ├── List
│   ├── Create
│   ├── Read
│   ├── Edit
│   ├── Delete
│   └── Search
│
├── Finance
│   ├── Summary
│   ├── Transactions
│   ├── Create
│   ├── Edit
│   ├── Delete
│   └── Filter
│
├── Tasks
│   ├── List
│   ├── Create
│   ├── Edit
│   ├── Complete
│   └── Delete
│
└── Profile
    ├── Profile Information
    ├── Appearance
    └── Logout
```

---

# END OF REQUIREMENTS

**Product:** Nestly
**Version:** V1
**Status:** Ready for implementation
