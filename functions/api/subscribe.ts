interface Env {
  DB: D1Database;
}

interface SubscribeRequest {
  email: string;
  source?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const { email, source = 'windows-waitlist' }: SubscribeRequest = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        { status: 400, headers }
      );
    }

    // Insert into D1
    await env.DB.prepare(
      'INSERT OR IGNORE INTO subscribers (email, source) VALUES (?, ?)'
    ).bind(email.toLowerCase().trim(), source).run();

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully subscribed!' }),
      { status: 200, headers }
    );

  } catch (error: any) {
    // Handle duplicate email gracefully
    if (error.message?.includes('UNIQUE constraint')) {
      return new Response(
        JSON.stringify({ success: true, message: 'Already subscribed!' }),
        { status: 200, headers }
      );
    }

    console.error('Subscribe error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error, please try again' }),
      { status: 500, headers }
    );
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
