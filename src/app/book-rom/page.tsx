import Link from 'next/link';

export default function RoomBookingPage() {
  return (
    <div className="lg:pt-20">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-billy from-wedding-gold-400 to-wedding-gold-500 leading-20 bg-gradient-to-tr bg-clip-text text-6xl text-transparent">
            Book Rom
          </h1>
          <p className="text-wedding-brown-700 mt-4 text-lg">
            Informasjon om overnatting på Klækken Hotel
          </p>
        </div>

        <div className="rounded-lg">
          <div className="text-wedding-brown-700 mb-8">
            <p className="mt-6">
              Vi har reservert rom på Klækken Hotel for bryllupsgjester.
              Hotellet har en vakker beliggenhet og tilbyr komfortable rom med
              alle fasiliteter.
            </p>

            <div className="mt-8 space-y-4">
              <h3 className="font-baskerville text-2xl font-medium">
                Rompriser
              </h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Enkeltrom: 920 kr per natt</li>
                <li>Dobbeltrom: 1 480 kr per natt</li>
              </ul>

              <p className="mt-4">
                Prisene inkluderer frokost og tilgang til hotellets fasiliteter.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="font-baskerville text-2xl font-medium">
                Hvordan bestille
              </h3>
              <p>
                For å bestille rom, vennligst kontakt hotellet direkte og oppgi
                referansekoden
                <span className="font-semibold"> 162 837</span>.
              </p>

              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-semibold">Telefon:</span> 32 14 00 00
                </p>
                <p>
                  <span className="font-semibold">E-post:</span>{' '}
                  salg@klaekken.no
                </p>
                <p>
                  <span className="font-semibold">Nettside:</span>{' '}
                  <Link
                    href="https://www.klaekken.no/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wedding-gold-500 hover:underline"
                  >
                    www.klaekken.no
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-baskerville text-2xl font-medium">
                Viktig informasjon
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>Gratis parkering er tilgjengelig for gjester</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
