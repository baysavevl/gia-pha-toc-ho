import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = process.cwd();

function readProjectFile(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function stripInactiveComments(source) {
  return source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

test("public surface does not expose active login entry points", () => {
  const publicFiles = [
    "app/page.tsx",
    "components/PublicHeader.tsx",
    "components/PublicFooter.tsx",
    "data/publicContent.ts",
  ];

  for (const file of publicFiles) {
    const activeSource = stripInactiveComments(readProjectFile(file));

    assert.doesNotMatch(
      activeSource,
      /href\s*(?:=|:)\s*["']\/login["']/,
      `${file} still has an active /login link`,
    );
  }
});

test("landing page publishes a public genealogy preview", () => {
  const pageSource = readProjectFile("app/page.tsx");
  const contentSource = readProjectFile("data/publicContent.ts");
  const publishedProfiles = contentSource.match(/relationLabel:/g) ?? [];

  assert.match(pageSource, /id="pha-he-cong-khai"/);
  assert.match(pageSource, /publicGenealogyProfiles/);
  assert.match(pageSource, /Đã publish/);
  assert.match(contentSource, /export const publicGenealogyProfiles/);
  assert.ok(
    publishedProfiles.length >= 5,
    "expected at least five public genealogy profiles",
  );
});

test("login page keeps the auth form behind a disabled feature flag", () => {
  const loginSource = readProjectFile("app/login/page.tsx");

  assert.match(loginSource, /NEXT_PUBLIC_ENABLE_LOGIN/);
  assert.match(loginSource, /LoginDisabledPage/);
  assert.match(loginSource, /LoginForm/);
});
