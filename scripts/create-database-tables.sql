-- Create newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scholarship applications table
CREATE TABLE IF NOT EXISTS scholarship_applications (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  school_level VARCHAR(100) NOT NULL,
  school VARCHAR(255) NOT NULL,
  currently_in_school VARCHAR(10) NOT NULL,
  kcpe_results VARCHAR(100) NOT NULL,
  parent_name VARCHAR(255) NOT NULL,
  parent_occupation VARCHAR(255) NOT NULL,
  parent_income VARCHAR(100) NOT NULL,
  siblings TEXT,
  previous_sponsor TEXT NOT NULL,
  last_term_fees VARCHAR(100),
  present_term_fees VARCHAR(100),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  reference_number VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscriptions(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_submitted ON contact_messages(submitted_at);
CREATE INDEX IF NOT EXISTS idx_scholarship_status ON scholarship_applications(status);
CREATE INDEX IF NOT EXISTS idx_scholarship_submitted ON scholarship_applications(submitted_at);
CREATE INDEX IF NOT EXISTS idx_scholarship_reference ON scholarship_applications(reference_number);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_newsletter_updated_at BEFORE UPDATE ON newsletter_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scholarship_updated_at BEFORE UPDATE ON scholarship_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
