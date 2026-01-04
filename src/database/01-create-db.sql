-- paint
BEGIN;

-- Suppression des tables si elles existent déjà (attention à l'ordre par rapport aux clés étrangères)
DROP TABLE IF EXISTS "painting" CASCADE;
DROP TABLE IF EXISTS "movement" CASCADE;

-- Création de la table movement en premier (car painting y fait référence)
CREATE TABLE "movement" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" TEXT UNIQUE NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Création de la table painting
CREATE TABLE "painting" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "painter" TEXT NOT NULL,
    "image_url" TEXT,
    "painted_at" DATE,
    "movement_id" INTEGER NOT NULL REFERENCES "movement"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Index pour améliorer les performances des recherches
CREATE INDEX "idx_painting_movement_id" ON "painting"("movement_id");
CREATE INDEX "idx_painting_painter" ON "painting"("painter");

-- Trigger pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_movement_updated_at 
    BEFORE UPDATE ON "movement"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_painting_updated_at 
    BEFORE UPDATE ON "painting"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMIT;