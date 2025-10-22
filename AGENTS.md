# Repository Guidelines

## プロジェクト構成とモジュール配置
- `src/` に主要な React コンポーネント、ページレイアウト、ドメインロジック、型定義を配置します（例: `src/components/`, `src/domain/`, `src/types/`）。
- `styles/` には共有 CSS をまとめ、`index.html` がエントリーポイントです。
- 設定ファイル（`vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `mise.toml`）はリポジトリ直下にあります。

## ビルド・テスト・開発コマンド
- `pnpm dev` / `npm run dev` : Vite 開発サーバーを起動し、ホットリロードで確認できます。
- `pnpm build` : TypeScript のプロジェクト参照ビルド後、Vite で本番ビルドを生成します。
- `pnpm preview` : ビルド済みアセットをローカルで確認します。
- `pnpm lint` : ESLint で静的解析を行い、型安全と品質を担保します。
- `pnpm fmt` : Prettier でコードを整形します。コミット前に必ず実行してください。

## コーディングスタイルと命名規約
- TypeScript/React（関数コンポーネント）を採用し、2 スペースインデントを推奨します。
- コンポーネントは `PascalCase`、ユーティリティ/フックは `camelCase`、定数は `SCREAMING_SNAKE_CASE` を利用します。
- CSS/スタイルはモジュール単位でファイルを分け、共通テーマは `styles/` に置きます。
- ESLint（`eslint.config.js`）と Prettier を組み合わせ、`pnpm lint` と `pnpm fmt` でスタイルを維持します。

## テストガイドライン
- 現状テストセットアップは未導入です。テスト追加時は React Testing Library + Vitest の導入を推奨します。
- 追加するテストファイルは `src/__tests__/` もしくは対象ファイルと同名の `*.test.tsx` を使用し、シナリオ単位で命名してください。
- コミット前にテストが通過する状態を保ち、将来的には最低限のコンポーネント/ドメインロジックのカバレッジを確保します。

## コミットとプルリクエストの方針
- コミットメッセージは短く要点をまとめ、変更範囲が大きい場合は論理的に分割します（例: `feat: add timestamp search filters`）。
- プルリクエストでは目的、主要な変更点、スクリーンショット（UI 変更時）、関連 Issue を明記してください。
- CI を導入する場合に備え、`pnpm lint` とテストコマンドを手元で確認した上で PR を提出します。

## 環境設定とセキュリティのヒント
- Node.js と pnpm のバージョンは `package.json` の `volta` 設定（Node 22.13.0, pnpm 9.15.4）に合わせてください。
- API キーや認証情報は `.env` 等にまとめ、Git にコミットしないよう `.gitignore` を更新してください。

