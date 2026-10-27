CREATE POLICY "Allow authenticated downloads" -- noqa: RF05
ON storage.objects FOR SELECT TO authenticated USING (
    bucket_id = 'text-to-speech'
);
