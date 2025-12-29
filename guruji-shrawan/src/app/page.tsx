"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaYoutube, FaInstagram, FaFacebook, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";

/**
 * Replace src/app/page.tsx with this file.
 * Make sure images are in public/images/ as instructed above.
 */

export default function HomePage() {
  // quotes with smooth fade
  const quotes = [
    "Not belief. Only clarity.",
    "Truth without apology.",
    "Clarity matters more than comfort.",
  ];
  const [qIndex, setQIndex] = useState(0);
  const [qVisible, setQVisible] = useState(true);

  // change quote every 2s with fade
  useEffect(() => {
    const id = setInterval(() => {
      setQVisible(false);
      setTimeout(() => {
        setQIndex((p) => (p + 1) % quotes.length);
        setQVisible(true);
      }, 300); // fade duration
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // mobile menu drawer
  const [menuOpen, setMenuOpen] = useState(false);

  // scroll-spy active section
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = ["home", "books", "videos", "about"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id || "home");
          }
        });
      },
      { threshold: 0.5 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // demo shorts (YouTube short ids)
  const shorts = ["P-o8d-dmFH4", "oHg7pNF2cFg", "ZX81lMSwy-E"];

  return (
    <main className="font-sans text-gray-900">
      {/* NAVBAR */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/guruji.jpg" alt="logo" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
            <div className="font-extrabold tracking-tight text-lg">GURUJI SHRAWAN</div>
          </div>

          {/* desktop */}
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#home" className={`relative py-2 ${active==="home" ? "text-black" : "text-gray-600"}`}>
              <span className={`${active==="home" ? "font-semibold" : ""}`}>Home</span>
              <span className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all ${active==="home" ? "w-full" : "w-0"}`}></span>
            </a>
            <a href="#books" className={`relative py-2 ${active==="books" ? "text-black" : "text-gray-600"}`}>
              <span className={`${active==="books" ? "font-semibold" : ""}`}>Books</span>
              <span className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all ${active==="books" ? "w-full" : "w-0"}`}></span>
            </a>
            <a href="#videos" className={`relative py-2 ${active==="videos" ? "text-black" : "text-gray-600"}`}>
              <span className={`${active==="videos" ? "font-semibold" : ""}`}>Shorts</span>
              <span className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all ${active==="videos" ? "w-full" : "w-0"}`}></span>
            </a>
            <a href="#about" className={`relative py-2 ${active==="about" ? "text-black" : "text-gray-600"}`}>
              <span className={`${active==="about" ? "font-semibold" : ""}`}>Biography</span>
              <span className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all ${active==="about" ? "w-full" : "w-0"}`}></span>
            </a>

            <a href="#contact" className="ml-4 px-4 py-2 border rounded-full text-sm">Join</a>
          </nav>

          {/* mobile button */}
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)}></div>
          <div className="absolute right-0 top-0 w-72 h-full bg-white p-6 shadow-lg">
            <button className="text-2xl mb-6" onClick={() => setMenuOpen(false)}><FaTimes/></button>
            <nav className="flex flex-col gap-4 text-lg">
              <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#books" onClick={() => setMenuOpen(false)}>Books</a>
              <a href="#videos" onClick={() => setMenuOpen(false)}>Shorts</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>Biography</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 inline-block border px-4 py-2 rounded-full">Join</a>
            </nav>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="pt-28 pb-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* left text */}
          <div>
            <div className="mb-3 text-sm text-gray-300">Author • Speaker • Teacher</div>

            {/* quotes with fade */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span
                className={`inline-block transition-opacity duration-300 ${qVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
              >
                {quotes[qIndex]}
              </span>
            </h1>

            <p className="text-gray-300 max-w-xl mb-6">
              Short, clear teachings that remove confusion and help you live with purpose.
            </p>

            <div className="flex gap-4">
              <a href="#videos" className="bg-white text-black px-5 py-3 rounded-full font-semibold hover:shadow-lg transition">Watch Shorts</a>
              <a href="#books" className="border border-white px-5 py-3 rounded-full text-white hover:bg-white hover:text-black transition">Browse Books</a>
            </div>
          </div>

          {/* right collage */}
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition">
                <img src={`/images/book${i}.jpg`} alt={`book ${i}`} className="w-full h-40 object-cover"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKS */}
      <section id="books" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Books & PDFs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Gita Essentials (PDF)",
              "Fear & Freedom (PDF)",
              "Life Wisdom (PDF)",
              "Desire & Discipline (PDF)",
            ].map((b,i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl hover:shadow-2xl transition">
                <div className="font-semibold">{b}</div>
                <div className="text-sm text-gray-500 mt-1">Download PDF</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO CAROUSEL */}
      <section id="videos" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">YouTube Shorts</h2>
            <p className="text-gray-600">Tap thumbnail (opens YouTube). No autoplay iframes.</p>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation
            centeredSlides
            slidesPerView={1.2}
            spaceBetween={20}
            breakpoints={{ 640: { slidesPerView: 1.5 }, 1024: { slidesPerView: 2.2 } }}
          >
            {shorts.map((id) => (
              <SwiperSlide key={id}>
                <a href={`https://www.youtube.com/shorts/${id}`} target="_blank" rel="noreferrer" className="block">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} className="w-full h-[420px] object-cover" alt="thumb" />

                    {/* modern professional play icon (glass circle + white triangle) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
                        <circle cx="42" cy="42" r="40" fill="rgba(255,255,255,0.12)"/>
                        <circle cx="42" cy="42" r="30" fill="rgba(255,255,255,0.16)"/>
                        <path d="M34 30L56 42L34 54V30Z" fill="white"/>
                      </svg>
                    </div>

                    {/* subtle bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* BIOGRAPHY */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <img src="/images/guruji.jpg" alt="Guruji" className="w-48 h-48 object-cover rounded-xl shadow-lg" />
          <div>
            <h3 className="text-2xl font-semibold mb-3">Guruji Shrawan</h3>
            <p className="text-gray-600">
              (Short biography here.) A teacher dedicated to clarity, deep understanding and practical guidance. Talks and writings focused on removing confusion and making life purposeful.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#books">Books</a></li>
              <li><a href="#videos">Shorts</a></li>
              <li><a href="#about">Biography</a></li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="text-white font-semibold mb-3">Follow</h4>
            <div className="flex justify-center gap-6 text-2xl">
              <a href="https://www.youtube.com/@gurujishrawan" target="_blank" rel="noreferrer"><FaYoutube /></a>
              <a href="https://www.instagram.com/gurujishrawan/" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://www.facebook.com/gurujishrawan" target="_blank" rel="noreferrer"><FaFacebook /></a>
              <a href="https://whatsapp.com/channel/0029VbCDS8a0gcfQ34r9Ez37" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <p>support@gurujishrawan.org</p>
          </div>
        </div>

        <div className="text-center text-gray-600 mt-10">
          © {new Date().getFullYear()} Guruji Shrawan
        </div>
      </footer>
    </main>
  );
}
