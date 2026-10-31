-- ============================================================================
-- INDOWINGS AEROSPACE - SUPABASE DATABASE MIGRATION & REPAIR SCRIPT
-- Paste this script into your Supabase SQL Editor and click RUN
-- ============================================================================

-- 1. JOBS TABLE (Create if not exists)
CREATE TABLE IF NOT EXISTS public.jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Full-Time',
  experience TEXT NOT NULL,
  salary_range TEXT,
  duration_days INTEGER DEFAULT 15,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  requirements TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure all columns exist even if table was previously created with an older schema
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS salary_range TEXT;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS duration_days INTEGER DEFAULT 15;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS requirements TEXT;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'Full-Time';

-- 2. CANDIDATES TABLE
CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'candidate',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.candidates ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.candidates ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.candidates ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'candidate';

-- 3. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.applications (
  id TEXT PRIMARY KEY,
  job_id TEXT,
  job_title TEXT,
  department TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience TEXT,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'applied',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS job_id TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS job_title TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS experience TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS cover_letter TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS resume_url TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'applied';

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active jobs" ON public.jobs;
CREATE POLICY "Public can view active jobs"
  ON public.jobs FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Manage jobs policy" ON public.jobs;
CREATE POLICY "Manage jobs policy"
  ON public.jobs FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Candidates read and insert policy" ON public.candidates;
CREATE POLICY "Candidates read and insert policy"
  ON public.candidates FOR ALL
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit applications" ON public.applications;
CREATE POLICY "Public can submit applications"
  ON public.applications FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read applications" ON public.applications;
CREATE POLICY "Public can read applications"
  ON public.applications FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin update application status" ON public.applications;
CREATE POLICY "Admin update application status"
  ON public.applications FOR UPDATE
  USING (true);

-- ============================================================================
-- STORAGE BUCKET FOR RESUME UPLOADS
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public resume upload policy" ON storage.objects;
CREATE POLICY "Public resume upload policy"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Public resume access policy" ON storage.objects;
CREATE POLICY "Public resume access policy"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes');

-- ============================================================================
-- SEED JOBS DATA (Safely upsert official IndoWings openings)
-- ============================================================================
INSERT INTO public.jobs (id, title, department, location, type, experience, salary_range, duration_days, expires_at, is_active, description, requirements)
VALUES
(
  'job-avionics-lead-01',
  'Lead Flight Avionics & Autopilot Engineer',
  'Flight Avionics & Embedded Hardware',
  'Noida Aerospace HQ (On-Site)',
  'Full-Time',
  '4+ Years',
  '₹14L - ₹22L PA',
  15,
  now() + interval '15 days',
  true,
  'Lead the architecture and testing of redundant flight avionics, CAN-bus microcontrollers, and high-reliability power distribution boards for the flagship Cyberone series.',
  'Deep experience with STM32/PX4 firmware, RTOS, ArduPilot architecture, hardware-in-the-loop (HIL) testing, and MIL-STD electromagnetic shielding.'
),
(
  'job-indofly-ai-02',
  'Computer Vision & Edge AI Autonomy Engineer',
  'AI, Computer Vision & GCS Software (IndoFly)',
  'Bengaluru Autonomy Lab',
  'Full-Time',
  '3+ Years',
  '₹16L - ₹26L PA',
  10,
  now() + interval '10 days',
  true,
  'Develop real-time target tracking, visual inertial odometry (VIO), and GPS-denied autonomous navigation for sovereign drone defense platforms.',
  'Proficiency in C++, Python, TensorRT, PyTorch, ROS2, and onboard deployment on NVIDIA Jetson Orin compute modules.'
),
(
  'job-composite-aero-03',
  'Senior Composite Airframe & Aerodynamics Engineer',
  'Composite Aerodynamics & Mechanical Engineering',
  'Noida Aerospace HQ (On-Site)',
  'Full-Time',
  '5+ Years',
  '₹12L - ₹18L PA',
  20,
  now() + interval '20 days',
  true,
  'Design and fabricate lightweight carbon-fiber monocoque airframes capable of withstanding extreme aerodynamic shear and Himalayan sub-zero operations.',
  'Mastery of carbon-composite autoclave curing, FEA structural stress simulation (ANSYS), 5-axis CNC mold design, and aerodynamic drag optimization.'
),
(
  'job-cuas-rf-04',
  'RF & Microwave Electronic Warfare Engineer',
  'Tactical C-UAS (Counter-Drone) & RF Systems',
  'Noida / Bengaluru (Hybrid)',
  'Full-Time',
  '3+ Years',
  '₹15L - ₹24L PA',
  12,
  now() + interval '12 days',
  true,
  'Engineer directional RF jamming modules, SDR spectrum scanners, and automated protocol dissectors for SKYctrl counter-drone defense platforms.',
  'Extensive hands-on SDR experience (GNURadio, USRP), RF power amplifier design (400MHz - 6GHz), GNSS spoofing counter-measures, and antenna array beamforming.'
),
(
  'job-pilot-ops-05',
  'DGCA Certified Flight Test Pilot & Mission Commander',
  'Certified Drone Pilots & Flight Operations',
  'Field Operations / Nationwide Deployment',
  'Full-Time',
  '2+ Years',
  '₹7L - ₹12L PA',
  8,
  now() + interval '8 days',
  true,
  'Conduct tactical border surveillance field sorties, payload calibration missions, and prototype stress flights across high-altitude and desert proving grounds.',
  'Valid DGCA Remote Pilot Certificate (RPC), minimum 250+ certified flight hours on medium/large category UAVs, and BVLOS flight operation clearance.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  department = EXCLUDED.department,
  location = EXCLUDED.location,
  type = EXCLUDED.type,
  experience = EXCLUDED.experience,
  salary_range = EXCLUDED.salary_range,
  duration_days = EXCLUDED.duration_days,
  expires_at = EXCLUDED.expires_at,
  is_active = EXCLUDED.is_active,
  description = EXCLUDED.description,
  requirements = EXCLUDED.requirements;
