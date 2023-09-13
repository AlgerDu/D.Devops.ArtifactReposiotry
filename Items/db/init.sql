CREATE TABLE artifact (
    id BIGINT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    product_version_id BIGINT NOT NULL,
    "data" JSONB NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    is_delete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);