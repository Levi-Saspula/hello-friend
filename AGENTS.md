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

- The home route renders the existing ebook document from src/content with its stylesheet; preserve that content when changing the offer so the imported page remains intact.
- Keep sales-page styling scoped to .sales-page and source its semantic color tokens from src/styles.css, so presentation changes do not affect application error screens.
- Resolve ebook and testimonial media through asset pointers in the home route; the imported document uses placeholders to keep media CDN-hosted and configuration intact.
