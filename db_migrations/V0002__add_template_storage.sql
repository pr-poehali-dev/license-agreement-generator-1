CREATE TABLE IF NOT EXISTS template_storage (
    id INTEGER PRIMARY KEY DEFAULT 1,
    template_data BYTEA NOT NULL,
    filename VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_size INTEGER NOT NULL,
    CONSTRAINT single_template CHECK (id = 1)
);

INSERT INTO template_storage (id, template_data, filename, file_size) 
VALUES (1, ''::bytea, 'template.docx', 0)
ON CONFLICT (id) DO NOTHING;
