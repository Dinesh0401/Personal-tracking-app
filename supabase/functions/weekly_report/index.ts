import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  try {
    const { userId } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('date,dsa_solved,ai_minutes,commit_count,xp,completed_tasks_count')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(7);

    if (error) throw error;

    const today = new Date();
    if (today.getDay() !== 0) {
      return Response.json({
        strengths: [],
        weaknesses: [],
        recommended_actions: ['Weekly report is available on Sunday only.'],
        weekly_score: 0
      });
    }

    const prompt = `You are an AI career coach. Given user activity data for the past 7 days, return valid JSON exactly like this shape: {"strengths": string[], "weaknesses": string[], "recommended_actions": string[], "weekly_score": number}. Data: ${JSON.stringify(tasks ?? [])}`;

    const aiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: prompt
      })
    });

    const payload = await aiResponse.json();
    const text = payload.output?.[0]?.content?.[0]?.text ?? '{}';

    return Response.json(JSON.parse(text));
  } catch (error) {
    return Response.json(
      {
        strengths: [],
        weaknesses: ['Unable to compute weekly report.'],
        recommended_actions: ['Retry later and verify your edge function secrets.'],
        weekly_score: 0,
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 200 }
    );
  }
});
