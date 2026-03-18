import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import myImage from '../../images/IMG_3002.jpg'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
      gsap.fromTo(labelRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      )
      gsap.fromTo(bioRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }
      )
      gsap.fromTo(btnsRef.current!.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, delay: 0.7, duration: 0.6, ease: 'power2.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative z-10 w-full"
    >
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col justify-center group">

        {/* Dark base */}
        <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

        {/* Hero Image */}
        <img
          src={myImage}
          alt="Rahul Kumar"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 -translate-x-[4%] transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Left fade — wide and soft */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a0a0a] from-30% via-[#0a0a0a]/70 via-55% to-transparent" />

        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-1/3 z-0 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 z-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

        {/* Content — pt-24 clears the fixed nav */}
        <div className="relative z-10 flex flex-col items-start max-w-2xl px-8 md:px-16 pt-24 pb-16">
          <span
            ref={labelRef}
            className="font-pixel text-[10px] sm:text-xs text-brand tracking-widest uppercase mb-6 opacity-90"
          >
            Principal Solutions Architect
          </span>

          <h1
            ref={headingRef}
            className="font-anton text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.95] tracking-tight mb-8 text-white"
          >
            RAHUL
            <br />
            <span className="text-white/80">KUMAR</span>
          </h1>

          <p
            ref={bioRef}
            className="text-white/70 text-base md:text-lg max-w-md mb-12 leading-relaxed font-light"
          >
            Builds and ships scalable, cloud-native solutions on AWS. Work spans
            serverless architecture, DevOps, full-stack development, and GenAI.
            Active speaker at AWS community events and host on AntStack TV.
          </p>

          <div ref={btnsRef} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-brand hover:brightness-110 text-white font-medium text-sm md:text-base px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-brand/30 hover:-translate-y-0.5"
            >
              View Projects ↓
            </a>
            <a
              href="#contact"
              className="border border-white/25 text-white hover:bg-white hover:text-black font-medium text-sm md:text-base px-7 py-3.5 rounded-full transition-all duration-300 backdrop-blur-sm bg-white/5 hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
