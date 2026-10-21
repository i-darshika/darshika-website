import Image from "next/image";
import Link from "next/link";
import { postsByDate, formatDate } from "@/data/content";
import { site } from "@/data/site";
import { Search, Social } from "@/components/Icons";
import ShareButtons from "@/components/ShareButtons";
export function ArticleHeader({
  title,
  date,
  label = "Published",
}: {
  title: string;
  date: string;
  label?: string;
}) {
  return (
    <section className="wrap article-header">
      <span className="eyebrow">Darshika</span>
      <h1>{title}</h1>
      <div className="article-byline">
        <Image src={site.favicon} alt="Darshika" width={48} height={48} />
        <div>
          <span>Author</span>
          <p>Darshika</p>
        </div>
        <div>
          <span>{label}</span>
          <p>{date}</p>
        </div>
      </div>
    </section>
  );
}
export function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="wrap article-layout section-space">
      <article>{children}</article>
      <Sidebar />
    </section>
  );
}
export function Sidebar() {
  return (
    <aside className="article-sidebar">
      <form action="/blog" className="sidebar-search">
        <input name="s" placeholder="Search…" aria-label="Search articles" />
        <button type="submit" aria-label="Search">
          <Search />
        </button>
      </form>
      <div>
        <h2>Follow Me</h2>
        <a
          href={site.socials[1].href}
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-social"
        >
          <Social label="LinkedIn" />
          LinkedIn
        </a>
      </div>
      <div>
        <h2>Latest Posts</h2>
        <ul>
          {postsByDate.map((p) => {
            const d = new Date(p.date);
            return (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="sidebar-thumb">
                  <Image src={p.image} alt="" width={90} height={100} />
                  <span>
                    {d.getDate()}{" "}
                    {d.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </Link>
                <div>
                  <span className="eyebrow">Blog</span>
                  <Link href={`/${p.slug}`}>{p.title}</Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
export function RecentNews() {
  return (
    <section className="wrap section-space recent-news">
      <div className="recent-heading">
        <h2 className="display-heading">
          Recent <em>News</em>
        </h2>
        <Link href="/blog" className="text-link">
          All Articles<span aria-hidden>↗</span>
        </Link>
      </div>
      <div className="news-grid">
        {postsByDate.map((p) => (
          <Link key={p.slug} href={`/${p.slug}`} className="news-card">
            <div className="news-image">
              <Image src={p.image} alt={p.title} width={500} height={360} />
            </div>
            <div className="news-byline">
              <span>
                <Image src={site.favicon} alt="" width={28} height={28} />
                Darshika
              </span>
              <span>{formatDate(p.date)}</span>
            </div>
            <h3>{p.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
export function ShareRow() {
  return (
    <div className="share-row">
      <p>Tags :</p>
      <div>
        <span>Share :</span>
        <ShareButtons />
      </div>
    </div>
  );
}
