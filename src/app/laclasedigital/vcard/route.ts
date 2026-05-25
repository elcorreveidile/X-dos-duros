import { NextResponse } from 'next/server'

export async function GET() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Javier Benítez Láinez
N:Benítez Láinez;Javier;;;
ORG:La Clase Digital
TITLE:Formación docente en IA · Digitalización sector productivo
TEL;TYPE=CELL:+34690026370
EMAIL:informa@blablaele.com
URL:https://laclasedigital.com
X-SOCIALPROFILE;type=instagram:https://www.instagram.com/clasedigitalizada/
X-SOCIALPROFILE;type=youtube:https://www.youtube.com/@blablaELE
END:VCARD`

  return new NextResponse(vcard, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="javier-laclasedigital.vcf"',
    },
  })
}
