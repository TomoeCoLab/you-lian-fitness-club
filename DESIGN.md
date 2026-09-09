# 有練 · YOU LIAN design system

Original fitness editorial system inspired by the publicly documented Nike DESIGN.md principles, without Nike trademarks or copied brand assets.

## Creative direction

- Product character: private Discord fitness circle; athletic, candid, calm, direct.
- Visual idea: photography speaks; the application chrome stays monochrome.
- Canvas: pure white `#ffffff`, never cream or warm gray.
- Ink: `#111111`; soft surface: `#f5f5f5`; dividers: `#cacacb`; muted text: `#707072`; completion: `#159447`.
- Layout: open bands, calendar grid, divider-separated activity rows. No floating dashboard card grid.
- Elevation: none. Use 1px dividers; no drop shadows.
- Radius: square containers and imagery; pills only for actions and compact filters.
- Spacing: 8px base; 16/24/32/48/64px rhythm.
- Display type: condensed, massive, black or white over photography. UI type: clean Traditional Chinese sans.
- Motion: 160–220ms state transitions and drawer reveal; respect `prefers-reduced-motion`.

## Locked product surfaces

1. Desktop dashboard: quiet header, editorial hero strip, monthly calendar, selected-day friend activity rail.
2. Check-in drawer: three selectable depths — quick, standard, detailed — with one shared submission flow.
3. Mobile dashboard: compact hero, readable month calendar, selected-day feed, two-item bottom navigation.

## Content rules

- Product name: `有練` with secondary wordmark `YOU LIAN`.
- Primary action: `今天有練`.
- Privacy language: `只顯示 YOU LIAN 成員的動態`.
- Never imply that server membership is the same as a Discord friendship. Membership is the private group allowlist.
- Do not add streak pressure, leaderboards, calories, comparison metrics, or motivational spam.

## Discord message style

- Webhook sender name: `有練 · YOU LIAN`.
- Title: `🏋️ {displayName} 今天有練`.
- Body varies by mode; detailed mode may list up to five exercise rows.
- No role mentions or mass pings.
- Footer: `YOU LIAN · 私人健身打卡`.
