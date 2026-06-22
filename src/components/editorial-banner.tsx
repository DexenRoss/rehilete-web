import Image from 'next/image';

export function EditorialBanner() {
  return (
    <section
      className='mx-auto w-full max-w-6xl px-5 pb-6 pt-14 md:pb-10 md:pt-16'
      aria-label='Banner editorial'
    >
      <div className='mx-auto max-w-[680px]'>
        <a
          href='https://open.spotify.com/intl-es/artist/5RuNE95mHmbE5DvnQKhAn8'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Visitar Lalo Enriquez en Spotify'
          className='block overflow-hidden rounded-[14px] shadow-[0_14px_32px_rgba(0,0,0,0.16)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(0,0,0,0.20)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#61c8ab]/35 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
        >
          <Image
            src='/images/rehilete/LaloBanner.png'
            alt='Banner editorial de Lalo Enriquez'
            width={1600}
            height={351}
            priority
            className='block h-auto w-full'
          />
        </a>
      </div>
    </section>
  );
}
