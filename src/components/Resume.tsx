import { EXPERIENCE, SKILLS, CERTIFICATIONS } from '../data/about'
import { PROJECTS } from '../data/projects'

export async function printResume() {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })

  const margin = 48
  const pageWidth = doc.internal.pageSize.getWidth()
  const contentWidth = pageWidth - margin * 2
  const BLUE = '#3b82f6'
  let y = 48

  const setColor = (hex: string) => {
    doc.setTextColor(parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16))
  }
  const setDraw = (hex: string) => {
    doc.setDrawColor(parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16))
  }

  const addText = (text: string, opts: { size?: number; bold?: boolean; color?: string; indent?: number } = {}) => {
    doc.setFontSize(opts.size ?? 11)
    doc.setFont('helvetica', opts.bold ? 'bold' : 'normal')
    setColor(opts.color ?? '#111111')
    const x = margin + (opts.indent ?? 0)
    const lines = doc.splitTextToSize(text, contentWidth - (opts.indent ?? 0))
    lines.forEach((line: string) => {
      if (y > doc.internal.pageSize.getHeight() - 48) { doc.addPage(); y = 48 }
      doc.text(line, x, y)
      y += (opts.size ?? 11) * 1.5
    })
  }

  const addSection = (title: string) => {
    y += 10
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    setColor(BLUE)
    doc.text(title.toUpperCase(), margin, y)
    y += 4
    setDraw(BLUE)
    doc.setLineWidth(0.5)
    doc.line(margin, y, pageWidth - margin, y)
    y += 10
    setColor('#111111')
  }

  const addRow = (left: string, right: string) => {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    setColor('#111111')
    doc.text(doc.splitTextToSize(left, contentWidth * 0.72)[0] ?? '', margin, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    setColor('#777777')
    doc.text(right, pageWidth - margin, y, { align: 'right' })
    setColor('#111111')
    y += 15
  }

  // Header
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  setColor('#111111')
  doc.text('Rahul Kumar', margin, y)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  setColor(BLUE)
  doc.textWithLink('rahulkmr.com', pageWidth - margin, y - 8, { url: 'https://rahulkmr.com', align: 'right' })
  setColor('#444444')
  doc.text('connect@rahulkmr.com', pageWidth - margin, y + 4, { align: 'right' })
  y += 22

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  setColor('#444444')
  doc.text('Principal Solutions Architect', margin, y)
  y += 14

  setDraw('#cccccc')
  doc.setLineWidth(1)
  doc.line(margin, y, pageWidth - margin, y)
  y += 8

  // Experience
  addSection('Experience')
  EXPERIENCE.forEach(job => {
    addRow(job.role, job.period)
    addText(`${job.company}, ${job.location}`, { size: 9, color: '#555555' })
    job.bullets.forEach(b => addText(`• ${b}`, { size: 10, indent: 8 }))
    y += 6
  })

  // Projects
  addSection('Projects')
  PROJECTS.forEach(p => {
    addRow(p.title, p.role)
    addText(p.description, { size: 10 })
    addText(p.tags.join(' · '), { size: 9, color: '#555555' })
    y += 6
  })

  // Skills
  addSection('Skills')
  SKILLS.forEach(({ category, items }) => {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    setColor('#111111')
    doc.text(category, margin, y)
    doc.setFont('helvetica', 'normal')
    setColor('#111111')
    const itemLines = doc.splitTextToSize(items.join(', '), contentWidth - 120)
    doc.text(itemLines[0] ?? '', margin + 120, y)
    y += 15
    itemLines.slice(1).forEach((line: string) => { doc.text(line, margin + 120, y); y += 15 })
  })

  // Certifications
  addSection('Certifications')
  CERTIFICATIONS.forEach(cert => {
    addRow(`${cert.abbr}  ${cert.name}`, cert.issued ? `Issued ${cert.issued}` : '')
  })

  // Contact footer
  const pageHeight = doc.internal.pageSize.getHeight()
  setDraw('#cccccc')
  doc.setLineWidth(0.5)
  doc.line(margin, pageHeight - 32, pageWidth - margin, pageHeight - 32)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')

  const contacts: Array<{ text: string; url: string }> = [
    { text: 'connect@rahulkmr.com', url: 'mailto:connect@rahulkmr.com' },
    { text: 'linkedin.com/in/kumarahul98', url: 'https://www.linkedin.com/in/kumarahul98/' },
    { text: 'github.com/kumarahul98', url: 'https://github.com/kumarahul98' },
  ]
  const totalWidth = contacts.reduce((sum, c) => sum + doc.getTextWidth(c.text), 0)
    + doc.getTextWidth('  ·  ') * (contacts.length - 1)
  let fx = (pageWidth - totalWidth) / 2

  contacts.forEach((c, i) => {
    setColor(BLUE)
    doc.textWithLink(c.text, fx, pageHeight - 20, { url: c.url })
    fx += doc.getTextWidth(c.text)
    if (i < contacts.length - 1) {
      setColor('#aaaaaa')
      doc.text('  ·  ', fx, pageHeight - 20)
      fx += doc.getTextWidth('  ·  ')
    }
  })

  doc.save('rahul-kumar-resume.pdf')
}

export default function Resume() {
  return null
}
