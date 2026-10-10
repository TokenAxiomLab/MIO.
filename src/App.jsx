import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Clock,
  Leaf,
  MapPin,
  Menu,
  Quote,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from '@keyline-icons/react/duotone';

const dishes = [
  {
    name: 'Parmesan Fries',
    description: 'Sea salt, pecorino, herbs',
    price: '$12',
    rating: '4.9',
    image: '/images/fries.jpg',
  },
  {
    name: 'Mayo Pasta',
    description: 'Garden vegetables, herb mayo',
    price: '$18',
    rating: '4.8',
    image: '/images/mayo-pasta.jpg',
  },
  {
    name: 'Margherita Pizza',
    description: 'Fior di latte, basil, tomato',
    price: '$21',
    rating: '4.9',
    image: '/images/margherita-pizza.jpg',
  },
  {
    name: 'Berry French Toast',
    description: 'Brioche, maple, market berries',
    price: '$17',
    rating: '4.7',
    image: '/images/french-toast.jpg',
  },
];

const gallery = [
  {
    image: '/images/gallery-interior-light.jpg',
    label: 'Soft mornings',
    className: 'gallery-a',
  },
  {
    image: '/images/gallery-brunch-table.jpg',
    label: 'Made to share',
    className: 'gallery-b',
  },
  {
    image: '/images/gallery-interior-green.jpg',
    label: 'Our green room',
    className: 'gallery-c',
  },
  {
    image: '/images/gallery-patio.jpg',
    label: 'The garden table',
    className: 'gallery-d',
  },
  {
    image: '/images/gallery-cafe.jpg',
    label: 'Meet us at MIO.',
    className: 'gallery-e',
  },
];

const reviews = [
  {
    quote: 'The kind of place that turns a quick brunch into a long, lovely afternoon. The French toast is reason enough to come back.',
    name: 'Amelia R.',
    meta: 'Local Guide · 32 reviews',
  },
  {
    quote: 'Bright, relaxed, and genuinely delicious. Our table shared the fries and pizza, and not a crumb survived.',
    name: 'Noah T.',
    meta: 'Verified diner · September',
  },
  {
    quote: 'MIO. gets the details right—from the first coffee to the last bite of something sweet. Service was warm and effortless.',
    name: 'Sofia M.',
    meta: 'Verified diner · August',
  },
  {
    quote: 'A little pocket of calm in the city. Beautiful room, thoughtful menu, and the creamiest pasta I have had in ages.',
    name: 'Julian K.',
    meta: 'Local Guide · 18 reviews',
  },
];

const faqs = [
  {
    question: 'Do you take walk-ins?',
    answer: 'Always. We keep a portion of the dining room open for walk-ins every day. Weekend waits can be longer, so a reservation is best for larger groups.',
  },
  {
    question: 'What time is brunch served?',
    answer: 'Our full brunch menu is served daily from 8:00 AM to 4:00 PM. Coffee, sweets, and a smaller all-day menu continue until close.',
  },
  {
    question: 'Do you have vegetarian or gluten-aware options?',
    answer: 'Yes. Several dishes are vegetarian and our team can point out gluten-aware choices. Please tell us about any allergies when you order.',
  },
  {
    question: 'Can I book MIO. for a private gathering?',
    answer: 'Yes. We host birthdays, team brunches, and intimate celebrations for up to 36 guests. Send us a note at hello@mio.nyc for details.',
  },
  {
    question: 'Is outdoor seating available?',
    answer: 'Our garden tables open whenever the weather allows. Outdoor seating is offered on a first-come basis and cannot be guaranteed in advance.',
  },
  {
    question: 'Do you offer takeaway and delivery?',
    answer: 'Yes. Most of our brunch menu is available for pickup and local delivery during kitchen hours. Use any Order button to get started.',
  },
];

const marqueeItems = ['MIO.', 'Parmesan Fries', 'Mayo Pasta', 'Margherita Pizza', 'Berry French Toast', 'Brunch & Sweets'];

function BrandMark({ light = false }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" aria-label="MIO. home">
      MIO<span>.</span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [bagCount, setBagCount] = useState(0);
  const [toast, setToast] = useState('');
  const [bookingSent, setBookingSent] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    return () => document.body.classList.remove('menu-is-open');
  }, [menuOpen]);

  const addDish = (name) => {
    setBagCount((count) => count + 1);
    setToast(`${name} added to your order`);
  };

  const submitBooking = (event) => {
    event.preventDefault();
    setBookingSent(true);
    event.currentTarget.reset();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell" id="top">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Main navigation">
          <BrandMark />
          <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
            <a href="#menu" onClick={closeMenu}>Menu</a>
            <a href="#gallery" onClick={closeMenu}>Our place</a>
            <a href="#reviews" onClick={closeMenu}>Reviews</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
          </div>
          <div className="nav-actions">
            <button className="bag-button" type="button" aria-label={`Order bag with ${bagCount} items`} onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}>
              <ShoppingBag size={20} />
              <span>{bagCount}</span>
            </button>
            <a className="nav-book" href="#book">Book a table <ArrowUpRight size={17} /></a>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle menu">
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src="/images/hero-brunch.jpg" alt="A generous brunch table at MIO." />
          <div className="hero-shade" />
          <div className="hero-content container">
            <div className="hero-eyebrow"><span /> Neighborhood kitchen · NYC <span /></div>
            <h1 id="hero-title">A little joy,<br /><em>served daily.</em></h1>
            <p>Slow mornings, honest ingredients, and just enough sweetness. Come for brunch, stay for one more coffee.</p>
            <div className="hero-actions">
              <a className="primary-button hero-cta" href="#menu">Order online <ArrowRight size={19} /></a>
              <div className="hero-rating" aria-label="Rated 4.9 out of 5 from more than 1,200 reviews">
                <div className="rating-stars">
                  {[0, 1, 2, 3, 4].map((star) => <Star size={16} key={star} />)}
                </div>
                <div><strong>4.9</strong><span>1,200+ happy guests</span></div>
              </div>
            </div>
          </div>
          <div className="hero-note">
            <Clock size={21} />
            <div><span>Today</span><strong>8:00 AM — 9:00 PM</strong></div>
          </div>
          <a className="scroll-cue" href="#menu"><span>Scroll to discover</span><ChevronDown size={17} /></a>
        </section>

        <section className="marquee" aria-label="MIO signature dishes">
          <div className="marquee-track">
            {[0, 1].map((set) => (
              <div className="marquee-set" key={set} aria-hidden={set === 1}>
                {marqueeItems.map((item, index) => (
                  <span className={index === 0 ? 'marquee-brand' : ''} key={`${set}-${item}`}>
                    {item}<Sparkles size={18} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="section menu-section container" id="menu">
          <div className="section-heading menu-heading">
            <div>
              <p className="kicker">From our kitchen</p>
              <h2>Our signatures,<br /><em>your favorites.</em></h2>
            </div>
            <p className="section-intro">Familiar comforts, made the MIO. way. Seasonal produce, thoughtful sourcing, and everything prepared to order.</p>
          </div>
          <div className="dish-grid">
            {dishes.map((dish, index) => (
              <article className="dish-card" key={dish.name} style={{ '--delay': `${index * 80}ms` }}>
                <div className="dish-image-wrap">
                  <img src={dish.image} alt={dish.name} loading="lazy" />
                  <div className="dish-rating"><Star size={15} /> {dish.rating}</div>
                  <span className="dish-number">0{index + 1}</span>
                </div>
                <div className="dish-info">
                  <div>
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                  </div>
                  <div className="dish-bottom">
                    <strong>{dish.price}</strong>
                    <button type="button" onClick={() => addDish(dish.name)} aria-label={`Order ${dish.name}`}>
                      Order <ArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section gallery-section" id="gallery">
          <div className="container">
            <div className="section-heading gallery-heading">
              <div>
                <p className="kicker">Life at MIO.</p>
                <h2>Your table is<br /><em>waiting.</em></h2>
              </div>
              <div className="gallery-note"><Leaf size={22} /><span>Good food.<br />Good company.</span></div>
            </div>
            <div className="bento-grid">
              {gallery.map((item, index) => (
                <figure className={`gallery-tile ${item.className}`} key={item.image}>
                  <img src={item.image} alt={item.label} loading="lazy" />
                  <figcaption><span>0{index + 1}</span>{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="container">
            <div className="reviews-header">
              <div>
                <p className="kicker light-kicker">Kind words</p>
                <h2>Loved by the<br /><em>neighborhood.</em></h2>
              </div>
              <div className="review-score">
                <strong>4.9</strong>
                <div>
                  <div className="rating-stars">{[0, 1, 2, 3, 4].map((star) => <Star size={17} key={star} />)}</div>
                  <span>Based on 1,200+ reviews</span>
                </div>
              </div>
            </div>
            <div className="review-grid">
              {reviews.map((review, index) => (
                <article className="review-card" key={review.name}>
                  <div className="review-card-top"><span>0{index + 1}</span><Quote size={30} /></div>
                  <p>“{review.quote}”</p>
                  <div className="reviewer">
                    <span>{review.name.slice(0, 1)}</span>
                    <div><strong>{review.name}</strong><small>{review.meta}</small></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section container" id="faq">
          <div className="faq-layout">
            <div className="faq-copy">
              <p className="kicker">Before you visit</p>
              <h2>Questions,<br /><em>answered.</em></h2>
              <p>Still wondering about something?</p>
              <a href="mailto:hello@mio.nyc">hello@mio.nyc <ArrowUpRight size={17} /></a>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <article className={`faq-item ${isOpen ? 'faq-open' : ''}`} key={faq.question}>
                    <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                      <span><small>0{index + 1}</small>{faq.question}</span>
                      <ChevronDown size={22} />
                    </button>
                    <div className="faq-answer"><p>{faq.answer}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="booking-section" id="book">
          <div className="booking-inner container">
            <div className="booking-copy">
              <p className="kicker light-kicker">Reservations</p>
              <h2>Save a seat<br /><em>for something sweet.</em></h2>
              <p>Tell us when you are coming. We will have the coffee warm and your favorite table ready.</p>
              <div className="booking-details">
                <div><MapPin size={22} /><span>10 Main Street<br />NYC, US</span></div>
                <div><Clock size={22} /><span>Open daily<br />8 AM — 9 PM</span></div>
              </div>
            </div>
            <form className="booking-form" onSubmit={submitBooking}>
              {bookingSent ? (
                <div className="booking-success" role="status">
                  <CircleCheck size={50} />
                  <h3>Your table request is in.</h3>
                  <p>We will confirm your reservation by email shortly.</p>
                  <button type="button" onClick={() => setBookingSent(false)}>Make another booking</button>
                </div>
              ) : (
                <>
                  <div className="form-title"><span>Book your table</span><CalendarDays size={24} /></div>
                  <div className="form-grid">
                    <label className="field field-wide">
                      <span>Your name</span>
                      <input type="text" name="name" placeholder="Jane Smith" required />
                    </label>
                    <label className="field field-wide">
                      <span>Email address</span>
                      <input type="email" name="email" placeholder="jane@example.com" required />
                    </label>
                    <label className="field">
                      <span>Date</span>
                      <input type="date" name="date" min={minDate} required />
                    </label>
                    <label className="field">
                      <span>Time</span>
                      <select name="time" defaultValue="" required>
                        <option value="" disabled>Select time</option>
                        <option>9:00 AM</option><option>10:30 AM</option><option>12:00 PM</option>
                        <option>1:30 PM</option><option>3:00 PM</option><option>6:00 PM</option><option>7:30 PM</option>
                      </select>
                    </label>
                    <label className="field field-wide">
                      <span>Party size</span>
                      <select name="guests" defaultValue="2 guests" required>
                        <option>1 guest</option><option>2 guests</option><option>3 guests</option>
                        <option>4 guests</option><option>5 guests</option><option>6+ guests</option>
                      </select>
                    </label>
                  </div>
                  <button className="booking-submit" type="submit">Request a table <Send size={18} /></button>
                  <p className="form-note">No payment required. We will email to confirm.</p>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <BrandMark light />
            <p>Brunch & Sweets.</p>
          </div>
          <div className="footer-nav">
            <div><span>Explore</span><a href="#menu">Menu</a><a href="#gallery">Our place</a><a href="#reviews">Reviews</a></div>
            <div><span>Visit</span><a href="#book">Reservations</a><a href="mailto:hello@mio.nyc">Email us</a><a href="tel:+12125550146">Call MIO.</a></div>
            <div><span>Follow</span><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.pinterest.com" target="_blank" rel="noreferrer">Pinterest</a><a href="https://www.tiktok.com" target="_blank" rel="noreferrer">TikTok</a></div>
          </div>
          <div className="footer-address">
            <MapPin size={22} />
            <p>10 Main Street<br />NYC, US</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} MIO. All rights reserved.</span>
          <span>Made with care in NYC.</span>
        </div>
      </footer>

      <div className={`toast ${toast ? 'toast-visible' : ''}`} role="status" aria-live="polite">
        <CircleCheck size={20} /><span>{toast}</span>
      </div>
    </div>
  );
}

export default App;
