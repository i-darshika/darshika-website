import Image from "next/image";
type Card = { image: string; title: string; sub: string };
export default function GallerySlider({ cards }: { cards: Card[] }) {
  return (
    <div
      className="gallery-scroll"
      tabIndex={0}
      role="region"
      aria-label="Certificates and work gallery"
    >
      <div className="gallery-track">
        {cards.map((card, i) => (
          <figure key={card.image + i} className="gallery-card">
            <Image
              src={card.image}
              alt={`${card.title} – ${card.sub}`}
              width={319}
              height={405}
            />
            <figcaption>
              <span>{card.title}</span>
              <span>{card.sub}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
