CREATE TABLE schema (
    id BIGSERIAL,
    "name" TEXT NOT NULL,
    "descript" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    update_at TIMESTAMPTZ NOT NULL,
    is_delete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE product (
    id BIGSERIAL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    update_at TIMESTAMPTZ NOT NULL,
    is_delete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE version (
    id BIGSERIAL,
    product_id BIGINT NOT NULL,
    "version" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    update_at TIMESTAMPTZ NOT NULL,
    is_delete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE artifact (
    id BIGSERIAL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    version_id BIGINT NOT NULL,
    "data" JSONB NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    is_delete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tag (
    id BIGSERIAL,
    object_type TEXT NOT NULL,
    object_id BIGINT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    is_delete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);