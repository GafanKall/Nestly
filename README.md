# Nestly – Digital Quiet Life Management & Personal Productivity Suite

Nestly is a private, minimalist digital space designed for personal reflection, daily planning, note-taking, and financial tracking. Built with modern web technologies, Nestly provides a clean, calming, and distraction-free user experience to help users organize their life effortlessly.

---

## 🌟 Key Features & Modules

### 1. 📊 Interactive Dashboard
- **Overview Stat Cards**: Instant summary of pending tasks, total balance, note count, and recent journal entries.
- **Quick Action Links**: Direct access to add new tasks, transactions, or journal entries.
- **Daily Mood Picker**: Log your mood directly from the dashboard with visual emoticons.
- **Recent Activities & Tasks**: Real-time breakdown of today's tasks and recent notes.

### 2. 💰 Personal Finance Tracker
- **Indonesian Rupiah (Rp) Native Support**: Auto-formatted currency inputs (e.g., `100.000` or `1.500.000`).
- **Income & Expense Categories**: Categorize transactions (Food, Transport, Utilities, Salary, Investment, etc.).
- **Financial Balance & Breakdown**: Real-time calculation of Total Income, Total Expenses, and Net Balance.
- **Transaction History**: Browse all transactions with full edit and delete support.

### 3. 🎯 Task Manager
- **Priority System**: High, Medium, and Low priority badges.
- **Instant Status Toggle**: One-click task completion.
- **Due Date Tracking**: Grouped view of Overdue, Today, Upcoming, and No-Date tasks.
- **Full CRUD**: Create, edit, and delete tasks.

### 4. 📝 Personal Notes
- **Tag-based Organization**: Categorize ideas and references with custom tags.
- **Real-time Search**: Search notes by title, content, or tags as you type (URL-driven, consistent with Journal search).
- **Clean Editor**: Simple and distraction-free writing environment.

### 5. 📖 Digital Journal & Mood Tracker
- **Daily Reflection**: Record entries with custom dates.
- **Mood Tracking**: Assign moods (great, good, okay, bad, terrible) for emotional self-awareness.
- **Tags & Real-time Search**: Filter entries by mood or search text instantly without losing input focus.

### 6. 🔒 Authentication & Account Management
- **Secure Supabase Auth**: Email & Password registration and login.
- **Password Reset Flow**: Complete forgot-password and `/reset-password` recovery.
- **Profile Settings**: Update display name and account preferences.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Server Actions, React Server Components) |
| Styling | Vanilla CSS Variables + Tailwind CSS v4 |
| Database & Auth | Supabase (PostgreSQL, Auth, Row Level Security) |
| Validation | Zod schemas + React Hook Form |
| Icons | Lucide React |
| Notifications | Sonner |

---

## 🛡️ Security Highlights

| Area | Status |
|---|---|
| Row Level Security (RLS) | ✅ Enabled on all 5 tables. Every policy uses `auth.uid()` to match the owning user. |
| Server Action auth checks | ✅ Every Server Action calls `supabase.auth.getUser()` and validates `user_id` before any write. |
| Middleware route guard | ✅ `middleware.ts` redirects unauthenticated users to `/login` for all private routes. |
| Auth → dashboard redirect | ✅ Already-authenticated users are bounced from `/login`, `/register`, `/forgot-password` to `/dashboard`. |
| Environment variables | ✅ `.env*` is in `.gitignore`. No secret is hardcoded or exposed to the client bundle. Only `NEXT_PUBLIC_` anon-key (safe by design) reaches the browser. |
| Input validation | ✅ Zod schemas enforce min/max lengths on all user-supplied fields (title ≤ 200, content ≤ 50 000, amount > 0, tags ≤ 10 × 30 chars, etc.). Database CHECK constraints mirror these limits. |
| No sensitive logging | ✅ Server Actions and pages never `console.log` passwords, tokens, journal content, or financial data. |

---

## 🗄️ Database Architecture

### Tables & Relationships

```
auth.users (Supabase managed)
  │
  ├── profiles          (1:1)  id → auth.users.id  CASCADE DELETE
  ├── journals          (1:N)  user_id → auth.users.id  CASCADE DELETE
  ├── notes             (1:N)  user_id → auth.users.id  CASCADE DELETE
  ├── transactions      (1:N)  user_id → auth.users.id  CASCADE DELETE
  └── tasks             (1:N)  user_id → auth.users.id  CASCADE DELETE
```

### Integrity Checklist

| Item | Implementation |
|---|---|
| Every table has a Primary Key | ✅ `profiles.id UUID PK`, all others use `gen_random_uuid()` UUID PK |
| Foreign keys prevent orphan data | ✅ All tables reference `auth.users(id) ON DELETE CASCADE` |
| Owner column (`user_id`) present & consistent | ✅ All content tables have `user_id NOT NULL`; `profiles` uses `id` as both PK and FK |
| DB-level value constraints | ✅ `CHECK` constraints on type enums, amount range, character lengths, mood values, priority, status |
| CRUD operations verified | ✅ Server Actions implement full Create, Read, Update, Delete for every entity |
| Delete cascades safely | ✅ `ON DELETE CASCADE` means deleting a user automatically removes all their data; no orphan rows |
| Migration documented & idempotent | ✅ `supabase/migrations/20260101000000_initial_schema.sql` uses `CREATE IF NOT EXISTS`, `DROP POLICY IF EXISTS` — safe to re-run |
| Schema source of truth | ✅ `supabase/schema.sql` is the canonical reference kept in version control |

### Performance Indexes

```sql
idx_journals_user_date       ON journals(user_id, entry_date DESC)
idx_notes_user_updated       ON notes(user_id, updated_at DESC)
idx_transactions_user_date   ON transactions(user_id, transaction_date DESC)
idx_tasks_user_status_due    ON tasks(user_id, status, due_date)
```

---

## 🔄 Backup & Recovery Strategy

Nestly is hosted on **Supabase**, which provides multiple built-in backup layers:

### Automatic Backups (Supabase)
| Plan | Backup Frequency | Retention | Point-in-Time Recovery |
|---|---|---|---|
| Free | Daily snapshots | 7 days | ❌ |
| Pro | Daily snapshots | 7 days | ✅ (WAL-based) |
| Team/Enterprise | Continuous | 30+ days | ✅ |

### Manual Backup Procedure
For additional safety, run a manual dump at any time via:
```bash
# Using pg_dump (requires your Supabase DB connection string from project Settings > Database)
pg_dump "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres" \
  --schema=public \
  --no-acl --no-owner \
  -Fc -f nestly_backup_$(date +%Y%m%d).dump
```

### Recovery Test Procedure
1. Create a new Supabase project (staging environment).
2. Run `supabase/migrations/20260101000000_initial_schema.sql` in the SQL Editor to recreate the schema.
3. Restore data from the dump: `pg_restore --data-only -d [STAGING_DB_URL] nestly_backup_YYYYMMDD.dump`
4. Point `.env.local` to the staging project URL and verify all CRUD operations.

### Key Recovery Notes
- `ON DELETE CASCADE` on all tables means a partial restore (e.g., only `notes` table) is safe and will not create orphan data.
- Re-running the migration script is idempotent — `IF NOT EXISTS` and `DROP … IF EXISTS` guards prevent errors on existing schemas.

---

## 🚀 Running Locally

### 1. Clone & Install
```bash
git clone https://github.com/your-username/nestly.git
cd nestly
npm install
```

### 2. Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database Setup
In your Supabase project's **SQL Editor**, run the migration file:
```
supabase/migrations/20260101000000_initial_schema.sql
```
This creates all tables, indexes, RLS policies, and the new-user trigger.

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, register, forgot/reset password
│   ├── (dashboard)/      # Protected pages: dashboard, journal, notes, finance, tasks, profile
│   └── auth/callback/    # Supabase OAuth callback route
├── components/
│   ├── dashboard/        # Dashboard widgets (greeting, mood, finance summary, etc.)
│   ├── finance/          # Transaction list, form, detail actions
│   ├── journal/          # Journal card, form, mood selector, filters
│   ├── layout/           # Sidebar, mobile header, mobile nav
│   ├── notes/            # Note card, form, filters
│   ├── profile/          # Profile form
│   ├── tasks/            # Task list, form
│   └── ui/               # Shared primitives (Button, Input, PageHeader, EmptyState, etc.)
├── lib/
│   ├── actions/          # Server Actions for all entities
│   ├── supabase/         # Supabase client (browser + server) and env config
│   ├── validations/      # Zod schemas
│   └── utils/            # Format helpers
├── types/
│   └── database.ts       # TypeScript types matching DB schema
├── middleware.ts          # Auth route guard
supabase/
├── schema.sql                            # Canonical full schema
└── migrations/
    └── 20260101000000_initial_schema.sql # Idempotent migration
```

---

## 📜 Changelog

| Commit | Description |
|---|---|
| `a989e6a` | Mobile responsiveness overhaul, note real-time search, security hardening |
| `3ca9e96` | Finance optimization, balance overflow fix, transaction detail page |
| `9172b07` | Custom mood emoticon assets for journal |
| `3c526fb` | RLS server action enforcement, auto Rupiah format, reset password route |
| `2631a7d` | Core features complete: auth, journal, notes, tasks, finance |
| `0b3e563` | Initial commit |
