import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

interface Pokemon {
  name: string;
  img: string;
}

interface PokemonCarouselProps {
  pokemons: Pokemon[];
  onSelect: (name: string) => void;
}

const PokemonCarousel: React.FC<PokemonCarouselProps> = ({ pokemons, onSelect }) => {
  return (
    <div className="pokemon-carousel" style={{ position: 'relative' }}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={5}
        centeredSlides={true}
        loop={true}
        navigation={{
          nextEl: '.carousel-arrow-right',
          prevEl: '.carousel-arrow-left',
        }}
        className="swiper-pokemon"
      >
        {pokemons.map((poke, idx) => (
          <SwiperSlide key={poke.name}>
            <div
              className="carousel-item"
              onClick={() => onSelect(poke.name)}
              style={{ cursor: 'pointer' }}
            >
              <img src={poke.img} alt={poke.name} width={100} height={100} />
              <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <button
          className="carousel-arrow carousel-arrow-left"
          aria-label="Deslizar a la izquierda"
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
        >
          &#8592;
        </button>
        <button
          className="carousel-arrow carousel-arrow-right"
          aria-label="Deslizar a la derecha"
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
        >
          &#8594;
        </button>
      </Swiper>
    </div>
  );
};

export default PokemonCarousel; 