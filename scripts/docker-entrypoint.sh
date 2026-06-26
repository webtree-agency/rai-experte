#!/bin/sh
# Container-Boot: optional seeden, dann den Next-Standalone-Server starten.
# Das Schema wird durch Payload (postgresAdapter push:true) beim ersten Zugriff
# automatisch angelegt — keine separaten Migrationen nötig für diese Site.
set -e

if [ "${SEED_ON_BOOT}" = "true" ]; then
  echo "[entrypoint] SEED_ON_BOOT=true → seede Inhalte …"
  node --import tsx scripts/seed.ts || echo "[entrypoint] Seed übersprungen/fehlgeschlagen (nicht fatal)."
fi

echo "[entrypoint] Starte Server: $*"
exec "$@"
