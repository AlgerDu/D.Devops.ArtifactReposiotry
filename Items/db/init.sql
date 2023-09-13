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

CREATE TABLE product (
    id BIGINT,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    update_at TIMESTAMPTZ NOT NULL,
    is_delete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE product_version (
    id BIGINT,
    product_id BIGINT NOT NULL,
    "version" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    update_at TIMESTAMPTZ NOT NULL,
    is_delete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tag (
    id BIGINT,
    object_type TEXT NOT NULL,
    object_id BIGINT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    is_delete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);