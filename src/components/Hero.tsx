import { useEffect, useRef } from 'react'
import gsap from 'gsap'
// @ts-ignore
import myImage from '../../images/IMG_1551.PNG'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
      gsap.from(labelRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      })
      gsap.from(bioRef.current, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
      })
      gsap.from(btnsRef.current!.children, {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        delay: 0.7,
        duration: 0.6,
        ease: 'power2.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center px-2 py-16 md:px-4 md:py-24 lg:px-6 lg:py-32 max-w-7xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">
        <div className="flex flex-col flex-1">
          <span
            ref={labelRef}
            className="font-pixel text-[var(--c-muted)] mb-8 block"
          >
            Principal Solutions Architect
          </span>

          <h1
            ref={headingRef}
            className="font-anton text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tight mb-8 text-[var(--c-heading)]"
          >
            <span className="text-brand">RAHUL</span>
            <br />
            KUMAR
          </h1>

          <p
            ref={bioRef}
            className="text-[var(--c-body)] text-lg md:text-xl lg:text-2xl max-w-2xl mb-12 leading-relaxed"
          >
            Builds and ships scalable, cloud-native solutions on AWS. Work spans
            serverless architecture, DevOps, full-stack development, and GenAI.
            Active speaker at AWS community events and host on AntStack TV.
          </p>

          <div ref={btnsRef} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-brand hover:bg-brand-dark text-white font-medium text-base px-8 py-4 transition-colors duration-200"
            >
              View Projects ↓
            </a>
            <a
              href="#contact"
              className="border border-brand text-brand hover:bg-brand hover:text-white font-medium text-base px-8 py-4 transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hidden md:flex flex-1 justify-end items-center mr-8">
          <img 
            src={myImage} 
            alt="Rahul Kumar" 
            className="w-full max-w-md lg:max-w-lg object-cover rounded-[2rem] shadow-2xl hover:scale-105 transition-transform duration-500 reveal"
          />
        </div>
      </div>
    </section>
  )
}
