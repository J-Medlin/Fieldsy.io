/*
  # Set admin user role

  1. Changes
    - Update the profile for j7.medlin@gmail.com to have admin role
    - Set reputation score to 100 for admin user

  2. Security
    - No changes to RLS policies
    - Uses existing table structure
*/

DO $$
BEGIN
  -- Update the profile for the admin user
  UPDATE profiles
  SET 
    role = 'admin',
    reputation_score = 100
  WHERE id = (
    SELECT id 
    FROM auth.users 
    WHERE email = 'j7.medlin@gmail.com'
  );
END $$;