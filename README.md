# Nestly - Digital Quiet Life Management & Personal Productivity Suite

Nestly is a private, minimalist digital space designed for personal reflection, daily planning, note-taking, and financial tracking. Built with modern web technologies, Nestly provides a clean, calming, and distraction-free user experience to help users organize their life effortlessly.

---

## 🌟 Key Features & Modules

### 1. 📊 Interactive Dashboard
- **Overview Stat Cards**: Instant summary of pending tasks, total balance, note count, and recent journal entries.
- **Quick Action Links**: Direct access to add new tasks, transactions, or journal entries.
- **Daily Inspiration**: Curated quote section for daily mindfulness.
- **Recent Activities & Tasks**: Real-time breakdown of current priorities and recent financial movements.

### 2. 💰 Personal Finance Tracker
- **Indonesian Rupiah (Rp) Native Support**: Auto-formatted currency inputs (e.g., `100.000` or `1.500.000`) with smooth numeric keyboards and clean badges.
- **Income & Expense Categories**: Categorize transactions (Food, Transport, Utilities, Salary, Investment, etc.).
- **Financial Balance & Breakdown**: Real-time calculation of Total Income, Total Expenses, and Net Balance.
- **Transaction History**: Filter and manage entries with full edit and delete actions.

### 3. 🎯 Task Manager
- **Priority System**: High, Medium, and Low priority badges.
- **Instant Status Toggle**: Fast one-click task completion.
- **Due Date Tracking**: Keep track of upcoming deadlines.
- **Task Filtering & Management**: Organize active vs completed tasks cleanly.

### 4. 📝 Personal Notes
- **Tag-based Organization**: Categorize ideas, recipes, project notes, or reminders with custom tags.
- **Search & Filter**: Quickly search notes by title or tags.
- **Clean Editor**: Simple and distraction-free writing environment.

### 5. 📖 Digital Journal & Mood Tracker
- **Daily Reflection**: Record daily entries with custom dates.
- **Mood Tracking**: Assign moods to journal entries for emotional self-awareness.
- **Tags & Search**: Organize memories and search past reflections.

### 6. 🔒 Authentication & Account Management
- **Secure Supabase Auth**: Email & Password registration and login.
- **Password Reset Flow**: Complete forgot password and `/reset-password` recovery system.
- **Profile Settings**: Update display name, email, and avatar settings.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Actions, React Server Components)
- **Styling**: Vanilla CSS Variables Token System + Tailwind CSS
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL Database, Auth, RLS Policies)
- **Form Handling & Validation**: React Hook Form + Zod validation schemas
- **Icons & UI Feedback**: Lucide Icons & Sonner toast notifications

---

## 🛡️ Security & Performance Highlights

- **Server-Side Ownership Verification**: All Server Actions explicitly enforce `user_id` validation alongside Supabase RLS policies to prevent cross-tenant data access.
- **Environment Variable Protection**: Strict environment variable validation for Supabase credentials (zero hardcoded secrets).
- **TypeScript Type Safety**: 100% type-checked codebase using strict schema validation.

---

## 🗄️ Supabase Database Setup

To run Nestly, create a Supabase project and execute the following SQL script in your Supabase SQL Editor. This script scaffolds all tables, Row Level Security (RLS) policies, and automatic user profile triggers.

```sql
-- 1. Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Journals Table
CREATE TABLE journals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  entry_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Notes Table
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Transactions (Finance) Table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount NUMERIC NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tasks Table
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile." ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage their own journals." ON journals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own notes." ON notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own transactions." ON transactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own tasks." ON tasks FOR ALL USING (auth.uid() = user_id);

-- ==========================================
-- AUTHENTICATION TRIGGER
-- ==========================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, split_part(new.email, '@', 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 🚀 Running the Application Locally

### 1. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Open [http://localhost:3000](http://localhost:3000) in your browser.
