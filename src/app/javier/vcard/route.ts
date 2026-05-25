import { NextResponse } from 'next/server'

export async function GET() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Javier Benitez Láinez
N:Benitez Láinez;Javier;;;
TITLE:Profesor de español / Formador de formadores
TEL;TYPE=CELL:+34690026370
EMAIL:benitezl@go.ugr.es
URL:https://javier.soy
X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/in/wikiclase/
X-SOCIALPROFILE;type=instagram:https://www.instagram.com/jabelainez/
END:VCARD`

  return new NextResponse(vcard, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="javier-benitez.vcf"',
    },
  })
}
