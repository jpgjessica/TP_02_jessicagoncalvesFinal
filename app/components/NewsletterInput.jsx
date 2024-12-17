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
    <div className="flex items-center  w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-auto justify-center items-center gap-2">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre courriel"
            value={email}
            onInput={handleInput}
            className="p-2 rounded-full border border-gray-300 w-full"
          />
        </form>
        <Button type="submit" label="S'inscrire" />
      </div>
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
