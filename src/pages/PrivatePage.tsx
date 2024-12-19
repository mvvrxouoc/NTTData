import React, { useState } from 'react';
import { PokemonApi } from '../components/PokemonApi/PokemonApi';
import {
  DateTimeSelector,
  LocationSelector,
  DroppableCard,
  EventProgressBar,
} from '../components/CreateEvents';
import { Draggable } from '../components/DragAndDrop/Draggable';
import { DndContext } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/services/googleCalendarService';
import { useAuth } from '../hooks/useAuth';
import { CalendarSelector } from '../components/GoogleCalendar/CalendarSelector';

export const PrivatePage = () => {
  const [step, setStep] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [dateTime, setDateTime] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { user, calendarId, setCalendarId } = useAuth();

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
    setStep(5);
  };

  const handleAddToCalendar = async () => {
    if (!user?.google?.token || !calendarId) return;

    const event = {
      summary: `Evento de ${selectedPokemon.name}`,
      location: location,
      description: `Categoría: ${category}`,
      start: {
        dateTime: dateTime,
        timeZone: 'Europe/Madrid',
      },
      end: {
        dateTime: new Date(
          new Date(dateTime).getTime() + 60 * 60 * 1000
        ).toISOString(),
        timeZone: 'Europe/Madrid',
      },
    };

    try {
      await createEvent(user.google.token, calendarId, event);
      alert('Evento añadido al calendario');
      setStep(1);
      setSelectedPokemon(null);
      setDateTime('');
      setCategory('');
      setLocation('');
      setCalendarId(null);

    } catch (error) {
      console.error('Error al añadir evento:', error);
    }
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
      <EventProgressBar step={step} />
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
        {step === 4 && !location && (
          <div>
            <LocationSelector onSelectLocation={handleLocationSelect} />
          </div>
        )}
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
      {step === 5 && (
          <button onClick={handleAddToCalendar}>Añadir evento al calendario</button>
      )}
    </div>
  );
};