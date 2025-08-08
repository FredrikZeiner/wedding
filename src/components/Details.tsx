'use client';

import { useEffect, useState } from 'react';
import Countdown from './Countdown';
import { Modal } from './Modal';

const Details = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Only render the modal on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section>
      <div className="container mx-auto px-4">
        <h2 className="font-billy text-wedding-gold-500 mb-8 text-center text-6xl">
          Du er invitert
        </h2>
        <div className="font-baskerville text-wedding-brown-700 mx-auto max-w-2xl text-center text-lg">
          <p className="mb-4">
            Vi ber gledelig om din tilstedeværelse når vi feirer vår kjærlighet
            og forpliktelse.
          </p>
          <p className="mb-4">
            Seremoni lørdag 26. juli 2025
            <br />
            klokken 14:00
          </p>
          <p className="mb-4">
            Hadelandsveien 386
            <br />
            3514 Hønefoss
          </p>
          <p className="my-4 italic">Middag og dans følger</p>
          <p className="italic">Kun voksne</p>
          <p className="italic">Kleskode pyntet</p>
          <p className="italic">
            Holde tale? Kontakt toastmaster Daniel på 911 26 913
          </p>
        </div>
        <div className="flex w-full justify-center py-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-wedding-brown-700 hover:bg-wedding-gold-500 font-baskerville cursor-pointer rounded-lg px-6 py-2 text-white shadow transition-colors duration-200"
          >
            RSVP
          </button>
          {isMounted && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSc-25EbyiRLoL4mETLD0HgrOXkhnaSvgdUwFu-W99vYSCYCZw/viewform?embedded=true&hl=no"
                width="100%"
                height="95dvh"
                style={{ minHeight: '95dvh' }}
                className="border-0 py-2 sm:py-5"
                title="RSVP"
              >
                Loading…
              </iframe>
            </Modal>
          )}
        </div>
        <div className="font-baskerville text-wedding-brown-700 pb-10 pt-2">
          <Countdown />
        </div>
      </div>
    </section>
  );
};

export default Details;
