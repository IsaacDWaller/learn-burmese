CREATE POLICY "Allow authenticated uploads" -- noqa: RF05
ON storage.objects FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'text-to-speech'
);
