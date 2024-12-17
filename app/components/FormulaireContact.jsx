import {useState} from 'react';
import Modal from './Modal';
import Button from './Button';

export default function FormulaireContact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch('', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setIsModalOpen(true);
      event.target.reset();
    } else {
      console.error("Une erreur s'est produite.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Envoyez-nous un message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          ></textarea>
        </div>

        <Button type="submit">Envoyer</Button>
      </form>
      {isModalOpen && (
        <Modal
          title="Message envoyé"
          message="Votre message a été envoyé avec succès. Nous vous répondrons bientôt."
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
