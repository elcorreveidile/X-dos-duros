'use client'

import { Phone, Mail, Globe, Share2, Download, Instagram, Youtube } from 'lucide-react'

const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=39FF14&bgcolor=0A0A0A&data=${encodeURIComponent('https://www.por2duros.com/laclasedigital')}`

export function LaClaseDigitalCard() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'La Clase Digital — Javier Benítez Láinez',
        text: 'Formación docente en IA · Digitalización para el sector productivo',
        url: 'https://www.por2duros.com/laclasedigital',
      })
    } else {
      await navigator.clipboard.writeText('https://www.por2duros.com/laclasedigital')
      alert('Enlace copiado al portapapeles')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-12 font-mono">

      <div className="w-full max-w-sm border border-[#39FF14]/30 bg-[#111] shadow-[0_0_40px_rgba(57,255,20,0.08)]">

        {/* Header */}
        <div className="border-b border-[#39FF14]/20 p-8 text-center">
          <div className="w-20 h-20 rounded-full border-2 border-[#39FF14] bg-[#39FF14]/10 flex items-center justify-center mx-auto mb-5 text-lg font-black text-[#39FF14] tracking-tighter">
            LCD
          </div>

          <p className="text-[#39FF14] text-xs uppercase tracking-widest font-bold mb-3">La Clase Digital</p>

          <h1 className="text-xl font-black uppercase tracking-tight text-white leading-tight">
            Javier Benítez<br />
            <span className="text-[#39FF14]">Láinez</span>
          </h1>

          <div className="mt-4 space-y-1.5">
            <p className="text-[#888] text-xs uppercase tracking-widest leading-relaxed">Formación docente en inteligencia artificial</p>
            <p className="text-[#555] text-xs uppercase tracking-widest leading-relaxed">Digitalización para el sector productivo</p>
          </div>
        </div>

        {/* Contact */}
        <div className="p-6 space-y-3">
          <a
            href="tel:+34690026370"
            className="flex items-center gap-4 p-3 border border-[#222] hover:border-[#39FF14]/40 hover:bg-[#39FF14]/5 transition-all group"
          >
            <Phone size={16} className="text-[#39FF14] shrink-0" />
            <span className="text-sm text-[#CCC] group-hover:text-white transition-colors">690 026 370</span>
          </a>

          <a
            href="https://wa.me/34690026370"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 border border-[#222] hover:border-[#39FF14]/40 hover:bg-[#39FF14]/5 transition-all group"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#39FF14] shrink-0 fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-sm text-[#CCC] group-hover:text-white transition-colors">WhatsApp</span>
          </a>

          <a
            href="mailto:informa@blablaele.com"
            className="flex items-center gap-4 p-3 border border-[#222] hover:border-[#39FF14]/40 hover:bg-[#39FF14]/5 transition-all group"
          >
            <Mail size={16} className="text-[#39FF14] shrink-0" />
            <span className="text-sm text-[#CCC] group-hover:text-white transition-colors truncate">informa@blablaele.com</span>
          </a>

          <a
            href="https://laclasedigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 border border-[#222] hover:border-[#39FF14]/40 hover:bg-[#39FF14]/5 transition-all group"
          >
            <Globe size={16} className="text-[#39FF14] shrink-0" />
            <span className="text-sm text-[#CCC] group-hover:text-white transition-colors">laclasedigital.com</span>
          </a>
        </div>

        {/* Social */}
        <div className="px-6 pb-4 flex gap-3">
          <a
            href="https://www.instagram.com/clasedigitalizada/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 p-3 border border-[#222] hover:border-[#39FF14]/40 hover:bg-[#39FF14]/5 transition-all group"
          >
            <Instagram size={15} className="text-[#39FF14]" />
            <span className="text-xs text-[#888] group-hover:text-white transition-colors">@clasedigitalizada</span>
          </a>
          <a
            href="https://www.youtube.com/@blablaELE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 p-3 border border-[#222] hover:border-[#39FF14]/40 hover:bg-[#39FF14]/5 transition-all group"
          >
            <Youtube size={15} className="text-[#39FF14]" />
            <span className="text-xs text-[#888] group-hover:text-white transition-colors">@blablaELE</span>
          </a>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 space-y-3">
          <a
            href="/laclasedigital/vcard"
            download
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#39FF14] text-[#0A0A0A] font-black text-xs uppercase tracking-widest hover:bg-[#39FF14]/90 transition-colors"
          >
            <Download size={14} />
            Añadir a contactos
          </a>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full py-3 border border-[#39FF14]/40 text-[#39FF14] font-bold text-xs uppercase tracking-widest hover:bg-[#39FF14]/5 transition-colors"
          >
            <Share2 size={14} />
            Compartir tarjeta
          </button>
        </div>

        {/* QR */}
        <div className="border-t border-[#39FF14]/20 p-6 flex flex-col items-center gap-3">
          <p className="text-[#555] text-xs uppercase tracking-widest">Escanea para abrir</p>
          <div className="border border-[#39FF14]/20 p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={QR_URL} alt="QR code" width={140} height={140} className="block" />
          </div>
        </div>
      </div>

      <p className="mt-8 text-[#333] text-xs">por2duros.com/laclasedigital</p>
    </div>
  )
}
