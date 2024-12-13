import React, { useState } from 'react';
import { PokemonApi } from '../components/PokemonApi/PokemonApi';
import { DateTimeSelector } from '../components/CreateEvents/DateTimeSelector';
import { LocationSelector } from '../components/CreateEvents/LocationSelector';
import { DroppableCard } from '../components/CreateEvents/DroppableCard';
import { Draggable } from '../components/DragAndDrop/Draggable';
import { DndContext } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CalendarSelector } from '../components/GoogleCalendar/CalendarSelector';

export const PrivatePage = () => {
  const [step, setStep] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [dateTime, setDateTime] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { user, calendarId } = useAuth();

  const categories = ['Ocio', 'Trabajo', 'Familia', 'Personal'];

  const handlePokemonSelect = (pokemon: any) => {
    setSelectedPokemon(pokemon);
    setStep(2);
  };

  const handleDateTimeSelect = (selectedDateTime: string) => {
    setDateTime(selectedDateTime);
    setStep(3);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setStep(4);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    handleSubmit();
  };

  const handleSubmit = () => {
    const event = {
      pokemon: selectedPokemon,
      dateTime,
      category,
      location,
    };
    alert('Evento creado exitosamente');
    navigate('/private');
  };

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === 'droppable-card') {
      const selectedCategory = event.active.id;
      handleCategorySelect(selectedCategory);
    }
  };

  if (!user?.google?.token) {
    return <p>Necesitas conectarte con Google para utilizar esta funcionalidad.</p>;
  }

  if (!calendarId) {
    return (
      <div>
        <p>Por favor, selecciona un calendario:</p>
        <CalendarSelector />
      </div>
    );
  }

  return (
    <div className="private-page">
      <div className="selectors">
        {step === 1 && <PokemonApi onSelect={handlePokemonSelect} />}
        {step === 2 && <DateTimeSelector onSelectDateTime={handleDateTimeSelect} />}
        {step === 3 && (
          <DndContext onDragEnd={handleDragEnd}>
            <div className="categories">
              {categories.map((cat) => (
                <Draggable key={cat} id={cat}>
                  {cat}
                </Draggable>
              ))}
            </div>
            <DroppableCard
              pokemon={selectedPokemon}
              dateTime={dateTime}
              category={category}
              location={location}
              onCategorySelect={handleCategorySelect}
            />
          </DndContext>
        )}
        {step === 4 && <LocationSelector onSelectLocation={handleLocationSelect} />}
      </div>
      {step !== 3 && (
        <div className="event-card-container">
          <DroppableCard
            pokemon={selectedPokemon}
            dateTime={dateTime}
            category={category}
            location={location}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      )}
    </div>
  );
};