import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Instruments() {
  const { data: instruments, error } = await supabase.from('instruments').select();

  if (error) {
    return <pre>Error: {error.message}</pre>;
  }

  return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
}
