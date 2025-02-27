import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useEffect } from 'react';

export default function Auth() {
  useEffect(() => {
    // Log any existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log('Existing session found:', session.user.email);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Fieldsy
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your local marketplace for farm-fresh goods and artisanal products
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#22c55e',
                    brandAccent: '#16a34a'
                  }
                }
              },
              className: {
                message: 'text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-md mb-4',
                button: 'bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
                input: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm',
                label: 'block text-sm font-medium text-gray-700 mb-1'
              }
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  button_label: 'Sign in',
                  loading_button_label: 'Signing in...',
                  link_text: "Already have an account? Sign in"
                },
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  button_label: 'Sign up',
                  loading_button_label: 'Signing up...',
                  link_text: "Don't have an account? Sign up"
                }
              }
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
}