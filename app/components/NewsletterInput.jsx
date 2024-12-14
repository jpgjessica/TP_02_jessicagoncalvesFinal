import React, {useState} from 'react';
import Button from './Button'; // Import du bouton
import Modal from './Modal'; // Import du modal

export default function NewsletterInput() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    if (email.trim()) {
      setShowModal(true); // Affiche le modal
      setEmail(''); // Réinitialise l'email
    }
  };

  const closeModal = () => {
    setShowModal(false); // Ferme le modal
  };

  return (
    <div className="flex items-center w-full max-w-md">
      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row w-full items-center gap-2"
      >
        {/* Input */}
        <input
          type="email"
          placeholder="Votre courriel"
          value={email}
          onInput={handleInput}
          className="p-2 rounded-full border border-gray-300 w-full"
        />

        {/* Bouton */}
        <Button type="submit" label="S'inscrire" />
      </form>

      {/* Modal */}
      {showModal && (
        <Modal
          title="Merci pour votre inscription !"
          message="Vous recevrez nos nouvelles très bientôt."
          onClose={closeModal}
        />
      )}
    </div>
  );
}
