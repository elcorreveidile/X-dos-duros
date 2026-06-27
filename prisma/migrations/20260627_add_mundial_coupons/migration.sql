CREATE TABLE IF NOT EXISTS "mundial_coupons" (
  "id"          TEXT        NOT NULL,
  "code"        TEXT        NOT NULL,
  "pct"         INTEGER     NOT NULL,
  "email"       TEXT,
  "redeemedAt"  TIMESTAMP,
  "projectId"   TEXT,
  "createdAt"   TIMESTAMP   NOT NULL DEFAULT NOW(),
  CONSTRAINT "mundial_coupons_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "mundial_coupons_code_key" ON "mundial_coupons"("code");
