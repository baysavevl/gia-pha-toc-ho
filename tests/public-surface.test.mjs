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

test("landing page publishes genealogy results without brief/concept sections", () => {
  const pageSource = readProjectFile("app/page.tsx");
  const explorerSource = readProjectFile("components/PublicGenealogyExplorer.tsx");
  const landingSource = `${pageSource}\n${explorerSource}`;
  const contentSource = readProjectFile("data/publicContent.ts");
  const publishedProfiles = contentSource.match(/relationLabel:/g) ?? [];

  assert.match(landingSource, /id="pha-he-cong-khai"/);
  assert.match(landingSource, /id="pha-do-cong-khai"/);
  assert.match(landingSource, /publicGenealogyProfiles/);
  assert.match(landingSource, /Bản công khai/);
  assert.match(landingSource, /Phả đồ dạng cây dọc/);
  assert.match(landingSource, /VerticalLine/);
  assert.doesNotMatch(landingSource, /Đã publish/);
  assert.doesNotMatch(landingSource, /min-w-\[1100px\]/);
  assert.doesNotMatch(landingSource, /moduleBriefs/);
  assert.doesNotMatch(landingSource, /audienceGroups/);
  assert.doesNotMatch(landingSource, /Các phân hệ theo brief/);
  assert.doesNotMatch(landingSource, /Cập nhật brief/);
  assert.doesNotMatch(landingSource, /Đối tượng sử dụng/);
  assert.match(contentSource, /export const publicGenealogyProfiles/);
  assert.ok(
    publishedProfiles.length >= 5,
    "expected at least five public genealogy profiles",
  );
});

test("public genealogy cards expose details and related people", () => {
  const contentSource = readProjectFile("data/publicContent.ts");
  const explorerSource = readProjectFile("components/PublicGenealogyExplorer.tsx");

  const detailSets = contentSource.match(/details:\s*\[/g) ?? [];
  const relationSets = contentSource.match(/relatedPeople:\s*\[/g) ?? [];

  assert.ok(detailSets.length >= 5, "expected details for every public profile");
  assert.ok(
    relationSets.length >= 5,
    "expected related people for every public profile",
  );
  assert.match(explorerSource, /use client/);
  assert.match(explorerSource, /setActiveProfile/);
  assert.match(explorerSource, /Người liên quan/);
  assert.match(explorerSource, /Chi tiết hồ sơ/);
});

test("admin has a dedicated login route and legacy login redirects there", () => {
  const adminSource = readProjectFile("app/admin/page.tsx");
  const loginSource = readProjectFile("app/login/page.tsx");
  const dashboardLayoutSource = readProjectFile("app/dashboard/layout.tsx");
  const middlewareSource = readProjectFile("utils/supabase/middleware.ts");

  assert.match(adminSource, /AdminLoginForm/);
  assert.match(loginSource, /redirect\("\/admin"\)/);
  assert.match(dashboardLayoutSource, /redirect\("\/admin"\)/);
  assert.match(middlewareSource, /pathname\.startsWith\("\/admin"\)/);
});
