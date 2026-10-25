import Link from "next/link";
import { formatDate, postSummaries, prepareArticle, type Post } from "@/data/content";
import { site } from "@/data/site";
import { ArrowUpRight } from "@/components/Icons";
import ShareButtons from "@/components/ShareButtons";
import { PostCard } from "@/components/BlogContent";
import { TocNav } from "@/components/TocNav";

// Individual blog article: text-only header, sticky table of contents, clean
// reading column, author card, previous/next links and more articles.
export function BlogPost({ p }: { p: Post }) {
  const prepared = prepareArticle(p.html);
  const toc = prepared.toc;
  // The opening paragraph doubles as the lead, styled larger.
  const html = prepared.html.replace("<p>", '<p class="post-lead">');
  const index = postSummaries.findIndex((s) => s.slug === p.slug);
  const summary = postSummaries[index];
  const newer = postSummaries[index - 1];
  const older = postSummaries[index + 1];
  const more = postSummaries.filter((s) => s.slug !== p.slug).slice(0, 2);

  return (
    <>
      <header className="wrap post-hero">
        <nav className="post-crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/blog">Blog</Link>
        </nav>
        <p className="eyebrow post-hero-kicker">
          Article <span aria-hidden>·</span> {summary?.readTime ?? 1} min read
        </p>
        <h1>{p.title}</h1>
        <div className="post-hero-meta">
          <span className="post-avatar" aria-hidden>
            DR
          </span>
          <div>
            <span>Written by</span>
            <p>Darshika Raj</p>
          </div>
          <div>
            <span>Published</span>
            <p>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
            </p>
          </div>
          <div>
            <span>Reading time</span>
            <p>{summary?.readTime ?? 1} minutes</p>
          </div>
        </div>
      </header>

      <section className="wrap post-layout">
        <aside className="post-aside">
          {toc.length > 1 && (
            <details className="post-toc" open>
              <summary className="eyebrow">On this page</summary>
              <TocNav items={toc} />
            </details>
          )}
          <div className="post-share">
            <p className="eyebrow">Share</p>
            <div>
              <ShareButtons />
            </div>
          </div>
        </aside>

        <article className="post-article">
          <div className="prose-wp post-prose" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="post-author">
            <span className="post-avatar post-avatar-lg" aria-hidden>
              DR
            </span>
            <div>
              <p className="eyebrow">About the author</p>
              <h2>Darshika Raj</h2>
              <p>{site.intro}</p>
              <Link href="/contact" className="button-primary">
                Work with me
                <ArrowUpRight />
              </Link>
            </div>
          </div>

          {(newer || older) && (
            <nav className="post-pager" aria-label="More articles">
              {older ? (
                <Link href={`/${older.slug}`} className="post-pager-link">
                  <span className="eyebrow">← Previous article</span>
                  <span className="post-pager-title">{older.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {newer && (
                <Link href={`/${newer.slug}`} className="post-pager-link is-next">
                  <span className="eyebrow">Next article →</span>
                  <span className="post-pager-title">{newer.title}</span>
                </Link>
              )}
            </nav>
          )}
        </article>
      </section>

      {more.length > 0 && (
        <section className="wrap section-space post-more">
          <div className="post-more-head">
            <h2 className="display-heading">
              Keep <em>reading</em>
            </h2>
            <Link href="/blog" className="text-link">
              All Articles
              <ArrowUpRight />
            </Link>
          </div>
          <div className="post-grid">
            {more.map((s) => (
              <PostCard key={s.slug} post={s} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
