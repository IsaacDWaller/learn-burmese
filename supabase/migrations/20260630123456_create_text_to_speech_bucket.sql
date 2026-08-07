INSERT INTO storage.buckets (
    id,
    name,
    public,
    allowed_mime_types,
    file_size_limit
)
VALUES (
    'text-to-speech',
    'text-to-speech',
    false,
    ARRAY['audio/wav'],
    1048576
) ON CONFLICT (id) DO NOTHING;
