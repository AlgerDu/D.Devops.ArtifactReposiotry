CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;

CREATE TABLE schema (
    id BIGINT,
    parent_id BIGINT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "descript" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    create_at TIMESTAMPTZ NOT NULL,
    update_at TIMESTAMPTZ NOT NULL,
    is_enable BOOLEAN NOT NULL,
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
CREATE INDEX index_product_docker_name ON product USING gin ((data->>'dockerName'));

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
    update_at TIMESTAMPTZ NOT NULL,
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