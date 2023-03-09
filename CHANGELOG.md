# v11.0.3 (Thu Mar 09 2023)

#### 🐛 Bug Fix

- fix(imports): make sure paths are concrete [#73](https://github.com/artsy/palette-mobile/pull/73) ([@damassi](https://github.com/damassi))

#### Authors: 1

- Christopher Pappas ([@damassi](https://github.com/damassi))

---

# v11.0.2 (Mon Feb 20 2023)

#### 🐛 Bug Fix

- fix: some eslint issues [#71](https://github.com/artsy/palette-mobile/pull/71) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v11.0.1 (Mon Feb 20 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, George Kartalis ([@gkartalis](https://github.com/gkartalis)), for all your work!

#### 🐛 Bug Fix

- feat: add hitslop on button [#70](https://github.com/artsy/palette-mobile/pull/70) ([@gkartalis](https://github.com/gkartalis))

#### Authors: 1

- George Kartalis ([@gkartalis](https://github.com/gkartalis))

---

# v11.0.0 (Fri Feb 17 2023)

#### 💥 Breaking Change

- feat: rename src->app, lib->src [#69](https://github.com/artsy/palette-mobile/pull/69) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v10.0.4 (Fri Feb 17 2023)

#### 🐛 Bug Fix

- feat: OMG TYPES FOR STYLED COMPONENTS? FINALLY AND YES PLEASE! [#68](https://github.com/artsy/palette-mobile/pull/68) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v10.0.3 (Fri Feb 17 2023)

#### 🐛 Bug Fix

- fix: provider error and text prep [#67](https://github.com/artsy/palette-mobile/pull/67) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v10.0.2 (Fri Feb 17 2023)

#### 🐛 Bug Fix

- fix: removing sc from radiodot [#66](https://github.com/artsy/palette-mobile/pull/66) ([@pvinis](https://github.com/pvinis))

#### 🏠 Internal

- feat(toolchain): Add lint staged commit checks [#65](https://github.com/artsy/palette-mobile/pull/65) ([@damassi](https://github.com/damassi))
- feat(toolchain): Add `yarn sync-after-change` for local dev publishing [#64](https://github.com/artsy/palette-mobile/pull/64) ([@damassi](https://github.com/damassi))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v10.0.1 (Thu Feb 16 2023)

#### 🐛 Bug Fix

- fix: export types [#63](https://github.com/artsy/palette-mobile/pull/63) ([@damassi](https://github.com/damassi) [@pvinis](https://github.com/pvinis))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v10.0.0 (Thu Feb 16 2023)

#### 💥 Breaking Change

- refactor(palette): Simplify Lib [#62](https://github.com/artsy/palette-mobile/pull/62) ([@damassi](https://github.com/damassi) [@pvinis](https://github.com/pvinis))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v9.0.0 (Wed Feb 15 2023)

#### 💥 Breaking Change

- fix: button block and animations [#60](https://github.com/artsy/palette-mobile/pull/60) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.7.5 (Wed Feb 15 2023)

### Release Notes

#### feat: less confusing name for darkmode support ([#59](https://github.com/artsy/palette-mobile/pull/59))

Some renames:
- `v5light` -> `v3light`
- `v5dark` -> `v3dark`

`v5` was a temporary name, picked to make sure we can try dark mode without messing with v3 (or a potential v4 while we figure stuff out). Now that things are set, we can use `v3` for the non-dark-mode DS, and `v3light` and `v3dark` for v3 with added role name layer (like `background` and `onBackground` etc).

In the future, we will either have a `vX` for a non-dark-mode and `vXlight` and `vXdark`, or if the design team decides to incorporate dark mode, then we will only have a `vXlight` and `vXdark`.

---

#### 🐛 Bug Fix

- feat: less confusing name for darkmode support [#59](https://github.com/artsy/palette-mobile/pull/59) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.7.4 (Tue Feb 14 2023)

#### 🐛 Bug Fix

- fix: remove displaynames [#58](https://github.com/artsy/palette-mobile/pull/58) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.7.3 (Tue Feb 14 2023)

#### ⚠️ Pushed to `main`

- hm ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.7.2 (Tue Feb 14 2023)

#### 🐛 Bug Fix

- fix: loading and disabled, and reanim debump [#57](https://github.com/artsy/palette-mobile/pull/57) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.1.1 (Mon Feb 13 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Kizito Egeonu ([@lordkiz](https://github.com/lordkiz)), for all your work!

#### 🐛 Bug Fix

- Add MoneyCircleIcon and WorldGlobeCircleIcon [#56](https://github.com/artsy/palette-mobile/pull/56) ([@lordkiz](https://github.com/lordkiz) [@pvinis](https://github.com/pvinis))
- fix: button spacing [#55](https://github.com/artsy/palette-mobile/pull/55) ([@pvinis](https://github.com/pvinis))
- fix: Flex can now have ref without type errors [#54](https://github.com/artsy/palette-mobile/pull/54) ([@pvinis](https://github.com/pvinis))
- feat: typescript magic, allowing negative DS values, and 0 and auto [#53](https://github.com/artsy/palette-mobile/pull/53) ([@pvinis](https://github.com/pvinis))

#### ⚠️ Pushed to `main`

- Update .autorc ([@pvinis](https://github.com/pvinis))

#### Authors: 2

- Kizito Egeonu ([@lordkiz](https://github.com/lordkiz))
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.2.0 (Mon Feb 13 2023)

#### 🚀  Enhancement

- fix: button spacing [#55](https://github.com/artsy/palette-mobile/pull/55) ([@pvinis](https://github.com/pvinis))
- fix: Flex can now have ref without type errors [#54](https://github.com/artsy/palette-mobile/pull/54) ([@pvinis](https://github.com/pvinis))
- feat: typescript magic, allowing negative DS values, and 0 and auto [#53](https://github.com/artsy/palette-mobile/pull/53) ([@pvinis](https://github.com/pvinis))

#### ⚠️ Pushed to `main`

- Update .autorc ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.2.0 (Mon Feb 13 2023)

#### 🚀  Enhancement

- fix: Flex can now have ref without type errors [#54](https://github.com/artsy/palette-mobile/pull/54) ([@pvinis](https://github.com/pvinis))
- feat: typescript magic, allowing negative DS values, and 0 and auto [#53](https://github.com/artsy/palette-mobile/pull/53) ([@pvinis](https://github.com/pvinis))

#### ⚠️ Pushed to `main`

- Update .autorc ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.2.0 (Fri Feb 10 2023)

#### 🚀  Enhancement

- feat: typescript magic, allowing negative DS values, and 0 and auto [#53](https://github.com/artsy/palette-mobile/pull/53) ([@pvinis](https://github.com/pvinis))

#### ⚠️ Pushed to `main`

- Update .autorc ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.1.0 (Thu Feb 09 2023)

#### 🚀 Enhancement

- fix: Button was missing the restProps [#52](https://github.com/artsy/palette-mobile/pull/52) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v8.0.0 (Wed Feb 08 2023)

#### 💥 Breaking Change

- feat: finalizing `SpacingUnit` [#51](https://github.com/artsy/palette-mobile/pull/51) ([@pvinis](https://github.com/pvinis))

#### 🐛 Bug Fix

- docs: add darkmode docs and remove tslint comments [#50](https://github.com/artsy/palette-mobile/pull/50) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v7.0.0 (Fri Feb 03 2023)

#### 💥 Breaking Change

- feat: remove react-spring, and replace it with reanimated [#49](https://github.com/artsy/palette-mobile/pull/49) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v6.1.0 (Thu Feb 02 2023)

#### 🚀 Enhancement

- feat: export two icons [#48](https://github.com/artsy/palette-mobile/pull/48) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v6.0.0 (Thu Feb 02 2023)

### Release Notes

#### icons: added some, removed aliases ([#46](https://github.com/artsy/palette-mobile/pull/46))

Added:
- CloseCircleFillIcon
- GuaranteeIcon
- ImageIcon
- Payment2Icon
- SecureLockIcon
- StarCircleIcon
- Tag2Icon

Removed aliases: 
- ArtsyLogoIcon -> ArtsyLogoBlackIcon
- ArtsyMarkIcon -> ArtsyMarkBlackIcon
- CircleBlackCheckIcon -> CheckCircleFillIcon
- CircleWhiteCheckIcon -> CheckCircleIcon
- WinningBidIcon -> CheckCircleIcon
- GroupIcon -> UserMultiIcon
- SoloIcon -> UserSingleIcon
- HelpIcon -> QuestionCircleIcon
- LocationIcon -> MapPinIcon
- MuseumIcon -> InstitutionIcon
- OpenEyeIcon -> EyeOpenedIcon
- ClosedEyeIcon -> EyeClosedIcon
- TopEstablishedIcon -> EstablishedIcon
- LosingBidIcon -> CloseCircleIcon

---

#### 💥 Breaking Change

- chore: just a version bump [#47](https://github.com/artsy/palette-mobile/pull/47) ([@pvinis](https://github.com/pvinis))
- icons: added some, removed aliases [#46](https://github.com/artsy/palette-mobile/pull/46) ([@pvinis](https://github.com/pvinis))

#### 🐛 Bug Fix

- Bump activesupport from 6.1.7 to 6.1.7.2 [#43](https://github.com/artsy/palette-mobile/pull/43) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### ⚠️ Pushed to `main`

- Update AddCircleFillIcon.tsx ([@pvinis](https://github.com/pvinis))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v5.1.1 (Thu Feb 02 2023)

#### 🐛 Bug Fix

- fix: some index files [#45](https://github.com/artsy/palette-mobile/pull/45) ([@pvinis](https://github.com/pvinis))

#### ⚠️ Pushed to `main`

- Create index.ts ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v5.1.0 (Thu Feb 02 2023)

#### 🚀 Enhancement

- feat: add more text things from eigen [#44](https://github.com/artsy/palette-mobile/pull/44) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v5.0.0 (Wed Jan 18 2023)

#### 💥 Breaking Change

- feat: remove images [#41](https://github.com/artsy/palette-mobile/pull/41) ([@pvinis](https://github.com/pvinis))

#### ⚠️ Pushed to `main`

- more imports ([@pvinis](https://github.com/pvinis))
- imports ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v4.0.0 (Tue Jan 10 2023)

#### 💥 Breaking Change

- upgrade RN and move some deps around [#38](https://github.com/artsy/palette-mobile/pull/38) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v3.5.2 (Wed Jan 04 2023)

:tada: This release contains work from a new contributor! :tada:

Thank you, Christopher Pappas ([@damassi](https://github.com/damassi)), for all your work!

#### 🐛 Bug Fix

- fix: imports [#37](https://github.com/artsy/palette-mobile/pull/37) ([@pvinis](https://github.com/pvinis))
- feat(skeleton): Add skeleton loading states [#33](https://github.com/artsy/palette-mobile/pull/33) ([@damassi](https://github.com/damassi) [@pvinis](https://github.com/pvinis))

#### Authors: 2

- Christopher Pappas ([@damassi](https://github.com/damassi))
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v3.5.1 (Wed Jan 04 2023)

#### 🐛 Bug Fix

- tools: remeda -> lodash [#36](https://github.com/artsy/palette-mobile/pull/36) ([@pvinis](https://github.com/pvinis))
- Bump json5 from 1.0.1 to 1.0.2 [#35](https://github.com/artsy/palette-mobile/pull/35) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v3.5.0 (Wed Jan 04 2023)

#### 🚀 Enhancement

- feat: add surface colors [#34](https://github.com/artsy/palette-mobile/pull/34) ([@pvinis](https://github.com/pvinis))

#### 🐛 Bug Fix

- Bump deep-object-diff from 1.1.7 to 1.1.9 [#28](https://github.com/artsy/palette-mobile/pull/28) ([@dependabot[bot]](https://github.com/dependabot[bot]))
- Bump decode-uri-component from 0.2.0 to 0.2.2 [#29](https://github.com/artsy/palette-mobile/pull/29) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 2

- [@dependabot[bot]](https://github.com/dependabot[bot])
- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v3.4.0 (Fri Dec 23 2022)

#### 🚀 Enhancement

- fix: dark mode colors [#31](https://github.com/artsy/palette-mobile/pull/31) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v3.3.0 (Fri Dec 23 2022)

#### 🚀 Enhancement

- fix: back button bg color [#30](https://github.com/artsy/palette-mobile/pull/30) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v3.2.0 (Wed Nov 02 2022)

#### 🚀 Enhancement

- rework some stuff [#26](https://github.com/artsy/palette-mobile/pull/26) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v3.1.0 (Wed Oct 26 2022)

#### 🚀 Enhancement

- fix: touchable underlay color [#25](https://github.com/artsy/palette-mobile/pull/25) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v3.0.0 (Tue Oct 25 2022)

#### 💥 Breaking Change

- feat: v2 removed [#24](https://github.com/artsy/palette-mobile/pull/24) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v2.1.3 (Wed Oct 19 2022)

#### 🐛 Bug Fix

- fix: input styling [#23](https://github.com/artsy/palette-mobile/pull/23) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v2.1.2 (Wed Oct 19 2022)

#### 🐛 Bug Fix

- fix: back button colors [#22](https://github.com/artsy/palette-mobile/pull/22) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v2.1.1 (Tue Oct 18 2022)

#### 🐛 Bug Fix

- tiny [#21](https://github.com/artsy/palette-mobile/pull/21) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v2.1.0 (Tue Oct 18 2022)

#### 🚀 Enhancement

- Update README.md [#20](https://github.com/artsy/palette-mobile/pull/20) ([@pvinis](https://github.com/pvinis))

#### ⚠️ Pushed to `main`

- aha ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v2.0.0 (Tue Oct 18 2022)

#### 💥 Breaking Change

- tokens and types [#18](https://github.com/artsy/palette-mobile/pull/18) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v1.4.1 (Fri Oct 07 2022)

#### 🐛 Bug Fix

- feat: export icon stuff [#16](https://github.com/artsy/palette-mobile/pull/16) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v1.4.0 (Fri Oct 07 2022)

#### 🚀 Enhancement

- fix: native deps as peerDeps [#15](https://github.com/artsy/palette-mobile/pull/15) ([@pvinis](https://github.com/pvinis))

#### ⚠️ Pushed to `main`

- Merge branch 'main' of github.com:artsy/palette-mobile ([@pvinis](https://github.com/pvinis))
- ok ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v1.3.0 (Fri Oct 07 2022)

#### 🚀 Enhancement

- Update MenuItem.tsx [#13](https://github.com/artsy/palette-mobile/pull/13) ([@pvinis](https://github.com/pvinis))

#### 🐛 Bug Fix

- Update MenuIcon.tsx [#14](https://github.com/artsy/palette-mobile/pull/14) ([@pvinis](https://github.com/pvinis))

#### ⚠️ Pushed to `main`

- Update release.yml ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v1.2.0 (Fri Oct 07 2022)

#### 🚀 Enhancement

- Update MenuItem.tsx [#12](https://github.com/artsy/palette-mobile/pull/12) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))

---

# v1.0.0 (Fri Oct 07 2022)

#### 💥 Breaking Change

- aha [#3](https://github.com/artsy/palette-mobile/pull/3) ([@pvinis](https://github.com/pvinis))

#### Authors: 1

- Pavlos Vinieratos ([@pvinis](https://github.com/pvinis))
