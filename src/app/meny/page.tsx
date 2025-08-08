export default function MenuPage() {
  return (
    <div className="lg:pt-20">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-billy from-wedding-gold-400 to-wedding-gold-500 leading-20 bg-gradient-to-tr bg-clip-text text-6xl text-transparent">
            Meny
          </h1>
        </div>

        <div className="rounded-lg pt-4">
          <div className="text-wedding-brown-700 mb-8 space-y-8">
            <div>
              <h3 className="text-wedding-brown-700 font-baskerville text-2xl font-medium">
                Forrett
              </h3>
              <div className="border-wedding-brown-700/20 mt-4 border-t pt-4">
                <h4 className="text-wedding-brown-700 font-baskerville text-xl">
                  Marinerte fjordreker med sommersalater
                </h4>
                <p className="text-wedding-brown-700 mt-2 text-sm italic">
                  Serveres med mango, tomatsalat, chilimajones og
                  gressløkolje-kremsaus
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-wedding-brown-700 font-baskerville text-2xl font-medium">
                Hovedrett
              </h3>
              <div className="border-wedding-brown-700/20 mt-4 border-t pt-4">
                <h4 className="text-wedding-brown-700 font-baskerville text-xl">
                  Urtebakt kalv
                </h4>
                <p className="text-wedding-brown-700 mt-2 text-sm italic">
                  Med sesongens grønnsaker og morkelkremsaus
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-wedding-brown-700 font-baskerville text-2xl font-medium">
                Dessert
              </h3>
              <div className="border-wedding-brown-700/20 mt-4 border-t pt-4">
                <h4 className="text-wedding-brown-700 font-baskerville text-xl">
                  Crème brûlée
                </h4>
                <p className="text-wedding-brown-700 mt-2 text-sm italic">
                  Med sitrongress, markjordbærsorbet og sjokoladetrøffel
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-wedding-brown-700">
            Vin, øl og alkoholfrie alternativer vil bli servert til måltidet
          </p>
          <p className="text-wedding-brown-700 mt-4">
            Har du allergier eller spesielle diettbehov? Vennligst gi beskjed i
            RSVP-skjemaet.
          </p>
        </div>
      </div>
    </div>
  );
}
