<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Leads (enquiries + consultation requests) are stored in the owner's Google Sheet via the Google Sheets connector from `src/lib/leads.server.ts`; sheet ID comes from the `GREWELLA_SHEET_ID` secret. Why: owner wants leads in "Grewella's Leads" sheet, no database.
- Hero 3D is layered CSS 3D transforms (no WebGL). Why: keeps mobile performance high.
- Business constants (phone, form options) live in `src/lib/site.ts`. Why: one place to replace placeholders.
