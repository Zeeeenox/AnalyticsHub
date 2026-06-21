-- Dashboard Analytics Schema
-- Enterprise Business Analytics Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    plan TEXT NOT NULL CHECK (plan IN ('basic', 'professional', 'enterprise')),
    status TEXT NOT NULL CHECK (status IN ('active', 'churned', 'trialing')),
    mrr INTEGER NOT NULL DEFAULT 0,
    signup_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    satisfaction_score DECIMAL(3,1) NOT NULL DEFAULT 0,
    segment TEXT NOT NULL CHECK (segment IN ('enterprise', 'mid-market', 'smb')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sales opportunities table
CREATE TABLE IF NOT EXISTS sales_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    value INTEGER NOT NULL,
    stage TEXT NOT NULL CHECK (stage IN ('prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost')),
    probability INTEGER NOT NULL CHECK (probability >= 0 AND probability <= 100),
    expected_close DATE NOT NULL,
    owner TEXT NOT NULL,
    contact TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    avatar TEXT,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    productivity INTEGER NOT NULL CHECK (productivity >= 0 AND productivity <= 100),
    tasks_completed INTEGER NOT NULL DEFAULT 0,
    tasks_total INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Team member metrics
CREATE TABLE IF NOT EXISTS team_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    value INTEGER NOT NULL,
    target INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('executive', 'sales', 'customer', 'team', 'custom')),
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL CHECK (status IN ('ready', 'generating', 'scheduled')),
    format TEXT NOT NULL CHECK (format IN ('pdf', 'excel', 'csv')),
    size TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insights table
CREATE TABLE IF NOT EXISTS insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('opportunity', 'risk', 'recommendation', 'trend')),
    priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    source TEXT NOT NULL CHECK (source IN ('ai', 'manual')),
    action_label TEXT,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- KPI snapshots (for historical tracking)
CREATE TABLE IF NOT EXISTS kpi_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kpi_name TEXT NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    change DECIMAL(6,2) NOT NULL,
    snapshot_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Monthly performance data
CREATE TABLE IF NOT EXISTS monthly_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month TEXT NOT NULL,
    revenue INTEGER NOT NULL,
    expenses INTEGER NOT NULL,
    profit INTEGER NOT NULL,
    year INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(month, year)
);

-- Regional sales data
CREATE TABLE IF NOT EXISTS regional_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region TEXT NOT NULL,
    value INTEGER NOT NULL,
    change DECIMAL(6,2) NOT NULL,
    period TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE regional_sales ENABLE ROW LEVEL SECURITY;

-- RLS Policies for authenticated users
CREATE POLICY "select_own_data" ON customers FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_own_data" ON customers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_own_data" ON customers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_own_data" ON customers FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_opportunities" ON sales_opportunities FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_opportunities" ON sales_opportunities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_opportunities" ON sales_opportunities FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_opportunities" ON sales_opportunities FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_team" ON team_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_team" ON team_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_team" ON team_members FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_team" ON team_members FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_metrics" ON team_metrics FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_metrics" ON team_metrics FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "delete_metrics" ON team_metrics FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_reports" ON reports FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_reports" ON reports FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_reports" ON reports FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_reports" ON reports FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_insights" ON insights FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_insights" ON insights FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_insights" ON insights FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_insights" ON insights FOR DELETE TO authenticated USING (true);

CREATE POLICY "select_kpi" ON kpi_snapshots FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_kpi" ON kpi_snapshots FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "select_monthly" ON monthly_performance FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_monthly" ON monthly_performance FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "select_regional" ON regional_sales FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_regional" ON regional_sales FOR INSERT TO authenticated WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_segment ON customers(segment);
CREATE INDEX idx_customers_company ON customers(company);
CREATE INDEX idx_opportunities_stage ON sales_opportunities(stage);
CREATE INDEX idx_opportunities_value ON sales_opportunities(value DESC);
CREATE INDEX idx_team_members_department ON team_members(department);
CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_insights_type ON insights(type);
CREATE INDEX idx_insights_priority ON insights(priority);
CREATE INDEX idx_kpi_snapshots_date ON kpi_snapshots(snapshot_date DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers for updated_at
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_opportunities_updated_at
    BEFORE UPDATE ON sales_opportunities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
