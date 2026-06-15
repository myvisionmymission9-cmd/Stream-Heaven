# Home Feed Roadmap

Minimal roadmap for the Home Feed scoped slice. See [HOME-FEED-SYSTEM-ARCHITECTURE.md](./HOME-FEED-SYSTEM-ARCHITECTURE.md) for design.

## Done (this pass)

- [x] 15 Home Feed agents + basic/advanced Cursor skills
- [x] `feed.v1.yaml` contract stub
- [x] Flutter `HomeFeedScreen` with tabs, vertical scroll, overlays, bottom nav
- [x] Mock feed data for all content types
- [x] Agent registry section

## Next

- [ ] Connect `GET /feed/home` in NestJS social-service
- [ ] Real video player (HLS) + autoplay on active page
- [ ] Preload next/prev items (`feed-preload-buffer-agent`)
- [ ] Watch-event telemetry → recommendation pipeline
- [ ] Regional ranking hooks (locale/regionCode)
- [ ] Widget + integration tests in CI
