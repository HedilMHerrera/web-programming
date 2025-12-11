#!/bin/bash

# OpenSSL que viene con Git para Windows
WIN_GIT_OPENSSL="/c/Program Files/Git/usr/bin/openssl"
WIN_GIT_OPENSSL_CNF="/c/Program Files/Git/usr/ssl/openssl.cnf"

if [ -f "$WIN_GIT_OPENSSL" ]; then
  OPENSSL_BIN="$WIN_GIT_OPENSSL"
  export OPENSSL_CONF="$WIN_GIT_OPENSSL_CNF"
else
  OPENSSL_BIN="openssl"
fi

# Raíz del backend (un nivel arriba del script)
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CERT_DIR="$ROOT_DIR/cert"

# Crear carpeta cert si no existe
mkdir -p "$CERT_DIR"

echo "Usando OpenSSL en: $OPENSSL_BIN"
echo "OPENSSL_CONF en: $OPENSSL_CONF"
echo "Generando certificados en: $CERT_DIR"

SUBJ="/C=BO/ST=Cochabamba/L=Cochabamba/O=UMSS/OU=Ing-Informatica/CN=localhost"

export MSYS2_ARG_CONV_EXCL="*"

# --- 4. Ejecutar OpenSSL para generar llave y certificado ---

"$OPENSSL_BIN" req -nodes -new -x509 \
  -keyout "$CERT_DIR/server.key" \
  -out "$CERT_DIR/server.cert" \
  -days 365 \
  -subj "$SUBJ"