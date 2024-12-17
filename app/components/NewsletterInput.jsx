import React, {useState} from 'react';
import Button from './Button';
import Modal from './Modal';

export default function NewsletterInput() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim()) {
      setShowModal(true);
      setEmail('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row w-full items-center gap-2"
      >
        <input
          type="email"
          placeholder="Votre courriel"
          value={email}
          onInput={handleInput}
          className="p-2 rounded-full border border-gray-300 w-full"
        />
        <Button type="submit" label="S'inscrire" />
      </form>
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
