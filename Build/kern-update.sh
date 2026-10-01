#!/usr/bin/env bash
# Copies the pinned @kern-ux/native release into Resources/Public/Vendor/kern (bundled locally: no CDN, BITV/privacy).
# Usage: Build/kern-update.sh  — bump VERSION and SHA256 together, then check the frontend.
set -euo pipefail

VERSION="2.8.2"
SHA256="06f90a4222bdad5f181474b6f1be7d9be211b8660a6b2ea8aa6c6807d40ca3e9"
TARGET="$(cd "$(dirname "$0")/.." && pwd)/Resources/Public/Vendor/kern"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

curl -fsSL "https://registry.npmjs.org/@kern-ux/native/-/native-${VERSION}.tgz" -o "$TMP/kern.tgz"
echo "${SHA256}  $TMP/kern.tgz" | shasum -a 256 -c -
tar -xzf "$TMP/kern.tgz" -C "$TMP"

rm -rf "$TARGET"
mkdir -p "$TARGET/fonts"
cp "$TMP/package/dist/kern.min.css" "$TMP/package/LICENSE.md" "$TARGET/"
cp "$TMP/package/dist/fonts/fira-sans.css" "$TARGET/fonts/"
mkdir -p "$TARGET/fonts/fira-sans"
cp "$TMP/package/dist/fonts/fira-sans/"*.woff2 "$TARGET/fonts/fira-sans/"
echo "$VERSION" > "$TARGET/VERSION"
echo "KERN $VERSION installed to $TARGET"
