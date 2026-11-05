
import { useState } from "react";
import "./App.css";

const steps = [
  ["01", "Book your scan", "Start with a scan at home or at an Alignaa centre."],
  ["02", "Get your plan", "A dental professional prepares your customised treatment plan."],
  ["03", "Receive aligners", "Your custom aligners are prepared and delivered."],
  ["04", "Start smiling", "Begin your treatment journey with professional guidance."],
];

const concerns = [
  ["Spacing", "Gaps between teeth"],
  ["Crowding", "Overlapping or crowded teeth"],
  ["Forwardly placed teeth", "Teeth that appear pushed forward"],
  ["Crossbite", "Upper and lower teeth do not align correctly"],
  ["Open bite", "A gap when the teeth come together"],
  ["Deep bite", "Upper front teeth overlap lower teeth"],
];

const faqs = [
  ["What are clear aligners?", "Clear aligners are transparent, removable trays designed to gradually move teeth according to an individual treatment plan."],
  ["How much does Alignaa treatment cost?", "Alignaa treatment starts at ₹39,999. Your final treatment cost depends on your dental requirements and treatment plan."],
  ["How does the treatment begin?", "The journey begins with a dental scan. A dental professional reviews your requirements and prepares a customised plan."],
  ["Can I remove my aligners?", "Yes. Aligners are removable for eating, drinking beverages other than water, and brushing your teeth."],
  ["How long does treatment take?", "Treatment duration varies according to your dental condition and individual treatment plan."],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [form, setForm] = useState({
    name: "", mobile: "", age: "", city: "", pincode: "",
    concern: "", email: "", message: "", consent: false, website: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function submitForm(e) {
    e.preventDefault();

    if (form.website) return;

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setStatus("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      setStatus("Please enter a valid 6-digit PIN code.");
      return;
    }

    if (!form.consent) {
      setStatus("Please accept the consent to continue.");
      return;
    }

    const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;
    if (!endpoint) {
      setStatus("We could not send your enquiry. Please try again. The enquiry service is not connected yet.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Alignaa Patient Enquiry" }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setStatus("Thank you for your enquiry. The Alignaa support team will contact you to discuss your requirements and guide you through the next steps.");
      setForm({
        name: "", mobile: "", age: "", city: "", pincode: "",
        concern: "", email: "", message: "", consent: false, website: "",
      });
    } catch {
      setStatus("We could not send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="alignaa">
      <div className="top-strip">
        A NEW WAY TO SMILE <span>•</span> PERSONALised CLEAR ALIGNER CARE
      </div>

      <header className="site-header">
        <a href="#home" className="brand">alignaa<span>.</span></a>

        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "main-nav nav-open" : "main-nav"}>
          <a href="#treatment" onClick={() => setMenuOpen(false)}>Treatment</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#why-alignaa" onClick={() => setMenuOpen(false)}>Why Alignaa</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQs</a>
          <a href="/become-a-partner" onClick={() => setMenuOpen(false)}>For Dentists</a>
        </nav>

        <a href="#contact" className="header-button">Get started <span>↗</span></a>
      </header>

      <main>
        {/* HERO */}
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <span className="eyebrow">YOUR SMILE, YOUR WAY</span>
            <h1>A confident smile is always <em>in style.</em></h1>
            <p>
              Discover clear aligners designed around your smile,
              your lifestyle and your journey.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="primary-button">Start your smile journey <span>↗</span></a>
              <a href="#process" className="simple-link">Discover how it works ↓</a>
            </div>
            <div className="hero-footnote">
              <span>✦</span> Personalised treatment planning
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1100&q=85"
              alt="Portrait representing a confident smile"
            />
            <div className="hero-image-label">
              <span>THE ALIGNAA EXPERIENCE</span>
              <strong>Your smile. Your confidence.</strong>
            </div>
            <div className="floating-note">
              <span className="floating-icon">✧</span>
              <div><strong>Made for you</strong><small>A personalised smile journey</small></div>
            </div>
          </div>
        </section>

        {/* INTRO STRIP */}
        <section className="intro-strip">
          <div><strong>01</strong><span>Clear aligner treatment</span></div>
          <div><strong>02</strong><span>Custom treatment planning</span></div>
          <div><strong>03</strong><span>Professional guidance</span></div>
        </section>

        {/* TREATMENT */}
        <section className="treatment-section section-space" id="treatment">
          <div className="treatment-image">
            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1000&q=85"
              alt="Dental care and treatment environment"
            />
            <div className="image-tag">A NEW WAY TO ALIGN YOUR SMILE</div>
          </div>

          <div className="treatment-copy">
            <span className="eyebrow">INTRODUCING ALIGNAA</span>
            <h2>Small steps.<br />Big reasons to <em>smile.</em></h2>
            <p>
              Your smile is personal. Your treatment should be too.
              Alignaa clear aligners are designed to help you work
              towards a smile that feels like you.
            </p>
            <a href="#contact" className="underlined-link">Explore your treatment <span>↗</span></a>
          </div>
        </section>

        {/* PRICE */}
        <section className="price-section">
          <div className="price-inner">
            <div>
              <span className="eyebrow light-eyebrow">YOUR SMILE JOURNEY STARTS HERE</span>
              <h2>Ready for a smile<br />that feels like <em>you?</em></h2>
            </div>
            <div className="price-side">
              <span>ALIGNAA TREATMENT STARTS AT</span>
              <strong>₹39,999<small> onwards</small></strong>
              <a href="#contact" className="white-button">Explore your options ↗</a>
              <small className="price-disclaimer">Final cost depends on individual treatment requirements.</small>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="process-section section-space" id="process">
          <div className="section-title">
            <span className="eyebrow">YOUR JOURNEY, SIMPLIFIED</span>
            <h2>Four steps.<br /><em>One smile at a time.</em></h2>
            <p>From your first scan to your aligner journey, here's what to expect.</p>
          </div>

          <div className="steps-layout">
            {steps.map(([number, title, description]) => (
              <article className="step-card" key={number}>
                <div className="step-top"><span>{number}</span><i>↗</i></div>
                <div className="step-line" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CONCERNS */}
        <section className="concerns-section section-space">
          <div className="section-title centered">
            <span className="eyebrow">EVERY SMILE IS DIFFERENT</span>
            <h2>Your smile goals.<br /><em>We hear you.</em></h2>
            <p>Explore common teeth alignment concerns. A dental professional can assess your individual needs.</p>
          </div>

          <div className="concern-list">
            {concerns.map(([title, desc], index) => (
              <a href="#contact" className="concern-item" key={title}>
                <span className="concern-number">0{index + 1}</span>
                <div className="concern-art"><span>✧</span></div>
                <div className="concern-text"><h3>{title}</h3><p>{desc}</p></div>
                <span className="concern-arrow">↗</span>
              </a>
            ))}
          </div>
          <p className="fine-print">Treatment suitability and outcomes depend on an individual dental assessment.</p>
        </section>

        {/* WHY ALIGNAA */}
        <section className="why-section" id="why-alignaa">
          <div className="why-visual">
            <img
              src="https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1100&q=85"
              alt="Woman smiling confidently"
            />
            <div className="why-image-caption">
              <span>MORE THAN ALIGNERS</span>
              <strong>A journey made around you.</strong>
            </div>
          </div>

          <div className="why-copy">
            <span className="eyebrow">WHY ALIGNAA</span>
            <h2>Designed for your smile.<br /><em>Made for your life.</em></h2>
            <div className="why-feature">
              <span>01</span><div><h3>Discreet by design</h3><p>Clear aligners designed to fit into your everyday routine.</p></div>
            </div>
            <div className="why-feature">
              <span>02</span><div><h3>Removable convenience</h3><p>Remove your aligners when eating and brushing your teeth.</p></div>
            </div>
            <div className="why-feature">
              <span>03</span><div><h3>Personalised planning</h3><p>Your treatment plan is created around your dental requirements.</p></div>
            </div>
            <div className="why-feature">
              <span>04</span><div><h3>Professional guidance</h3><p>Get guidance from a dental professional during your journey.</p></div>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="results-section section-space">
          <div className="section-title centered">
            <span className="eyebrow">YOUR SMILE STORY</span>
            <h2>Every journey is <em>unique.</em></h2>
            <p>Illustrative treatment examples. Individual results and duration vary.</p>
          </div>

          <div className="results-row">
            {[
              ["Gap closure", "8.5 months", "17 aligners"],
              ["Forwardly placed teeth", "10 months", "20 aligners"],
              ["Crowding", "8 months", "16 aligners"],
            ].map(([name, duration, aligners], i) => (
              <article className="result-item" key={name}>
                <div className="result-image">
                  <span>ILLUSTRATIVE EXAMPLE</span>
                  <div className="result-smile">⌣</div>
                  <b>0{i + 1}</b>
                </div>
                <h3>{name}</h3>
                <div className="result-meta"><span>Duration</span><strong>{duration}</strong></div>
                <div className="result-meta"><span>Aligners</span><strong>{aligners}</strong></div>
              </article>
            ))}
          </div>
        </section>

        {/* PATIENT STORIES */}
        <section className="story-section">
          <div className="story-copy">
            <span className="eyebrow light-eyebrow">YOUR STORY MATTERS</span>
            <h2>One day, this could be <em>your story.</em></h2>
            <p>We look forward to sharing genuine Alignaa patient experiences here.</p>
            <a href="#contact" className="white-button">Start a conversation ↗</a>
          </div>
          <div className="story-note">
            <span>“</span>
            <h3>Real smiles.<br />Real experiences.</h3>
            <p>Patient testimonials will be added after client approval.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section section-space" id="faq">
          <div className="faq-heading">
            <span className="eyebrow">A LITTLE MORE CLARITY</span>
            <h2>Questions?<br /><em>We've got answers.</em></h2>
            <p>Here are a few things you may want to know before beginning your journey.</p>
            <a href="#contact" className="underlined-link">Ask us something else ↗</a>
          </div>

          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className="faq-item" key={question}>
                <button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}>
                  <span>{question}</span><b>{activeFaq === index ? "−" : "+"}</b>
                </button>
                {activeFaq === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow light-eyebrow">LET'S BEGIN</span>
            <h2>Your smile journey<br />starts with <em>hello.</em></h2>
            <p>Share a few details and the Alignaa support team can guide you through the next steps.</p>
            <div className="contact-price"><span>TREATMENT STARTS AT</span><strong>₹39,999</strong></div>
          </div>

          <form className="contact-form" onSubmit={submitForm}>
            <h3>Let's get to know you.</h3>
            <p>Fill in your details to enquire about Alignaa.</p>

            <div className="form-fields">
              <label>Full name *<input name="name" value={form.name} onChange={update} required placeholder="Your full name" /></label>
              <label>Mobile number *<input name="mobile" value={form.mobile} onChange={update} required maxLength={10} inputMode="numeric" placeholder="10-digit mobile number" /></label>
              <label>Age group *<select name="age" value={form.age} onChange={update} required><option value="">Select age group</option>{["Under 18", "18–24", "25–34", "35–44", "45+"].map(x => <option key={x}>{x}</option>)}</select></label>
              <label>City *<input name="city" value={form.city} onChange={update} required placeholder="Your city" /></label>
              <label>PIN code *<input name="pincode" value={form.pincode} onChange={update} required maxLength={6} inputMode="numeric" placeholder="6-digit PIN code" /></label>
              <label>Teeth concern *<select name="concern" value={form.concern} onChange={update} required><option value="">Choose your concern</option>{[...concerns.map(x => x[0]), "Not sure", "General enquiry"].map(x => <option key={x}>{x}</option>)}</select></label>
              <label className="full-field">Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="Your email (optional)" /></label>
              <label className="full-field">Message<textarea name="message" value={form.message} onChange={update} maxLength={1000} placeholder="Tell us about your smile goals (optional)" /></label>
            </div>

            <label className="consent">
              <input type="checkbox" name="consent" checked={form.consent} onChange={update} required />
              <span>I agree to be contacted regarding my enquiry and accept the <a href="/privacy-policy">Privacy Policy</a>.</span>
            </label>
            <input className="trap-field" name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" aria-hidden="true" />

            <button className="primary-button form-button" disabled={loading}>
              {loading ? "Sending..." : "Submit enquiry ↗"}
            </button>
            {status && <p className="form-status" role="status">{status}</p>}
            <small className="privacy-note">Your information will be used to respond to your enquiry.</small>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <a href="#home" className="brand footer-brand">alignaa<span>.</span></a>
            <p>A new way to work towards<br />the smile you love.</p>
          </div>
          <div className="footer-column"><h4>EXPLORE</h4><a href="#treatment">Treatment</a><a href="#process">How it works</a><a href="#why-alignaa">Why Alignaa</a><a href="#faq">FAQs</a></div>
          <div className="footer-column"><h4>CONNECT</h4><a href="#contact">Get in touch</a><a href="/become-a-partner">Become a partner</a><a href="https://alignaa.in/" target="_blank" rel="noreferrer">Alignaa main website ↗</a></div>
          <div className="footer-column"><h4>INFORMATION</h4><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms & Conditions</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Alignaa. All rights reserved.</span><span>Designed around your smile.</span></div>
      </footer>
    </div>
  );
}

export default App;
